import ast
import re
import unittest
from pathlib import Path
from urllib.parse import urlparse

source = ast.parse((Path(__file__).parent / 'verify-editorial-live.py').read_text(encoding='utf-8'))
nodes = [node for node in source.body if isinstance(node, ast.FunctionDef) and node.name in {'html_identity', 'asset_identity', 'is_commercial_amazon'}]
helpers = {'re': re, 'urlparse': urlparse}
exec(compile(ast.Module(body=nodes, type_ignores=[]), 'release-identity-helpers', 'exec'), helpers)

class ReleaseIdentityTests(unittest.TestCase):
    def test_footer_formatting_does_not_change_release_identity(self):
        self.assertIn('html_identity', helpers)
        normalize = helpers['html_identity']
        self.assertEqual(normalize(b'<div>Text</div>\r\n\r\n  </body>'), normalize(b'<div>Text</div>\n  </body>'))
        self.assertEqual(normalize(b'<div>Text</div>\r\r\n  </body>'), normalize(b'<div>Text</div>\n  </body>'))
        self.assertNotEqual(normalize(b'<div>40 Modelle</div>\n</body>'), normalize(b'<div>6 Modelle</div>\n</body>'))
        self.assertNotEqual(normalize(b'<pre>a\n\nb</pre>\n</body>'), normalize(b'<pre>a\nb</pre>\n</body>'))

    def test_only_svg_text_assets_allow_line_ending_normalization(self):
        self.assertIn('asset_identity', helpers)
        normalize = helpers['asset_identity']
        self.assertEqual(normalize('/picture.svg', b'<svg>\r\n</svg>'), normalize('/picture.svg', b'<svg>\n</svg>'))
        self.assertNotEqual(normalize('/picture.jpg', b'a\r\nb'), normalize('/picture.jpg', b'a\nb'))

    def test_neutral_amazon_privacy_reference_is_not_a_purchase_action(self):
        self.assertIn('is_commercial_amazon', helpers)
        check = helpers['is_commercial_amazon']
        self.assertFalse(check('https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010'))
        self.assertTrue(check('https://www.amazon.de/dp/B0G1MWP4FB?tag=andreasboeh09-21'))
        self.assertTrue(check('https://www.amazon.de/s?k=Milchpumpe&tag=andreasboeh09-21'))

if __name__ == '__main__':
    unittest.main()

import { GuideArticlePage } from './route-article-page';
import type { RouteProps } from './route-family';
export default function ArticleRoute({ path }: RouteProps) {
  return <GuideArticlePage slug={path.split('/').filter(Boolean)[1] || ''} />;
}

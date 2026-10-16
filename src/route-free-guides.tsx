import type { RouteProps } from './route-family';
import { FreeGuideShell } from './free-guide-landing';
export default function FreeGuides({ path }: RouteProps) {
  return <FreeGuideShell path={path} />;
}

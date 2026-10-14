import type { PageName } from "./Gnb";
import HomeHeader from "./HomeHeader";

export default function VintageHeader({ active }: { active: PageName }) {
  return <HomeHeader active={active} />;
}

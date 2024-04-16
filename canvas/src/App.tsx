import Circles from "./components/canvas/Circles";
import Lines from "./components/canvas/Lines";
import Rectangles from "./components/canvas/Rectangles";
import SideNavbar, {
  ISideNavbarItemsType,
} from "./components/common/SIdeNavbar";

export default function App() {
  const sideNavbar: ISideNavbarItemsType[] = [
    {
      id: 1,
      name: "Circles",
      component: <Circles />,
    },
    {
      id: 2,
      name: "Lines",
      component: <Lines />,
    },
    {
      id: 3,
      name: "Rectangles",
      component: <Rectangles />,
    },
  ];
  return <SideNavbar sideNavbarItems={sideNavbar} />;
}

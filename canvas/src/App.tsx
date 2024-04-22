import Main from "./components/canvas-socket/Main";
import Circles from "./components/canvas/Circles";
// import Lines from "./components/canvas/Lines";
import Rectangles from "./components/canvas/Rectangles";
import Shapes from "./components/canvas/Shapes";
import Templates from "./components/canvas/Templates";
import SideNavbar, {
  ISideNavbarItemsType,
} from "./components/common/SIdeNavbar";
import Games from "./components/game/canvas/Game";

export default function App() {
  const sideNavbar: ISideNavbarItemsType[] = [
    {
      id: 1,
      name: "Template",
      component: <Templates />,
    },
    {
      id: 2,
      name: "Circles",
      component: <Circles />,
    },
    // {
    //   id: 3,
    //   name: "Lines",
    //   component: <Lines />,
    // },
    {
      id: 4,
      name: "Rectangles",
      component: <Rectangles />,
    },
    {
      id: 5,
      name: "Shapes",
      component: <Shapes />,
    },
  ];
  return <div className="h-screen  bg-slate-950 text-slate-300">
    {/* <Main /> */}
    <Games />
  </div> 
  // return <SideNavbar sideNavbarItems={sideNavbar} />;
}

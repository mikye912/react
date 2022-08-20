import "Css/sidebar.css";
import "Css/headerbar.css";
import "Css/tabBar.css";
import "Css/content.css";
import SideBar from "Views/Main/SideBar";
import HeaderBar from "Views/Main/HeaderBar";
import TabBar from "Views/Main/TabBar";
import Content from "Views/Main/Content";

export default function Sub_main() {
  console.log("sub_main 렌더링")

  return (
    <div className="main_container">
        <SideBar />
        <HeaderBar />
        <TabBar />
        <Content />
    </div>
  );
}
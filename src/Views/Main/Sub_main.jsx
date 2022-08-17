import "Css/sidebar.css";
import "Css/headerbar.css";
import "Css/tabBar.css";
import "Css/content.css";
import SideBar from "Views/Main/SideBar";
import HeaderBar from "Views/Main/HeaderBar";
import TabBar from "Views/Main/TabBar";
import Content from "Views/Main/Content";
import { useMemo } from "react";
import common from "Common/common";
import { UserContext } from "Context/userContext";

export default function Sub_main() {
  console.log("sub_main 렌더링")

  const uMenu = common.base64Dec(sessionStorage.getItem("uMenu"));
  const uSearch = JSON.parse(common.base64Dec(sessionStorage.getItem("uSearch")));
  
  const routes = useMemo(() => JSON.parse(uMenu), [uMenu]);
  console.log(routes);

  return (
    <div className="main_container">
      <UserContext.Provider value={{ uMenu, uSearch }}>
        <SideBar routes={routes} />
        <HeaderBar />
        <TabBar />
        <Content />
      </UserContext.Provider>
    </div>
  );
}
import "css/sidebar.css";
import "css/headerbar.css";
import "css/tabBar.css";
import "css/content.css";
import SideBar from "./SideBar";
import HeaderBar from "./HeaderBar";
import TabBar from "./TabBar";
import Content from "./Content";
import { useEffect, useMemo } from "react";
import common from "common/common";
import { UserContext } from "context/userContext";
import { useDispatch } from "react-redux";
import { uAuthSlice } from "common/redux/slice";

export default function Sub_main() {
  console.log("sub_main 렌더링")
  const dispatch = useDispatch();
  const uInfo = common.base64Dec(sessionStorage.getItem("uInfo")).split(':');
  const uMenu = common.base64Dec(sessionStorage.getItem("uMenu"));
  const uSearch = common.base64Dec(sessionStorage.getItem("uSearch"));
  //const uDepart = common.base64Dec(sessionStorage.getItem("uDepart"));
  //const uTid = common.base64Dec(sessionStorage.getItem("uTid"));
  //const uAcq = common.base64Dec(sessionStorage.getItem("uAcq"));
  const routes = useMemo(() => JSON.parse(uMenu), [uMenu]);
  console.log(routes);
  useEffect(()=>{
    return () => {
      dispatch(uAuthSlice.actions.destroyAuth());
    }
  },[])
// uDepart, uTid, uAcq 
  return (
    <div className="main_container">
      <UserContext.Provider value={{ uInfo, uMenu, uSearch }}>
        <SideBar routes={routes} />
        <HeaderBar />
        <TabBar />
        <Content />
      </UserContext.Provider>
    </div>
  );
}
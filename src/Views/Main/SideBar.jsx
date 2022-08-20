import { FaHome } from "react-icons/fa";
import { useState, useEffect, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "Components/Main/Sidebar/SidebarMenu";
import { batch, useDispatch, useSelector } from "react-redux";
import { uMenuSlice, contentSlice, selectTabSlice, sidebarStateSlice } from "Common/Redux/slice";
import axios from "axios";
import common from "Common/common";

const SideBar = () => {
  console.log("SideBar 렌더링")
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.uMenu)
  console.log("routes",routes);
  const [isOpen, setIsOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    axios.get('/api/Main/Sidebar/getUserMenu', {
      headers : {
        x_auth : sessionStorage.getItem("token")
      }
    })
    .then((res) => {
      dispatch(uMenuSlice.actions.setUserMenu(res.data))
    }).catch((err) => {
      common.apiVerify(err);
    })
  },[])

  const toggle = () => {
    if (isHover) {
      setIsHover(!isHover);
    }
    setIsOpen(!isOpen);
    dispatch(sidebarStateSlice.actions.changeSidebarState(!isOpen));
  };

  const handleOnclick = () => {
    window.location.reload();
  }
  
  const onClickLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  const hoverToggle = () => {
    if (isHover) {
      dispatch(sidebarStateSlice.actions.changeSidebarState(isOpen));
    } else {
      dispatch(sidebarStateSlice.actions.changeSidebarState(!isOpen));
    }
    setIsHover(!isHover)
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        animate={{
          width: isOpen || (isHover && !isOpen) ? "200px" : "70px",
          transition: {
            duration: 0.5,
          },
          zIndex: "9999",
        }}
        className={`sidebar `}
        id={`sidebar`}
        onAnimationComplete={() => hoverToggle}
        onHoverEnd={(!isOpen && isHover) ? hoverToggle : ""}
      >
        <div className="top_section">
          <AnimatePresence>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="logo"
            >
              <img className="logo_top" onClick={handleOnclick} alt={``} />
            </motion.div>
          </AnimatePresence>

          <div className="bars">
            <motion.img
              animate={{
                opacity: isOpen || (isHover && !isOpen) ? 1 : 0,
                transition: {
                  duration: 0.5,
                },
              }}
              className={isOpen ? `btn_fix` : `btn_fix_hover`}
              onClick={toggle}
              alt={``}
            >
            </motion.img>
          </div>
        </div>
        <section className="routes">

          {routes.length > 0 && routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  isHover={isHover}
                />
              );
            } else {
              return (
                <div
                  key={index}
                  className="menu"
                  onClick={() => {
                    batch(()=>{
                      dispatch(contentSlice.actions.addTabs({
                        name : route.name, 
                        path : route.path
                      }));
                      dispatch(selectTabSlice.actions.addSelectTab());
                    })
                  }}
                >
                  <div className="menu_item">
                    <div className="icon">
                      {route.name?.indexOf("메인") !== -1 ? <FaHome /> : ""}
                    </div>
                    <AnimatePresence>
                      {(isOpen) || (!isOpen && isHover) ? (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      ) : ""}
                    </AnimatePresence>
                  </div>
                </div>
              )
            }
          })}
        </section>
        <div className="info">
          <motion.div
            animate={{
              opacity: (isOpen) || (!isOpen && isHover) ? 1 : 0,
              transition: {
                duration: 0.5,
              },
            }} className="info_box">
            <span>(주)가온솔루션</span>
            <span>경기도 고양시 덕양구 충장로 8</span>
            <span>로터플레이스 1005호</span>
            <span className="info_call">[ 전화문의 ]</span>
            <span>070-4610-3008</span>
            <span>031-8073-9006</span>
          </motion.div>
          <motion.div
            animate={{
              opacity: (isOpen) || (!isOpen && isHover) ? 1 : 0,
              transition: {
                duration: 0.5,
              },
            }} className="logout_btn" onClick={onClickLogout}>
            로그아웃
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {!isOpen && !isHover ? (
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="opener"
            onHoverStart={!isOpen && !isHover ? hoverToggle : ""}
          >
            {/* <FaChevronRight/> */}
          </motion.div>
        ) : ""}
      </AnimatePresence>
    </>
  );
};

export default memo(SideBar);
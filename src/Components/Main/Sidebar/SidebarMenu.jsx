import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, memo } from "react";
import { FaCalculator, FaCoins, FaCogs, FaCog } from "react-icons/fa";
import { batch, useDispatch } from "react-redux";
import { contentSlice, selectTabSlice } from "Common/Redux/slice";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    opacity: 0,
  }),
  show: (i) => ({
    opacity: 1,
    transition: {
      duration: (i + 1) * 0.05,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, isHover }) => {
  console.log(`SiderbarMenu(${route.name}) 렌더링`)
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 토글키 동작시 매뉴 자동 닫힘
  useEffect(() => {
    if (!isOpen || (!isOpen && isHover)) {
      setIsMenuOpen(false);
    }
  }, [isOpen, isHover]);
  
  return (
    <>
      <div className="menu" onClick={toggleMenu} 
        style={{ borderBottom: `${isMenuOpen ? '1px solid #303642' : '1px solid #989BA1'}`,}}>
        <div className="menu_item">
        <div className="icon">
            {
             route.seq === '02' ? <FaCalculator /> : 
             route.seq === '03' ? <FaCoins /> : 
             route.seq === '06' ? <FaCogs /> : 
             route.seq === '07' ? <FaCog /> : 
             route.seq
            }
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
        {(isOpen) || (!isOpen && isHover) ? (
          <motion.div className="down_image"
            animate={
              isMenuOpen
                ? {
                    rotate: -180,
                    alignItems:"center"
                  }
                : { rotate: 0,
                    alignItems:"center"
                  }
            }
          >
            <img  className="angle_down" alt={``} />
          </motion.div>
        ) : ""}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <div className="link">
                  <motion.div 
                    className="sublink_text"
                    onClick={() => {
                      batch(()=>{
                        dispatch(contentSlice.actions.addTabs({
                          name : subRoute.name, 
                          path : subRoute.path
                        }));
                        dispatch(selectTabSlice.actions.addSelectTab());
                      })
                    }}
                  >{subRoute.name}
                  </motion.div>
                </div>
                
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default memo(SidebarMenu);

import React, { memo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contentSlice ,selectTabSlice } from "../../common/redux/slice"

const TabBar = () => {
  const isSider = useSelector((state) => state.sidebarState)
  const tabMenu = useSelector((state) => state.content);
  const selTab = useSelector((state) => state.selectTab);
  const dispatch = useDispatch();
  const autoMoveScroll = useRef();
  const handleScrollBy = useRef();
  console.log("TabBar 렌더링")

  useEffect(() => {
    autoMoveScroll.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [tabMenu]);

  const changeTabs = (index) => {
    const arrTabs = tabMenu.filter(t => t.index !== index);
    const arrNextIndex = tabMenu.filter(i => i.index > index);
    const arrPrevIndex = tabMenu.filter(i => i.index < index);
    dispatch(contentSlice.actions.changeTabs(arrTabs));
    if(selTab.selectTab === index){
      if(arrNextIndex[0]) {
        dispatch(selectTabSlice.actions.changeSelectTab({
          selectTab : arrNextIndex[0].index
        }));
      }else if(arrNextIndex[0] === undefined && arrPrevIndex[arrPrevIndex.length - 1]){
        dispatch(selectTabSlice.actions.changeSelectTab({
          selectTab : arrPrevIndex[arrPrevIndex.length - 1].index
        }));
      }
    }
  }

  const handleSelectTab = (index) => {
    dispatch(selectTabSlice.actions.changeSelectTab({
      selectTab : index
    }));
  }

  const moveScrollLeft = () => {
    handleScrollBy.current.scrollBy(-200,0);
  }

  const moveScrollRight = () => {
    handleScrollBy.current.scrollBy(200,0);
  }

  return (
    <section className="tabbar_container">
      <motion.div
        className={`tabbar `}
        animate={{
          marginLeft: isSider ? "200px" : "70px",
          transition: {
            duration: 0.5,
          }
        }}
      >
        <motion.div
          className={`tabbar_nav `}
        >
          <motion.div
          className={`tabbar_item_box`}
          ref={ handleScrollBy }
          >
          {
            tabMenu.length > 0 &&
            tabMenu.map((menu) => {
              return (
                <motion.div
                  key={menu.index}
                  className={`tabbar_item ${menu.index} ${selTab.selectTab === menu.index ? 'selected' : ''}`}
                  ref={ autoMoveScroll }
                >
                  <div className="tabbar_item_content">
                    <div onClick={() => { handleSelectTab(menu.index) }}>{menu.name}</div>
                    <img onClick={() => { changeTabs(menu.index) }} alt={``}/>
                  </div>
                </motion.div>
              );
            })
          }
          </motion.div>
          <div className="btn_tab">
            {/* 추후 FaAngleLeft, FaAngleRight 아이콘 이미지로 변경 */}
            <div className="btn_tab_left" onClick={ moveScrollLeft } ><FaAngleLeft/></div>
            <div className="btn_tab_right" onClick={ moveScrollRight } ><FaAngleRight/></div>
          </div>
        </motion.div>
        
      </motion.div>
    </section>
  );
};

export default TabBar;
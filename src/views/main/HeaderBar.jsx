import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import  axios  from 'axios';
import FavoriteModal from "Components/Main/HeaderBar/FavoriteModal";
import { UserContext } from "Context/userContext";
import { batch, useDispatch, useSelector } from "react-redux";
import Slice, { selectTabSlice } from "Common/Redux/slice";

const getUserName = (userId) => {
  return axios.get('/api/Main/HeaderBar/getUserName', {
    params: {
      userId: userId,
    }
  }).then((res) => {
    return res.data
  })
}

const getUserFav = (userId) => {
  return axios.get('/api/Main/HeaderBar/getUserFav', {
    params: {
      userId: userId,
    }
  }).then((res) => {
    return res.data
  })
}

const HeaderBar = () => {
  console.log("HeaderBar 렌더링")
  const isSider = useSelector((state) => state.sidebarState)
  const dispatch = useDispatch();
  const { uInfo } = useContext(UserContext);

  const [userMenu, setUserMenu] = useState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
      // 동시에 가져오기
      Promise.all([getUserName(uInfo[0]), getUserFav(uInfo[0])])
        .then((res) => {
          setUserName(res[0][0].USER_NM);
          const arr = res[1].filter(obj => obj.USE_YN === 'Y');
          setUserMenu(arr);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

    return (
      <section className="header_container">
        <motion.div className={`header`}
          animate={{
            marginLeft: isSider ? "200px" : "70px",
            transition: {
              duration: 0.5,
            }
          }}
        >
          <div className="header_icon">
            <FavoriteModal setUserMenu={setUserMenu} />
          </div>
          <div className="header_nav">
          { userMenu && userMenu.map((userMenus, index) => (
            <div 
              key={index} 
              className="header_userMenu"
              onClick={() => {
                batch(()=>{
                  dispatch(Slice.contentSlice.actions.addTabs({
                    name : userMenus.PROGRAM_NAME, 
                    path : userMenus.SRC_LOCATION
                  }));
                  dispatch(selectTabSlice.actions.addSelectTab());
                })
              }}
            >
              <span>
                {userMenus.PROGRAM_NAME}
              </span>
            </div>
          ))}
          </div>
          <div className="header_user">
              <span className="header_userName">{userName} </span>님, 반갑습니다.
          </div>
        </motion.div>
      </section>
    );
  };
  
  export default HeaderBar;
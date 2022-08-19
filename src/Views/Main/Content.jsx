import { motion } from "framer-motion";
import { useEffect } from "react";
import ErrorPage from "Components/Main/Content/ErrorPage";
import Sub_0000 from "Components/Main/Content/Sub0000/Sub_0000";
import Sub_0201 from "Components/Main/Content/Sub0201/Sub_0201";
import { useDispatch, useSelector } from "react-redux";
import { uSearchSlice } from "Common/Redux/slice";
import common from "Common/common";
import axios from "axios";

const Content = () => {
  console.log("Content 렌더링")
  const dispatch = useDispatch();
  const isSider = useSelector((state) => state.sidebarState);
  const contents = useSelector((state) => state.content);
  //console.log("contents", contents);

  useEffect(() => {
    axios.get('/api/Main/Content/getUserSearch', {
      headers : {
        x_auth : sessionStorage.getItem("token")
      }
    })
    .then((res) => {
      console.log("uSearch : ",res.data)
      //dispatch(uSearchSlice.actions.setUserSearch(res.data))
    }).catch((err) => {
      common.apiVerify(err);
    })
  },[])

  return (
    <section className="content_container">
      <motion.div className="content"
        animate={{
          marginLeft: isSider ? "200px" : "70px",
          transition: {
            duration: 0.5,
          }
        }}
      >
        {
          contents.map((content) => {
            switch (content.path) {
              case "sub_0000":
                return (
                  <Sub_0000 key={content.index} index={content.index} />
                )
              case "sub_0201":
                return (
                  <Sub_0201 key={content.index} index={content.index} content={content.path} />
                )
              default:
                return (
                  <ErrorPage key={content.index} index={content.index} content={content} />
                )
            }
          })
        }
      </motion.div>
    </section>
  );
};

export default Content;
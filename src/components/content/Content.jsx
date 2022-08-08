import React, { memo } from "react";
import { motion } from "framer-motion";
import ErrorPage from "../views/errorPage";
import Sub_0000 from "../views/Sub_0000";
import Sub_0201 from "../views/Sub_0201";
import { useSelector } from "react-redux";

const Content = () => {
  console.log("Content 렌더링")
  const isSider = useSelector((state) => state.sidebarState)
  const contents = useSelector((state) => state.content);
  console.log("contents",contents)
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
            if(content.path === "sub_0000"){
              //console.log(index);
              return (
                <Sub_0000 
                key={content.index} 
                index={content.index}
                // selTab={selTab}
                // isSider={isSider}
                />
              )
            }else if(content.path === "sub_0201"){
             // console.log(index);
              return (
                <Sub_0201 
                key={content.index}
                index={content.index}
                // selTab={selTab}
                // isSider={isSider}
                />
              )
            }else{
              return (
                <ErrorPage 
                key={content.index}
                index={content.index}
                // selTab={selTab}
                // isSider={isSider}
                content={content}
                />
              )
            }
            
          })
        }
      </motion.div>
    </section>
  );
};

export default Content;
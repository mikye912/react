import { motion } from "framer-motion";
import ErrorPage from "Components/Main/Content/ErrorPage";
import Sub_0000 from "Components/Main/Content/Sub0000/Sub_0000";
import Sub_0201 from "Components/Main/Content/Sub0201/Sub_0201";
import Sub_0202 from "Components/Main/Content/Sub0202/Sub_0202";
import Sub_0203 from "Components/Main/Content/Sub0203/Sub_0203";
import Sub_0204 from "Components/Main/Content/Sub0204/Sub_0204";
import { useDispatch, useSelector } from "react-redux";

const Content = () => {
  console.log("Content 렌더링")
  const isSider = useSelector((state) => state.sidebarState);
  const contents = useSelector((state) => state.content);

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
        {contents.length > 0 &&
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
              case "sub_0202":
                return (
                  <Sub_0202 key={content.index} index={content.index} content={content.path} />
                )
              case "sub_0203":
                return (
                  <Sub_0203 key={content.index} index={content.index} content={content.path} />
                )
              case "sub_0204":
                return (
                  <Sub_0204 key={content.index} index={content.index} content={content.path} />
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
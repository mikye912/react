import { useSelector } from "react-redux";

const ErrorPage = ({ content, index }) => {
  console.log("errPage 렌더링")
  //const isSider = useSelector((state) => state.sidebarState)
  const selTab = useSelector((state)=>state.selectTab);
  return (
  <div className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`}>
      {`${content.path} 컴포넌트 를 찾을수 없습니다`}
  </div>
  )
};

export default ErrorPage;
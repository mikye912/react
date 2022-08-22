import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import common from 'Common/common';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import useFetch from 'Common/axios';

const NoticeComponent = ({ children }) => {
  return (
    <Box className="dash_third" gridColumn="span 4">
      <div>
        <img className="title_icon"></img>
        <div className="title_name">공지사항</div>
        <div className="notice_more">MORE</div>
      </div>
      <div className="notice_line"> </div>
      <div className="status" >
        {children}
      </div>
    </Box>
  )
}

const Notice_0000 = () => {
  console.log("notice_0000 렌더링")
  const [progress, fetchApi] = useFetch();
  const [data, setData] = useState();

  useEffect(() => {
    fetchApi.get('/api/Main/Content/Sub0000/notice_0000', null, {})
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        common.apiVerify(err);
      })
  }, [])

  return (
    <NoticeComponent>
      {progress === false ? <CircularIndeterminate /> : null}
      {data && data.map((notice) => (
        <div key={notice.SEQNO} className='notice_data'>· {notice.CONTENT}</div>
      ))}
    </NoticeComponent>
  );
};
export default Notice_0000;
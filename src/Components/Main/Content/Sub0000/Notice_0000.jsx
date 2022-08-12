import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notice_0000 = () => {
  console.log("notice_0000 렌더링")
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('/api/Main/Content/Sub0000/notice_0000')
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      {data && data.map((notice) => (
        <div key={notice.SEQNO} className='notice_data'>· {notice.CONTENT}</div>
      ))}
    </>

  );
};
export default Notice_0000;
import { useState, useEffect } from 'react';
import axios from 'axios';
import common from 'Common/common';

const Notice_0000 = () => {
  console.log("notice_0000 렌더링")
  //const { token } = useContext(UserContext);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('/api/Main/Content/Sub0000/notice_0000', {
      headers : {
        x_auth : sessionStorage.getItem("token")
      }
    })
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        common.apiVerify(err);
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
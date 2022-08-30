import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import common from 'Common/common';
import { CountUp } from 'use-count-up';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import useFetch from 'Common/axios';

const DepoComponent = ({ children }) => {
  return (
    <Box className="dash_seconde" gridColumn="span 4">
      <div>
        <img className="title_icon"></img>
        <div className="title_name">당일 입금 현황</div>
      </div>
      <Box className="status" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        {children}
      </Box>
    </Box>
  )
}

const Depo_0000 = () => {
  console.log("depo_0000 렌더링")
  const [progress, fetchApi] = useFetch();
  const [data, setData] = useState({
    SALE_AMT: 0,
    FEE: 0,
    EXP_AMT: 0,
  });

  useEffect(() => {
    fetchApi.get('/api/Main/Content/Sub0000/depo_0000', null, {})
      .then((res) => {
        setData(res.data[0]);
      }).catch((err) => {
        common.apiVerify(err);
      })
  }, [])

  return (
    <DepoComponent>
        {progress === false ? <CircularIndeterminate /> : null}
        <Box className='calendar' gridColumn="span 3">
          <span>{`${(common.nowDate.fullDate().slice(4, 6))}월`}</span>
          <span>{`${(common.nowDate.fullDate().slice(6, 8))}일`}</span>
          <span>{`(${common.nowDate.day()})`}</span>
        </Box>
        <Box className='depo' gridColumn="span 7">
          <div className="depo_data">
            <div>매출</div>
            <div><CountUp isCounting end={data.SALE_AMT} duration={2} thousandsSeparator="," />원</div>
          </div>
          <div className="depo_data">
            <div>수수료</div>
            <div><CountUp isCounting end={data.FEE} duration={2} thousandsSeparator="," />원</div>
          </div>
          <div className="depo_data">
            <div>입금예정액</div>
            <div><CountUp isCounting end={data.EXP_AMT} duration={2} thousandsSeparator="," />원</div>
          </div>
        </Box>
    </DepoComponent>
  );
};
export default Depo_0000;
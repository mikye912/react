import Box from '@mui/material/Box';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import common from 'Common/common';
import { CountUp } from 'use-count-up';
import { useSelector } from 'react-redux';
import { UserContext } from 'Context/userContext';

const Depo_0000 = () => {
  console.log("depo_0000 렌더링")
  const { uInfo } = useContext(UserContext);
  const isSider = useSelector((state) => state.sidebarState)
  const [data, setData] = useState({
    SALE_AMT: 0,
    FEE: 0,
    EXP_AMT: 0,
  });

  useEffect(() => {
    axios.post('/api/sub_main/sub_0000/depo_0000', {
      orgcd: uInfo[1]
    }).then((res) => {
      setData(res.data[0]);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
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
    </>

  );
};
export default Depo_0000;
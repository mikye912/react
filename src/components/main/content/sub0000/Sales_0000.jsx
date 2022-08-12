import Box from '@mui/material/Box';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import common from 'Common/common';
import { CountUp } from 'use-count-up';
import { useSelector } from "react-redux";
import { UserContext } from "Context/userContext";

const Sales_0000 = () => {
  console.log("sales_0000 렌더링")
  const { uInfo } = useContext(UserContext);
  const isSider = useSelector((state) => state.sidebarState)
  const [data, setData] = useState({
    CARD: 0,
    CARDCNT: 0,
    CASH: 0,
    CASHCNT: 0,
    CASHIC: 0,
    CASHICCNT: 0,
    TOTAMT: 0,
    TOTCNT: 0
  });

  useEffect(() => {
    axios.post('/api/Main/Content/Sub0000/sales_0000', {
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
        <span>{`${(common.nowDate.fullDate(-1).slice(4, 6))}월`}</span>
        <span>{`${(common.nowDate.fullDate(-1).slice(6, 8))}일`}</span>
        <span>{`(${common.nowDate.day(-1)})`}</span>
      </Box>
      <Box className='sales' gridColumn="span 7">
        <div className="sales_data">
          <div>신용</div>
          <div><CountUp isCounting end={data.CARD} duration={2} thousandsSeparator="," /> 원</div>
          <div>(<CountUp isCounting end={data.CARDCNT} duration={2} thousandsSeparator="," /> 건)</div>
        </div>
        <div className="sales_data" >
          <div>현금</div>
          <div><CountUp isCounting end={data.CASH} duration={2} thousandsSeparator="," /> 원</div>
          <div>(<CountUp isCounting end={data.CASHCNT} duration={2} thousandsSeparator="," /> 건)</div>
        </div>
        <div className="sales_data" >
          <div>현금IC</div>
          <div><CountUp isCounting end={data.CASHIC} duration={2} thousandsSeparator="," /> 원</div>
          <div>(<CountUp isCounting end={data.CASHICCNT} duration={2} thousandsSeparator="," /> 건)</div>
        </div>
        <div className="sales_data" >
          <div>합계</div>
          <div><CountUp isCounting end={data.TOTAMT} duration={2} thousandsSeparator="," /> 원</div>
          <div>(<CountUp isCounting end={data.TOTCNT} duration={2} thousandsSeparator="," /> 건)</div>
        </div>
      </Box>
    </>

  );
};
export default Sales_0000;
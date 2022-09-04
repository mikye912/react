import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import common from 'Common/common';
import { CountUp } from 'use-count-up';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import useFetch from 'Common/axios';

const SalesComponent = ({ children }) => {
  return (
    <Box className="dash_first" gridColumn="span 4">
      <div>
        <img className="title_icon"></img>
        <div className="title_name">전일 매출 현황</div>
      </div>
      <Box className="status" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        {children}
      </Box>
    </Box>
  )
}

const Sales_0000 = () => {
  console.log("sales_0000 렌더링")
  const [progress, fetchApi] = useFetch();
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
    fetchApi.get('/api/users/contents/0000/sales', null, {})
      .then((res) => {
        setData(res.data[0]);
      }).catch((err) => {
        common.apiVerify(err);
      })
  }, [])

  return (
    <SalesComponent>
      {progress === false ? <CircularIndeterminate /> : null}
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
    </SalesComponent>
  );
};
export default Sales_0000;
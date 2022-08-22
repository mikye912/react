import Box from '@mui/material/Box';
import { useState, useEffect, memo } from "react";
import "Css/dashboard.css";
import Chart_0000 from "Components/Main/Content/Sub0000/Chart_0000";
import Sales_0000 from "Components/Main/Content/Sub0000/Sales_0000";
import Depo_0000 from "Components/Main/Content/Sub0000/Depo_0000";
import Notice_0000 from "Components/Main/Content/Sub0000/Notice_0000";
import common from "Common/common";
import { CountUp } from 'use-count-up';
import { useSelector } from "react-redux";
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import useFetch from 'Common/axios';

const Sub_0000 = ({ index }) => {
  console.log('sub_0000 렌더링')
  const [progress, fetchApi] = useFetch();
  const selTab = useSelector((state) => state.selectTab);
  const [data, setData] = useState(
    {
      CARD: 0,
      CARDCNT: 0,
      CASH: 0,
      CASHCNT: 0,
      CASHIC: 0,
      CASHICCNT: 0,
      TOTAMT: 0,
      TOTCNT: 0
    }
  );

  useEffect(() => {
    fetchApi.post('/api/Main/Content/Sub0000/chartData_0000', null, {})
      .then((res) => {
        setData(res.data[0]);
      }).catch((err) => {
        common.apiVerify(err);
      })
  }, [])

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`}
      gridTemplateColumns="repeat(12, 1fr)" style={{ backgroundColor: '#EEF0F1' }}>
      <Sales_0000 />
      <Depo_0000 />
      <Notice_0000 />
      <Box className="chart" gridColumn="span 12">
        <div>
          <img className="title_icon"></img>
          <div className="title_name">{("0" + common.nowDate.month()).slice(-2)}월 매출 통계</div>
        </div>
        <Box display="grid" position="relative" gridTemplateColumns="repeat(12, 1fr)">
          {progress === false ? <CircularIndeterminate /> : null}
          <Box className="data_table" gridColumn="span 9">
            <Box className="chart_data">
              <div>신용</div>
              <div><CountUp isCounting end={data.CARDCNT} duration={2} thousandsSeparator="," /> 건</div>
              <div><CountUp isCounting end={data.CARD} duration={2} thousandsSeparator="," /> 원</div>
            </Box>
            <Box className="chart_data">
              <div>현금</div>
              <div><CountUp isCounting end={data.CASHCNT} duration={2} thousandsSeparator="," /> 건</div>
              <div><CountUp isCounting end={data.CASH} duration={2} thousandsSeparator="," /> 원</div>
            </Box>
            <Box className="chart_data">
              <div>현금IC</div>
              <div><CountUp isCounting end={data.CASHICCNT} duration={2} thousandsSeparator="," /> 건</div>
              <div><CountUp isCounting end={data.CASHIC} duration={2} thousandsSeparator="," /> 원</div>
            </Box>
          </Box>
          <Box className="total_table" gridColumn="span 3">
            <div>합계</div>
            <div><CountUp isCounting end={data.TOTCNT} duration={2} thousandsSeparator="," /> 건</div>
            <div><CountUp isCounting end={data.TOTAMT} duration={2} thousandsSeparator="," /> 원</div>
          </Box>
          <Box className="Chart_0000" gridColumn="span 12"><Chart_0000 /></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Sub_0000);
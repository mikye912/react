import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { CountUp } from 'use-count-up';
import { Column } from '@ant-design/plots';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import common from 'Common/common';
import useFetch from 'Common/axios';

const chart_0000 = (fetchApi) => {
  return fetchApi.post('/api/Main/Content/Sub0000/chart_0000', null, {})
    .then((res) => {
      return res.data;
    }).catch((err) => {
      common.apiVerify(err);
    })
}

const chartData_0000 = (fetchApi) => {
  return fetchApi.post('/api/Main/Content/Sub0000/chartData_0000', null, {})
    .then((res) => {
      return res.data[0];
    }).catch((err) => {
      common.apiVerify(err);
    })
}

const ChartComponent = ({ children, progress, data }) => {
  return (
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
        <Box className="Chart_0000" gridColumn="span 12">{children}</Box>
      </Box>
    </Box>
  )
}

const Chart_0000 = () => {
  console.log("chart_0000 렌더링")
  const [progress, fetchApi] = useFetch();
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    CARD: 0,
    CARDCNT: 0,
    CASH: 0,
    CASHCNT: 0,
    CASHIC: 0,
    CASHICCNT: 0,
    TOTAMT: 0,
    TOTCNT: 0
  })

  useEffect(() => {
    // 동시에 가져오기
    Promise.all([chart_0000(fetchApi), chartData_0000(fetchApi)])
      .then((res) => {
        console.log("res", res[1])
        setData(res[0]);
        setChartData(res[1]);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios.post('/api/Main/Content/Sub0000/chart_0000', null, {
    //   headers : {
    //     x_auth : sessionStorage.getItem("token")
    //   }
    // }).then((res) => {
    //   setData(res.data);
    // }).catch((err) => {
    //   common.apiVerify(err);
    // })
  }, [])

  const config = {
    data,
    xField: 'APPDD',
    yField: 'VALUE',
    seriesField: 'TYPE',
    isGroup: 'true',
    colorField: 'TYPE',
    color: ['#50C0E8', '#FECD57', '#F86C82'],
    yAxis: {
      label: {
        formatter: (v) => common.formatter_number(v),
      },
    },
    xAxis: {
      label: {
        formatter: (v) => `${v}일`,
      },
    },
    tooltip: {
      title: (v) => `${v}일`,
      formatter: (v) => {
        return { name: v.TYPE, value: common.formatter_number(v.VALUE) };
      },
    },
    legend:
    {
      position: 'top-right',
    },
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
  };

  return (
    <ChartComponent progress={progress} data={chartData}>
      <Column {...config} />
    </ChartComponent>
  )
};

export default Chart_0000;
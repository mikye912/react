import { useState, useEffect } from 'react';
import axios from 'axios';
import { Column } from '@ant-design/plots';
import common from 'Common/common';

const Chart_0000 = () => {
console.log("chart_0000 렌더링")

const [data, setData] = useState([]);

useEffect(() => {
    axios.post('/api/Main/Content/Sub0000/chart_0000', null, {
      headers : {
        x_auth : sessionStorage.getItem("token")
      }
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      common.apiVerify(err);
    })
},[])

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
    xAxis:{
      label:{
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

  return <Column {...config} />;
};

export default Chart_0000;
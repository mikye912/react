import Box from '@mui/material/Box';
import { memo } from "react";
import "Css/dashboard.css";
import Chart_0000 from "Components/Main/Content/Sub0000/Chart_0000";
import Sales_0000 from "Components/Main/Content/Sub0000/Sales_0000";
import Depo_0000 from "Components/Main/Content/Sub0000/Depo_0000";
import Notice_0000 from "Components/Main/Content/Sub0000/Notice_0000";
import { useSelector } from "react-redux";

const Sub_0000 = ({ index }) => {
  console.log('sub_0000 렌더링')
  const selTab = useSelector((state) => state.selectTab);

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`}
      gridTemplateColumns="repeat(12, 1fr)" style={{ backgroundColor: '#EEF0F1' }}>
      <Sales_0000 />
      <Depo_0000 />
      <Notice_0000 />
      <Chart_0000 />
    </Box>
  );
};

export default memo(Sub_0000);
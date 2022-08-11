import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Default from '../searchBox/Default';
import Extra from '../searchBox/Extra';
import 'css/searchBox.css';

const Sub_0201 = ({ index }) => {
  const selTab = useSelector((state) => state.selectTab);
  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`} style={{ gridTemplateRows: 'max-content' }}>
      <Default />
      <Extra />
    </Box>
  )
};

export default Sub_0201;
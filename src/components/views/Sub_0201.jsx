import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Default from '../content/searchBox/Default'
import '../../css/searchBox.css';

const Sub_0201 = ({ index }) => {
  const selTab = useSelector((state) => state.selectTab);
  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`}>
      <Default />
    </Box>
  )
};

export default Sub_0201;
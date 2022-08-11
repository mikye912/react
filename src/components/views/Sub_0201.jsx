import { useRef, useContext } from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Default from '../content/searchBox/Default';
import Extra from '../content/searchBox/Extra';
import { UserContext } from "../../context/userContext";
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import '../../css/searchBox.css';

const Sub_0201 = ({ index, content }) => {
  const search_data = useSelector((state) => state.dataSearch);
  const selTab = useSelector((state) => state.selectTab);
  const page = content.substr(-4);

  const { uSearch } = useContext(UserContext);
  const data = uSearch.filter(a => a[page])[0][page];

  const inputRef = useRef([]);
  let postData = {};

  const handleSubmit = () => {
    for (let i = 1; i < inputRef.current.length; i++) {
      if (inputRef.current[i] && inputRef.current[i].value) {
        postData[inputRef.current[i].name] = inputRef.current[i].value
      }
    };
    //obj 합치기
    const newObj = Object.assign({}, postData, search_data);
    console.log('obj',newObj)
  }

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`} style={{ gridTemplateRows: 'max-content' }}>
      <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        <Default data={data} inputRef={inputRef} />
        <Box className="btn_case" gridColumn="span 2">
          <button className='extra_btn' ><FaPlusCircle className='extra_img' />상세</button>
          <button className='search_btn' onClick={handleSubmit}><FaSearch className='search_img' />검색</button>
        </Box>
      </Box>
      <Extra data={data} inputRef={inputRef} />
    </Box>
  )
};

export default Sub_0201;
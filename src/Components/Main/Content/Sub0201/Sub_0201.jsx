import { useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Box from '@mui/material/Box';
import Default from 'Components/Main/Content/SearchBox/Default';
import Extra from 'Components/Main/Content/SearchBox/Extra';
import 'Css/searchBox.css';
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import common from "Common/common";
import { dataSearchSlice } from 'Common/Redux/slice';

const Sub_0201 = ({ index, content }) => {
  const [visible, setVisible] = useState(false);
  const search_data = useSelector((state) => state.dataSearch);
  const selTab = useSelector((state) => state.selectTab);
  const dispatch = useDispatch();

  const uSearch = useSelector((state) => state.uSearch);
  const page = content.substr(-4);
  const data = uSearch.filter(a => a[page])[0][page]; 

  const inputRef = useRef([]);
  let postData = {};

  const handleSubmit = () => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i]) {
        if (inputRef.current[i].value === '') {
          delete postData[inputRef.current[i].name];
        } else {
          postData[inputRef.current[i].name] = inputRef.current[i].value
        } 
      }
    };
    //obj 합치기
    const newObj = Object.assign({}, postData, search_data);
    console.log('newObj',newObj)

    /*axios.post('/api/Main/Content/Sub0201', {
      where : newObj
    }, {
      headers : {
        x_auth : sessionStorage.getItem("token")
      }
    }).then((res) => {
      
    }).catch((err) => {
      common.apiVerify(err);
    }).finally(() => {
      dispatch(dataSearchSlice.actions.destroySearch());
    })*/
  
  }

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`} style={{ gridTemplateRows: 'max-content' }}>
      <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        <Default data={data} inputRef={inputRef} />
        <Box className="btn_case" gridColumn="span 2">
          <button className='extra_btn' onClick={() => { setVisible(!visible); }}>
            <FaPlusCircle className='extra_img' onClick={() => { setVisible(!visible); }} />상세
          </button>
          <button className='search_btn' onClick={handleSubmit}>
            <FaSearch className='search_img' />검색
          </button>
        </Box>
      </Box>
      {visible && <Extra data={data} inputRef={inputRef} />}
    </Box>
  )
};

export default Sub_0201;
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Default from 'Components/Main/Content/SearchBox/Default';
import Extra from 'Components/Main/Content/SearchBox/Extra';
import TotalData from 'Components/Main/Content/Sub0201/TotalData_0201';
import 'Css/searchBox.css';
import 'Css/dataGrid.css';
import { FaPlusCircle, FaSearch, FaRegPlusSquare } from "react-icons/fa";
import dayjs from "dayjs";

const Sub_0201 = ({ index, content }) => {
  const TotalDataRef = useRef();
  const [visibleSearch, setVisibleSearch] = useState(false);
  const search_data = useSelector((state) => state.dataSearch);
  const selTab = useSelector((state) => state.selectTab);

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
        } else if (i === 0 || i === 1) {
          postData[inputRef.current[i].props.name] = dayjs(inputRef.current[i].props.selected).format('YYYYMMDD');
        } else {
          postData[inputRef.current[i].name] = inputRef.current[i].value
        }
      }
    };
    //obj 합치기
    const where = Object.assign({}, postData, search_data);
    TotalDataRef.current.testFn(where);

    // fetchApi.post('/api/Main/Content/Sub0201/getDetailData',
    //   { where: newObj }, {})
    //   .then((res) => {
    //     console.log(res)
    //   }).catch((err) => {
    //     common.apiVerify(err);
    //   }).finally(() => {
    //     dispatch(dataSearchSlice.actions.destroySearch());
    //   })
  }

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`} style={{ alignContent: 'baseline' }}>
      <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        <Default data={data} inputRef={inputRef} />
        <Box className="btn_case" gridColumn="span 2">
          <button className='extra_btn' onClick={() => { setVisibleSearch(!visibleSearch); }}>
            <FaPlusCircle className='extra_img' onClick={() => { setVisibleSearch(!visibleSearch); }} />상세
          </button>
          <button className='search_btn' onClick={handleSubmit}>
            <FaSearch className='search_img' />검색
          </button>
        </Box>
      </Box>
      {visibleSearch && <Extra data={data} inputRef={inputRef} />}
      <div className='total_form'>
        <div className='total_title'>
          <img alt='' />
          <div>집계</div>
          <FaRegPlusSquare className='total_btn' />
        </div>
        <button className='excel_btn'>
          엑셀다운로드
        </button>
      </div>
      <TotalData ref={TotalDataRef} />
    </Box>
  )
};

export default Sub_0201;
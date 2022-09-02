import { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { FaPlusCircle, FaSearch, FaRegPlusSquare } from "react-icons/fa";
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import Default from 'Components/Main/Content/SearchBox/Default';
import Extra from 'Components/Main/Content/SearchBox/Extra';
import TotalData from 'Components/Main/Content/Sub0201/TotalData_0201';
import DetailData from 'Components/Main/Content/Sub0201/DetailData_0201';
import 'Css/searchBox.css';
import 'Css/dataGrid.css';

const Sub_0201 = ({ index, content }) => {
  const TotalDataRef = useRef();
  const DetailDataRef = useRef();
  const inputRef = useRef([]);
  const inputExRef = useRef([]);
  const multiCheckRef = useRef([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleTotal, setVisibleTotal] = useState(true);
  const selTab = useSelector((state) => state.selectTab);

  const uSearch = useSelector((state) => state.uSearch);
  const page = content.substr(-4);
  const data = uSearch.filter(a => a[page])[0][page];

  const uDomain = useSelector((state) => state.uDomain);
  const columns = uDomain.filter(a => a.page === page)

  let postData = {};
  const handleSubmit = () => {
    let appgb = [];
    let authstat = [];
    let tid = [];
    let depcd = [];

    /*기본*/
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i] && inputRef.current[i] !== undefined) {
        if (inputRef.current[i].value === '') {
          delete postData[inputRef.current[i].name];
        } else if (inputRef.current[i].props) {
          if (inputRef.current[i].props.selected === null) {
            delete postData[inputRef.current[i].props.name];
          } else {
            postData[inputRef.current[i].props.name] = dayjs(inputRef.current[i].props.selected).format('YYYYMMDD');
          }
        } else if (inputRef.current[i].name !== undefined || inputRef.current[i].name === null) {
          postData[inputRef.current[i].name] = inputRef.current[i].value
        }
      }
    };
    /*상세*/
    for (let j = 0; j < inputExRef.current.length; j++) {
      if (inputExRef.current[j] && inputExRef.current[j] !== undefined && inputExRef.current[j] !== null) {
        if (inputExRef.current[j].value === '') {
          delete postData[inputExRef.current[j].name];
        } else if (inputExRef.current[j].children[0]) {
          if (inputExRef.current[j].children[0].children[1].value !== 'all') {
            postData[inputExRef.current[j].children[0].children[1].name] = inputExRef.current[j].children[0].children[1].value
          }
        } else if (!inputExRef.current[j].children[0]) {
          if (inputExRef.current[j].checked) {
            if (inputExRef.current[j].name === 'APPGB') {
              appgb = [...appgb, inputExRef.current[j].value]
              postData[inputExRef.current[j].name] = [...appgb]
            } else if (inputExRef.current[j].name === 'AUTHSTAT') {
              authstat = [...authstat, inputExRef.current[j].value]
              postData[inputExRef.current[j].name] = [...authstat]
            }
          }
        } else if (inputExRef.current[j].name !== undefined) {
          postData[inputExRef.current[j].name] = inputExRef.current[j].value
        }
      }
    };

    /*멀티체크*/
    for (let k = 0; k < multiCheckRef.current.length; k++) {
      if (multiCheckRef.current[k] && multiCheckRef.current[k] !== undefined && multiCheckRef.current[k] !== null) {
        console.log('multiCheckRef.current[' + k + ']', multiCheckRef.current[k])
        if (multiCheckRef.current[k].checked) {
          console.log('multiCheckRef.current[' + k + ']Checked', multiCheckRef.current[k].checked.value)
          if (multiCheckRef.current[k].name === 'DEP_CD') {
            depcd = [...depcd, multiCheckRef.current[k].value]
            postData[multiCheckRef.current[k].name] = [...depcd]
          } else if (multiCheckRef.current[k].name === 'TID') {
            tid = [...tid, multiCheckRef.current[k].value]
            postData[multiCheckRef.current[k].name] = [...tid]
          }
        }
      }
    }

    if (postData['SDATE'] === undefined && postData['EDATE'] === undefined) {
      Swal.fire({
        titleText: '승인일자를 입력해주세요',
        width: 440,
        confirmButtonColor: '#1D79E7',
      })
      return;
    } else {
      TotalDataRef.current.testFn(postData);
      DetailDataRef.current.testFn(postData);

      postData = {};
    }
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
      {visibleSearch && <Extra data={data} inputExRef={inputExRef} multiCheckRef={multiCheckRef} />}
      <div className='total_form'>
        <div className='total_title'>
          <img alt='' />
          <div>집계</div>
          <FaRegPlusSquare className='total_btn' onClick={() => { setVisibleTotal(!visibleTotal) }} />
        </div>
        <button className='excel_btn'>
          엑셀다운로드
        </button>
      </div>
      <TotalData ref={TotalDataRef} visible={visibleTotal} columns={columns} />
      <DetailData ref={DetailDataRef} visible={visibleTotal} columns={columns} />
    </Box>
  )
};

export default Sub_0201;
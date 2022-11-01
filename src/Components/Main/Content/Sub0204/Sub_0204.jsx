import { useRef, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import { FaPlusCircle, FaSearch, FaRegPlusSquare } from "react-icons/fa";
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import axios from 'axios';
import common from 'Common/common';
import Default from 'Components/Main/Content/SearchBox/Default';
import TotalData from 'Components/Main/Content/Common/TotalData';
import DetailData from 'Components/Main/Content/Common/DetailData';
import ExcelExport from '../Common/ExcelExport';
import 'Css/searchBox.css';

const getSearchPams = (page) => {
  return axios.get(`/api/users/contents/${page}/searchparams`, {
    headers: {
      x_auth: sessionStorage.getItem("token")
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    common.apiVerify(err);
  })
}

const getPageCategory = (page) => {
  return axios.get(`/api/users/contents/${page}/categories`, {
    headers: {
      x_auth: sessionStorage.getItem("token")
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    common.apiVerify(err)
  })
}

const Sub_0201 = ({ index, content }) => {
  /*자식창에 부모 검색 조건을 보내기 위한Ref*/
  const TotalDataRef = useRef();
  const DetailDataRef = useRef();
  /*검색조건 담는 Ref*/
  const inputRef = useRef([]);
  const inputExRef = useRef([]);
  const multiCheckRef = useRef([]);
  const page = content.substr(-4);
  const selTab = useSelector((state) => state.selectTab);

  const [searchParams, setSearchParams] = useState();
  const [pageCategory, setPageCategory] = useState();

  useEffect(() => {
    Promise.all([getSearchPams(page), getPageCategory(page)])
      .then((res) => {
        setSearchParams(res[0])
        setPageCategory(res[1])
      }).catch((err) => {
        common.apiVerify(err);
      })
  }, [])

  let postData = {};
  // *검색조건을 누르면
  const handleSubmit = () => {
    let appgb = [];
    let authstat = [];
    let tid = [];
    let depcd = [];

    /*기본 검색*/
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
    /*확장 검색*/
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
          } else if (inputExRef.current[j].type === 'text') {
            postData[inputExRef.current[j].name] = inputExRef.current[j].value
          }
        } else if (inputExRef.current[j].name !== undefined) {
          postData[inputExRef.current[j].name] = inputExRef.current[j].value
        }
      }
    };

    /*멀티체크*/
    for (let k = 0; k < multiCheckRef.current.length; k++) {
      if (multiCheckRef.current[k] && multiCheckRef.current[k] !== undefined && multiCheckRef.current[k] !== null) {
        if (multiCheckRef.current[k].checked) {
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
      //* 각 컴포넌트로 검색조건을 보내고 함수 실행
      TotalDataRef.current.fetchApi(postData);
      {
        pageCategory.find(obj => obj.CATEGORY === 'DETAIL') &&
          DetailDataRef.current.fetchApi(postData)
      }
      //* 변수초기화
      postData = {};
    }
  }

  return (
    <Box className={`title ${index} ${selTab.selectTab === index ? 'selected' : ''}`} style={{ alignContent: 'baseline' }}>
      <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
        <Default data={searchParams} inputRef={inputRef} inputExRef={inputExRef} multiCheckRef={multiCheckRef} span={`span 10`} />
      </Box>
      <div className='total_form'>
        <div className='total_title'>
          <img alt='' />
          <div>집계</div>
        </div>
        <div>
          <button className='search_btn' onClick={handleSubmit}>
            <FaSearch className='search_img' />검색
          </button>
          <ExcelExport
            inputRef={inputRef}
            inputExRef={inputExRef}
            multiCheckRef={multiCheckRef}
            page={page}
            pageCategory={pageCategory}
            title={`카드사별조회`} />
        </div>
      </div>
      <TotalData ref={TotalDataRef} page={page} height={'570px'} />
      {
        pageCategory && pageCategory.find(obj => obj.CATEGORY === 'DETAIL') &&
        <DetailData ref={DetailDataRef} page={page} />
      }
    </Box >
  )
};

export default Sub_0201;
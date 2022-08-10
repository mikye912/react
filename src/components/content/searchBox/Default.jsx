import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import Box from '@mui/material/Box';
import DefaultForm from './DefaultForm';
import { useSelector } from "react-redux";
import { useRef } from 'react';

const data = [
    {
        NAME: '승인일자',
        FIELD:'APPDD',
        TYPE: 'DATE',
        DEFAULT_YN: 'Y',
        SORT: 1
    },
    {
        NAME: '승인번호',
        FIELD: 'APPNO',
        TYPE: 'TEXT',
        DEFAULT_YN: 'Y',
        SORT: 2
    },
    {
        NAME: '환자진료번호',
        FIELD: 'ADD_CID',
        TYPE: 'TEXT',
        DEFAULT_YN: 'Y',
        SORT: 3
    },
    {
        NAME: '수납자',
        FIELD: 'ADD_CASHER',
        TYPE: 'TEXT',
        DEFAULT_YN: 'Y',
        SORT: 4
    },
]

const Default = () => {
    const search_data = useSelector((state) => state.dataSearch);
    const inputRef = useRef([]);
    let postData = {};

    
    const handleSubmit = () => {
        for (let i = 1; i < inputRef.current.length; i++) {
            if (inputRef.current[i].value) {
                postData[inputRef.current[i].name] = inputRef.current[i].value
            }
        };
        //obj 합치기
        const newObj = Object.assign({}, postData, search_data);
    }
   

    return (
        <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
            <Box className="search_form" gridColumn="span 8">
                {data && data.map((data, index) => {
                    return (
                        <DefaultForm key={index} index={index} data={data} inputRef={inputRef} />
                    )
                })}
            </Box>
            <Box className="btn_case" gridColumn="span 2">
                <button className='extra_btn' ><FaPlusCircle className='extra_img' />상세</button>
                <button className='search_btn' onClick={handleSubmit}><FaSearch className='search_img' />검색</button>
            </Box>
        </Box>
    );
};
export default Default;
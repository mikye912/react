import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import Box from '@mui/material/Box';
import DefaultForm from './DefaultForm';

const data = [
    {
        name: '승인일자',
        type: 'date',
        default_yn: 'Y',
        sort: 1
    },
    {
        name: '승인번호',
        type: 'text',
        default_yn: 'Y',
        sort: 2
    },
    {
        name: '환자진료번호',
        type: 'text',
        default_yn: 'Y',
        sort: 3
    },
    {
        name: '수납자',
        type: 'text',
        default_yn: 'Y',
        sort: 4
    },
    // {
    //     name: '승인구분',
    //     type: 'check',
    //     default_yn: 'N',
    //     sort: 11,
    //     subName: [
    //         '전체거래',
    //         '승인거래',
    //         '취소거래'
    //     ]
    // }
]
const Default = () => {

    return (
        <Box className="search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
            <Box className="search_form" gridColumn="span 8">
                {data && data.map((data, index) => {
                    return (
                        <DefaultForm key={index} type={data.type} name={data.name} />
                    )
                })}
            </Box>
            <Box className="btn_case" gridColumn="span 2">
                <button className='extra_btn' ><FaPlusCircle className='extra_img' />상세</button>
                <button className='search_btn' ><FaSearch className='search_img' />검색</button>
            </Box>
        </Box>




    );
};
export default Default;
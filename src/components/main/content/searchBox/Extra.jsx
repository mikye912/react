import Box from '@mui/material/Box';
import ExtraForm from './ExtraForm';

const data = [
    {
        NAME: '사업부',
        FIELD: 'DEP_CD',
        TYPE: 'MULTICHECK',
        DEFAULT_YN: 'Y',
        SORT: 4,
        SUBDATA: [
            {
                NAME: '장례식장',
                VALUE: 'MD129348102'
            },
            {
                NAME: '임대매장',
                VALUE: 'MD1201923855'
            }
        ]
    },
    {
        NAME: '승인구분',
        FIELD: 'APPGB',
        TYPE: 'CHECK',
        DEFAULT_YN: 'N',
        SORT: 11,
        SUBDATA: [
            {
                NAME: '전체거래',
                VALUE: ''
            },
            {
                NAME: '승인거래',
                VALUE: 'A',
            },
            {
                NAME: '취소거래',
                VALUE: 'C'
            },
        ]
    }
]


const Extra = () => {
    return (
        <Box className="extra_search_box" display="grid" gridTemplateColumns="repeat(10, 1fr)">
            <Box className="extra_search_form" gridColumn="span 12">
                {data && data.map((data, index) => {
                    return (
                        <ExtraForm key={index} data={data} />
                    )
                })}
            </Box>
        </Box>
    );
};
export default Extra;
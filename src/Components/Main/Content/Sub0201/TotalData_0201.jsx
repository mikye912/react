import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import common from 'Common/common';
import useFetch from 'Common/axios';
import { forwardRef, useImperativeHandle, useState } from "react"
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";

const getTotalData = (fetchApi, postData) => {
    return fetchApi.post('/api/Main/Content/Sub0201/getTotalData', {
        postData: postData
    }, {})
        .then((res) => {
            return res;
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const columns = [
    { field: 'ROWNUM', headerName: '순번', width: 70, align: "center", headerAlign: "center" },
    { field: 'TERM_NM', headerName: '단말기', width: 150, align: "center", headerAlign: "center" },
    { field: 'TOTCNT', headerName: '합계건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'TOTAMT', headerName: '합계금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'ACNT', headerName: '승인건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'AAMT', headerName: '승인금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'CCNT', headerName: '취소건수', type: 'number', width: 90, headerAlign: "center" },
    { field: 'CAMT', headerName: '취소금액', type: 'number', width: 130, headerAlign: "center" },
    { field: 'KB', headerName: '국민', type: 'number', width: 100, headerAlign: "center" },
    { field: 'NH', headerName: '농협', type: 'number', width: 100, headerAlign: "center" },
    { field: 'LO', headerName: '롯데', type: 'number', width: 100, headerAlign: "center" },
    { field: 'BC', headerName: '비씨', type: 'number', width: 100, headerAlign: "center" },
    { field: 'SS', headerName: '삼성', type: 'number', width: 100, headerAlign: "center" },
    { field: 'SI', headerName: '신한', type: 'number', width: 100, headerAlign: "center" },
    { field: 'HN', headerName: '하나', type: 'number', width: 100, headerAlign: "center" },
    { field: 'HD', headerName: '현대', type: 'number', width: 100, headerAlign: "center" },
    { field: 'RP', headerName: '지역화폐', type: 'number', width: 100, headerAlign: "center" },
    { field: 'AP', headerName: '알리페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'WP', headerName: '위쳇페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'ZP', headerName: '제로페이', type: 'number', width: 100, headerAlign: "center" },
    { field: 'KP', headerName: '카카오페이', type: 'number', width: 100, headerAlign: "center" },
];

/*테이블 ROW마다 배경색 다르게*/
const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: '#F7F8FC',
        /*selected와 hover시의 색이 확정이 되면 수정 */
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
            },
        },
    },
}));

const TotalData = forwardRef((props, ref) => {
    const [progress, fetchApi] = useFetch();
    const [totalData, setTotalData] = useState([]);
    
    useImperativeHandle(ref, () => ({
        testFn: (postData) => {
            getTotalData(fetchApi, postData).then((res) => {
                setTotalData(res.data);
            })
        }
    }));

    return (
        <div style={{ height: 200, width: '100%' }}>
            {progress === false ? <CircularIndeterminate /> : null}
            <StripedDataGrid
                getRowId={(totalData) => totalData.ROWNUM}
                rows={totalData}
                columns={columns}
                hideFooter
                headerHeight={40}
                rowHeight={40}
                scrollbarSize={3}
                components={{
                    NoRowsOverlay: () => (
                        <div
                            style={{
                                height: '100%',
                                width: '100%',
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: 'center',
                                lineHeight: '150px'
                            }}
                        >
                            조회된 데이터가 없습니다
                        </div>
                    ),
                    // LoadingOverlay: ((progress) => (progress === false ? <CircularIndeterminate /> : null))
                    // NoResultsOverlay: () => (
                    //     <div height="100%" alignItems="center" justifyContent="center">
                    //         Local filter returns no result
                    //     </div>
                    // )
                }}
                sx={{
                    font: 'normal normal normal 14px/16px Pretendard',
                    '& 	.MuiDataGrid-columnHeaderTitle': {
                        font: 'normal normal 600 14px Pretendard',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: '#EAEBEF 0% 0% no-repeat',
                    },
                    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                        borderRight: '1px solid #D2D2D2',
                    },
                    '&:hover, &.Mui-hovered': {
                        backgroundColor: '#DAEFFD 0% 0% no-repeat',
                    },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even'
                }
            />
        </div>
    );
})

export default TotalData;
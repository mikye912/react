import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import common from 'Common/common';
import useFetch from 'Common/axios';
import { forwardRef, useImperativeHandle, useState } from "react"
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";

const getTotalData = (fetchApi, reqData) => {
    return fetchApi.get('/api/Main/Content/Sub0201/getTotalData', {
        params: reqData
    }, {})
        .then((res) => {
            return res;
        }).catch((err) => {
            common.apiVerify(err);
        })
}

/*테이블 ROW마다 배경색 다르게*/
const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        background: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        },
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
    [`& .${gridClasses.row}.total`]: {
        font: 'normal normal bold 14px/16px Pretendard',
        color: '#0885D7',
        backgroundColor: '#DAEFFD',
        borderTop: '2px solid #0A87D7',
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

    let columns = [
        { field: 'ROWNUM', headerName: '순번', width: 50 },
        { field: 'TERM_NM', headerName: '단말기', width: 150 },
        { field: 'TOTCNT', headerName: '합계건수', type: 'number', width: 90 },
        { field: 'TOTAMT', headerName: '합계금액', type: 'number', width: 130 },
        { field: 'ACNT', headerName: '승인건수', type: 'number', width: 90 },
        { field: 'AAMT', headerName: '승인금액', type: 'number', width: 130 },
        { field: 'CCNT', headerName: '취소건수', type: 'number', width: 90 },
        { field: 'CAMT', headerName: '취소금액', type: 'number', width: 130 },
        { field: 'KB', headerName: '국민', type: 'number', width: 120 },
        { field: 'NH', headerName: '농협', type: 'number', width: 120 },
        { field: 'LO', headerName: '롯데', type: 'number', width: 120 },
        { field: 'BC', headerName: '비씨', type: 'number', width: 120 },
        { field: 'SS', headerName: '삼성', type: 'number', width: 120 },
        { field: 'SI', headerName: '신한', type: 'number', width: 120 },
        { field: 'HN', headerName: '하나', type: 'number', width: 120 },
        { field: 'HD', headerName: '현대', type: 'number', width: 120 },
        { field: 'RP', headerName: '지역화폐', type: 'number', width: 120 },
        { field: 'AP', headerName: '알리페이', type: 'number', width: 120 },
        { field: 'WP', headerName: '위쳇페이', type: 'number', width: 120 },
        { field: 'ZP', headerName: '제로페이', type: 'number', width: 120 },
        { field: 'KP', headerName: '카카오페이', type: 'number', width: 120 },
    ];

    // *기본 컬럼 조건을 제외한 추가조건
    columns = columns.map((obj) => {
        if (obj.field === 'ROWNUM') {
            columns = {
                ...obj,
                headerAlign: "center",
                align: "center",
                colSpan: ({ row }) => {
                    if (row.TERM_NM === "합계") {
                        return 2;
                    }
                    return;
                },
                valueGetter: ({ value, row }) => {
                    if (row.TERM_NM === "합계") {
                        return "합계";
                    } else {
                        return value - 1;
                    }
                },
            }
            return columns;
        }
        if (obj.type !== 'number') {
            columns = {
                ...obj,
                headerAlign: "center",
                align: "center",
            }
        } else {
            columns = {
                ...obj,
                headerAlign: "center"
            }
        }
        return columns
    })

    return (
        <div style={props.visible === false ? { height: 0, width: 0 } : { height: 200, width: '100%', position: 'relative' }}>
            {progress === false ? <CircularIndeterminate /> : null}
            <StripedDataGrid
                getRowId={(totalData) => totalData.TERM_NM === null ? 'total' : totalData.TERM_NM}
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
                            조회된 데이터가 없습니다.
                        </div>
                    ),
                    ErrorOverlay: () => (
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
                            다시 시도해 주세요.
                        </div>
                    ),
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
                    }
                }}
                getRowClassName={(params) => (
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even',
                    params.indexRelativeToCurrentPage === 0 ? 'total' : ''
                )}
            />
        </div>
    );
})

export default TotalData;
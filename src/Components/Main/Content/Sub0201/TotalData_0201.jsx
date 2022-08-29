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
        position: "sticky",
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

    const columns = [
        {
            field: 'ROWNUM', headerName: '순번', width: 70, align: "center", headerAlign: "center",
            colSpan: ({ row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    return 2;
                }
                return undefined;
            },
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    return row.TERM_NM;
                }
                return value;
            },
        },
        { field: 'TERM_NM', headerName: '단말기', width: 150, align: "center", headerAlign: "center" },
        {
            field: 'TOTCNT', headerName: '합계건수', type: 'number', width: 90, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.TOTCNT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'TOTAMT', headerName: '합계금액', type: 'number', width: 130, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.TOTAMT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'ACNT', headerName: '승인건수', type: 'number', width: 90, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.ACNT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'AAMT', headerName: '승인금액', type: 'number', width: 130, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.AAMT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'CCNT', headerName: '취소건수', type: 'number', width: 90, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.CCNT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'CAMT', headerName: '취소금액', type: 'number', width: 130, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.CAMT;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'KB', headerName: '국민', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.KB;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'NH', headerName: '농협', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.NH;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'LO', headerName: '롯데', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.LO;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'BC', headerName: '비씨', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.BC;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'SS', headerName: '삼성', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.SS;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'SI', headerName: '신한', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.SI;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'HN', headerName: '하나', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.HN;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'HD', headerName: '현대', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.HD;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'RP', headerName: '지역화폐', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.RP;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'AP', headerName: '알리페이', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.AP;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'WP', headerName: '위쳇페이', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.WP;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'ZP', headerName: '제로페이', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.ZP;
                    }, 0);
                    return value
                }
                return value;
            },
        },
        {
            field: 'KP', headerName: '카카오페이', type: 'number', width: 120, headerAlign: "center",
            valueGetter: ({ value, row }) => {
                if (row.ROWNUM === 'TOTAL') {
                    value = totalData.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.KP;
                    }, 0);
                    return value
                }
                return value;
            },
        },
    ];

    return (
        <div style={props.visible === false ? { height: 0, width: 0 } : { height: 200, width: '100%', position: 'relative' }}>
            {progress === false ? <CircularIndeterminate /> : null}
            <StripedDataGrid
                getRowId={(totalData) => totalData.ROWNUM}
                rows={totalData.length > 0 ? [
                    { "ROWNUM": "TOTAL", "TERM_NM": "합계" },
                    ...totalData,
                ] : ''}
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
                    NoResultsOverlay: () => (
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
                    },
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
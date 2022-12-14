import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import common from 'Common/common';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import dayjs from "dayjs";
import axios from 'axios';
import 'Css/agGrid.scss';

const getTotalData = (fetchApi, reqData, page) => {
    return fetchApi.get(`/api/users/contents/${page}/total`, {
        params: {
            reqData: hash.cryptoEnc(JSON.stringify(reqData))
        }
    }, {})
        .then((res) => {
            return res;
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const TotalData = forwardRef((props, ref) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [progress, fetchApi] = useFetch();
    const [totalData, setTotalData] = useState([]);

    useImperativeHandle(ref, () => ({
        fetchApi: (postData) => {
            getTotalData(fetchApi, postData, props.page).then((res) => {
                setTotalData(res.data);
            })
        }
    }));

    const defaultColDef = {
        resizable: true,
        sortable: true
    };

    //더블클릭예제
    const onCellClicked = (params) => console.log(params.data.TERM_NM);

    const totalValueGetter = (params) => {
        if (params.data.TERM_NM === '합계' || params.data.PUR_NM === '합계') {
            return '합계'
        } else if (params.data.TERM_NM === '소계' || params.data.PUR_NM === '소계') {
            return dayjs(params.data.APPDD).format('YYYY-MM-DD');
        }
        return params.data.ROWNUM
    };

    const dataFormatter = (params) => {
        if (params.colDef.type === 'number') {
            return Math.floor(params.value)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else if (params.colDef.type === 'date' && params.value) {
            return dayjs(params.value).format('YYYY-MM-DD');
        }
    };

    const getRowStyle = params => {
        if (params.data.TERM_NM === '합계' || params.data.PUR_NM === '합계') {
            return {
                background: '#DAEFFD 0% 0% no-repeat padding-box',
                font: 'normal normal bold 14px/16px Pretendard',
                color: '#0885D7'
            };
        } else if (params.data.TERM_NM === '소계' || params.data.PUR_NM === '소계') {
            return {
                background: '#D9D9D9 0% 0% no-repeat padding-box',
                font: 'normal normal 500 14px/16px Pretendard',
                color: 'black'
            };
        }
    };

    const [columnList, setColumnlist] = useState([]);
    useEffect(() => {
        axios.get(`/api/users/contents/${props.page}/totalcols`, {
            headers: {
                x_auth: sessionStorage.getItem("token")
            }
        })
            .then((res) => {
                setColumnlist(res.data);
            }).catch((err) => {
                common.apiVerify(err);
            })
    }, [])

    // *기본 컬럼 조건을 제외한 추가조건
    let columnDefs = [...columnList];
    columnDefs = columnDefs.map((obj) => {
        if (obj.field === 'ROWNUM') {
            columnDefs = {
                ...obj,
                colSpan: params =>
                    params.data.TERM_NM === '합계' ? 2
                        : params.data.PUR_NM === '합계' ? 3
                            : params.data.PUR_NM === '소계' ? 2
                            : 1,
                valueGetter: totalValueGetter
            }
            return columnDefs;
        } else if (obj.type === 'number') {
            columnDefs = {
                ...obj,
                valueFormatter: dataFormatter,
                cellClass: `${obj.align}_cell`
            }
        } else if (obj.type === 'date') {
            columnDefs = {
                ...obj,
                valueFormatter: dataFormatter,
                cellClass: `${obj.align}_cell`,
            }
        } else {
            columnDefs = {
                ...obj,
                cellClass: `${obj.align}_cell`
            }
        }
        return columnDefs
    })

    return (
        <div className="ag-theme-custom total_grid"
            style={
                props.visible === false ?
                    { height: 0, width: 0 } : {
                        height: `${props.height}`, width: '99%', position: 'relative'
                    }}
        >
            {progress === false ? <CircularIndeterminate /> : null}
            <AgGridReact
                ref={gridRef}
                rowData={totalData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                getRowStyle={getRowStyle}
                suppressPropertyNamesCheck={true}
                overlayNoRowsTemplate={
                    `<div
                            style={{
                        height: '100%',
                        width: '100%',
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: 'center',
                        verticalAlgin:'center'
                    }}>
                        조회된 데이터가 없습니다.
                    </div>`
                }
            // onCellClicked={onCellClicked}
            />
        </div >
    );
})

export default TotalData;
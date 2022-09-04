import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import common from 'Common/common';
import useFetch from 'Common/axios';
require('Css/agGrid.scss');

const getTotalData = (fetchApi, reqData) => {
    return fetchApi.get('/api/users/contents/0201/total', {
        params: reqData
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
        testFn: (postData) => {
            getTotalData(fetchApi, postData).then((res) => {
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
        if (params.data.TERM_NM === '합계') {
            return '합계'
        }
        return params.data.ROWNUM
    };

    const currencyFormatter = (params) => {
        return formatNumber(params.value);
    };

    const formatNumber = (number) => {
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const getRowStyle = params => {
        if (params.data.TERM_NM === '합계') {
            return {
                background: '#DAEFFD 0% 0% no-repeat padding-box',
                font: 'normal normal bold 14px/16px Pretendard',
                color: '#0885D7'
            };
        }
    };

    let columns = props.columns.filter(a => a.category === 'TOTAL');

    // *기본 컬럼 조건을 제외한 추가조건
    columns = columns.map((obj) => {
        if (obj.field === 'ROWNUM') {
            columns = {
                ...obj,
                colSpan: params => params.data.TERM_NM === '합계' ? 2 : 1,
                valueGetter: totalValueGetter
            }
            return columns;
        } else if (obj.type === 'number') {
            columns = {
                ...obj,
                valueFormatter: currencyFormatter,
                cellClass: 'number_cell'
            }
        } else {
            columns = {
                ...obj,
            }
        }
        return columns
    })

    return (
        <div className="ag-theme-custom"
            style={
                props.visible === false ?
                    { height: 0, width: 0 } : { height: 200, width: '99%', position: 'relative' }}
        >
            {progress === false ? <CircularIndeterminate /> : null}
            <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={totalData} // Row Data for Rows
                columnDefs={columns} // Column Defs for Columns
                defaultColDef={defaultColDef}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                getRowStyle={getRowStyle}
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
        </div>
    );
})

export default TotalData;
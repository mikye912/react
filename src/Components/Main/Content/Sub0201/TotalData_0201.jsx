import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import common from 'Common/common';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import 'Css/agGrid.scss';


const getTotalData = (fetchApi, reqData) => {
    return fetchApi.get('/api/users/contents/0201/total', {
        params: {
            reqData : hash.cryptoEnc(JSON.stringify(reqData))
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

    const numberFormatter = (params) => {
        return Math.floor(params.value)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const getRowStyle = params => {
        if (params.data.TERM_NM === '합계') {
            return {
                background: '#DAEFFD 0% 0% no-repeat padding-box',
                font: 'normal normal bold 14px/16px Pretendard',
                color: '#0885D7'
            };
        }
    };

    let columnDefs = props.columns.filter(a => a.category === 'TOTAL');

    // *기본 컬럼 조건을 제외한 추가조건
    columnDefs = columnDefs.map((obj) => {
        if (obj.field === 'ROWNUM') {
            columnDefs = {
                ...obj,
                colSpan: params => params.data.TERM_NM === '합계' ? 2 : 1,
                valueGetter: totalValueGetter
            }
            return columnDefs;
        } else if(obj.type === 'number') {
            columnDefs = {
                ...obj,
                valueFormatter: numberFormatter,
                cellClass: `${obj.align}_cell`
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
                    { height: 0, width: 0 } : { height: 200, width: '99%', position: 'relative' }}
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
        </div>
    );
})

export default TotalData;
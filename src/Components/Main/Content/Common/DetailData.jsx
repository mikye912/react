import { forwardRef, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import common from 'Common/common';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import dayjs from "dayjs";
import ModalPortal from "../Sub0201/Modal/ColumnModifyModal";
import ColumnModify from '../Sub0201/Modal/ColumnModify'
import GridDataDetail from '../Sub0201/Modal/GridDataDetail'
import axios from 'axios';
import 'Css/modal.css';
import 'Css/agGrid.scss';

const getDetailData = (fetchApi, reqData, page) => {
    return fetchApi.get(`/api/users/contents/${page}/detail`, {
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

const DetailData = forwardRef((props, ref) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [progress, fetchApi] = useFetch();
    const [detailData, setDetailData] = useState([]);
    const [columnList, setColumnlist] = useState([]);

    //드래그앤드롭 모달창관련
    const [modalOpened, setModalOpened] = useState(false);

    const columnHandleOpen = () => {
        setModalOpened(true);
    };

    const columnHandleClose = () => {
        setModalOpened(false);
    };

    const [gridDetail, setGridDetail] = useState(false);
    const [chooseData, setChooseData] = useState();
    const gridHandleOpen = () => {
        setGridDetail(true);
    };

    const gridHandleClose = () => {
        setGridDetail(false);
    };

    useImperativeHandle(ref, () => ({
        fetchApi: (postData) => {
            getDetailData(fetchApi, postData, props.page).then((res) => {
                setDetailData(res.data);
            })
        }
    }));

    useEffect(() => {
        axios.get(`/api/users/contents/${props.page}/detailcols`, {
            headers: {
                x_auth: sessionStorage.getItem("token")
            }
        })
            .then((res) => {
                setColumnlist(res.data)
            }).catch((err) => {
                common.apiVerify(err);
            })
    }, [])

    const defaultColDef = {
        resizable: true,
        sortable: true,
        suppressMovable: true, /*컬럼이동 방지*/
    };

    //더블클릭예제
    const onCellClicked =
        (params) => { gridHandleOpen(); setChooseData(params.data) };

    const dataFormatter = (params) => {
        if (params.colDef.type === 'number') {
            return Math.floor(params.value)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else if (params.colDef.type === 'date' && params.value) {
            return dayjs(params.value).format('YYYY-MM-DD');
        } else if (params.colDef.type === 'time') {
            let time = params.value;
            const hh = time.substr(0, 2);
            const mm = time.substr(2, 2);
            const ss = time.substr(4, 2);
            return hh + ':' + mm + ':' + ss;
        }
    };

    const getRowStyle = params => {
        if (params.data.ADD_CASHER === '합계') {
            return {
                background: '#DAEFFD 0% 0% no-repeat padding-box',
                font: 'normal normal bold 14px/16px Pretendard',
                color: '#0885D7'
            };
        } else if (params.data.ADD_CASHER === '소계') {
            return {
                background: '#D9D9D9 0% 0% no-repeat padding-box',
                font: 'normal normal 500 14px/16px Pretendard',
                color: 'black'
            };
        }
    };

    // * db에서 가져오는 컬럼 width값이 auto일 경우만 자동맞춤으로 사이즈 조절
    // * skipHeader가 true면 헤더의 텍스트 길이를 무시하고 사이즈 조절
    const autoSizeAll = useCallback((skipHeader) => {
        const allColumnIds = [];
        gridRef.current.columnApi.getColumns().forEach((column) => {
            {
                column.colDef.width === 'auto' &&
                    allColumnIds.push(column.getId());
            }
        });
        gridRef.current.columnApi.autoSizeColumn(allColumnIds, skipHeader);
    }, []);

    // *기본 컬럼 조건을 제외한 추가조건
    let columnDefs = [...columnList];
    columnDefs = columnDefs.map((obj) => {
        if (obj.type === 'number') {
            columnDefs = {
                ...obj,
                valueFormatter: dataFormatter,
                cellClass: `${obj.align}_cell`
            }
        } else if (obj.type === 'date') {
            columnDefs = {
                ...obj,
                valueFormatter: dataFormatter,
                cellClass: `${obj.align}_cell`
            }
        } else if (obj.type === 'time') {
            columnDefs = {
                ...obj,
                valueFormatter: dataFormatter,
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
        <>
            <div className='detail_form'
                style={
                    props.visible === false ?
                        { border: 'none', paddingTop: 0 } :
                        { borderTop: '1px solid #D2D2D2' }}>
                <div className='detail_title'>
                    <img alt='' />
                    <div>상세</div>
                </div>
                <div className='detail_column_sort' onClick={columnHandleOpen}>
                    컬럼수정
                </div>
                {modalOpened && (
                    <ModalPortal closePortal={columnHandleClose} title={'컬럼수정'}>
                        <ColumnModify
                            column={columnList}
                            page={props.page}
                            setColumnlist={setColumnlist}
                            closePortal={columnHandleClose} />
                    </ModalPortal>
                )}
            </div>
            <div className="ag-theme-custom"
                style={
                    props.visible === false ?
                        { height: 'calc(100vh - 400px)', width: '99%', position: 'relative' } :
                        { height: 'calc(100vh - 600px)', width: '99%', position: 'relative' }}>
                {progress === false ? <CircularIndeterminate /> : null}
                <AgGridReact
                    ref={gridRef}
                    rowData={detailData}
                    columnDefs={columnDefs.filter(a => a.visiable === 'Y')}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    onFirstDataRendered={() => autoSizeAll(false)}
                    suppressPropertyNamesCheck={true}
                    onCellDoubleClicked={onCellClicked}
                    getRowStyle={getRowStyle}
                    overlayNoRowsTemplate={
                        `<div
                            style={{
                        height: '100%',
                        width: '100%',
                        alignItems: "center",
                        justifyContent: "center",
                        verticalAlgin:'center'
                    }}>
                        조회된 데이터가 없습니다.
                    </div>`
                    }
                />
            </div>
            {
                gridDetail && (
                    <ModalPortal closePortal={gridHandleClose} title={'거래내역상세정보'}>
                        <GridDataDetail
                            data={chooseData}
                            closePortal={columnHandleClose} />
                    </ModalPortal>
                )
            }
        </>
    );
})

export default DetailData;
import { useState } from 'react';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import common from 'Common/common';
import React from "react";
import ReactExport from "react-export-excel";

const getTotalcols = (fetchApi, page) => {
    return fetchApi.get(`/api/users/contents/${page}/totalcols`, {
        headers: {
            x_auth: sessionStorage.getItem("token")
        }
    })
        .then((res) => {
            return res.data
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const getTotalData = (fetchApi, reqData) => {
    return fetchApi.get('/api/users/contents/0201/total', {
        params: {
            reqData: hash.cryptoEnc(JSON.stringify(reqData))
        }
    }, {})
        .then((res) => {
            return res.data;
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const getDetailcols = (fetchApi, page) => {
    return fetchApi.get(`/api/users/contents/${page}/detailcols`, {
        headers: {
            x_auth: sessionStorage.getItem("token")
        }
    })
        .then((res) => {
            return res.data
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const getDetailData = (fetchApi, reqData) => {
    return fetchApi.get('/api/users/contents/0201/detail', {
        params: {
            reqData: hash.cryptoEnc(JSON.stringify(reqData))
        }
    }, {})
        .then((res) => {
            return res.data;
        }).catch((err) => {
            common.apiVerify(err);
        })
}

const ExcelExport = ({ inputRef, inputExRef, multiCheckRef, page }) => {
    const [progress, fetchApi] = useFetch();

    const [totalcols, setTotalcols] = useState([]);
    const [detailcols, setDetailcols] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [detailData, setDetailData] = useState([]);

    let postData = {};
    // *엑셀 버튼을 누르면
    const fileDownload = () => {
        let appgb = [];
        let authstat = [];
        let tid = [];
        let depcd = [];

        /*기본 검색*/
        for (let i = 0; i < inputRef.current.length; i++) {
            if (inputRef.current[i] && inputRef.current[i] !== undefined) {
                if (inputRef.current[i].value === '') {
                    delete postData[inputRef.current[i].name];
                } else if (inputRef.current[i].props) {
                    if (inputRef.current[i].props.selected === null) {
                        delete postData[inputRef.current[i].props.name];
                    } else {
                        postData[inputRef.current[i].props.name] = dayjs(inputRef.current[i].props.selected).format('YYYYMMDD');
                    }
                } else if (inputRef.current[i].name !== undefined || inputRef.current[i].name === null) {
                    postData[inputRef.current[i].name] = inputRef.current[i].value
                }
            }
        };
        /*확장 검색*/
        for (let j = 0; j < inputExRef.current.length; j++) {
            if (inputExRef.current[j] && inputExRef.current[j] !== undefined && inputExRef.current[j] !== null) {
                if (inputExRef.current[j].value === '') {
                    delete postData[inputExRef.current[j].name];
                } else if (inputExRef.current[j].children[0]) {
                    if (inputExRef.current[j].children[0].children[1].value !== 'all') {
                        postData[inputExRef.current[j].children[0].children[1].name] = inputExRef.current[j].children[0].children[1].value
                    }
                } else if (!inputExRef.current[j].children[0]) {
                    if (inputExRef.current[j].checked) {
                        if (inputExRef.current[j].name === 'APPGB') {
                            appgb = [...appgb, inputExRef.current[j].value]
                            postData[inputExRef.current[j].name] = [...appgb]
                        } else if (inputExRef.current[j].name === 'AUTHSTAT') {
                            authstat = [...authstat, inputExRef.current[j].value]
                            postData[inputExRef.current[j].name] = [...authstat]
                        }
                    }
                } else if (inputExRef.current[j].name !== undefined) {
                    postData[inputExRef.current[j].name] = inputExRef.current[j].value
                }
            }
        };

        /*멀티체크*/
        for (let k = 0; k < multiCheckRef.current.length; k++) {
            if (multiCheckRef.current[k] && multiCheckRef.current[k] !== undefined && multiCheckRef.current[k] !== null) {
                if (multiCheckRef.current[k].checked) {
                    if (multiCheckRef.current[k].name === 'DEP_CD') {
                        depcd = [...depcd, multiCheckRef.current[k].value]
                        postData[multiCheckRef.current[k].name] = [...depcd]
                    } else if (multiCheckRef.current[k].name === 'TID') {
                        tid = [...tid, multiCheckRef.current[k].value]
                        postData[multiCheckRef.current[k].name] = [...tid]
                    }
                }
            }
        }

        if (postData['SDATE'] === undefined && postData['EDATE'] === undefined) {
            Swal.fire({
                titleText: '승인일자를 입력해주세요',
                width: 440,
                confirmButtonColor: '#1D79E7',
            })
            return;
        } else {
            Promise.all([
                getTotalcols(fetchApi, page),
                getTotalData(fetchApi, postData),
                getDetailcols(fetchApi, page),
                getDetailData(fetchApi, postData)])
                .then((res) => {
                    setTotalcols(res[0]);
                    setTotalData(res[1]);
                    const cols = res[2].filter(obj => obj.visiable !== 'N');
                    setDetailcols(cols);
                    setDetailData(res[3]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    console.log("totalData : ", totalcols)

    let test = [
        {
            name: 'name1',
            value: 'test1'
        },
        {
            name: 'name2',
            value: 'value2'
        },
        {
            name: 'name3',
            value: 'value3'
        },
        {
            name: 'name1',
            value: 'value1'
        },
        {
            name: 'name1',
            value: 'value1'
        },
        {
            name: 'name1',
            value: 'value1'
        },
    ]


    return (
        <ExcelFile
            element={
                <button className='excel_btn' onClick={fileDownload}>
                    엑셀다운로드
                </button>}>
            <ExcelSheet data={test} name="sheet1">
                {/* {totalcols && totalcols.map((obj) => {
                    return (
                        <ExcelColumn label={obj.headerName} value={obj.field} />
                    )
                })} */}
                <ExcelColumn label="test1" value="value" />
                <ExcelColumn label="test2" value="test2" />
                <ExcelColumn label="test3" value="test3" />
                <ExcelColumn label="test4" value="test4" />
                <ExcelColumn label="test5" value="test5" />
                <ExcelColumn label="test6" value="test6" />

            </ExcelSheet>
        </ExcelFile>
    )
};

export default ExcelExport;

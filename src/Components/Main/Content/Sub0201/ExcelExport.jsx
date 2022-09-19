import { useState } from 'react';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import common from 'Common/common';
import Excel from "exceljs";

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
    // const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    // !변수화
    const excelFileName = '상세내역조회';

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
                console.log('multiCheckRef.current[' + k + ']', multiCheckRef.current[k])
                if (multiCheckRef.current[k].checked) {
                    console.log('multiCheckRef.current[' + k + ']Checked', multiCheckRef.current[k].checked.value)
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
                    const cols = res[2].filter(obj => obj.hidden !== 'Y');
                    console.log(cols)
                    setDetailcols(res[2]);
                    setDetailData(res[3]);
                })
                .catch((err) => {
                    console.log(err);
                });

            try {
                // 엑셀 생성
                const workbook = new Excel.Workbook();

                // 생성자
                workbook.creator = '작성자';

                // 최종 수정자
                workbook.lastModifiedBy = '최종 수정자';

                // 생성일(현재 일자로 처리)
                workbook.created = new Date();

                // 수정일(현재 일자로 처리)
                workbook.modified = new Date();

                // addWorksheet() 함수를 사용하여 엑셀 시트를 추가한다.
                // 엑셀 시트는 순차적으로 생성된다.
                workbook.addWorksheet('Sheet1');

                // 엑셀 시트를 접근하는 방법은 세 가지 방법이 존재한다.
                // 1. getWorksheet() 함수에서 시트 명칭 전달
                const sheetOne = workbook.getWorksheet('Sheet1');

                // 2. getWorksheet() 함수에서 시트 인덱스 전달
                // const sheetTwo = workbook.getWorksheet(1);

                // 3. 대괄호 표기법
                // const sheetThree = workbook.worksheets[2];

                // removeWorksheet() 함수를 사용하여 엑셀 시트를 제거한다.
                // workbook.removeWorksheet(sheetThree.id);

                //필터기능추가
                // sheetOne.autoFilter = 'A1:G1';

                const borderStyle = {
                    top: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    left: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    bottom: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    right: { style: 'thin', color: { rgb: 'D2D2D2' } },
                };

                // 컬럼 설정
                // header: 엑셀에 표기되는 이름
                // key: 컬럼을 접근하기 위한 key
                // hidden: 숨김 여부
                // width: 컬럼 넓이
                // let totalColumnDefs = [...totalcols];
                // sheetOne.columns = totalColumnDefs.map((obj) => {
                //     if (obj.type === 'number') {
                //         totalColumnDefs = {
                //             ...obj,
                //             key: obj.field,
                //             header: obj.headerName,
                //             width: obj.width / 8,
                //             // 스타일 설정
                //             style: {
                //                 // Font 설정
                //                 font: { name: '맑은 고딕', size: 11 },
                //                 numFmt: '#,##0',
                //                 alignment: { horizontal: 'center', vertical: 'middle' },
                //             }
                //         }
                //         return totalColumnDefs
                //     } else if (obj.field == 'TERM_NM') {
                //         totalColumnDefs = {
                //             ...obj,
                //             key: obj.field,
                //             header: obj.headerName,
                //             width: obj.width / 10 + 10,
                //             // 스타일 설정
                //             style: {
                //                 // Font 설정
                //                 font: { name: '맑은 고딕', size: 11 },
                //                 alignment: { horizontal: 'center', vertical: 'middle' },
                //             }
                //         }
                //         return totalColumnDefs
                //     } else {
                //         totalColumnDefs = {
                //             ...obj,
                //             key: obj.field,
                //             header: obj.headerName,
                //             width: obj.width / 8,
                //             // 스타일 설정
                //             style: {
                //                 // Font 설정
                //                 font: { name: '맑은 고딕', size: 11 },
                //                 alignment: { horizontal: 'center', vertical: 'middle' },
                //             }
                //         }
                //         return totalColumnDefs
                //     }
                // });

                // totalData.map((totalItem, index) => {
                //     sheetOne.addRow(totalItem);

                //     // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
                //     for (let loop = 1; loop <= sheetOne.columnCount; loop++) {
                //         const col = sheetOne.getRow(index + 2).getCell(loop);
                //         col.border = borderStyle;
                //         col.font = { name: '맑은 고딕', size: 11 };

                //         if (loop != 1 && loop != 2) {
                //             col.alignment = { horizontal: 'right' };
                //         }
                //     }
                // });

                // sheetOne.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                //     row.eachCell(function (cell, colNumber) {
                //         cell.border = borderStyle;
                //     });
                // });

                let detailColumnDefs = [...detailcols];
                sheetOne.columns = detailColumnDefs.map((obj) => {
                    if (obj.type === 'number') {
                        detailColumnDefs = {
                            ...obj,
                            key: obj.field,
                            header: obj.headerName,
                            width: obj.width / 8,
                            // 스타일 설정
                            style: {
                                // Font 설정
                                font: { name: '맑은 고딕', size: 11 },
                                numFmt: '#,##0',
                                alignment: { horizontal: 'center', vertical: 'middle' },
                            }
                        }
                        return detailColumnDefs
                    } else {
                        detailColumnDefs = {
                            ...obj,
                            key: obj.field,
                            header: obj.headerName,
                            width: obj.width / 8,
                            // 스타일 설정
                            style: {
                                // Font 설정
                                font: { name: '맑은 고딕', size: 11 },
                                alignment: { horizontal: 'center', vertical: 'middle' },
                            }
                        }
                        return detailColumnDefs
                    }
                });

                detailData.map((detailItem, index) => {
                    sheetOne.addRow(detailItem);

                    // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
                    for (let loop = 1; loop <= sheetOne.columnCount; loop++) {
                        const col = sheetOne.getRow(index + 2).getCell(loop);
                        col.border = borderStyle;
                        col.font = { name: '맑은 고딕', size: 11 };

                        if (loop != 1 && loop != 2) {
                            col.alignment = { horizontal: 'right' };
                        }
                    }
                });


                sheetOne.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                    row.eachCell(function (cell, colNumber) {
                        cell.border = borderStyle;
                    });
                });

                sheetOne.spliceRows(1, 0, [], [], []);

                sheetOne.mergeCells('A1:B1');
                sheetOne.getCell('A1').value = '상세내역조회';
                sheetOne.mergeCells('A2:B2');
                sheetOne.getCell('A2').value = `${postData['SDATE']} ~ ${postData['EDATE']}`;
                sheetOne.mergeCells('A5:B5');
                sheetOne.getCell('B5').value = '합계';

                workbook.xlsx.writeBuffer().then((data) => {
                    const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    const url = window.URL.createObjectURL(blob);
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.download = `상세내역조회_${dayjs(new Date()).format('YYYYMMDD')}.xlsx`;
                    anchor.click();
                    window.URL.revokeObjectURL(url);
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <button className='excel_btn' onClick={fileDownload}>
            엑셀다운로드
        </button>
    )
};

export default ExcelExport;

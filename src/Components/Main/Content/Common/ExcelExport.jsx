import { useState } from 'react';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import hash from 'Common/hashing';
import useFetch from 'Common/axios';
import common from 'Common/common';
import ExcelJS from "exceljs";
import saveAs from "file-saver";

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

const getTotalData = (fetchApi, reqData, page) => {
    return fetchApi.get(`/api/users/contents/${page}/total`, {
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

const getDetailData = (fetchApi, reqData, page) => {
    return fetchApi.get(`/api/users/contents/${page}/detail`, {
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

const ExcelExport = ({ inputRef, inputExRef, multiCheckRef, page, title, pageCategory }) => {
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
                    } else if (inputExRef.current[j].type === 'text') {
                        postData[inputExRef.current[j].name] = inputExRef.current[j].value
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
            {
                pageCategory.find(obj => obj.CATEGORY === 'DETAIL') ?
                    Promise.all([
                        getTotalcols(fetchApi, page),
                        getTotalData(fetchApi, postData, page),
                        getDetailcols(fetchApi, page),
                        getDetailData(fetchApi, postData, page)])
                        .then((res) => {
                            setTotalcols(res[0]);
                            setTotalData(res[1]);
                            const cols = res[2].filter(obj => obj.visiable !== 'N');
                            setDetailcols(cols);
                            setDetailData(res[3]);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    : Promise.all([
                        getTotalcols(fetchApi, page),
                        getTotalData(fetchApi, postData, page)])
                        .then((res) => {
                            setTotalcols(res[0]);
                            setTotalData(res[1]);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
            }

            try {
                var ExcelJSWorkbook = new ExcelJS.Workbook();
                var worksheet = ExcelJSWorkbook.addWorksheet("sheet1");

                const borderStyle = {
                    top: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    left: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    bottom: { style: 'thin', color: { rgb: 'D2D2D2' } },
                    right: { style: 'thin', color: { rgb: 'D2D2D2' } },
                };

                let headerRow = worksheet.getRow(4);
                for (let i = 0; i < totalcols.length; i++) {
                    let currentColumnWidth = totalcols[i].width;
                    worksheet.getColumn(i + 1).width = currentColumnWidth !== undefined ? currentColumnWidth / 8 : 20;
                    let cell = headerRow.getCell(i + 1);
                    cell.value = totalcols[i].headerName;
                    cell.font = { name: '맑은 고딕', size: 11 };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' }
                }

                //eslint-disable-next-line no-unused-expressions
                // worksheet.excelFilterEnabled === true
                //     ? (worksheet.views = [{ state: "frozen", ySplit: 3 }])
                //     : undefined;

                for (let i = 0; i < totalData.length; i++) {
                    var dataRow = worksheet.addRow();
                    for (let j = 0; j < Object.keys(totalData[i]).length; j++) {
                        let cell = dataRow.getCell(j + 1);
                        cell.value = totalData[i][Object.keys(totalData[i])[j]];
                        cell.font = { name: '맑은 고딕', size: 11 };
                        cell.border = borderStyle;
                        cell.alignment = { horizontal: 'center' };

                        {
                            headerRow.getCell(j + 1).text.trim() === '순번' || headerRow.getCell(j + 1).text.trim() === '카드사' || headerRow.getCell(j + 1).text.trim() === '단말기' ?
                                cell.alignment = { horizontal: 'center' }
                                : headerRow.getCell(j + 1).text.trim() === '승인일자' && cell.value ?
                                    cell.value = dayjs(cell.value).format('YYYY-MM-DD')
                                    : cell.alignment = { horizontal: 'right' }; cell.numFmt = '#,##0';
                        }
                    }
                }

                /*Column headers*/
                let totalLastRow = worksheet.lastRow.number;

                if (detailcols.length > 0) {
                    let detailColumnDefs = [...detailcols];
                    worksheet.columns = detailColumnDefs.map((obj) => {
                        {
                            obj.field !== 'CARDNO' ?
                                detailColumnDefs = {
                                    ...obj,
                                    key: obj.field,
                                    width: obj.width / 8,
                                    style: {
                                        // Font 설정
                                        font: { name: '맑은 고딕', size: 11 },
                                        numFmt: '#,##0',
                                        alignment: { horizontal: 'center', vertical: 'middle' },
                                    }
                                }
                                : detailColumnDefs = {
                                    ...obj,
                                    key: obj.field,
                                    width: 20,
                                    style: {
                                        // Font 설정
                                        font: { name: '맑은 고딕', size: 11 },
                                        numFmt: '#,##0',
                                        alignment: { horizontal: 'center', vertical: 'middle' },
                                    }
                                }
                            return detailColumnDefs
                        }
                    });

                    worksheet.getRow(totalLastRow + 3).values = detailcols.map((obj) =>
                        obj.headerName,
                    );

                    worksheet.autoFilter = {
                        from: {
                            row: totalLastRow + 3,
                            column: 1
                        },
                        to: {
                            row: totalLastRow + 3,
                            column: detailcols.length
                        }
                    };

                    detailData.map((detailItem, index) => {
                        worksheet.addRow(detailItem);

                        // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
                        for (let loop = 1; loop <= worksheet.columnCount; loop++) {
                            const col = worksheet.getRow(totalLastRow + 4 + index).getCell(loop);

                            col.border = borderStyle;

                            {
                                col._column._key !== 'AMOUNT' ?
                                    col.alignment = { horizontal: 'center' } :
                                    col.alignment = { horizontal: 'right' }; col.numFmt = '#,##0';
                            }

                            {
                                col._column._key === "APPDD" && col.value ?
                                    col.value = dayjs(col.value).format('YYYY-MM-DD') :
                                    col._column._key === 'APPTM' && col.value ?
                                        col.value = col.value.substr(0, 2) + ':' + col.value.substr(2, 2) + ':' + col.value.substr(4, 2)
                                        : col.value = col.value
                            }
                        }
                    });
                }

                worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                    row.eachCell(function (cell, colNumber) {
                        cell.border = borderStyle;
                    });
                });

                worksheet.getRow(1).font = {
                    name: "맑은 고딕",
                    family: 4,
                    size: 12,
                    bold: true,
                    alignment: { horizontal: 'center', vertical: 'middle' }
                };

                worksheet.getRow(2).font = {
                    name: "맑은 고딕",
                    family: 4,
                    size: 12,
                    bold: true,
                    alignment: { horizontal: 'center', vertical: 'middle' },
                };

                worksheet.mergeCells('A1:C1');
                worksheet.mergeCells('A2:C2');

                worksheet.getCell("A1").value = `${title}`;
                worksheet.getCell("A2").value = `${postData['SDATE']} ~ ${postData['EDATE']}`;

                {
                    detailData.length === 0 ?
                        worksheet.getCell(`A${totalLastRow + 2}`).value = '' :
                        worksheet.getCell(`A${totalLastRow + 2}`).value = "상세내역"
                }

                ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        `${title}_${dayjs(new Date()).format('YYYYMMDD')}.xlsx`
                    );
                });
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

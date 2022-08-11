import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import { ko } from 'date-fns/esm/locale';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { dataSearchSlice } from '../../common/redux/slice';
import '../../css/react_datepicker.css';
import dayjs from "dayjs";

const DatePickers = ( ) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const _ = require('lodash');
    const dispatch = useDispatch();
    /*년월 select선택*/
    const years = _.range(getYear(new Date()) - 1, getYear(new Date()) + 1, 1);
    const months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];

    useEffect(() => {
        // dispatch(dataSearchSlice.actions.changeDateInputs({
        //     sdate: dayjs(startDate).format('YYYYMMDD'),
        //     edate: dayjs(endDate).format('YYYYMMDD')
        // }))

        dispatch(dataSearchSlice.actions.changeInputs({
            SDATE: dayjs(startDate).format('YYYYMMDD'),
            EDATE: dayjs(startDate).format('YYYYMMDD'),
        }));
    }, [startDate, endDate])

    return (
        <>
            <div className='date_picker_form'>
                <DatePicker
                    className='date_picker'
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                        setEndDate(date)

                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    locale={ko}
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div className="custom_datepicker_select_wrapper">
                            {/* 이전 월로 이동하는 버튼 */}
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <FaChevronLeft />
                            </button>
                            <div className="custom_datepicker_select_item">
                                {/* 연도 선택 select box */}
                                <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) => changeYear(Number(value))}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <span>년</span>
                            </div>
                            <div className="custom_datepicker_select_item">
                                {/* 월 선택 select box */}
                                <select
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <span>월</span>
                            </div>
                            {/* 다음 월로 이동하는 버튼 */}
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                />
            </div>
            <em>~</em>
            <div className='date_picker_form'>
                <DatePicker
                    className='date_picker'
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    locale={ko}
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div className="custom_datepicker_select_wrapper">
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <FaChevronLeft />
                            </button>
                            <div className="custom_datepicker_select_item">
                                <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) => changeYear(Number(value))}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <span>년</span>
                            </div>
                            <div className="custom_datepicker_select_item">
                                <select
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <span>월</span>
                            </div>
                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                />
            </div>
        </>
    );
};
export default DatePickers;




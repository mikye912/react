import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { dataSearchSlice } from 'Common/Redux/slice';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MultiCheckModal from './MultiCheckModal/MultiCheckModal'

const SearhForm = ({ children, data }) => {
    return (
        <>
            <div className='extra_search_div'>
                <div className='extra_search_name'>{data.NAME}</div>
                {children}
            </div>
            {data.SORT % 5 === 0 && <br />}
        </>
    )
}

const ExtraForm = ({ i, data, inputRef }) => {
    const dispatch = useDispatch();
    const extraRef = new useRef();
    const [currency, setCurrency] = useState('all');

    const handleChange = (event) => {
        setCurrency(event.target.value);
        dispatch(dataSearchSlice.actions.changeInputs({
            [event.target.name]: event.target.value
        }))
    };

    const [checkedButtons, setCheckedButtons] = useState(['']);
    const changeHandler = (checked, id, name) => {  
        if (id !== '' && checkedButtons.includes('')) {
            /* 전체거래가 선택된 상태에서 전체거래가 아닌 다른 거래건을 체크했을때*/
            if (checked) {
                setCheckedButtons([id]);
                dispatch(dataSearchSlice.actions.changeInputs({
                    [name]: [id]
                }))
            } else {
                setCheckedButtons(checkedButtons.filter(button => button !== id));
                dispatch(dataSearchSlice.actions.changeInputs({
                    [name]: checkedButtons.filter(button => button !== id)
                }))
            }
        } else if (id !== '' && !checkedButtons.includes('')) {
            /* 전체거래가 선택되지 않은 상태에서 전체거래가 아닌 다른 거래건을 체크했을때*/
            if (checked) {
                setCheckedButtons([...checkedButtons, id]);
                dispatch(dataSearchSlice.actions.changeInputs({
                    [name]: [...checkedButtons, id]
                }))
            } else {
                setCheckedButtons(checkedButtons.filter(button => button !== id));
                dispatch(dataSearchSlice.actions.changeInputs({
                    [name]: checkedButtons.filter(button => button !== id)
                }))
            }
        } else if(id === ''){
            /* 전체거래가 선택되지않고 다른거래건이 체크됐을때 전체거래를 선택하면 전체거래건만 선택값으로 남게*/
            if (checked) {
                setCheckedButtons([id]);
            } else {
                setCheckedButtons(checkedButtons.filter(button => button !== id));
            }
        }
    };

    if (data.TYPE === 'AMOUNT') {
        return (
            <SearhForm data={data} index={i}>
                <div className='extra_search_input'>
                    <div className='amount_form'>
                        <input
                            className='amount_text'
                            type="text"
                            name={`S${data.FIELD}`}
                            ref={e => inputRef.current[i] = e}
                        />
                        <em>~</em>
                        <input
                            className='amount_text'
                            type="text"
                            name={`E${data.FIELD}`}
                            ref={e => inputRef.current[i + 1] = e} />
                    </div>
                </div>
            </SearhForm>
        )
    } else if (data.TYPE === 'MULTICHECK') {
        return (
            <SearhForm data={data} index={i}>
                <MultiCheckModal data={data} />
            </SearhForm>
        )
    } else if (data.TYPE === 'CHECK') {
        return (
            <SearhForm data={data} index={i}>
                <div className='extra_search_input' style={{ padding: '8px' }}>
                    {data && data.SUBDATA.map((SUBDATA, index) => {
                        return (
                            <div key={index} style={{ display: 'inline' }}>
                                <label className='check_label' >
                                    <input
                                        type="checkBox"
                                        name={data.FIELD}
                                        id={SUBDATA.NAME}
                                        defaultValue={SUBDATA.VALUE}
                                        onChange={e => {
                                            changeHandler(e.currentTarget.checked, e.currentTarget.defaultValue, e.currentTarget.name);
                                        }}
                                        checked={checkedButtons.includes(SUBDATA.VALUE) ? true : false}
                                    />
                                    {SUBDATA.NAME}
                                </label>
                                {index % 2 !== 0 && <br />}
                            </div>
                        )
                    })}
                </div>
            </SearhForm>
        );
    } else if (data.TYPE === 'SELECT') {
        return (
            <SearhForm data={data} index={i}>
                <div className='extra_search_input' autoComplete="off" style={{ padding: '10px' }}>
                    <TextField
                        className='select_box'
                        select
                        value={currency}
                        onChange={handleChange}
                        name={data.FIELD}
                    >
                        <MenuItem value='all' className='select_item'>
                            :: 전체 ::
                        </MenuItem>
                        {data && data.SUBDATA.map((SUBDATA, index) => {
                            return (
                                <MenuItem key={index} value={SUBDATA.VALUE} className='select_item'>
                                    {SUBDATA.NAME}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </SearhForm>
        )
    } else if (data.TYPE === 'TEXT') {
        return (
            <SearhForm data={data} index={i}>
                <div className='extra_search_input'>
                    <input name={data.FIELD} type="text" ref={e => inputRef.current[i] = e} />
                </div>
            </SearhForm>
        );
    }
}

export default ExtraForm;
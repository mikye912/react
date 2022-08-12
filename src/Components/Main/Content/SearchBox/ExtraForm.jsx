import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { dataSearchSlice } from 'Common/Redux/slice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SearhForm = ({ children, name }) => {
    return (
        <div className='extra_search_div'>
            <div className='extra_search_name'>{name}</div>
            {children}
        </div>
    )
}

const ExtraForm = ({ i, data, inputRef }) => {
    const dispatch = useDispatch();
    const extraRef = new useRef();
    const [currency, setCurrency] = useState('all');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [checkedButtons, setCheckedButtons] = useState([]);
    const changeHandler = (checked, id, name) => {

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
    };

    if (data.TYPE == 'AMOUNT') {
        return (
            <SearhForm name={data.NAME}>
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
    } else if (data.TYPE == 'MULTICHECK') {

    } else if (data.TYPE == 'CHECK') {

        return (
            <SearhForm name={data.NAME}>
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
    } else if (data.TYPE == 'SELECT') {
        return (
            <SearhForm name={data.NAME}>
                <div className='extra_search_input' autoComplete="off" style={{ padding: '10px' }}>
                    <TextField
                        id="outlined-select-currency"
                        className='select_box'
                        select
                        value={currency}
                        onChange={handleChange}
                    >
                        <MenuItem value='all'>
                            :: 전체 ::
                        </MenuItem>
                        {data && data.SUBDATA.map((SUBDATA, index) => {
                            return (
                                <MenuItem key={index} value={SUBDATA.VALUE} ref={e => inputRef.current[i] = e}>
                                    {SUBDATA.NAME}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </SearhForm>
        )
    }
}

export default ExtraForm;
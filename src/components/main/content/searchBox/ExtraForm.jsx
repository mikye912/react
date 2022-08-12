import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { dataSearchSlice } from 'Common/Redux/slice';

const SearhForm = ({ children, name }) => {
    return (
        <div className='extra_search_div'>
            <div className='extra_search_name'>{name}</div>
            <div className='extra_search_input'>
                {children}
            </div>
        </div>
    )
}

const ExtraForm = ({ i, data, inputRef }) => {
    const dispatch = useDispatch();

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


    if (data.TYPE == 'MULTICHECK') {

    } else if (data.TYPE == 'CHECK') {

        return (
            <SearhForm name={data.NAME}>
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
                                    checked={checkedButtons.includes(SUBDATA.VALUE) || SUBDATA.NAME === '전체거래' ? true : false}
                                />
                                {SUBDATA.NAME}
                            </label>
                            {index % 2 !== 0 && <br />}
                        </div>
                    )
                })}

            </SearhForm>
        );
    } else if (data.TYPE == 'SELECT') {

    }
}

export default ExtraForm;
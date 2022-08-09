import { useRef } from 'react';
import DatePickers from '../../datePickers/DatePickers';
import { dataSearchSlice } from '../../../common/redux/slice';
import { useDispatch } from "react-redux";

const SearhForm = ({ children, name }) => {
    return (
        <div className='default_search_div'>
            <div className='default_search_name'>{name}</div>
            <div className='default_search_input'>
                {children}
            </div>
        </div>
    )
}

const DefaultForm = ({ type, name, field }) => {
    const dispatch = useDispatch();
    const inputRef = useRef();

    const serachDispatch = () => {
        dispatch(dataSearchSlice.actions.changeInputs({
            [inputRef.current.name] : inputRef.current.value,
        }));
    }

    if (type == 'DATE') {
        return (
            <SearhForm name={name}>
                <DatePickers />
            </SearhForm>
        )
    } else if (type == 'TEXT') {
        return (
            <SearhForm name={name}>
                <input name={field} type="text" onChange={serachDispatch} ref={e => inputRef.current = e} />
            </SearhForm>
        );
    }
}

export default DefaultForm;
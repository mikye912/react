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

const DefaultForm = ({ index, data, inputRef }) => {
    /*
    const dispatch = useDispatch();
    
    const serachDispatch = () => {
        dispatch(dataSearchSlice.actions.changeInputs({
            [inputRef.current.name] : inputRef.current.value,
        }));
    }
    */
    
// }
    if (data.TYPE == 'DATE') {
        return (
            <SearhForm name={data.NAME}>
                <DatePickers inputRef={inputRef}/>
            </SearhForm>
        )
    } else if (data.TYPE == 'TEXT') {
        return (
            <SearhForm name={data.NAME}>
                <input name={data.FIELD} type="text" ref={e => inputRef.current[index] = e} />
            </SearhForm>
        );
    }
}

export default DefaultForm;
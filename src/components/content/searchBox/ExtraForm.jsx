import { useRef, createElement } from 'react';

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
    const labelRef = useRef([]);
    
    if (data.TYPE == 'MULTICHECK') {

    } else if (data.TYPE == 'CHECK') {
        return (
            <SearhForm name={data.NAME}>
                {data && data.SUBDATA.map((SUBDATA, index) => {
                    return (
                        <label className='check_label' key={index}>
                            <input type="checkBox" name={data.FIELD} id={SUBDATA.NAME} defalutvalue={SUBDATA.VALUE} ref={e => inputRef.current[i] = e} />
                            {SUBDATA.NAME}
                        </label>
                    )
                })}
            </SearhForm>
        );
    } else if (data.TYPE == 'SELECT') {

    }
}

export default ExtraForm;
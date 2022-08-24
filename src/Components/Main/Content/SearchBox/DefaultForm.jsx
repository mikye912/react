import DatePickers from './DatePickers/DatePickers';

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
    if (data.TYPE == 'DATE') {
        return (
            <SearhForm name={data.NAME} >
                <DatePickers index={index} inputRef={inputRef} />
            </SearhForm>
        )
    } else if (data.TYPE == 'TEXT') {
        return (
            <SearhForm name={data.NAME}>
                <input name={data.FIELD} type="text" ref={e => inputRef.current[index+1] = e} />
            </SearhForm>
        );
    }
}

export default DefaultForm;
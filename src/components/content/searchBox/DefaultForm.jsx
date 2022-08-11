import DatePickers from '../../datePickers/DatePickers';

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
            <SearhForm name={data.NAME}>
                <DatePickers />
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
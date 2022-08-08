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

const DefaultForm = ({ type, name }) => {

    if (type == 'date') {
        return (
            <SearhForm name={name}>
                <DatePickers />
            </SearhForm>
        )
    } else if (type == 'text') {
        return (
            <SearhForm name={name}>
                <input type="text" />
            </SearhForm>
        );
    }
}

export default DefaultForm;
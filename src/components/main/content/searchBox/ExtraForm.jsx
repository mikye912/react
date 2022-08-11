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

const ExtraForm = ({ data }) => {
    // const dispatch = useDispatch();
    // const inputRef = useRef();

    // const serachDispatch = () => {
    //     dispatch(dataSearchSlice.actions.changeInputs({
    //         [inputRef.current.name]: inputRef.current.value,
    //     }));
    // }

    if (data.TYPE == 'MULTICHECK') {
        // return (
        // )
    } else if (data.TYPE == 'CHECK') {
        return (
            <SearhForm name={data.NAME}>
                {data && data.SUBDATA.map((SUBDATA) => {
                    return(
                        <label className='check_label'>
                            <input type="checkBox" id={SUBDATA.VALUE} name={data.FIELD} value={SUBDATA.VALUE} />
                            {SUBDATA.NAME}
                        </label>
                    )
                })}
            </SearhForm>
        );
    }
}

export default ExtraForm;
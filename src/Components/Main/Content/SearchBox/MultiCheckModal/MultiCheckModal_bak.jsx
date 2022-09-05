import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import { dataSearchSlice } from 'Common/Redux/slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 580,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign:'center',
    p: '30px',
};

const tid_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 770,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '30px',
};

const MultiCheckModal = ({ data }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const [checkedButtons, setCheckedButtons] = useState([]);
    const changeHandler = (checked, id, name) => {

        if (checked) {
            setCheckedButtons([...checkedButtons, id]);
            // dispatch(dataSearchSlice.actions.changeInputs({
            //     [name]: [...checkedButtons, id]
            // }))
        } else {
            setCheckedButtons(checkedButtons.filter(button => button !== id));
            // dispatch(dataSearchSlice.actions.changeInputs({
            //     [name]: checkedButtons.filter(button => button !== id)
            // }))
        }
    };

    const checkedReset = () => {
        setCheckedButtons([]);
    };

    if (data.FIELD === 'TID') {
        return (
            <div className='extra_search_input'>
                <input type='button' onClick={handleOpen} className='multi_check_button' value={`${data.NAME} 선택`} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={tid_style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Pretendard', textAlign: 'center', marginBottom: '15px' }}>
                            {data.NAME} 선택
                        </Typography>
                        <div id="modal-modal-description">
                            {data.SUBDATA && data.SUBDATA.map((SUBDATA, index) => {
                                return (
                                    <div key={index} className='multi_tid_check_form'>
                                        <div className='multi_check_label_title'>{SUBDATA.TITLE}</div>
                                        {SUBDATA && SUBDATA.TID.map((TIDARRAY, tidIndex) => {
                                            return (
                                                <label className='multi_tid_check_label' key={tidIndex}>
                                                    <input
                                                        type="checkBox"
                                                        name={data.FIELD}
                                                        id={TIDARRAY.NAME}
                                                        defaultValue={TIDARRAY.VALUE}
                                                        onChange={e => {
                                                            changeHandler(e.currentTarget.checked, e.currentTarget.defaultValue, e.currentTarget.name);
                                                        }}
                                                        checked={checkedButtons.includes(TIDARRAY.VALUE) ? true : false}
                                                    />
                                                    {TIDARRAY.NAME}
                                                </label>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                        <div className='multi_check_control_btn'>
                            <input type='button' onClick={handleClose} className="multi_check_submit" value="저장후닫기" />
                            <input type='button' onClick={checkedReset} className="multi_check_reset" value="선택초기화" />
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    } else {
        return (
            <div className='extra_search_input'>
                <input type='button' onClick={handleOpen} className='multi_check_button' value={`${data.NAME} 선택`} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontFamily: 'Pretendard', textAlign: 'center', marginBottom: '15px' }}>
                            {data.NAME} 선택
                        </Typography>
                        <div id="modal-modal-description">
                            {data.SUBDATA && data.SUBDATA.map((SUBDATA, index) => {
                                return (
                                    <div key={index} className='multi_check_form'>
                                        <label className='multi_check_label' >
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
                                    </div>
                                )
                            })}
                        </div>
                        <div className='multi_check_control_btn'>
                            <input type='button' onClick={handleClose} className="multi_check_submit" value="저장후닫기" />
                            <input type='button' onClick={checkedReset} className="multi_check_reset" value="선택초기화" />
                        </div>
                    </Box>

                </Modal>
            </div>
        );
    }
}

export default MultiCheckModal;
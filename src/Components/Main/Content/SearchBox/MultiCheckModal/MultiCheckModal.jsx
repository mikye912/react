import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { FaTimes } from 'react-icons/fa';

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, data, multiCheckRef, i, ...other } = props;
    const [checkedButtons, setCheckedButtons] = useState([]);
    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedButtons([...checkedButtons, id]);
        } else {
            setCheckedButtons(checkedButtons.filter(button => button !== id));
        }
    };

    const checkedReset = () => {
        setCheckedButtons([]);
    };

    useEffect(() => {
        if (!open) {
            setCheckedButtons(valueProp);
        }
    }, [valueProp, open]);

    const handleOk = () => {
        onClose(checkedButtons);
    };

    if (data.FIELD === 'TID') {
        return (
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: 770 } }}
                open={open}
                maxWidth='770px'
                {...other}
            >
                <DialogTitle variant="h6" component="h2">
                    <div className='multi_check_title'>{data.NAME} 선택</div>
                    <div className='multi_check_close'><FaTimes onClick={handleOk} /></div>
                </DialogTitle>
                <DialogContent dividers>
                    <div aria-label="ringtone" name="ringtone">
                        {data && data.SUBDATA.map((SUBDATA, index) => {
                            return (
                                <div key={index} className='multi_tid_check_form'>
                                    <div className='multi_check_label_title'>{SUBDATA.TITLE}</div>
                                    {SUBDATA && SUBDATA.TID.map((TIDARRAY, tidIndex) => {
                                        console.log()
                                        return (
                                            <label className='multi_tid_check_label' key={tidIndex}>
                                                <input
                                                    type="checkBox"
                                                    name={data.FIELD}
                                                    id={TIDARRAY.NAME}
                                                    defaultValue={TIDARRAY.VALUE}
                                                    onChange={e => {
                                                        changeHandler(e.currentTarget.checked, e.currentTarget.defaultValue);
                                                    }}
                                                    checked={checkedButtons.includes(TIDARRAY.VALUE) ? true : false}
                                                    ref={e => multiCheckRef.current[`${i}` + +index + tidIndex] = e}
                                                />
                                                {TIDARRAY.NAME}
                                            </label>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center', padding: '16px' }}>
                    <div className='multi_check_control_btn'>
                        <input type='button' onClick={handleOk} className="multi_check_submit" value="저장후닫기" />
                        <input type='button' onClick={checkedReset} className="multi_check_reset" value="선택초기화" />
                    </div>
                </DialogActions>
            </Dialog>
        );
    } else {
        return (
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: 580, maxHeight: 435 } }}
                open={open}
                {...other}
            >
                <DialogTitle variant="h6" component="h2" style={{ fontFamily: 'Pretendard', textAlign: 'center' }}>{props.data.NAME} 선택 <FaTimes onClose/></DialogTitle> 
                <DialogContent dividers>
                    <div aria-label="ringtone" name="ringtone">
                        {data && data.SUBDATA.map((SUBDATA, index) => {
                            return (
                                <div key={index} className='multi_check_form'>
                                    <label className='multi_check_label' >
                                        <input
                                            type="checkBox"
                                            name={data.FIELD}
                                            id={SUBDATA.NAME}
                                            defaultValue={SUBDATA.VALUE}
                                            onChange={e => {
                                                changeHandler(e.currentTarget.checked, e.currentTarget.defaultValue);
                                            }}
                                            checked={checkedButtons.includes(SUBDATA.VALUE) ? true : false}
                                            ref={e => multiCheckRef.current[`${i}` + index] = e}
                                        />
                                        {SUBDATA.NAME}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center', padding: '16px' }}>
                    <div className='multi_check_control_btn'>
                        <input type='button' onClick={handleOk} className="multi_check_submit" value="저장후닫기" />
                        <input type='button' onClick={checkedReset} className="multi_check_reset" value="선택초기화" />
                    </div>
                </DialogActions>
            </Dialog>
        );
    }
}

const MultiCheckModal = ({ data, i, multiCheckRef }) => {
    const [open, setOpen] = useState(false);
    const [checkedButtons, setCheckedButtons] = useState([]);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);
        if (newValue) {
            setCheckedButtons(newValue);
        }
    };

    return (
        <div className='extra_search_input'>
            <ListItem
                divider
                aria-haspopup="true"
                aria-controls="ringtone-menu"
                aria-label={`${data.NAME} 선택`}
                onClick={handleClickListItem}
                className="multi_check_button"
            >
                <ListItemText primary={`${data.NAME} 선택`} />
            </ListItem>
            <ConfirmationDialogRaw
                id="ringtone-menu"
                data={data}
                keepMounted
                open={open}
                onClose={handleClose}
                value={checkedButtons}
                multiCheckRef={multiCheckRef}
                i={i}
            />
        </div>
    );
}

export default MultiCheckModal;
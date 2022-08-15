import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import common from "Common/common"
import { useDispatch } from 'react-redux';
import { uAuthSlice } from 'Common/Redux/slice';

export default function AuthLogin() {
    const [isCapslock, setIsCapslock] = useState(false);
    const dispatch = useDispatch();

    const inputRef = useRef([]);

    useEffect(() => {
        inputRef.current[0].focus();
    }, []);

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
        e.target.placeholder = ''
    }

    const handleBlur = (e) => {
        if (e.target.name === 'userId') {
            e.target.placeholder = '아이디'
        } else if (e.target.name === 'userPw') {
            e.target.placeholder = '비밀번호'
        }
    }

    const handleKeyDown = (e) => {
        let isCLchk = e.getModifierState('CapsLock');
        setIsCapslock(isCLchk);
    }

    const handleSubmit = () => {
        // for 와 map의 차이
        // -> for는 동기, map은 비동기
        for (let i = 0; i < inputRef.current.length; i++) {
            if (!inputRef.current[i].value) {
                Swal.fire({
                    icon: 'warning',
                    title: `${inputRef.current[i].name === 'userId' ? '아이디' : '비밀번호'}를 입력하여 주십시오.`,
                    width: 460,
                    confirmButtonColor: '#1D79E7'
                })
                return;
            }
        }

        axios.post('/api/Login/AuthLogin', {
            userId: inputRef.current[0].value,
            userPw: common.base64Enc(inputRef.current[1].value)
        })
            .then((res) => {
                let key = Object.keys(res.data)[0];
                if (key === "errMsg") {
                    Swal.fire({
                        icon: 'error',
                        title: res.data[key],
                        width: 460,
                        confirmButtonColor: '#1D79E7'
                    })
                } else {
                    const uAuth = {
                        // uInfo : res.data["uInfo"],
                        uMenu : res.data["uMenu"],
                        uSearch : res.data["uSearch"],
                        token : res.data["token"],
                    }

                    dispatch(uAuthSlice.actions.setAuthStat(uAuth));
                    // 인증번호 생성 후 DB 처리
                }
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: '서버 요청에 실패하였습니다.',
                    text: e.message,
                    width: 460,
                    confirmButtonColor: '#1D79E7'
                })
                return;
            });
    }
    return (
        <div className='index_sign_input' onKeyPress={handleKeyPress}>
            <div className="index_input_id">
                <input
                    type='text'
                    className='input_id'
                    name='userId'
                    ref={e => inputRef.current[0] = e}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder='아이디'
                />
                <img alt={``} />
            </div>
            <div className='index_input_pw'>
                <input
                    type='password'
                    className='input_pw'
                    name='userPw'
                    ref={e => inputRef.current[1] = e}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder='비밀번호'
                />
                <img alt={``} />
            </div>
            {isCapslock ? (
                <span>CapsLock이 켜져 있습니다.</span>
            ) : ""}
            <button
                className='user_btn'
                onClick={handleSubmit}
            >로그인
            </button>
        </div>
    )
}
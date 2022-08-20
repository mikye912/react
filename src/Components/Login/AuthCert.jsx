import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLogin() {
    const uAuth = useSelector((state) => state.uAuth)
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    let navigate = useNavigate();

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
        e.target.placeholder = ''
    }

    const handleSubmit = () => {
        //인증번호 유효성 검증 후 넘어가기
        // sessionStorage.setItem("uInfo", uAuth.uInfo);
        // sessionStorage.setItem("uMenu", uAuth.uMenu);
        // sessionStorage.setItem("uSearch", uAuth.uSearch);
        sessionStorage.setItem("token", uAuth.token);
        
        navigate("/sub_main");
    }
    return (
        <div className='index_sign_input' onKeyPress={handleKeyPress}>
            <div className="index_input_pw">
                <input
                    type='text'
                    className='input_id'
                    name='userId'
                    ref={inputRef}
                    placeholder='인증번호'
                />
                <img alt={``} />
            </div>
            <button
                className='user_btn'
                onClick={handleSubmit}
            >확인
            </button>
        </div>
    )
}
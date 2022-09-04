import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircularIndeterminate from "Components/Main/Content/Progress/CircularIndeterminate";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AuthLogin() {
    const [progress, setProgress] = useState(true);
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
        

        const baseURL = '/';
        const fetchApi = axios.create({
            baseURL,
        })

        fetchApi.interceptors.request.use((config) => {
            setProgress(false);
            return config
        }, (err) => {
            return Promise.reject(err);
        })

        fetchApi.interceptors.response.use((res) => {
            setProgress(true);
            return res;
        }, (err) => {
            return Promise.reject(err);
        })

        fetchApi.get('/api/auth', {
                params: {
                    transNo : inputRef.current.value,
                    userId : uAuth.userId
                }
            })
            .then((res) => {
                let key = Object.keys(res.data)[0];
                if (key === "errMsg") {
                    Swal.fire({
                        icon: 'error',
                        title: res.data[key],
                        width: 560,
                        confirmButtonColor: '#1D79E7'
                    })
                } else {
                    sessionStorage.setItem("token", uAuth.token);
                    navigate("/main");
                }
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: '서버 요청에 실패하였습니다.',
                    text: e.message,
                    width: 560,
                    confirmButtonColor: '#1D79E7'
                })
                return;
            });
    }
    return (
        <div className='index_sign_input' onKeyPress={handleKeyPress}>
            {progress === false ? <CircularIndeterminate /> : null}
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
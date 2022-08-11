import 'css/index.css'
import AuthLogin from 'components/login/AuthLogin';
import AuthCert from 'components/login/AuthCert';
import { useSelector } from 'react-redux';

export default function Login() {
    const uAuth = useSelector((state) => state.uAuth)
    return (
        <div className="index_container">
            <div className='index_img_container'></div>
            <div className='index_sign_container'>
                <div className='index_logo'>
                    <img alt={``} />
                </div>
                <div className='index_signin'>
                    <span>Sign in</span>
                </div>
                {uAuth.uInfo ? <AuthCert/> : <AuthLogin/>}
            </div>
        </div>
    );
}
import 'Css/mobile.css'
import React from 'react';

const Mobile = () => {

    const handleGotoPc = () => {
        sessionStorage.setItem('device', 'PC')
        window.location.href = "/";
    };

    return (
        <div className="mobile_container">
            <div className="mobile_icon_container">
                <img className="mobile_icon" alt="" />
            </div>
            <div className="mobile_title">PC버전으로 접속해주세요</div>
            <div className="description">
                아쉽게도 모바일은 지원하지 않아요😥 <br />
                PC환경에서 이용해주세요!
            </div>
            <button className="gotopc_btn" onClick={handleGotoPc}>
                PC로 보기
            </button>
        </div>
    );
};

export default Mobile;
import 'Css/mobile.css'
import React from 'react';
//import mobilePreparingImg from 'assets/img/img_mobile_preparing.png';

const Mobile = () => {
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(document.location.href);
        alert('링크가 복사되었습니다!');
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
            <button className="gotopc_btn" onClick={handleLinkCopy}>
                PC로 보기
            </button>
        </div>
    );
};

/** styled components */

export default Mobile;
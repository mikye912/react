import { Buffer } from 'buffer';
import Swal from "sweetalert2";

export default {
    base64Enc: (str) => {
        return Buffer.from(str, "utf-8").toString('base64')
    },
    base64Dec: (str) => {
        return Buffer.from(str, "base64").toString('utf-8')
    },
    formatter_number: (data) => {
        const jsType = Object.prototype.toString.call(data).slice(8, -1);
        if (jsType === 'String') {
            return data.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
        } else if (jsType === 'Number') {
            return data.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
        } else {
            return data;
        }
    },
    nowDate: {
        fullDate: (num = 0) => {
            let data = new Date();
            data = data.setDate(new Date().getDate() + (num));

            let day = new Date(data);

            const year = day.getFullYear();
            const month = day.getMonth() + 1;
            const date = day.getDate();

            return `${year}${month >= 10 ? month : '0' + month}${date >= 10 ? date : '0' + date}`;
        },
        year: (num = 0) => {
            return new Date().getFullYear() + (num);
        },
        month: (num = 0) => {
            return new Date().getMonth() + 1 + (num);
        },
        date: (num = 0) => {
            return new Date().getDate() + (num);
        },
        day: (num = 0) => {
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            //const day = new Date().getDay();
            let data = new Date();
            data = data.setDate(new Date().getDate() + (num));

            let day = new Date(data);
            day = day.getDay();

            return week[day];
        },
        hours: (num = 0) => {
            // return new Date().getHours() + (num);
            let data = new Date();
            data = data.setHours(new Date().getHours() + (num));

            let hours = new Date(data);
            hours = hours.getHours();

            return hours;
        },
        minutes: (num = 0) => {
            // return new Date().getMinutes() + (num);
            let data = new Date();
            data = data.setMinutes(new Date().getMinutes() + (num));

            let minutes = new Date(data);
            minutes = minutes.getMinutes();

            return minutes;
        },
        seconds: (num = 0) => {
            // return new Date().getSeconds() + (num);
            let data = new Date();
            data = data.setHours(new Date().getSeconds() + (num));

            let seconds = new Date(data);
            seconds = seconds.getSeconds();

            return seconds;
        }
    },
    apiVerify: (err) => {
        if (Object.keys(err.response.data)[0] === 'jwtErr') {
            Swal.fire({
                icon: 'error',
                title: err.response.data.jwtErr,
                width: 560,
                confirmButtonColor: '#1D79E7'
            }).then(() => {
                sessionStorage.clear();
                return window.location.href = '/';
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '서버에서 오류가 발생하였습니다.',
                confirmButtonColor: '#1D79E7',
                confirmButtonText: '확인'
            })
            console.log(err);
        }
    }
}
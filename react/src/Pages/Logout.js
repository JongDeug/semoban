import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import axios from "axios";

export default function Logout() {

    //로그인 요청
    function requestLogout() {
        axios({
            url: "/auth/logout",
            method: "get",
        })
            .then((res) => {
                sessionStorage.clear();
                return res.data.responseData.redirect;
            })
            .then((res) => {
                window.location = `${res}`;
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.header);
                }
            });
    }
    
    useEffect(()=>{
        requestLogout();
    }, []);

}
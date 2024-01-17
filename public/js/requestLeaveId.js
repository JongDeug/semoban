function requestLeaveId(token, password) {
    return axios({
        url: '/api/member/leaveId', // url로 직접이동하는게 아님
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            password: password,
        }
    });
}

const leaveIdBtn = document.querySelector('#btn');
leaveIdBtn.addEventListener('click', () => {
    const token = sessionStorage.getItem('accessToken');
    const password = document.querySelector('#password').value;

    requestLeaveId(token, password).then((res) => {
        // console.log(res.data.responseData.redirect);
        // console.log(res.data.responseData.message);
        return res.data.responseData.redirect;
    }).then((res) => {
        window.location = `${res}`;
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
})
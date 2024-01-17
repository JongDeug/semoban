function changePwd(token, password_exist, password_change) {
    return axios({
        url: '/api/member/changePwd', // url로 직접이동하는게 아님
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            password_exist: password_exist,
            password_change: password_change 
        }
    });
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    const token = sessionStorage.getItem('accessToken');
    const password_exist = document.querySelector('#password_exist').value;
    const password_change = document.querySelector('#password_change').value;

    changePwd(token, password_exist, password_change).then((res) => {
        // console.log(res.data.responseData.redirect);
        // console.log(res.data.responseData.result);
        return res.data.responseData.redirect;
    }).then((res) => {
        window.location = `${res}`;
        console.log(res);
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
})
function requestLogin(userId, password) {
    return axios({
        url: '/auth/login', // http:localhost:3500/member/login
        method: 'post',
        data: {
            userId: userId,
            password: password
        }
    });
}

const loginBtn = document.querySelector('#btn');
loginBtn.addEventListener('click', () => {
    const userId = document.querySelector('#userId').value;
    const password = document.querySelector('#password').value;

    requestLogin(userId, password).then((res) => {
        // sessionStorage 저장
        const accessToken = res.data.responseData.accessToken;
        sessionStorage.setItem('accessToken', accessToken);

        // console.log(res.data.responseData.redirect);
        // console.log(res.data.responseData.accessToken);
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
});
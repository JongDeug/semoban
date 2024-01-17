function requestFindPwd(userId, email) {
    return axios({
        url: '/api/member/findPwd',
        method: 'post',
        data: {
            userId: userId,
            email: email,
        }
    });
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    const userId = document.querySelector('#userId').value;
    const email = document.querySelector('#email').value;
    requestFindPwd(userId, email).then(res => {
        console.log(res.data.responseData);
    }).catch(console.err);
});


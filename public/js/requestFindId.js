function requestFindId(userName, dateOfBirth, email) {
    return axios({
        url: '/api/member/findId',
        method: 'post',
        data: {
            userName: userName,
            dateOfBirth: dateOfBirth,
            email: email,
        }
    });
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    const userName = document.querySelector('#userName').value;
    const dateOfBirth = document.querySelector('#dateOfBirth').value;
    const email = document.querySelector('#email').value;
    requestFindId(userName, dateOfBirth, email).then(res => {
        console.log(res.data.responseData);
    }).catch(console.err);
});

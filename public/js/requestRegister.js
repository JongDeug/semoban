function requestRegister(userId, password, userName, dateOfBirth, email, interestKeywords) {
    return axios({
        url: '/auth/register',
        method: 'post',
        data: {
            userId: userId,
            password: password,
            userName: userName,
            dateOfBirth: dateOfBirth,
            email: email,
            interestKeywords: interestKeywords
        }
    });
}

const registerBtn = document.querySelector('#btn');

registerBtn.addEventListener('click', () => {
    const userId = document.querySelector('#userId').value;
    const password = document.querySelector('#password').value;
    const userName = document.querySelector('#userName').value;
    const dateOfBirth = document.querySelector('#dateOfBirth').value;
    const email = document.querySelector('#email').value;
    const interestKeywords = document.querySelector('#interestKeywords').value;

    requestRegister(userId, password, userName, dateOfBirth, email, interestKeywords).then((res) => {
        // console.log(res.data.responseData);
        // console.log(res.data.responseData.redirect);
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
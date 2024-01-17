function getInfo(token) {
    return axios({
        url: '/api/member/changeInfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

async function arrangeData() {
    const token = sessionStorage.getItem('accessToken');
    let input_userId = document.querySelector('#userId');
    let input_dateOfBirth = document.querySelector('#dateOfBirth');
    let input_email = document.querySelector('#email');
    let input_interestKeywords = document.querySelector('#interestKeywords');

    await getInfo(token).then((res) => {
        input_userId.value = res.data.responseData.userId;
        input_dateOfBirth.value = res.data.responseData.dateOfBirth;
        input_email.value = res.data.responseData.email;
        input_interestKeywords.value = res.data.responseData.interestKeywords;
    }).catch((err) => {
        if (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
}

arrangeData();
// function requestCheckPwd(token, password) {
//     return axios({
//         url: '/api/member/changeInfo',
//         method: 'put',
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         data: {
//             which: 'checkPwd',
//             password: password
//         }
//     });
// }

// const checkBtn = document.querySelector('#checkBtn');

// checkBtn.addEventListener('click', () => {
//     const token = sessionStorage.getItem('accessToken');
//     const password = document.querySelector('#password').value;

//     requestCheckPwd(token, password).then((res) => {
//         const result = res.data.responseData.result;
//         const redirect = res.data.responseData.redirect;
//         if (result === 1) {
//             const changeInfoDiv = document.querySelector('#changeInfo');
//             const checkPwdDiv = document.querySelector('#checkPwd');

//             changeInfoDiv.style.display = 'block';
//             checkPwdDiv.style.display = 'none';

//             arrangeData();
//         }
//     }).catch((err) => {
//         if (err) {
//             console.log(err);
//         }
//     });
// })

function requestChangeInfo(token, dateOfBirth, email, interestKeywords) {
    return axios({
        url: '/api/member/changeInfo',
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            which: 'changeInfo',
            dateOfBirth: dateOfBirth,
            email: email,
            interestKeywords: interestKeywords
        }
    });
}

const changeBtn = document.querySelector('#changeBtn');

changeBtn.addEventListener('click', () => {
    const token = sessionStorage.getItem('accessToken');
    const dateOfBirth = document.querySelector('#dateOfBirth').value;
    const email = document.querySelector('#email').value;
    const interestKeywords = document.querySelector('#interestKeywords').value;

    requestChangeInfo(token, dateOfBirth, email, interestKeywords).then((res) => {
        return res.data.responseData.redirect;
    }).then((res) => {
        window.location = `${res}`;
    }).catch((err) => {
        if (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    })
});


/**
 * 
 * @param {*} redirect 
 * @param {*} message 
 * @param {*} result 
 * @returns 
 */
const responseDataForm = (redirect, message, result) => {
    
    const responseData = {
        redirect : redirect,
        message : message, 
        result : result,
    };

    return responseData;
}

module.exports = responseDataForm;
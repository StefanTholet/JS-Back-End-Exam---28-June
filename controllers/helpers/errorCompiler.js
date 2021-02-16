module.exports = ((err) => {
    errors = err.errors;
    errorList = [];
    try {
    Object.keys(errors).forEach(error => {
        if (error == 'description' || error == 'imageUrl' || error == 'title' || error == 'username' || error == 'password') {
            errorList.push(errors[error].message)
        }
    });
    return { errorList };
} catch (catchError) {
    return catchError;
}
})
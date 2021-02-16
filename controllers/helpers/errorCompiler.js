module.exports = ((err) => {
    const errors = err.errors || err;
    const errorList = [];
    try {
        if (errors.message?.includes('Passwords') || errors.message?.includes('password')) {
            return [{ message: errors.message }];
        } else {
            Object.keys(errors).forEach(error => {
                if (error == 'description' || error == 'imageUrl' || error == 'title' || error == 'username' || error == 'password') {
                    if (errors[error].message.includes('Path')) {
                        errors[error].message = errors[error].message.replace('Path', '');
                    }
                    errorList.push({ message: errors[error].message })
                }
            });
        }
        return errorList;

    } catch (catchError) {

        return catchError;

    }
})
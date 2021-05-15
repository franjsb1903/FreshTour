export const checkUsername = (username) => {
    const usernameRegex = new RegExp(/^[a-zA-Z0-9_ñÑÀ-ÿ]+$/);
    const valid = username.length <= 50 && usernameRegex.test(username);
    return valid;
}

export const checkName = (name) => {
    const nameRegex = new RegExp(/^[a-z ,.'-ñÑÀ-ÿ]+$/i);
    return nameRegex.test(name);
}

export const checkEmail = (email) => {
    const emailRegex = new RegExp(/^[a-z0-9_.]+@[a-z]+(.com|.es)/i);
    return emailRegex.test(email);
}

export const checkTitle = (title) => {
    return title.length <= 50;
}
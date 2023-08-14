import base from './base.service';

const instance = base.service();
export const login = (username, password) => {
    return instance
        .post('login', {username, password})
        .then((results) => {
            const {access} = results.data;
            sessionStorage.setItem('access', access);
            return results.data;
        })
        .catch((err) => Promise.reject(err.response.status));
}
export const registration = (registrationData) => {
    return instance
        .post('sign-up', registrationData)
        .then((results) => results);
}

export const activateAccount = (activateAccountData) => {
    return instance
        .post('activeAccount', activateAccountData)
        .then((results) => results);
}

export const uploadImage = (imageData) => {
    const file = imageData.get("file");
    return instance
        .post('uploadImage', {file}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((results) => results);
}
export const logout = () => sessionStorage.removeItem('access');
const auth = {
    login,
    registration,
    activateAccount,
    logout,
};
export default auth;

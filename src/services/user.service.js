import base from './base.service';

const instance = base.service(true);
const token = sessionStorage.getItem('access');


export const getUser = (idUser) => {
    return instance
        .get(`users/${idUser}`)
        .then((results) => results.data);
};

export const updateUser = (idUser,dataToUpdate) => {
    return instance
        .put(`users/${idUser}`,dataToUpdate,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};

export const changePassword = (idUser,dataToUpdate) => {
    return instance
        .put(`users/${idUser}/changePassword`,dataToUpdate,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};

export const getAllProductsForBuyer = (page,size) => {
    return instance
        .get(`users/products/purchased`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                size: size,
            },
        })
        .then((results) => results.data);
};

export const getAllProductsForSeller = (page,size,finished) => {
    return instance
        .get(`users/products/sold`, {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                size: size,
                finished: finished,
            },
        })
        .then((results) => results.data);
};

const User = {
    getUser,
    updateUser,
    changePassword,
    getAllProductsForBuyer,
    getAllProductsForSeller
}
export default User;



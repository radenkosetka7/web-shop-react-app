import base from './base.service';

const instance = base.service();
const authInstance = base.service(true);
const token = sessionStorage.getItem('access');


export const getAllProducts = (page,size,title) => {
    return instance
        .get(`products/`, {
            params: {
                page: page,
                size: size,
                title: title
            },
        })
        .then((results) => results.data);
};

export const getProductByid = (idProduct) => {
    return instance
        .get(`products/${idProduct}/`)
        .then((results) => results.data);
};

export const searchProduct = (page,size,searchProduct) => {
    return instance
        .post(`products/searchProducts?page=${page}&size=${size}`,searchProduct)
        .then((results) => results.data);
};

export const addProduct = (productData) => {
    return authInstance
        .post(`products`,productData, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};

export const commentProduct = (idProduct,commentData) => {
    return authInstance
        .post(`products/${idProduct}/comments`,commentData, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};

export const answerComment = (idComment,answerData) => {
    return authInstance
        .post(`products/${idComment}/comment/answer`,answerData)
        .then((results) => results.data);
};

export const purchaseProduct = (idProduct) => {
    return authInstance
        .put(`products/${idProduct}/`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};

export const deleteProduct = (idProduct) => {
    return authInstance
        .delete(`products/${idProduct}/`)
        .then((results) => results.data);
};


const Product = {
    getAllProducts,
    getProductByid,
    searchProduct,
    addProduct,
    commentProduct,
    purchaseProduct,
    answerComment,
    deleteProduct
}

export default Product;
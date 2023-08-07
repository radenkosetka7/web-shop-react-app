import base from './base.service';

const instance = base.service();

export const getAllCategories = () => {
    return instance
        .get('categories/')
        .then((results) => results.data);
};

export const getCategory = (idCategory) => {
    return instance
        .get(`categories/${idCategory}`)
        .then((results) => results.data);
};

export const getAllProductForCategory = (page,idCategory) => {
    return instance
        .get(`categories/${idCategory}/products`, {
            params: {
                page: page.pageNumber,
                size: page.pageSize,
            },
        })
        .then((results) => results.data);
};




const Category = {
    getCategory,
    getAllProductForCategory,
    getAllCategories
}
export default Category;
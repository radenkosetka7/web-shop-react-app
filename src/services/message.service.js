import base from './base.service';

const instance = base.service(true);
const token = sessionStorage.getItem('access');
export const createMessage = (messageData) => {
    return instance
        .post('messages/', messageData, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((results) => results.data);
};


const Message = {
    createMessage
}
export default Message;
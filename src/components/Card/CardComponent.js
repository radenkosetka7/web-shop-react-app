import React from 'react';
import {Button, Card} from 'antd';
import './Card.css';
import {useDispatch, useSelector} from "react-redux";
import userSlice from "../../redux-store/userSlice";
import {Link} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import {deleteProduct} from "../../redux-store/productSlice";

const {Meta} = Card;
const CardComponent = ({product, handleChangeRefreshKey}) => {

    const dispatch=useDispatch();
    const urlParam=`${product.id}`;

    const {user} = useSelector((state)=>state.users);

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        const id = product.id;
        dispatch(deleteProduct({id: id}));
        await new Promise(resolve => setTimeout(resolve, 500));
        handleChangeRefreshKey();
    };

    return (
        <Link to={`/${urlParam}`}>
       <Card
            hoverable
            className='card'
            cover={<img alt="example" className='image' alt="Logo"
                        src={require('../../assets/products/af179ad3-e076-406d-ab4d-2709325e8226_cv.jpg')}/>}
        >
            <Meta className='price' title={product.title} description={`${product.price} BAM`}/>
           <br/>
           {user && product && product.userSeller.id === user.id && <Button type='primary' onClick={handleDeleteClick} style={{backgroundColor:'red'}}><DeleteOutlined /> Delete</Button>}
       </Card>
        </Link>
    );
}
export default CardComponent;
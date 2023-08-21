import React from 'react';
import {Card} from 'antd';
import './Card.css';
import {useDispatch, useSelector} from "react-redux";
import userSlice from "../../redux-store/userSlice";
import {Link} from "react-router-dom";

const {Meta} = Card;
const CardComponent = ({product}) => {

    const dispatch=useDispatch();
    const urlParam=`${product.id}`;


    return (
        <Link to={`/${urlParam}`}>
       <Card
            hoverable
            className='card'
            cover={<img alt="example" className='image' alt="Logo"
                        src={require('../../assets/products/af179ad3-e076-406d-ab4d-2709325e8226_cv.jpg')}/>}
        >
            <Meta className='price' title={product.title} description={`${product.price} BAM`}/>
        </Card>
        </Link>
    );
}
export default CardComponent;
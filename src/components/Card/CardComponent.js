import React from 'react';
import {Card} from 'antd';
import './Card.css';

const {Meta} = Card;
const CardComponent = ({product}) => {


    return (
       <Card
            hoverable
            className='card'
            cover={<img alt="example" className='image' alt="Logo"
                        src={require('../../assets/products/af179ad3-e076-406d-ab4d-2709325e8226_cv.jpg')}/>}
        >
            <Meta className='price' title={product.title} description={`${product.price} BAM`}/>
        </Card>
    );
}
export default CardComponent;
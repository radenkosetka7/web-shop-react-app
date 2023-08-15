import React from 'react';
import { Card } from 'antd';
import './Card.css';
import Logo from '../../assets/web-shop-logo(1).png'
const { Meta } = Card;
const CardComponent = () => (
    <Card
        hoverable
        className='card'
        cover={<img alt="example" className='image' src={Logo} />}
    >
        <Meta className='price' title="Europe Street beat" description="17.00 BAM" />
    </Card>
);
export default CardComponent;
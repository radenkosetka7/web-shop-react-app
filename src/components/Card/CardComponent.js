import React from 'react';
import { Card } from 'antd';
import './Card.css';
const { Meta } = Card;
const CardComponent = () => (
    <Card
        hoverable
        className='card'
        cover={<img alt="example" className='image' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <Meta className='price' title="Europe Street beat" description="17.00 BAM" />
    </Card>
);
export default CardComponent;
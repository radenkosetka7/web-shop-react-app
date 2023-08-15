import React from 'react';
import { Card } from 'antd';
import './Card.css';
const { Meta } = Card;
const CardComponent = () => {

    //poslace se ime slike a podrazumijevana putanja ce biti asssets/procuts+imeSlike
    const image = require('../../assets/snoweror.jpg')

    return(
        <Card
            hoverable
            className='card'
            cover={<img alt="example" className='image' src={image}/>}
        >
            <Meta className='price' title="Europe Street beat" description="17.00 BAM"/>
        </Card>
    );
}
export default CardComponent;
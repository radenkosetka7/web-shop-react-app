import React from "react";
import './PurchaseModal.css';
import {Modal} from "antd";
import {useSelector} from "react-redux";


const PurchaseProduct = ({show, onClose}) => {

    const {selectedProduct} = useSelector((state) => state.products);

    return (
        <Modal maskClosable={false} title={<div style={{textAlign: 'center', fontSize: '20px'}}>Buy product</div>}
               footer={[]} open={show} onCancel={onClose} bodyStyle={{maxHeight: '400px', overflowY: 'auto'}}>
            <br/>
            <div className='container'>

                <div className='left1'>

                    <div className='imageContainer'>
                        <img
                            alt="example"
                            src={require("../../assets/products/" + selectedProduct.images[0].productImage)}
                            className='image'
                        />
                    </div>

                </div>
                <div className='right'>

                    <p><strong>Name: </strong>{selectedProduct.title}</p>
                    <p><strong>Price: </strong>{selectedProduct.price}KM</p>
                    <p><strong>Product condition: </strong> {selectedProduct.productState ? 'Used' : 'New'}</p>
                    <p><strong>izaberi: </strong> {selectedProduct.productState ? 'Used' : 'New'}</p>


                </div>

            </div>
            <div style={{marginTop:'2%', backgroundColor: 'red', height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', flexDirection: 'column'}}>
                <input style={{width: '50%', justifyContent: 'center', margin: '0 auto'}} />
                <button style={{marginRight: '10px', marginLeft: 'auto'}}>Continue</button>
            </div>
        </Modal>
    )
}

export default PurchaseProduct;
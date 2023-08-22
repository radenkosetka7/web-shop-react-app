import React, {useEffect, useState} from 'react';
import {Button, Card, Input, Layout, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {getProduct, purchaseProduct} from "../../redux-store/productSlice";
import './ViewProduct.css'
import PurchaseProduct from "../PurchaseProduct/PurchaseProduct";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
const {Sider, Content} = Layout;

const ViewProduct = () => {

    const [contentHeight, setContentHeight] = useState('calc(100vh - 73px)');
    const dispatch=useDispatch();
    const {selectedProduct} = useSelector((state)=>state.products);
    const {id} = useParams();
    const [buyModal,setBuyModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const {authenticated,user} = useSelector((state)=>state.users);

    const formattedDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });


    const handleBuyModalOpen = () => {
        setBuyModal(true);
    };

    const handleBuyModalClose = () => {
        setBuyModal(false);
    };

    const handleSavePurchase = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };
    const onFinish = () => {
        handleBuyModalClose();
        dispatch(purchaseProduct({id:id}));
        handleSavePurchase();
    }



    useEffect(()=>
    {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
        const value=parseInt(id);
        dispatch(getProduct({value:value}));
    },[refreshKey]);

    return (
        <div style={{height: contentHeight}}>
                <Layout style={{minHeight: '100%'}}>
                <Layout style={{backgroundColor:'#c2bdba'}}>

                    <Sider style={{textAlign: 'center',
                        color: '#dad7d0',
                        backgroundColor: '#5e5858',
                    }} breakpoint="lg"
                           width='25%'
                           collapsedWidth="0">
                        <h2>All comments</h2>
                    </Sider>
                    <Content style={{textAlign:'left',color:'#000',marginLeft:'10%',marginTop:'3%', overflow:'auto'}}>
                        {selectedProduct && (
                            <div>
                                <Card style={{width:'fit-content%',backgroundColor:'transparent', marginRight:'10%'}}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2>{selectedProduct.title}</h2>
                                        {authenticated && selectedProduct.finished !== 0 && selectedProduct.userSeller.id !== user.id && <Button onClick={handleBuyModalOpen} type={"primary"}>Buy product</Button> }
                                    </div>
                                    <p className='pView'>{selectedProduct.price} BAM</p>
                                    <p>{selectedProduct.category.name}</p>
                                    <hr/>
                                    <br/>
                                    <SimpleImageSlider
                                        images={selectedProduct.images.map((image)=>({
                                            url: require('../../assets/products/' + image.productImage)
                                        }))}
                                        showNavs={true}
                                        showBullets
                                        navStyle={{
                                            arrowRight: {
                                                color: 'white', },
                                            arrowLeft: {
                                                color: 'white',
                                            }
                                        }}
                                        width='95%'
                                        height={500}
                                    />
                                </Card>
                                <br/>
                                <Card style={{width:'fit-content%',backgroundColor:'transparent', marginRight:'10%'}}>
                                    <h2>Details</h2>
                                    <hr/>
                                    <br/>
                                    <Input value={`Location: ${selectedProduct.city}`}
                                           readOnly style={{width:'fit-content',marginRight:'10px',marginBottom:'10px'}} />
                                    <Input value={`Condition: ${selectedProduct.productStatus === false ? 'New' : 'Used' }`}
                                           readOnly style={{width:'fit-content',marginRight:'10px',marginBottom:'10px'}} />
                                    <Input value={`Contact: ${selectedProduct.contact}`}
                                           readOnly style={{width:'fit-content',marginRight:'10px',marginBottom:'10px'}} />
                                    <Input value={`Release date : ${formattedDate(selectedProduct.creationDate)}}`}
                                           readOnly style={{width:'250px',marginRight:'10px',marginBottom:'10px'}} />
                                    {selectedProduct.attributeValues.map((attribute, index) => (
                                        <Input
                                            key={index}
                                            value={`${attribute.attribute.name}: ${attribute.value}`}
                                            readOnly
                                            style={{ width: 'fit-content', marginRight: '10px', marginBottom: '10px' }}
                                        />
                                    ))}
                                    <br/>
                                    <br/>
                                    <h2>Description</h2>
                                    <hr/>
                                    <br/>
                                    <p>{selectedProduct.description}</p>
                                </Card>
                                <br/>
                                <br/>
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
            {buyModal && <PurchaseProduct show={buyModal} onClose={handleBuyModalClose} onFinish={onFinish}/>}
        </div>
    )

}

export default ViewProduct;
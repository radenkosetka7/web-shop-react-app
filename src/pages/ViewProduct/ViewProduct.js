import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Card, Form, Input, Layout, List} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import {commentProduct, getProduct, purchaseProduct} from "../../redux-store/productSlice";
import './ViewProduct.css'
import PurchaseProduct from "../PurchaseProduct/PurchaseProduct";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
const {Sider, Content} = Layout;
const { TextArea } = Input;


const ViewProduct = () => {

    const [contentHeight, setContentHeight] = useState('calc(100vh - 73px)');
    const dispatch=useDispatch();
    const [question,setQuestion]=useState('');
    const {selectedProduct} = useSelector((state)=>state.products);
    const {id} = useParams();
    const [buyModal,setBuyModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const {authenticated,user} = useSelector((state)=>state.users);
    const [showInsertCommentar, setShowInsertCommentar] = useState(false);
    const formRef = useRef(null);
    const formRefReply = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
    const handleClickReply = (e) => {
        e.stopPropagation();
    };

    const handleSavePurchase = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };
    const onFinish = () => {
        handleBuyModalClose();
        dispatch(purchaseProduct({id:id}));
        handleSavePurchase();
    }
    const handleFormReply = async (values, idKomentara) => {
        // console.log("handle form reply " + JSON.stringify(values));
        //
        // try {
        //     console.log("values " + JSON.stringify(values));
        //
        //     const answerData = {
        //         odgovor: values.replyComm,
        //     };
        //     console.log("questionData " + JSON.stringify(answerData) + " id " + idKomentara);
        //     const response = await dispatch(sendAnswer({id: idKomentara, answerData: answerData}));
        //     console.log("response " + JSON.stringify(response));
        // } catch (error) {
        //     setShowErrorMessage(true);
        //     setErrorMessage("Reply on comment failed.");
        //     setTimeout(() => {
        //         setShowErrorMessage(false);
        //         setErrorMessage("");
        //         setIsDisabled(false);
        //
        //     }, 1500);
        //     console.log("error" + error);
        // } finally {
        //     setRefreshKey((prevKey) => prevKey + 1);
        // }
    }

    const askQuestion = async () => {

        console.log("pitanje je staa " + question);
        if (question !== '') {
            const commentObject = {
                question: question
            };
            setIsDisabled(true);
            dispatch(commentProduct({id: id, value: commentObject}));
            setQuestion("");
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsDisabled(false);
            handleSavePurchase();

        }
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
                        <br/>
                        {selectedProduct && selectedProduct.comments.length === 0 && <h3>No comments currently available</h3>}

                        {selectedProduct && selectedProduct.comments.length > 0 && (
                        <div>
                            <List>
                                {selectedProduct.comments.map((comment,index) =>
                                    (
                                        <div>
                                        <List.Item key={index}>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    src={comment.user.avatar !== null ? require("../../assets/users/" + user.avatar) : require("../../assets/user_318-159711.avif")}
                                                    alt="Image"/>}
                                                title={<p
                                                    strong>{comment.user.username}</p>}
                                                description={<div style={{ color: 'white' }}>{comment.question}</div>}
                                            />
                                        </List.Item>
                                            {comment.answer !== null && (
                                                <div>
                                                    <p style={{color:'white'}} className='replayMessage'>
                                                        <strong style={{ color: 'whitesmoke' }}>Answer: </strong> {comment.answer}
                                                    </p>
                                                </div>
                                            )}
                                            {user && comment.answer === null && selectedProduct.userSeller.id === user.id &&
                                                (<div className='buttonStyle'>
                                                        <TextArea maxLength={255} style={{width:'98%'}}  placeholder="Insert answer here..."></TextArea>
                                                        <br/>
                                                        <br/>
                                                        <Button>Reply</Button>
                                                    </div>
                                                )
                                            }
                                            <hr/>
                                        </div>
                                    ))}
                            </List>
                            <hr style={{borderBottom:"2px solid white"}}/>
                        </div>)}
                        <br/>
                        {authenticated && selectedProduct && user.id !== selectedProduct.userSeller.id &&
                            (
                                <div>
                                <h1>Ask question</h1>
                                    <br/>
                                    <textarea style={{width:'80%'}} rows={6} cols={30} name='question' maxLength={255}
                                              value={question}
                                              onChange={(e) => setQuestion(e.target.value)} placeholder="Insert question" />
                                    <br/>
                                    <br/>
                                <Button disabled={isDisabled} style={{width:'fit-content'}} onClick={askQuestion} type='primary'>Add comment</Button>
                                </div>
                        )}
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
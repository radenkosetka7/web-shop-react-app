import React, {useEffect, useState} from 'react';
import './Profile.css'
import {useDispatch, useSelector} from "react-redux";
import {FaBox, FaEdit, FaMoneyCheck, FaShoppingCart} from "react-icons/fa";
import {Button, Layout, Pagination} from "antd";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import {getAllProductsForSeller,getAllProductsForBuyer} from "../../redux-store/productSlice";
import CardComponent from "../../components/Card/CardComponent";

const {Footer, Sider, Content} = Layout;

const Profile = () => {

    const [profileModal, setProfileModal] = useState(false);
    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [page, setPage] = useState(current - 1);
    const {user} = useSelector((state) => state.users);
    const [passwordModal, setPasswordModal] = useState(false);
    const dispatch = useDispatch();
    const [refreshKey, setRefreshKey] = useState(0);
    const [contentHeight, setContentHeight] = useState('calc(100vh - 73px)');
    const [activeProducts, setActiveProducts] = useState(false);
    const [soldProducts, setSoldProducts] = useState(false);
    const [purchasedProducts, setPurchasedProducts] = useState(false);

    const {products} = useSelector((state) => state.products);


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null) {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
    }, [refreshKey]);

    const onShowSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };
    const handlePaginationChange = (newPage) => {
        setCurrent(newPage);
        setPage(newPage - 1);
    };
    const handleEditProfileOpen = () => {
        setProfileModal(true);

    };

    const handleActiveProductsOpen = () => {
        if(current>1)
        {
            setCurrent(1);
            setPage(0);
        }
        setActiveProducts(true);
        setSoldProducts(false);
        setPurchasedProducts(false);
    };

    const handleSoldProductsOpen = () => {
        if(current>1)
        {
            setCurrent(1);
            setPage(0);
        }
        setSoldProducts(true);
        setActiveProducts(false);
        setPurchasedProducts(false);
    };

    const handlePurchasedProductsOpen = () => {
        if(current>1)
        {
            setCurrent(1);
            setPage(0);
        }
        setPurchasedProducts(true);
        setActiveProducts(false);
        setSoldProducts(false);
    };
    const handleEditProfileClose = () => {
        setProfileModal(false);
        handleSaveUpdate();

    };

    const handleSaveUpdate = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleChangePassowrdOpen = () => {
        setPasswordModal(true);

    };
    const handleChangePassowrdClose = () => {
        setPasswordModal(false);

    };

    useEffect(()=>
    {
       if(activeProducts)
       {
           dispatch(getAllProductsForSeller({page:page,size:size,finished:0}));

       }
       else if(soldProducts)
       {
           dispatch(getAllProductsForSeller({page:page,size:size,finished:1}));
       }
       else if(purchasedProducts)
       {
           dispatch(getAllProductsForBuyer({page:page,size:size}))
       }
    },[activeProducts,soldProducts,purchasedProducts,page,size]);


    return (<div style={{height: contentHeight}}>
        <Layout style={{minHeight: '100%'}}>
            <Sider
                breakpoint="lg"
                style={{backgroundColor: "#c5c5c5"}}
                collapsedWidth="0">
                <div className='left'>
                    {user ? (
                        <div className='leftSide'>
                            <div className='userImageContainer'>
                                <img className='userImage'
                                     src={user.avatar !== null ? require("../../assets/users/" + user.avatar) : require("../../assets/user_318-159711.avif")}
                                     alt="User"/>
                            </div>
                            <p className='name'>{user.username}</p>
                            <Button type="primary" className='editButton' onClick={handleEditProfileOpen}>
                                <FaEdit style={{marginRight: '5px'}}/>
                                Edit Profile
                            </Button>
                        </div>


                    ) : null}
                    <div>
                        <br/>
                        <Button type="primary" onClick={handleChangePassowrdOpen} className='editButton'>
                            <FaEdit style={{marginRight: '5px'}}/> Change password
                        </Button>
                        <br/>
                        <Button type="primary" disabled={activeProducts} onClick={handleActiveProductsOpen} className='editButton'>
                            <FaBox style={{marginRight: '5px'}}/>
                            Active products
                        </Button>
                        <br/>
                        <Button type="primary" onClick={handleSoldProductsOpen} disabled={soldProducts} className='editButton'>
                            <FaMoneyCheck style={{marginRight: '5px'}}/>
                            Sold products
                        </Button>
                        <br/>
                        <Button type="primary" onClick={handlePurchasedProductsOpen} disabled={purchasedProducts} className='editButton'>
                            <FaShoppingCart style={{marginRight: '5px'}}/>
                            My purchase
                        </Button>
                    </div>
                </div>
            </Sider>
            {(activeProducts || soldProducts || purchasedProducts) && (
                <Layout>
                    <Content className='contentStyle'>
                        <div className='contentDiv'>
                            {products && products.length !== 0 ? (
                                    products.content.map(product => (
                                        <div className='productCard'>
                                        <CardComponent key={product.id} product={product}/>
                                        </div>
                                    ))
                                ) :
                                (
                                    <p style={{color: "black", fontWeight: "bold", fontSize: "20px"}}>Loading...</p>
                                )}
                        </div>
                    </Content>
                    <Footer style={{backgroundColor: "#1d8f8a", textAlign: 'center', color: 'fff'}}>
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            onChange={handlePaginationChange}
                            current={current}
                            total={products.totalElements}
                        />
                    </Footer>
                </Layout>)}
        </Layout>
        {profileModal && <EditProfile show={profileModal} onClose={handleEditProfileClose}/>}
        {passwordModal && <ChangePassword show={passwordModal} onClose={handleChangePassowrdClose}/>}

    </div>);
};

export default Profile;
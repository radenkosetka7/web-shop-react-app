import React, {useEffect, useState} from 'react';
import './Profile.css'
import {useDispatch, useSelector} from "react-redux";
import {FaBox, FaEdit, FaShoppingCart,FaMoneyCheck} from "react-icons/fa";
import {Button, Layout, Pagination} from "antd";
import {getAllProductsForBuyer, getAllProductsForSeller} from '../../redux-store/productSlice';
import {useNavigate} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const Profile = () => {

    const [profileModal, setProfileModal] = useState(false);
    const {user} = useSelector((state)=>state.users);
    const [passwordModal, setPasswordModal] = useState(false);
    const dispatch=useDispatch();
    const [refreshKey, setRefreshKey] = useState(0);


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null)
        {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
    }, [refreshKey]);



    useEffect(() => {
        const resizeHandler = () => {
            const className = 'container';
            const container = document.querySelector(`.${className}`);
            const windowHeight = window.innerHeight;
            const headerElement = document.querySelector('.Header_nav__73kXe');
            /* console.log(headerElement);

             console.log("windowHeight " + windowHeight);*/
            if (headerElement) {
                const headerHeight = headerElement.offsetHeight;
                container.style.minHeight = `${windowHeight - headerHeight}px`;

            }
        };
        resizeHandler(); // Postavi visinu kontejnera na početku
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);
    const handleEditProfileOpen = () => {
        setProfileModal(true);

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


    return (<div className='container'>
        <div className='left'>
            {user ? (
                <div className='leftSide'>
                    <div className='userImageContainer'>
                        <img className='userImage' src={require("../../assets/users/" + user.avatar)} alt="User"/>
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
                    <FaEdit  style={{marginRight: '5px'}}/>  Change password
                </Button>
                <br/>
                <Button type="primary" className='editButton'>
                    <FaBox style={{marginRight: '5px'}}/>
                    Active products
                </Button>
                <br/>
                <Button type="primary" className='editButton'>
                    <FaMoneyCheck style={{marginRight: '5px'}}/>
                    Sold products
                </Button>
                <br/>
                <Button type="primary" className='editButton'>
                    <FaShoppingCart style={{marginRight: '5px'}}/>
                    My purchase
                </Button>
            </div>

        </div>
        {profileModal && <EditProfile show={profileModal} onClose={handleEditProfileClose}/>}
        {passwordModal && <ChangePassword show={passwordModal} onClose={handleChangePassowrdClose}/>}

    </div>);
};

export default Profile;
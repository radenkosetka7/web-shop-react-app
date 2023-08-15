import React from 'react';
import './DropDownMenu.css';
import {LogoutOutlined,UserOutlined, QuestionOutlined  } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Logo from "../../assets/web-shop-logo(1).png";
import {PlusSquareOutlined} from "@ant-design/icons";
import {logout} from "../../redux-store/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const items = [
    {
        key: '1',
        label: 'My profile',
        icon: <UserOutlined/>
    },
    {
        key: '2',
        label: 'New offer',
        icon: <PlusSquareOutlined />
    },
    {
        key: '3',
        label: 'Support',
        icon: <QuestionOutlined/>
    },
    {
        key: '4',
        label: 'Logout',
        icon: <LogoutOutlined/>
    },
];

const DropDownMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = ({ key }) => {
        if (key === '4') {
            handleLogout();
        } else {
        }
    };


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <Dropdown
            menu={{
                items,
                onClick
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <div className='logo-map'>
                    <div className='round-image-container'>
                        <img className='confLogo round-image' src={Logo} alt="Logo"/>
                    </div>
                </div>
            </a>
        </Dropdown>
    );
}
export default DropDownMenu;
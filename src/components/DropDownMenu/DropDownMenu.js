import React, {useState} from 'react';
import './DropDownMenu.css';
import {LogoutOutlined, UserOutlined, QuestionOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';
import Logo from "../../assets/web-shop-logo(1).png";
import {PlusSquareOutlined} from "@ant-design/icons";
import {logout} from "../../redux-store/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import CustomerSupportModal from "../../pages/CustomerSupport/CustomerSupportModal";
import AddProduct from "../../pages/AddProduct/AddProduct";

const items = [
    {
        key: '1',
        label: 'My profile',
        icon: <UserOutlined/>
    },
    {
        key: '2',
        label: 'New offer',
        icon: <PlusSquareOutlined/>
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

    const [supportModal, setSupportModal] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false);
    const onClick = ({key}) => {
        if (key === '4') {
            handleLogout();
        } else if (key === '3') {
            setSupportModal(true);
        }
        else if (key === '2')
        {
            setAddProductModal(true);
        }
    };

    const handleCloseSupportModal = () => {
        setSupportModal(false);
    };

    const handleCloseAddProductModal = () => {
        setAddProductModal(false);
    };



    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <div>
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
            { supportModal && <CustomerSupportModal show={supportModal} onClose={handleCloseSupportModal}/> }
            { addProductModal && <AddProduct show={addProductModal} onClose={handleCloseAddProductModal}/> }
        </div>

    );
}
export default DropDownMenu;
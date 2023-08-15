import './Navbar.css';
import Logo from '../assets/web-shop-logo(1).png';

import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import SearchComponent from "./Search/Search";
import DropDownMenu from "./DropDownMenu/DropDownMenu";

export default function Navbar() {
    const dispatch = useDispatch();
    const {authenticated} = useSelector((state) => state.users);


    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    return (
        <div className='navbarMenu'>
            <div className='logo-map'>
                <Link to="/">
                <img className='confLogo' src={Logo} alt="Logo"/>
                </Link>
            </div>
            <div className='twoItems'>
                {!authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'login' ? 'active' : ''}`}
                        to="/login"
                        onClick={() => handleLinkClick('login')}
                        style={{color: "white", fontWeight: "bold"}}
                    >
                        Login
                    </Link>
                )}
                {authenticated && <DropDownMenu/>}
            </div>

        </div>
    )
}

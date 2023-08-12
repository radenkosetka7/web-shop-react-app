import './Navbar.css';
import Logo from '../assets/web-shop-logo(1).png';

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import SearchComponent from "./Search/Search";

export default function Navbar() {
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.users);


    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    return (
        <div className='navbarMenu'>
            <div className='logo-map'>
                <img className='confLogo' src={Logo} alt="Logo" />
            </div>
            <div className='twoItems'>
                {!authenticated && (
                    <Link
                        className={`home underline ${activeLink === 'admin' ? 'active' : ''}`}
                        to="/login"
                        onClick={() => handleLinkClick('login')}
                        style={{ color: "white", fontWeight:"bold" }}
                    >
                        Login
                    </Link>
                )}
            </div>

        </div>
    )
}

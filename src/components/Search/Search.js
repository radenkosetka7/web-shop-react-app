import React from 'react';
import { Input, Space } from 'antd';
import {useState} from "react";
import './Search.css'

const { Search } = Input;


const SearchComponent = () => {
    return (
        <div className='navbar'>
        <div className='componentDiv'>
            <div className='componentDiv'>
                <Space direction="vertical" className='componentSpace' >
                    <Search
                        placeholder="Search by product name..."
                    />
                </Space>
            </div>
        </div>
        </div>
    );
};

export default SearchComponent;
import React, {useEffect, useState} from 'react';
import {Layout, Pagination, Select, Input, InputNumber, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchComponent from "../../components/Search/Search";
import CardComponent from "../../components/Card/CardComponent";
import CategoryList from "../../components/CategoryList/CategoryList";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
import {useDispatch} from "react-redux";
const { Footer, Sider, Content } = Layout;
const contentStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#f3f1f1',
};
const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#c5c5c5',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor:'#5c8d89',
};
const Home = () => {

    const [contentHeight, setContentHeight] = useState('calc(100vh - 125px)');
    const [current, setCurrent] = useState(1);

    const onChange = (page) => {
        setCurrent(page);
    };
    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const dispatch = useDispatch();


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null)
        {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
    }, []);

    return (<div style={{height: contentHeight}}>
        <SearchComponent/>
        <Layout style={{minHeight: '100%'}}>
            <Sider style={siderStyle}
                   breakpoint="lg"
                   collapsedWidth="0">
                <h2 style={{color:'black'}}>Filter</h2>
                <CategoryList/>
                <hr/>
                <br/>
                <div style={{textAlign:'left', marginLeft:'3%'}}>
                    <Select
                        style={{backgroundColor:'#c5c5c5'}}
                        placeholder="Select a status"
                        onChange={onChangeValue}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: '0',
                                label: 'New',
                            },
                            {
                                value: '1',
                                label: 'Used',
                            },
                        ]}/>
                </div>
                <br/>
                <div style={{textAlign:'left', marginLeft:'3%'}}>
                    <label style={{color:'black',fontSize:'16px'}}>Location</label>
                    <Input/>
                </div>
                <br/>
                <div style={{textAlign:'left', marginLeft:'3%'}}>
                    <label style={{color:'black',fontSize:'16px'}}>Price</label>
                    <br/>
                    <InputNumber min={0} style={{width:'50%'}} placeholder="Price from"/>
                    <InputNumber style={{width:'50%'}}  placeholder="Price to"/>
                </div>
                <br/>
                <br/>
                <Button type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>
            </Sider>
            <Layout>
                <Content style={contentStyle}>
                    <div style={{display:'flex',flexWrap: 'wrap'}}>
                    <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                        <CardComponent/>
                    </div>
                </Content>
                <Footer style={footerStyle}>
                    <Pagination current={current} onChange={onChange} total={50}/>
                </Footer>
            </Layout>
        </Layout>
    </div>)
};
export default Home;
import React, {useEffect, useState} from 'react';
import {Layout, Pagination, Select, Input, InputNumber, Button} from 'antd';
import './Home.css';
import { SearchOutlined } from '@ant-design/icons';
import SearchComponent from "../../components/Search/Search";
import CardComponent from "../../components/Card/CardComponent";
import CategoryList from "../../components/CategoryList/CategoryList";
import jwtDecode from "jwt-decode";
import {getUser} from "../../redux-store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../redux-store/productSlice";
import {getCategories, getCategory, removeCategory} from "../../redux-store/categorySlice";
const { Footer, Sider, Content } = Layout;
const Home = () => {

    const [contentHeight, setContentHeight] = useState('calc(100vh - 125px)');
    const [current, setCurrent] = useState(1);
    const [title,setTitle] = useState("");
    const {products} = useSelector((state)=>state.products);
    const [size,setSize]=useState(10);
    const [page,setPage]=useState(current-1);
    const {categories,selectedCategory} = useSelector((state)=>state.categories);
    const [tempVariable,setTempVariable]=useState(0);

    const [selectedCategoryTemp, setSelectedCategoryTemp] = useState(null);
    const onChange = (page) => {
        setCurrent(page);
    };
    const onChangeValue = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        setTitle(value);
    };
    const dispatch = useDispatch();

    const handleCategorySelect = (selectedKeys) => {
        setSelectedCategoryTemp(selectedKeys[0]);
    };

    const onShowSizeChange = (current, pageSize) => {
        setSize(pageSize);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token !== null)
        {
            const decodedToken = jwtDecode(token);
            const id = parseInt(decodedToken.jti);
            dispatch(getUser({id: id}));

        }
        dispatch(getCategories({}));
    }, []);
    const handlePaginationChange = (newPage) => {
        setCurrent(newPage);
        setPage(newPage-1);
    };

    useEffect(()=>{
        if(typeof selectedCategoryTemp === 'string' )
        {
            setTempVariable(1);
            const parsedNumber = parseInt(selectedCategoryTemp);
            dispatch(getCategory({value:parsedNumber}));
        }
        else if(tempVariable !==0)
        {
            dispatch(removeCategory());
        }

    },[selectedCategoryTemp])

    useEffect(()=>
    {
        dispatch(getAllProducts({page,size,title}));
        console.log("sta mi je current page " + page);
        console.log("sta mi je sizeee title " + size);

    },[page,size,title]);

    return (<div style={{height: contentHeight}}>
        <SearchComponent onSearch={onSearch}/>
        <Layout style={{minHeight: '100%'}}>
            <Sider className='siderStyle'
                   breakpoint="lg"
                   style={{backgroundColor:"#c5c5c5"}}
                   collapsedWidth="0">
                <h2 style={{color:'black'}}>Filter</h2>
                <CategoryList categories={categories}  onSelect={handleCategorySelect} setSelectedCategoryTemp={setSelectedCategoryTemp}/>
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
                {selectedCategoryTemp && (
                    <div> <h3 style={{color:'black'}}>Specific attributes</h3> <hr/>
                        {selectedCategory != null && selectedCategory.attributes.map((attribute) => (
                            <div key={attribute.id} style={{textAlign:'left', marginLeft:'3%'}}>
                                <label style={{ color: 'black', fontSize: '16px' }}>{attribute.name}</label>
                                <br/>
                                {attribute.type === 'STRING' && <Input />}
                                {attribute.type === 'NUMBER' || attribute.type === 'DOUBLE' && <InputNumber />}
                            </div>
                        ))}

                    </div>)
                }
                <br/>
                <br/>
                <Button type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>
            </Sider>
            <Layout>
                <Content className='contentStyle'>
                    <div style={{display:'flex',flexWrap: 'wrap'}}>
                        {products && products.length !==0 ? (
                            products.content.map(product=> (
                                <CardComponent key={product.id} product={product}/>
                            ))
                        ):
                            (
                                <p>No products found</p>
                            )}
                    </div>
                </Content>
                <Footer style={{backgroundColor:"#5c8d89"}} className='footerStyle'>
                    {products && products.totalElements && (
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            onChange={handlePaginationChange}
                            defaultCurrent={current}
                            total={products.totalElements}
                        />
                    )}
                </Footer>
            </Layout>
        </Layout>
    </div>)
};
export default Home;
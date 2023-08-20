import React, {useState} from 'react';
import {Layout, Space} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#3ba0e9',
};

const ViewProduct = () => {

    const [contentHeight, setContentHeight] = useState('calc(100vh - 73px)');
    return (
        <div style={{height: contentHeight}}>
            <Layout style={{minHeight: '100%'}}>
                <Layout style={{backgroundColor:'#ABC2E8'}}>
                    <Content style={{textAlign:'left',color:'#000',marginLeft:'15%'}}>Content</Content>
                    <Sider style={{textAlign: 'center',
                        color: 'black',
                        backgroundColor: '#FFFDDE',
                    }} breakpoint="lg"
                           width='25%'
                           collapsedWidth="0">
                        <h2>All comments</h2>
                    </Sider>
                </Layout>
            </Layout>
        </div>
    )

}

export default ViewProduct;
import {Button, Modal, Input, Form, Select, Steps, InputNumber} from 'antd';
import {useDispatch} from "react-redux";
import {createMessage} from "../../redux-store/messageSlice";
import React, {useState} from "react";
import GeneralForm from "../Forms/GeneralForm";
import ImagesForm from "../Forms/ImagesForm";
import SelectCategory from "../Forms/SelectCategory";
import AttributeForm from "../Forms/AttributeForm";
const { TextArea } = Input;
const { Option } = Select;
const AddProduct = ({show,onClose}) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const [isDisabled, setIsDisabled] = useState(false);
    const [statusCode, setStatusCode] = useState(null);

    const[currentPage,setCurrentPage] = useState(0);
    const[generalDetails,setGeneralDetails]=useState(null);
    const onFinishedGeneral=(values) => {
        setGeneralDetails(values);
        setCurrentPage(1);
    }

    const handleFormSubmit = (values) => {
        setIsDisabled(true)
        const messageRequest = {
            question: values.message,
        };
       // dispatch(createMessage({value:messageRequest}));
        setStatusCode("Message sent successfully.");
        setTimeout(() => {
            setIsDisabled(false);
            onClose();
        }, 1000);
    };

    const[imageDetails,setImageDetails]=useState(null);
    const[categoryDetails,setCategoryDetails]=useState(null);
    const [attributeDetails,setAttributeDetails]=useState(null);

    const onFinishedImage=(values) => {
        setImageDetails(values);
        setCurrentPage(2);
    }
    const onFinishedCatergory=(values) => {
        setCategoryDetails(values);
        setCurrentPage(3);
    }
    const onFinishedAttribute=(values) => {
        setAttributeDetails(values);
        console.log("jesam li ovdje sada ");
        console.log("general " + JSON.stringify(generalDetails));
        console.log("images " + JSON.stringify(imageDetails));
        console.log("category " + JSON.stringify(categoryDetails));
        console.log("attributes " + JSON.stringify(attributeDetails));

    }
    const isStepDisabled = (number) => {
        if(number === 0)
        {
            return false;
        }
        if(number === 1)
        {
            return generalDetails === null;
        }
        if(number === 2)
        {
            return generalDetails === null || imageDetails === null
        }
        if(number === 3)
        {
            return generalDetails === null || imageDetails === null || categoryDetails === null
        }
    }
    const forms= [
        <GeneralForm onFinish={onFinishedGeneral} initialValues={generalDetails}/>,
        <ImagesForm onFinish={onFinishedImage}/>,
        <SelectCategory onFinish={onFinishedCatergory} initialValues={categoryDetails}/>,
        <AttributeForm onFinish={onFinishedAttribute} categoryId={categoryDetails!==null ? categoryDetails.category:0} initialValues={attributeDetails}/>
    ]

    return (
        <>
            <Modal width="50%"  maskClosable={false} title={<div style={{ textAlign: 'center', fontSize: '20px' }}>Add new product</div>} footer={[
            ]} open={show} onCancel={onClose}  bodyStyle={{ maxHeight: '410px', overflowY: 'auto', width:"100%"  }}>
                <Steps onChange={setCurrentPage} current={currentPage}>
                    <Steps.Step disabled={isStepDisabled(0)} title='General' ></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(1)} title='Images'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(2)} title='Category'></Steps.Step>
                    <Steps.Step disabled={isStepDisabled(3)} title='Attributes'></Steps.Step>
                </Steps>
                {forms[currentPage]}
            </Modal>
        </>
    );
};
export default AddProduct;
import React, { useState,useEffect } from "react";
import axios  from 'axios'
import Loader from '../Loader'
import Error from '../Error'
import DetailRow from './DetailRow'
import EditForm from './EditForm'
import { Col,Container ,Button} from 'react-bootstrap';
import Moment from 'moment';

const OrderDetails = (props) => {
    const { id } = props.match.params;
    const [orderDetails, setOrderDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false);

    const showEditForm = () => setShowForm(!showForm);

    const loadData = ()=>{
        axios.get(`/orders/${id}`).then(response => {
            setOrderDetails(response.data)
            setLoading(false)

        }).catch((error) => {
            setError(error)
            console.log(error)
        })
    }

    useEffect(()=>{
        loadData();
    })

    const formatDate = (d)=>{
        return Moment
            .unix(d)
            .format("DD.MM.YYYY")
    }
    const getAddress = (address) =>{
        return (
            <>
            {address.street?address.street:''}<br/>
            {address.city?address.city:''}<br/>
            {address.country?address.country:''}<br/>
            {address.zip?address.zip:''}<br/>
            </>
        )
    }
    const getCustomer = (address) =>{
        return (
            <>
            {address.name?address.name:''}<br/>
            {address.email?address.email:''}<br/>
            {address.phone?address.phone:''}<br/>
            </>
        )
    }
    
    if(loading)
        return <Loader/>
    if(error)
        return <Error/>

    return (
        <Container className="mb-4 mt-4">
            {showForm?<EditForm orderDetails={orderDetails} closeModal={showEditForm} onExit={loadData} />:null}
            {orderDetails ?
                <Col lg={6}>

                    <DetailRow label="Title" value={orderDetails.title}/>
                    <DetailRow label="Booking Date" value={orderDetails.bookingDate?formatDate(orderDetails.bookingDate):'N/A'}/>
                    <DetailRow label="Address" value={orderDetails.address?getAddress(orderDetails.address):''}/>
                    <DetailRow label="Customer" value={orderDetails.customer?getCustomer(orderDetails.customer):''}/>

                    <Button onClick={showEditForm}>
                        Edit
                    </Button>

                </Col>: null}
        </Container>
    )
};

export default OrderDetails;

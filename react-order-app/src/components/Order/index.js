import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios  from 'axios'
import Loader from '../Loader'
import Error from '../Error'
import Table from '../Table'
import { Button,Container } from 'react-bootstrap';

const columns =  [
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Booking Date',
        accessor: 'bookingDate',
    },
    {
        Header: 'Address',
        accessor: 'address',
        Cell: props => <div>{props.cell.value?props.cell.value.street:'' }</div>
    },
    {
        Header: 'Customer',
        accessor: 'customer',
        Cell: props => <div>{props.cell.value?props.cell.value.name:'' }</div>

    },
    {
        Header: 'Action',
        accessor: 'uid',
        Cell: props  =>  <div>{props.cell.value?
            <Link to={`/orders/${props.cell.value}`} {...props}>
                <Button variant="secondary" size="sm" >View </Button>{' '}
            </Link> : ''} </div>



    }
]

const Order = () => {
    let [ordersList, setOrdersList] = useState({})
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState('')

    useEffect(()=>{
        axios.get("/orders").then(response => {
            setOrdersList(response.data)
            setLoading(false)

        }).catch((error) => {
            setError(error)
            console.log(error)
        })
    },[])
    if(loading)
        return <Loader/>
    if(error)
        return <Error/>

    return (
        <Container className="mb-4">
            <h1> Orders </h1>
            <Table columns={columns} data={ordersList}/>
        </Container>
    )
};

export default Order;

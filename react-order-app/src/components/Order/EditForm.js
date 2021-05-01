import React, { useState,useEffect } from "react";
import { Modal,Button,Form } from 'react-bootstrap';
import Moment from 'moment'
import axios  from 'axios'

const formatDate = (time)=>{
    return Moment
        .unix(time)
        .format("YYYY-MM-DD")
}

const dateToSeconds = (date) =>{
    return Moment(date,'YYYY.MM.DD').unix()
}

const EditForm = (props) => {
    const {uid} = props.orderDetails;
    const [title,setTitle] = useState(props.orderDetails.title)
    const [bookingDate,setBookingDate] = useState(formatDate(props.orderDetails.bookingDate))

    useEffect(() => {
        // setTitle(props.orderDetails.title);
    }, [props])

    
    const handleChange = (e)=>{
        setTitle(e.target.value);
    }

    const handleDateChange = (e)=>{
        setBookingDate(e.target.value);
    }

    const handleSubmit = ()=>{
        let bookingDt = dateToSeconds(bookingDate);
        let input = {
            title,
            bookingDate:bookingDt
        }
        axios.put(`/orders/${uid}`, input)
            .then(response => {
                props.closeModal()
                props.onExit()

            });
    }

    return (

        <Modal show={true} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="update-kitchen-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" value={title} placeholder="title"  onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Booking Date</Form.Label>
                    <Form.Control name="bookingDate" type="date" value={bookingDate}  onChange={handleDateChange} />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default EditForm;

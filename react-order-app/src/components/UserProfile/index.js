import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Link} from "react-router-dom";
import {auth} from "../../FireBase/firebase";
import {Button,Container,Row} from 'react-bootstrap'
const UserProfile = () => {
    const user = useContext(UserContext);
    const { name, email,phone} = user;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <div className = "md:pl-4">
                    <h2 className = "text-2xl font-semibold">{name}</h2>
                    <h3 className = "italic">{email}</h3>
                    <h3 className = "italic">{phone}</h3>
                </div>
            </Row>
            <Row className="justify-content-md-center mt-4">
                <Link to="/orders" className="text-blue-500 hover:text-blue-600">
                    <Button className="mr-4" variant="success">Orders</Button>{' '}
                </Link>
                <Button variant="warning" onClick = {() => {auth.signOut()}}>Sign out</Button>
             </Row>
        </Container>
    )
};

export default UserProfile;

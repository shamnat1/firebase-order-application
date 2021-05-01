import React from "react";
import { Col,Row } from 'react-bootstrap';

const DetailRow = (props) => {

    return (
        <>
            {props.value?
            <>
            <Row>
                <Col>{props.label}</Col>
                <Col>{props.value}</Col>
            </Row>
            <hr class="mt-2 mb-3"/>
            </>:null}
        </>
    )
};

export default DetailRow;

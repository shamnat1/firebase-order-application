import React from 'react';
import Alert from 'react-bootstrap/Alert'
const Error = (props)=>{
    const {message} = props
    return (
        <Alert variant="danger"  dismissible>
            <span className="sr-only">Error</span>
            <Alert.Heading> {message}!</Alert.Heading>
        </Alert>
    )
}

export default Error;
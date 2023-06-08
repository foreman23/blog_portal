import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap';
import { Image, Button } from 'semantic-ui-react';

const ViewImage = () => {

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    let { imageId } = useParams();
    imageId = 'plane_gallery/' + imageId;

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate('/gallery');
    }

    return (
        <div>
            <Container>
                <Col>
                    <Button size='medium' style={{ backgroundColor: '#FFFFFF', marginBottom: '20px', marginTop: '10px' }} onClick={goBack}>Back</Button>
                </Col>
                <Row style={{ justifyContent: 'center', display: 'flex', marginTop: '50px' }}>
                    <Image size='massive' src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${imageId}`}></Image>
                </Row>
            </Container>
        </div>
    )
}

export default ViewImage
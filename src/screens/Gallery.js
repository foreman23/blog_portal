import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Button } from 'semantic-ui-react';
import CloudGallery from '../components/CloudGallery';
import { useNavigate } from 'react-router-dom';

const Gallery = () => { 

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate('/');
    }

    return (
        <div>
            <Container>
                    <Row style={{display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start', paddingBottom: '10px', paddingTop: '30px', marginBottom: '20px', marginLeft: '1px'}}>
                        <Col><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                        <Col></Col>
                    </Row>                   
                    </Container>
            <Container>
                <Row>
                    <CloudGallery></CloudGallery>
                </Row>
            </Container>
        </div>
    )
}

export default Gallery
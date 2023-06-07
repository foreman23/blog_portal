import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import CloudGallery from '../components/CloudGallery';

const Gallery = () => { 

    return (
        <div>
            <Container>
                <Row>
                    <CloudGallery></CloudGallery>
                </Row>
            </Container>
        </div>
    )
}

export default Gallery
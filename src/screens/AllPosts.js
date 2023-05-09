import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import { BlogList } from '../components/BlogList';

const AllPosts = () => {

// Init navigate
const navigate = useNavigate();

// Return to last page
const goBack = () => {
    navigate(-1);
}

    return (
        <div>
            <Container fluid>
                <Row style={{display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px'}}>
                    <Col><Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{backgroundColor: '#FFFFFF'}} onClick={goBack}>Back</Button></Col>
                    <Col></Col>
                </Row>
                <div className='allPostsDiv'>
                <Container style={{
                    backgroundColor: '#F5F5F5',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingRight: '60px',
                    paddingLeft: '60px',
                    borderRadius: '5px',
                    }}>
                <BlogList viewall={false}></BlogList>
                </Container>
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
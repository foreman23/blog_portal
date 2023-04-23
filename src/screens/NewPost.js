import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';

const NewPost = () => {

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <Container fluid>
                <Row fluid style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                    <Col><Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewPost
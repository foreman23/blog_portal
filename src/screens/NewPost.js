import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

const NewPost = () => {
    return (
        <div>
            <Container fluid>
                <Row fluid style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                    <Col><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} href='/'>Back</Button></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewPost
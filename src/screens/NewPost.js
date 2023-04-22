import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

const NewPost = () => {
  return (
    <div>
        <Container>
            <Row>
                <Col><Button href='/'>Back</Button></Col>
            </Row>
        </Container>
    </div>
  )
}

export default NewPost
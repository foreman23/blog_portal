import { React, useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Header, Icon, Image } from 'semantic-ui-react';

const Main = () => {

    return (
        <div>
            <Container className='mainContainer'>
                <div className='mainBg'>
                <div style={{ textAlign: 'center' }}>
                    <Header as={'h1'}>Welcome</Header>
                    <Header as={'h3'}>What would you like to edit?</Header>
                </div>
                <Row>
                    <div className='mainButtons'>
                        <Col><Button size='massive' icon href='/blogs'><Icon name='book'></Icon>Blog</Button></Col>
                        <Col><Button size='massive' icon href='/gallery'><Icon name='camera retro'></Icon>Gallery</Button></Col>
                    </div>
                </Row>
                </div>
            </Container>
        </div>
    )
}

export default Main
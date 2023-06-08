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
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <Button size='massive' color='blue' icon href='/blogs'><Icon style={{ color: '#b5e0f7' }} name='book'></Icon> Blog</Button>
                        <Button size='massive' color='blue' icon href='/gallery'><Icon style={{ color: '#b5e0f7' }} name='camera'></Icon> Gallery</Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Main
import React from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../components/BlogData';
import { Container, Col, Row } from 'react-bootstrap';
import { Header, Button, Image, Icon } from 'semantic-ui-react';

const ViewPost = () => {

    // Get correct post information
    let { postId } = useParams();
    postId = parseInt(postId);

    const data = blogData.find(({ id }) => id === postId);
    console.log(data)

    return (
        <div>
            <Container fluid>
                <Row fluid style={{display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px'}}>
                    <Col><Button size='big' style={{backgroundColor: '#FFFFFF'}} href='/'>Back</Button></Col>
                    <Col><a style={{textDecoration: 'none'}} href={`/viewpost/${postId}`}><Icon className='viewPostIcons' name='pencil'></Icon></a><a style={{textDecoration: 'none'}} href={`/viewpost/${postId}`}><Icon className='viewPostIcons' name='trash alternate'></Icon></a></Col>
                </Row>
                <div className='viewPostBlogDiv'>
                <Container style={{
                    backgroundColor: '#F5F5F5',
                    boxShadow: '2px 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingRight: '60px',
                    paddingLeft: '60px',
                    }}>
                
                <Row>
                    <Col><Header as={'h1'} style={{justifyContent: 'start', display: 'flex', textAlign: 'start', marginBottom: '20px'}}>{data.title}</Header></Col>
                </Row>
                <Row>
                    <Col><Header style={{justifyContent: 'start', display: 'flex', marginBottom: '20px'}}>{data.date}</Header></Col>
                </Row>
                <Row>
                    <Col><Image fluid centered src={data.image}></Image></Col>
                </Row>
                <Row>
                    <Col><p style={{width: '100%', justifyContent: 'center', display: 'flex', margin: 'auto', marginTop: '15px', fontSize: '20px'}}>{data.content}</p></Col>
                </Row>
                </Container>
                </div>
            </Container>
        </div>
    )
}

export default ViewPost
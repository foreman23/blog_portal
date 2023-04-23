import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogData from '../components/BlogData';
import { Container, Col, Row } from 'react-bootstrap';
import { Header, Button, Image, Icon } from 'semantic-ui-react';

const ViewPost = () => {

    // Get correct post information
    let { postId } = useParams();
    postId = parseInt(postId);

    const data = blogData.find(({ id }) => id === postId);

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }

    // Navigate to next post
    const nextPost = () => {
        if (data.id < blogData.length) {
            navigate(`/viewpost/${data.id + 1}`)
        }
    }
    // Navigate to previous post
    const prevPost = () => {
        if (data.id > 1) {
            navigate(`/viewpost/${data.id - 1}`)
        }
    }

    // Check if last post
    let renderNext = true;
    if (data.id === blogData.length) {
        renderNext = false;
    }

    // Check if first post
    let renderPrev = true;
    if (data.id === 1) {
        renderPrev = false;
    }

    return (
        <div>
            <Container fluid>
                <Row fluid style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                    <Col>
                        <Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button>
                    </Col>
                    <Col>
                        <Button size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon size='large' style={{ margin: 'auto' }} name='pencil alternate'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon size='large' style={{ margin: 'auto' }} name='trash alternate outline'></Icon></Button>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', margin: '20px', justifyContent: 'space-around', textAlign: 'center' }}>
                    <Col>
                    {renderPrev ? (
                        <Button onClick={prevPost} style={{ marginRight: '10px', backgroundColor: '#f2f2f2' }}>Prev</Button>
                    ) :
                        <Button disabled style={{ marginRight: '10px', backgroundColor: '#f2f2f2' }}>Prev</Button>
                    }
                    Post {data.id} of {blogData.length}
                    {renderNext ? (
                        <Button onClick={nextPost} style={{ marginLeft: '10px', backgroundColor: '#f2f2f2' }}>Next</Button>
                    ) :
                        <Button disabled style={{ marginLeft: '10px', backgroundColor: '#f2f2f2' }}>Next</Button>
                    }
                    </Col>
                </Row>
                <Row style={{ display: 'flex', margin: '20px', justifyContent: 'space-around', textAlign: 'center' }}>
                    <Col><Button href={`/allposts`} color='primary'>View All Posts</Button></Col>
                </Row>
                <div className='viewPostBlogDiv'>
                    <Container style={{
                        backgroundColor: '#F5F5F5',
                        boxShadow: '2px 4px 8px 0 rgba(0, 0, 0, 0.2)',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        paddingRight: '60px',
                        paddingLeft: '60px',
                        borderRadius: '5px',
                    }}>
                        <Row>
                            <Col><Header as={'h1'} style={{ justifyContent: 'start', display: 'flex', textAlign: 'start', marginBottom: '20px' }}>{data.title}</Header></Col>
                        </Row>
                        <Row>
                            <Col><Header style={{ justifyContent: 'start', display: 'flex', marginBottom: '20px' }}>{data.date}</Header></Col>
                        </Row>
                        <Row>
                            <Col><Image fluid centered src={data.image}></Image></Col>
                        </Row>
                        <Row>
                            <Col><p style={{ width: '100%', justifyContent: 'center', display: 'flex', margin: 'auto', marginTop: '15px', fontSize: '20px' }}>{data.content}</p></Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default ViewPost
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { Header, Button, Image, Icon, Loader } from 'semantic-ui-react';

const ViewPost = () => {

    // Get correct post information
    let { postId } = useParams();

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);
    const [post, setPost] = useState([]);
    const [index, setIndex] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/blogs`);
                setBlogData(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [postId]);

    // Set loading to false once blogData is populated
    useEffect(() => {
        if (blogData.length !== 0) {
            const response = blogData.find(post => post._id === postId);
            setPost(response);
            setLoading(false);
            setIndex(blogData.indexOf(response));
        }
    }, [blogData, postId]);

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }

    // Navigate to next post
    const nextPost = () => {
        if (index + 1 !== blogData.length) {
            navigate(`/viewpost/${blogData[index + 1]._id}`);
        }

    }
    // Navigate to previous post
    const prevPost = () => {
        if (index >= 1) {
            navigate(`/viewpost/${blogData[index - 1]._id}`);
        }
    }

    // Check if last post
    let renderNext = true;
    if (index + 1 === blogData.length) {
        renderNext = false;
    }

    // Check if first post
    let renderPrev = true;
    if (index + 1 === 1) {
        renderPrev = false;
    }

    return (
        <div>
            {loading ? (
                <div>
                    <Loader active>
                    </Loader>
                </div>


            ) : (
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
                            Post {index + 1} of {blogData.length}
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
                                <Col><Header as={'h1'} style={{ justifyContent: 'start', display: 'flex', textAlign: 'start', marginBottom: '20px' }}>{post.title}</Header></Col>
                            </Row>
                            <Row>
                                <Col><Header style={{ justifyContent: 'start', display: 'flex', marginBottom: '20px' }}>{post.createdAt}</Header></Col>
                            </Row>
                            <Row>
                                <Col><Image fluid centered src={post.img}></Image></Col>
                            </Row>
                            <Row>
                                <Col><p style={{ width: '100%', justifyContent: 'center', display: 'flex', margin: 'auto', marginTop: '15px', fontSize: '20px' }}>{post.content}</p></Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
            )}
        </div>
    )
}

export default ViewPost
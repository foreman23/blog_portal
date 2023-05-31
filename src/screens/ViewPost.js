import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Modal } from 'react-bootstrap';
import { Header, Button, Image, Icon, Loader } from 'semantic-ui-react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const ViewPost = () => {

    // Get correct post information
    let { postId } = useParams();

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);
    const [post, setPost] = useState([]);
    const [index, setIndex] = useState();
    const [loading, setLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${TLD}blogs`, {
                    headers: {
                        'X-API-Key': API_KEY,
                    },
                });
                setBlogData(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [postId]);

    // useState for Editor
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    // Set loading to false once blogData is populated
    useEffect(() => {
        if (blogData.length !== 0) {
            const response = blogData.find(post => post._id === postId);
            setPost(response);
            // Set editor state
            const rawContentState = JSON.parse(response.content);
            const contentState = convertFromRaw(rawContentState);
            setEditorState(EditorState.createWithContent(contentState));
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

    // DELETE a blog from server
    function handleDelete() {
        handleClose()
        axios.delete(`${TLD}blogs/${blogData[index]._id}`, {
            headers: {
                'X-API-Key': API_KEY,
            }
        })
            .then(res => {
                console.log(res);
                const prefix = (blogData[index].img).substring(0, (blogData[index].img).indexOf('.'));
                return axios.delete(`${TLD}photos/${prefix}`, {
                    headers: {
                        'X-API-Key': API_KEY,
                    },
                })
            })

            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Modal state info
    const [show, setShow] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [blogTitle, setBlogTitle] = useState(null);

    const handleShow = (id, title) => {
        setShow(true);
        setBlogId(id);
        setBlogTitle(title);
    };

    const handleClose = () => {
        setShow(false);
        setBlogId(null);
    };

    return (
        <div>
            {loading ? (
                <div>
                    <Loader active>
                    </Loader>
                </div>


            ) : (
                <Container fluid>
                    <Row style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                        <Col>
                            <Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}>
                                <Icon style={{ margin: 'auto' }} name='home'></Icon>
                            </Button>
                            <Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button>
                        </Col>
                        <Col>
                            <Button href={`/updatepost/${postId}`} size='medium' style={{ backgroundColor: '#FFFFFF' }}>
                                <Icon size='large' style={{ margin: 'auto' }} name='pencil alternate'></Icon>
                            </Button>
                            <Button onClick={() => handleShow(blogId, post.title)} size='medium' style={{ backgroundColor: '#FFFFFF' }}>
                                <Icon size='large' style={{ margin: 'auto' }} name='trash alternate outline'></Icon>
                            </Button>
                        </Col>
                    </Row>
                    <Modal style={{ marginTop: '200px' }} animation={false} className='modal' show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm delete</Modal.Title>
                            <Icon style={{ marginLeft: '5px', marginTop: '4px' }} color='red' size='large' name='ban'></Icon>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete post: <b>{post.title}</b> ?</p>
                            <p>This action cannot be undone.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color='red' onClick={() => handleDelete()}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
                        <Col><Button href={`/allposts`} primary>View All Posts</Button></Col>
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
                                <Col><Image fluid centered src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${post.img}`}></Image></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Editor
                                        toolbarHidden
                                        editorState={editorState}
                                        readOnly={true}
                                        style={{ width: '100%', justifyContent: 'center', display: 'flex', margin: 'auto', marginTop: '15px', fontSize: '20px' }}>
                                    </Editor>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Container>
            )}
        </div>
    )
}

export default ViewPost
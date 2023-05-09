import { React, useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Icon, Input, TextArea, Form, Label, Image } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';

const DraftUpdater = () => {

    // Get params
    let { postId } = useParams();

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);
    const [post, setPost] = useState([]);
    const [index, setIndex] = useState();
    const [loading, setLoading] = useState(true);

    // state variables for form inputs
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [id, setId] = useState(null);


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
            setTitle(response.title);
            setId(response._id);
            setDescription(response.description);
            setLoading(false);
            setIndex(blogData.indexOf(response));
        }
    }, [blogData, postId]);

    // Init navigate
    const navigate = useNavigate();

    // Set page name
    useEffect(() => {
        document.title = "Blog Portal - Editor";
    }, [])

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }

    const [convertedContent, setConvertedContent] = useState();

    // useState for image upload
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
    }

    // Save data (convert TO raw)
    function saveData() {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const convertedContent = JSON.stringify(rawContentState);
        setConvertedContent(convertedContent);
        console.log(title, ":", description, ":", convertedContent);
        const data = {
            title: title,
            description: description,
            content: convertedContent,
        }
        axios.put(`http://localhost:4000/blogs/${id}`, data)
            .then((result) => {
                console.log(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

    // Load data (convert FROM raw)
    function loadData() {
        try {
            const rawContentState = JSON.parse(convertedContent);
            const contentState = convertFromRaw(rawContentState);
            setEditorState(EditorState.createWithContent(contentState));
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    return (
        <div>
            <Container fluid>
                <Row style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                    <Col><Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                    <Col><Button onClick={saveData} color='green'>Save</Button><Button onClick={loadData} color='blue'>Load</Button></Col>
                </Row>
            </Container>
            <Container style={{ width: '40vw', justifyContent: 'center' }}>
                <Row>
                    <Form>
                        <Label>Title</Label>
                        <Input
                        name='title'
                        defaultValue = {post.title}
                        onChange={(e) => setTitle(e.target.value)}
                        fluid>
                        </Input>
                        <Label>Thumbnail</Label>
                        <Input fluid type='file' onChange={handleFileInputChange}></Input>
                        {previewUrl && <Image size='medium' src={previewUrl}></Image>}
                        <Label>Description</Label>
                        <TextArea
                        name='description'
                        defaultValue={post.description}
                        onChange={(e) => setDescription(e.target.value)}>
                        </TextArea>
                        <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', minHeight: '60vh', marginTop: '20px' }}>
                            <Editor toolbar
                                toolbarStyle={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '5px', paddingTop: '7px' }}
                                wrapperClassName='blogWrapper'
                                editorClassName='blogEditor'
                                editorState={editorState}
                                onEditorStateChange={setEditorState}>
                            </Editor>
                        </div>
                    </Form>
                </Row>
            </Container>

        </div>
    )
}

export default DraftUpdater
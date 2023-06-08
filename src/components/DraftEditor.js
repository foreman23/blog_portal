import { React, useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Icon, Input, TextArea, Form, Label, Loader } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';


const DraftEditor = () => {

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const cloud_key = process.env.REACT_APP_CLOUD_KEY;
    const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

    // Init navigate
    const navigate = useNavigate();

    // Set page name
    useEffect(() => {
        document.title = "Blog Portal - Editor";
    }, [])

    // state variables for form inputs
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageSelected, setImageSelected] = useState();
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }

    // useState for Editor
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const [convertedContent, setConvertedContent] = useState();

    // Handle thumbnail upload
    const handleFileInputChange = (event) => {
        if (event.target.files[0] !== undefined) {
            setImageSelected(event.target.files[0]);
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
    }

    // Save data (convert TO raw)
    async function saveData() {
        setIsLoading(true);
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const convertedContent = JSON.stringify(rawContentState);
        setConvertedContent(convertedContent);

        // formData for image upload
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "uoxzss2b");

        try {
            // First upload image to cloudinary
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
            const img = `${response.data.public_id}.${response.data.format}`;
            setImg(img);
            const data = {
                title: title,
                description: description,
                content: convertedContent,
                img: img,
            }
            // Next post form data to atlas db
            axios.post(`${TLD}blogs/`, data, {
                headers: {
                    'X-API-Key': API_KEY,
                },
            })
                .then((result) => {
                    navigate('/blogs');
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Failed to upload thumbnail image", error);
            setIsLoading(false);
        }
    };

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
            {isLoading ? (
                <div>
                    <Loader active>
                    Submitting Post
                    </Loader>
                </div>
            ) : (
                <div>
                <Container fluid>
                    <Row style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                        <Col><Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                        <Col><Button onClick={saveData} color='green'>Save</Button><Button onClick={loadData} color='blue'>Load</Button></Col>
                    </Row>
                </Container>
                <Container className='editorContainer'>
                    <Row>
                        <Form>
                            <Label>Title</Label>
                            <Input 
                            name='title'
                            onChange={(e) => setTitle(e.target.value)}
                            fluid>
                            </Input>
                            <Label>Thumbnail</Label>
                            <Input fluid type='file' onChange={handleFileInputChange}></Input>
                            {previewUrl && <img style={{width: '250px'}} src={previewUrl}></img>}
                            <br></br>
                            <Label>Description</Label>
                            <TextArea
                            name='description'
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
                )}
            </div>
        )
    }

export default DraftEditor
import { React, useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Icon, Input, TextArea, Form, Label, Image, Loader } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';

const DraftUpdater = () => {

    // Get params
    let { postId } = useParams();

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);
    const [post, setPost] = useState([]);
    const [index, setIndex] = useState();
    const [loading, setLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const cloud_key = process.env.REACT_APP_CLOUD_KEY;
    const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

    // state variables for form inputs
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [id, setId] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageSelected, setImageSelected] = useState(null);
    const [img, setImg] = useState(null);

    const [oldImageId, setOldImageId] = useState(null);

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
            setTitle(response.title);
            setId(response._id);
            setDescription(response.description);
            setLoading(false);
            setIndex(blogData.indexOf(response));
            setPreviewUrl(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${response.img}`)
            // Below is for deleting old cloud photo
            const prefix = (response.img).substring(0, (response.img).indexOf('.'));
            setOldImageId(prefix)
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

    // useEffect for image selection (DELETE THIS LATER)
    useEffect(() => {
        console.log(imageSelected);
    }, [imageSelected]);


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
        setLoading(true);
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const convertedContent = JSON.stringify(rawContentState);
        setConvertedContent(convertedContent);

        // formData for image upload
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "uoxzss2b");

        try {
            // First upload replacement image to cloudinary
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
            const img = `${response.data.public_id}.${response.data.format}`;
            console.log(img);
            setImg(img);
            const data = {
                title: title,
                description: description,
                content: convertedContent,
                img: img,
            }
            // Then DELETE old image from cloudinary
            const res = await axios.delete(`${TLD}photos/${oldImageId}`, {
                headers: {
                    'X-API-Key': API_KEY,
                },
            });

            // Next update form data
            axios.put(`${TLD}blogs/${id}`, data, {
                headers: {
                    'X-API-Key': API_KEY,
                },
            })
                .then((result) => {
                    console.log(result.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Failed to upload thumbnail image", error);
            setLoading(false);
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

            {loading ? (
                <div>
                    <Loader active>
                        Updating Post
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
                    <Container style={{ width: '40vw', justifyContent: 'center' }}>
                        <Row>
                            <Form>
                                <Label>Title</Label>
                                <Input
                                    name='title'
                                    defaultValue={post.title}
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
            )}
        </div>
    )
}

export default DraftUpdater
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Image, Loader, Header, Icon, Form, Input, Dropdown } from 'semantic-ui-react';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import CloudCard from './CloudCard';

const CloudGallery = () => {

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    const [photos, setPhotos] = useState([]);
    const [tempPhotos, setTempPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showText, setShowText] = useState(false);

    // image state variables
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageSelected, setImageSelected] = useState();
    const [buttonLoad, setButtonLoad] = useState(false);

    // Modal state info
    const [show, setShow] = useState(false);

    // sort state info
    const [ascend, setAscend] = useState(false);

    const handleShow = (id, title, img) => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const changeSort = () => {
        if (ascend === false) {
            photos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            setPhotos(photos);
            setAscend(true);
        }
        if (ascend === true) {
            photos.sort((b, a) => new Date(a.created_at) - new Date(b.created_at));
            setPhotos(photos);
            setAscend(false);
        }
    }

    // Handle image upload
    const handleFileInputChange = (event) => {
        if (event.target.files[0] !== undefined) {
            setImageSelected(event.target.files[0]);
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
    }

    // Upload a gallery photo to cloud
    function uploadImage() {
        setButtonLoad(true);
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "uoxzss2b");

        axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
            params: {
                folder: 'plane_gallery',
            },
        })
            .then(res => {
                console.log(res);
                handleClose();
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                setButtonLoad(false);
            })
    }

    // GET photos from plane_gallery folder (cloud)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${TLD}photos`, {
                    headers: {
                        'X-API-KEY': API_KEY,
                    },
                });
                // Sort gallery in descending order
                response.data.sort((b, a) => new Date(a.created_at) - new Date(b.created_at));
                console.log(response.data)
                setPhotos(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Simulating loading delay
        setTimeout(() => {
            setShowText(true);
        }, 5000);
    }, []);


    return (
        <div>
            {loading ? (
                <div>
                    <Loader active>
                        {showText && <p>API marked as inactive<br></br>May take a few extra seconds to load..</p>}
                    </Loader>
                </div>
            ) : (
                <div>
                    <Header as={'h2'} style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Edit Photo Gallery</Header>
                    <div className='textBoxGallery'>
                        <p style={{ textAlign: 'justify', marginTop: '20px', marginBottom: '35px' }}><b><u>*Images must be under 10mb!</u></b>
                            <br></br> It's recommend to use <a style={{ textDecoration: 'none' }} target='_blank' href='https://tinypng.com/'>tinypng.com</a> and/or convert images to the .webp format before upload.
                            <br></br> To ensure quick loading, images should be optimized to balance between size and quality, aiming for the smallest file size without compromising visual clarity.</p>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                <div className='gallerySortChange'>
                                    <a className='sortAnchor' style={{ textDecoration: 'none', color: 'black' }} onClick={() => changeSort()}><span className='hideOnMobile'>Date created</span>
                                        {ascend && <Icon style={{ marginLeft: '5px' }} name='arrow up'></Icon>}
                                        {!ascend && <Icon style={{ marginLeft: '5px' }} name='arrow down'></Icon>}</a>
                                </div>
                            </Col>
                            <Col><Button onClick={() => handleShow()} className='galleryUploadButton' icon color='blue'><Icon name='add'></Icon> Upload</Button></Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='galleryContainer'>
                                    {photos.map((photo) => (
                                        <CloudCard public_id={photo.public_id} width={photo.width} height={photo.height} bytes={photo.bytes} format={photo.format} image={photo.secure_url} date={photo.created_at}></CloudCard>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        <Modal style={{ marginTop: '200px' }} animation={false} className='modal' show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Upload an image to gallery</Modal.Title>
                                <Icon style={{ marginLeft: '5px', marginTop: '4px' }} color='green' size='large' name='arrow circle up'></Icon>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Input fluid type='file' onChange={handleFileInputChange}></Input>
                                    {previewUrl && <Image size='small' src={previewUrl}></Image>}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button loading={buttonLoad} onClick={uploadImage} color='green'>
                                    Upload
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>
                </div>

            )}
        </div>
    )
}

export default CloudGallery
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Image, Loader, Header, Icon, Form, Input } from 'semantic-ui-react';
import { Row, Col, Container, Modal } from 'react-bootstrap';
import CloudCard from './CloudCard';

const CloudGallery = () => {

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    // image state variables
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageSelected, setImageSelected] = useState();
    const [buttonLoad, setButtonLoad] = useState(false);

    // Modal state info
    const [show, setShow] = useState(false);

    const handleShow = (id, title, img) => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // Handle image upload
    const handleFileInputChange = (event) => {
        if (event.target.files[0] !== undefined) {
            setImageSelected(event.target.files[0]);
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            console.log(imageSelected)
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
                setPhotos(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, []);


    return (
        <div>
            {loading ? (
                <div>
                    <Loader active></Loader>
                </div>
            ) : (
                <div>
                    <Container>
                        <Row>
                            <Header style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Hosted on cloudinary.com</Header>
                            <p style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}><b>Images must be under 10mb!</b> <br></br> I'd recommend using <a style={{textDecoration: 'none'}} target='_blank' href='https://tinypng.com/'>tinypng.com</a> and or converting to .webp format.</p>
                            <Col></Col>
                            <Col><Button onClick={() => handleShow()} className='galleryUploadButton' icon color='blue'><Icon name='add'></Icon> Upload</Button></Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='galleryContainer'>
                                    {photos.map((photo) => (
                                        <CloudCard public_id={photo.public_id} format={photo.format} image={photo.secure_url} date={photo.created_at}></CloudCard>
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
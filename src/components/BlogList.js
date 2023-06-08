import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Icon, Button, Image } from 'semantic-ui-react';
import { Header } from "./Header"
import { Modal } from 'react-bootstrap';

export const BlogList = (props) => {

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);

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
                response.data.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt));
                console.log(response.data)
                setBlogData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // DELETE a blog from server
    function handleDelete(id, img) {
        handleClose()
        axios.delete(`${TLD}blogs/${id}`, {
            headers: {
                'X-API-Key': API_KEY,
            },
        })
            // Delete the image from cloud
            .then(res => {
                console.log(res);
                const prefix = img.substring(0, img.indexOf('.'));
                return axios.delete(`${TLD}photos/${prefix}`, {
                    headers: {
                        'X-API-Key': API_KEY,
                    },
                })
            })

            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    // The amount of blogs to display
    const renderAmount = props.amount;
    // Display view all button
    const displayViewAll = props.viewall;

    // Modal state info
    const [show, setShow] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [blogTitle, setBlogTitle] = useState(null);
    const [blogImg, setBlogImg] = useState(null);

    const handleShow = (id, title, img) => {
        setShow(true);
        setBlogId(id);
        setBlogTitle(title);
        setBlogImg(img);
    };

    const handleClose = () => {
        setShow(false);
        setBlogId(null);
        setBlogImg(null);
    };

    // Date options
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
      };

    return (
        <div>
            <Header></Header>
            <Table striped>
                <Table.Header className='hideOnMobile'>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className='blogTable'>
                    {blogData.slice(0, renderAmount).map((blog) => (
                        <Table.Row key={blog._id}>
                            <Table.Cell><a className='blogListTitle' href={`/viewpost/${blog._id}`}>{blog.title}</a></Table.Cell>
                            <Table.Cell>{new Date(blog.createdAt).toLocaleString('en-US', options)}</Table.Cell>
                            {/* <Table.Cell>{blog._id}</Table.Cell> */}
                            <Table.Cell><Image className='blogTableThumbnail' src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blog.img}`}></Image></Table.Cell>
                            <Table.Cell><Button href={`/updatepost/${blog._id}`}><Icon name='edit'></Icon></Button></Table.Cell>
                            <Table.Cell><Button onClick={() => handleShow(blog._id, blog.title, blog.img)}><Icon name='ban'></Icon></Button></Table.Cell>

                            <Modal style={{ marginTop: '200px' }} animation={false} className='modal' show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm delete</Modal.Title>
                                    <Icon style={{marginLeft: '5px', marginTop: '4px'}} color='red' size='large' name='ban'></Icon>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure you want to delete post: <b>{blogTitle}</b> ?</p>
                                    <p>This action cannot be undone.</p>   
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button color='red' onClick={() => handleDelete(blogId, blogImg)}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Table.Row>
                    ))}
                </Table.Body>

            </Table>
            {displayViewAll && (
                <span style={{ justifyContent: 'center', display: 'flex' }}>
                    <Button className='viewAllButtonBlogs' style={{ backgroundColor: '#f2f2f2' }} href='/allposts'>View All</Button>
                </span>
            )}

        </div>
    )
}
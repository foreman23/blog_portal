import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Icon, Button } from 'semantic-ui-react';
import { Header } from "./Header"
import { Modal } from 'react-bootstrap';

export const BlogList = (props) => {

    // GET blogData from server
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/blogs');
                setBlogData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // DELETE a blog from server
    function handleDelete(id) {
        handleClose()
        axios.delete(`http://localhost:4000/blogs/${id}`)
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
        // PLACEHOLDER TABLE
        <div>
            <Header></Header>
            <Table sortable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {blogData.slice(0, renderAmount).map((blog) => (
                        <Table.Row key={blog._id}>
                            <Table.Cell><a className='blogListTitle' href={`/viewpost/${blog._id}`}>{blog.title}</a></Table.Cell>
                            <Table.Cell>{blog.createdAt}</Table.Cell>
                            <Table.Cell>{blog._id}</Table.Cell>
                            <Table.Cell><Button href={`/updatepost/${blog._id}`}><Icon name='edit'></Icon></Button></Table.Cell>
                            <Table.Cell><Button onClick={() => handleShow(blog._id, blog.title)}><Icon name='ban'></Icon></Button></Table.Cell>

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
                                    <Button color='red' onClick={() => handleDelete(blogId)}>
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
                    <Button style={{ backgroundColor: '#f2f2f2' }} href='/allposts'>View All</Button>
                </span>
            )}

        </div>
    )
}
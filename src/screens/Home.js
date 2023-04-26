import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { BlogList } from "../components/BlogList";
import BlogCard from "../components/BlogCard";

const Home = () => {

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

    return (
        <div>
            <Container style={{ marginTop: '50px' }} className="homeContainerMain">
                <Row>
                    <Col>
                        <h2 style={{ marginLeft: '10px' }}>Latest Posts</h2>
                        <div className='cardContainer'>
                            {blogData.slice(0, 4).map((blog) => (
                                <BlogCard image={blog.img} keyID={blog._id} title={blog.title} date={blog.date} description={blog.description}></BlogCard>
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <BlogList viewall={true} amount={8}></BlogList>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
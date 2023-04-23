import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BlogList } from "../components/BlogList";
import BlogCard from "../components/BlogCard";

import blogData from '../components/BlogData';

const Home = () => {


    return (
        <div>
            <Container className="homeContainerMain">
                <Row>
                    <Col>
                        <h2 style={{ marginLeft: '10px' }}>Latest Posts</h2>
                        <div className='cardContainer'>
                            {blogData.map((blog) => (
                                <BlogCard image={blog.image} keyID={blog.id} title={blog.title} date={blog.date} description={blog.description}></BlogCard>
                            ))}
                        </div>
                    </Col>
                    <Col>
                        <BlogList></BlogList>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BlogList } from "../components/BlogList";
import BlogCard from "../components/BlogCard";

import image1 from '../images/tempThumbs/1.jpg';
import image2 from '../images/tempThumbs/2.jpg';
import image3 from '../images/tempThumbs/3.jpg';
import image4 from '../images/tempThumbs/4.jpg';

const Home = () => {


    // Retrieve blog data
    const blogData = [
        {
            id: 1,
            image: image1,
            title: 'Netus et malesuada fames ac turpis egestas sed tempus.',
            date: 'April 4th, 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A iaculis at erat pellentesque.',
        },
        {
            id: 2,
            image: image2,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: 'March 24th, 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A iaculis at erat pellentesque.',
        },
        {
            id: 3,
            image: image3,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: 'March 24th, 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A iaculis at erat pellentesque.',
        },
        {
            id: 4,
            image: image4,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: 'March 24th, 2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A iaculis at erat pellentesque.',
        },
    ];


    return (
        <div>
            <Container className="homeContainerMain">
                <Row>
                    <Col>
                        <h2 style={{ marginLeft: '10px' }}>Latest Posts</h2>
                        <div className='cardContainer'>
                            {blogData.map((blog) => (
                                <BlogCard image={blog.image} key={blog.id} title={blog.title} date={blog.date} description={blog.description}></BlogCard>
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
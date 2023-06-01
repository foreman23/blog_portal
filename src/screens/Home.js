import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { BlogList } from "../components/BlogList";
import { Loader, Button } from "semantic-ui-react";
import BlogCard from "../components/BlogCard";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const TLD = process.env.REACT_APP_TLD;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${TLD}blogs`, {
                    headers: {
                        'X-API-Key': API_KEY,
                    },
                });
                setBlogData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>

            {loading ? (
                <div>
                    <Loader active>
                    </Loader>
                </div>
            ) : (
                <div>
                    <Container>
                    <Row style={{display: 'flex', alignItems: 'start', justifyContent: 'start', textAlign: 'start', paddingBottom: '10px', paddingTop: '30px', marginBottom: '20px', marginLeft: '1px'}}>
                        <Col><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                        <Col></Col>
                    </Row>                   
                    </Container>
                    <Container style={{ marginTop: '50px' }} className="homeContainerMain">
                        <Row>
                            <Col className='order-mobile-last'>
                                <h2 style={{ marginLeft: '10px' }}>Latest Posts</h2>
                                <div className='cardContainer'>
                                    {blogData.slice(0, 4).map((blog) => (
                                        <BlogCard key={blog._id} image={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blog.img}`} keyID={blog._id} title={blog.title} date={blog.date} description={blog.description}></BlogCard>
                                    ))}
                                </div>
                            </Col>
                            <Col className='order-mobile-first'>
                                <BlogList viewall={true} amount={8}></BlogList>
                            </Col>
                        </Row>
                    </Container>
                </div>

            )}
        </div>
    )
}

export default Home
import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { BlogList } from "../components/BlogList";
import { Loader } from "semantic-ui-react";
import BlogCard from "../components/BlogCard";

const Home = () => {

    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    <Container style={{ marginTop: '50px' }} className="homeContainerMain">
                        <Row>
                            <Col>
                                <h2 style={{ marginLeft: '10px' }}>Latest Posts</h2>
                                <div className='cardContainer'>
                                    <div>
                                        {blogData.length > 0 && (
                                            <BlogCard key={blogData[0]._id} image={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blogData[0].img}`} keyID={blogData[0]._id} title={blogData[0].title} date={blogData[0].date} description={blogData[0].description}></BlogCard>
                                        )}
                                        {blogData.length > 1 && (
                                            <BlogCard key={blogData[1]._id} image={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blogData[1].img}`} keyID={blogData[1]._id} title={blogData[1].title} date={blogData[1].date} description={blogData[1].description}></BlogCard>
                                        )}
                                        {blogData.length > 2 && (
                                            <BlogCard key={blogData[2]._id} image={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blogData[2].img}`} keyID={blogData[2]._id} title={blogData[2].title} date={blogData[2].date} description={blogData[2].description}></BlogCard>
                                        )}
                                        {blogData.length > 3 && (
                                            <BlogCard key={blogData[3]._id} image={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1685425609/${blogData[3].img}`} keyID={blogData[3]._id} title={blogData[3].title} date={blogData[3].date} description={blogData[3].description}></BlogCard>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col>
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
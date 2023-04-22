import { Card, Image } from 'semantic-ui-react'

const BlogCard = (props) => {
    return (
        <a className='blogCard' href='/viewpost'>
            <div>
                <Card style={{ width: '100%' }}>
                    <Image src={props.image}></Image>
                    <Card.Content>
                        <Card.Meta>
                            <span className='cardDate'>April 4, 2023</span>
                        </Card.Meta>
                        <Card.Header>Netus et malesuada fames ac turpis egestas sed tempus.</Card.Header>
                        <Card.Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A iaculis at erat pellentesque.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </a>
    )
}

export default BlogCard
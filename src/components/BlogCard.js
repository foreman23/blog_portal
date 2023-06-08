import { Card, Image } from 'semantic-ui-react'

const BlogCard = (props) => {
    
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
        <a className='blogCard' href={`/viewpost/${props.keyID}`}>
            <div>
                <Card style={{ width: '100%' }}>
                    <Image className='blogImage' src={props.image}></Image>
                    <Card.Content>
                        <Card.Meta>
                            <span className='cardDate'>{new Date(props.date).toLocaleString('en-US', options)}</span>
                        </Card.Meta>
                        <Card.Header>{props.title}</Card.Header>
                        <Card.Description>
                            {props.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </a>
    )
}

export default BlogCard
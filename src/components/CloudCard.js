import { Card, Image, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CloudCard = (props) => {

  const API_KEY = process.env.REACT_APP_API_KEY;
  const TLD = process.env.REACT_APP_TLD;

  // Modal state info
  const [show, setShow] = useState(false);

  const handleShow = (id, title, img) => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  // Remove a gallery photo from cloud
  function deleteImage(img) {
    //setButtonLoad(true);
    let parts = props.public_id.split('/');
    let public_id = parts[1];
    console.log(public_id)

    axios.delete(`${TLD}photos/plane_gallery/${public_id}`, {
      headers: {
        'X-API-Key': API_KEY,
      }
    })
      .then(response => {
        console.log('Photo deleted successfully');
        window.location.reload();
      })
      .catch(error => {
        console.error('Failed to delete photo:', error);
      });
  }

  // Date options
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  };


  const [fileSize, setFileSize] = useState(null);

  // Convert bytes to mb or kb
  useEffect(() => {
    if ((props.bytes) >= 1048576) { // If size is greater than or equal to 1MB
      const sizeInMB = ((props.bytes) / (1024 * 1024)).toFixed(2);
      setFileSize(sizeInMB + ' MB');
    } else {
      const sizeInKB = ((props.bytes) / 1024).toFixed(2);
      setFileSize(sizeInKB + ' KB');
    }
  }, [props.bytes]);

  return (
    <div className='cloudCard'>
      <div>
        <Card style={{ width: '100%' }}>
          <a href={`/viewimage/${props.public_id}`}><Image className='cloudImage' src={props.image}></Image></a>
          <Card.Content>
            <span style={{ color: 'grey' }}><b>Dimensions:</b> {props.width} x {props.height}</span>
            <br></br>
            <span style={{ color: 'grey' }}><b>Size:</b> {fileSize}</span>
            <br></br>
            <span style={{ color: 'grey' }}><b>Format:</b> {props.format}</span>
            <Card.Meta>
              <span className='cardDate'>{new Date(props.date).toLocaleString('en-US', options)}</span>
            </Card.Meta>
            <Card.Description>
              <Button onClick={() => handleShow()} icon><Icon color='red' name='trash'></Icon></Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Modal style={{ marginTop: '200px' }} animation={false} className='modal' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete</Modal.Title>
            <Icon style={{ marginLeft: '5px', marginTop: '4px' }} color='red' size='large' name='ban'></Icon>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this photo?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button color='red' onClick={() => deleteImage(props.image)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default CloudCard
import { Navbar, Nav, Container} from 'react-bootstrap';
import { Icon } from "semantic-ui-react";

const Header = ({ onLogout }) => {

    return (
        <Navbar expand="lg" variant="lighter" bg="lighter">
            <Container>
                <Navbar.Toggle aria-controls="navbar-nav">
                    <Icon size='large' name='list'></Icon>
                </Navbar.Toggle>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='navButton' style={{fontFamily: 'Lato', fontSize: '14px', fontWeight: '500', marginRight: '40px', color: '#5E5E5E'}} href="/">HOME</Nav.Link>
                        <Nav.Link className='navButton' style={{fontFamily: 'Lato', fontSize: '14px', fontWeight: '500', marginRight: '40px', color: '#5E5E5E'}} href="/blogs">Edit Blogs</Nav.Link>
                        <Nav.Link className='navButton' style={{fontFamily: 'Lato', fontSize: '14px', fontWeight: '500', marginRight: '40px', color: '#5E5E5E'}} href="/gallery">Edit Gallery</Nav.Link>
                        <Nav.Link onClick={onLogout} className='navButton' style={{fontFamily: 'Lato', fontSize: '14px', fontWeight: '500', marginRight: '40px', color: '#5E5E5E'}}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header
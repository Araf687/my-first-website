import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { FaUserCircle } from "react-icons/fa";
import './Header.css'

const Header = () => {
    const history=useHistory();
    const [loggedInUser,]=useContext(UserContext);
    const user=loggedInUser.name?loggedInUser.name:loggedInUser.email;
    const handleLogIn=()=>{
        history.push('/login');
    }
    return (
        <div className='header container'>
            <Navbar expand="lg">
                <Link to="/home"><h2 >To myStop</h2></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav">
                        <Link to="/home">Home</Link>
                        <Link to="/destination/car">Destination</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/contact">Contact</Link>
                        {!loggedInUser.email?<Button onClick={handleLogIn} className='button'>log in</Button>:<span style={{marginTop:'10px'}}><FaUserCircle/> {user}</span>}
                    </Nav>  
                </Navbar.Collapse>
            </Navbar>
        </div>  
    );
};

export default Header;
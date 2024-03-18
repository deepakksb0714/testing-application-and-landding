import React, { useState,useContext } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import '../style.css';
import './dashboard.css'
import { AuthContext } from '../../context/AuthContext';



const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
     
    }}
    style={{textDecoration:'none'}}
  >
    {children}
  </a>
));


const Header = () => {
 
  const [loading, setLoading] = useState(true);
  // const [showProfile, setShowProfile] = useState(false);

  const { userDetails,signOut, isAuthenticated,userEmail } = useContext(AuthContext);

 console.log(userEmail);
   
  
    const handleSignOut = () => {
      signOut();
    };


 

  return (
    <header style={{ paddingTop: '10px' }} className='box-shadow'>
      <div className="card-header text-center text-white" style={{ backgroundColor: 'rgb(250, 70, 22)', paddingTop: '2px' }}></div>
      <Navbar bg="white" variant="light" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand href="#">
            <div className="col text-center " style={{marginLeft:"30px"}}>
              <img src="http://scalarhub.io/wp-content/uploads/2023/05/top-logo.png" width="100px" height="auto" alt="Description" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              
            </Nav>
            <Nav className="ms-auto">
            <Nav.Link href="#">
            <b style={{ fontWeight: 700, marginRight: "53px", fontSize: '2em', marginTop: "20px" }}>&#x2753;
             </b>
            </Nav.Link>

              <Dropdown style={{marginRight:"50px",marginTop:"20px"}}>
              <Dropdown.Toggle as={CustomToggle} variant="link" id="gear" style={{ fontWeight: 700, color: '#333', textDecorationLine: 'none' }}>
                  <FontAwesomeIcon icon={faCog} fontSize='1.6em' color='rgb(250, 70, 22)'  />
                </Dropdown.Toggle>
                
              </Dropdown>

              {/* Applying the style and classes to the Account Dropdown */}
              <Dropdown  style={{marginTop:"20px",marginRight:"20px"}}>
              <Dropdown.Toggle as={CustomToggle} variant="link" id="account-dropdown" style={{ fontWeight: 600, textDecoration: 'none'  }}>
           {isAuthenticated() && userEmail ? (
     <b className='account'>
      {userEmail.charAt(0).toUpperCase()}
    </b>
    ) : (
      <b style={{ fontWeight: 600, color: '#333',  textDecoration: 'none'  }}>Account</b>
    )}
              </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdown-menu-end custom-dropdown">
            <Dropdown.Item>
      <span style={{ fontWeight: 700, color: '#333' }}>Username: </span>{ isAuthenticated() && (userEmail)}
    </Dropdown.Item>
    <Dropdown.Divider  />
    <>
     
    </>
    <Dropdown.Item>
      <h6 onClick={handleSignOut}>Sign Out</h6>
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className="card-header text-center text-white" style={{ backgroundColor: 'rgb(250, 70, 22)', paddingTop: '2px' }}></div>
    </header>
  );
};

export default Header;

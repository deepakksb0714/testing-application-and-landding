import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import UserProfile from './components/profile/UserProfile';
import SignIn from './components/sessions/SignIn';
import SignOut from './components/sessions/SignOut';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Dashboard/Home';
import Calculator from './components/Dashboard/Calculator';
import Header from './components/Dashboard/Header';
import Sidebar from './components/Dashboard/Sidebar';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './components/tenants/register';
import TenantListComponent from './components/tenants/TenantList';
import OidcSignIn from './auth/OidcSignIn';
import AuthInfo from './auth/AuthInfo';
import UsersList from './components/users/UsersList';
import UserCreate from './components/users/UserCreate';


function App(){
  // Define the routes where you want to hide the entire container
  const routesWithoutContainer = ['/signin', '/signout','/unauthorise'];

  
  const shouldHideContainer = () => {
    const currentPath = window.location.pathname;
    return routesWithoutContainer.includes(currentPath);
  };

  const { isAuthenticated, userEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is not authenticated and redirect to SignIn
    if (!isAuthenticated() ) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {!shouldHideContainer() && (
        <Container fluid className='inner-container'>
           <Header />
          <Row>
            <Col md={2} className="bg-light ">
             
              <Sidebar />
            </Col>
            <Col md={9} className="p-1 m-5 ">
              <Routes>
                <Route path="/" element={<TenantListComponent />} />
                <Route path="/my-profile" element={<UserProfile />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tenant-list" element={<TenantListComponent />} />
                <Route path="/new-tenant-registration" element={<Register />} />
                <Route path="/authinfo" element={<AuthInfo />} />
                <Route path='/users/list' element={<UsersList />} />
                <Route path='/users/create' element={<UserCreate />} />
                
              </Routes>
            </Col>
          </Row>
        </Container>
      )}

      <Container fluid>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/unauthorise" element={<OidcSignIn />} />
        </Routes>
      </Container>
    </> 
  );
};


export default function WrappedApp() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  );
}
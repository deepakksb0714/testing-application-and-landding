import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row,Form,Alert, Button,InputGroup, Spinner} from 'react-bootstrap'
import {  Link,useNavigate } from 'react-router-dom'
import AuthCarousel from '../AuthenticationInner/AuthCarousel';
import logoDark from "../../assets/images/logo-dark.png";
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 




// const siteConfig = JSON.parse(process.env.REACT_APP_SITE_CONFIG);
const siteConfig = {
  apiUrl: "https://api.udveg.com",
  domain: "app.udveg.com"
}

const Register = () => {
    document.title = "Register | ScalarHub Admin Dashboard";

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //const [formValues, setFormValues] = useState({});

    // const [passwordShow, setPasswordShow] = useState<any>(false);
    const [timer, setTimer] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    


    const onSubmit = async (formData: any) => {
        const API_URL = `${siteConfig.apiUrl}/register`;
        const domain = siteConfig.domain;
        console.log('original API_url  ' + API_URL);
        console.log('original Domain  ' + domain);
        const user = {
            
            ...validation.values,
            customDomain: domain,
        };
        console.log(user);
        try {
          setSubmitting(true);
          const response = await axios.post(API_URL, user);
          setSuccess(true);
          setError(false);
          console.log(response.data);
        } catch (err) {
          console.error(err);
          setError(true);
          setSuccess(false);
        } finally {
          setSubmitting(false);
        }
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validation.handleChange(e);
      };



      

    const getTenantUrl = () => {
        const companyName = validation.values.companyName || ''; // Use values from useFormik
        const re = /[\W\s]+/g;
        const tenantId = companyName.replace(re, '').toLowerCase();
    
        // Split the original subdomain and domain
        const [subdomain, domain] = siteConfig.domain.split('.');
    
        // Replace "landing" with "app" in the subdomain
        const modifiedSubdomain = subdomain.replace("landing", "app");
    
        // Join the modified subdomain, company name, and domain back together
        return `https://${tenantId}.${modifiedSubdomain}.${domain}.com`;
      };

    
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            email: '',
            companyName: '',
            plan: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter name"),
            email: Yup.string().required("Please Enter Email"),
            companyName: Yup.string().required("Please Company Name"),
            plan: Yup.string().required("Please Enter Username"),
            password: Yup.string().required("Please Enter Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        }),
       
    });


   
   
  return (
    <React.Fragment>
      <div className="account-pages">
            <Container>
                <Row className="justify-content-center">
                    <Col md={11}>
                        <div className="auth-full-page-content d-flex min-vh-100 py-sm-5 py-4">
                            <div className="w-100">
                                <div className="d-flex flex-column h-100 py-0 py-xl-4">
    
                                    <div className="text-center mb-5">
                                        <Link to="/">
                                            <span className="logo-lg">
                                                <img src={logoDark} alt="" height="50" />
                                            </span>
                                        </Link>
                                    </div>
    
                                    <Card className="my-auto overflow-hidden">
                                            <Row className="g-0">
                                                <Col lg={6}>
                                                    <div className="p-lg-5 p-4">
                                                        
                                                        <div className="text-center">
                                                            <h5 className="mb-0">Create New Account</h5>
                                                            <p className="text-muted mt-2">Get your free ScalarHub account now</p>
                                                        </div>
                                                    
                                                        <div className="mt-4">
                                                        {success && <Alert variant="success">Your Redirect to Login Page in {timer} Seconds</Alert>}
                                                        <Form className="needs-validation"
                                                            action="#"
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                validation.handleSubmit(validation.values);
                                                                return false;
                                                            }}>


                                                            <Form.Group className="mb-3" controlId="fullname">
                                                                <Form.Label>Full name <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name='name'
                                                                    className="form-control bg-light border-light"
                                                                    placeholder="Enter full name"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.name || ""}
                                                                    isInvalid={
                                                                        validation.touched.name && validation.errors.name ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.name && validation.errors.name ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>
                                                                ) : null}

                                                            </Form.Group>
                                                                
                                                            <Form.Group className="mb-3" controlId="useremail">
                                                                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    name='email'
                                                                    className="form-control bg-light border-light"
                                                                    placeholder="Enter email address"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.email || ""}
                                                                    isInvalid={
                                                                        validation.touched.email && validation.errors.email ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.email && validation.errors.email ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                                ) : null}

                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="companyName">
                                                                <Form.Label>Company <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name='companyName'
                                                                    className="form-control bg-light border-light"
                                                                    placeholder="Enter company name"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.companyName || ""}
                                                                    isInvalid={
                                                                        validation.touched.companyName && validation.errors.companyName ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.companyName && validation.errors.companyName ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.companyName}</Form.Control.Feedback>
                                                                ) : null}

                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                            <Form.Label>Please select your service plan</Form.Label>
                                                            <select
                                                                id="plan"
                                                                name="plan"
                                                                className={`form-select bg-light border-light ${validation.touched.plan && validation.errors.plan ? 'is-invalid' : ''}`}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.plan || ""}
                                                            >
                                                                <option value="">Select one...</option>
                                                                <option value="basic">Basic</option>
                                                                <option value="standard">Standard</option>
                                                                <option value="premium">Premium</option>
                                                                <option value="platinum">Platinum</option>
                                                            </select>
                                                            {validation.touched.plan && validation.errors.plan && (
                                                                <div className="invalid-feedback">{validation.errors.plan}</div>
                                                            )}
                                                        </Form.Group>
                                                         

                    
                                                                <div className="fs-16 pb-2">
                                                                    <p className="mb-0 fs-14 text-muted fst-italic">By registering you agree to the ScalarHub <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                                </div>
                    
                                                                <div className="mt-2">
                                                                <button className="btn btn-primary w-100" type="button" onClick={onSubmit}>
                                                                    {loader && <Spinner size="sm" animation="border" />} Sign Up
                                                                </button>
                                                                </div>

                                                                {validation.values.companyName && (
                                                                    <div className="text-muted mt-3" style={{ marginTop: "5px" }}>
                                                                    <span>Your application will be hosted at</span>
                                                                    <div>
                                                                        <a href={getTenantUrl()}>{getTenantUrl()}</a>
                                                                    </div>
                                                                    </div>
                                                                )}
                                                                                
                                                                <div className="mt-4 text-center">
                                                                    <div className="signin-other-title">
                                                                        <h5 className="fs-15 mb-3 title">Create account with</h5>
                                                                    </div>
                                    
                                                                    <ul className="list-inline">
                                                                        <li className="list-inline-item">
                                                                            <Link to="#" className="social-list-item bg-primary text-white border-primary">
                                                                                <i className="mdi mdi-facebook"></i>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <Link to="#" className="social-list-item bg-info text-white border-info">
                                                                                <i className="mdi mdi-twitter"></i>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <Link to="#" className="social-list-item bg-danger text-white border-danger">
                                                                                <i className="mdi mdi-google"></i>
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                    
                                                                <div className="mt-4 text-center">
                                                                    <p className="mb-0">Don't have an account ? <Link to="/login" className="fw-medium text-primary text-decoration-underline"> Signin </Link> </p>
                                                                </div>
                                                            </Form>
                                                        </div>
                                    
                                                    </div>
                                                </Col>
                    
                                               <AuthCarousel/>
                                                
                                        </Row>
                                    </Card>
                                    
                                    
                                    <div className="mt-5 text-center">
                                        <p className="mb-0 text-muted">©
                                            <script>document.write(new Date().getFullYear())</script> ScalarHub. <i className="mdi mdi-heart text-danger"></i> All Rights Reserved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    
                </Row>
                
            </Container>
            
        </div>
    </React.Fragment>
  )
}

export default Register

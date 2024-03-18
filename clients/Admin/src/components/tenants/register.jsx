import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FormStyle from './FormStyle';
import { useNavigate } from 'react-router-dom';




const siteConfig = process.env.REACT_APP_SITE_CONFIG? JSON.parse(process.env.REACT_APP_SITE_CONFIG): null;
function RegisterComponent() {
  const { register, handleSubmit: handleFormSubmit, formState: { errors }, setValue } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({});

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const API_URL = siteConfig? `${siteConfig.apiUrl}/register` : 'https://api.udveg.com';
    const domain =  siteConfig? siteConfig.domain : 'admin.udveg.com';
    console.log('original API_url  '+API_URL );
    console.log('original Domain  '+domain );
   const user = {
      ...formData,
      customDomain: domain
    };
    console.log(user);
    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, user);
      setSuccess(true);
      setError(false);
      console.log(response.data);
      // Navigate to '/tenant-list' after successful submission
      navigate('/');

      // Show a success message to the user
      alert('A confirmation message has been sent to your email. Please confirm it.');

    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setValue(name, value);
  };

  const getTenantUrl = () => {
    const companyName = formValues.companyName || '';
    const re = /[\W\s]+/g;
    const tenantId = companyName.replace(re, '').toLowerCase();
    const domain1 = siteConfig ? siteConfig.domain : "admin.udveg.com";
    const [subdomain, domain] = domain1.split('.');
    const modifiedSubdomain = subdomain.replace("admin", "app");
    return `https://${tenantId}.${modifiedSubdomain}.${domain}.com`;
  };

  return (
    <>
      {error && <div className="alert alert-danger" role="alert">There was an error provisioning your tenant.</div>}
      {success && <div className="alert alert-success" role="alert">Successfully provisioned your tenant.</div>}

      <FormStyle title="Create new tenant" subtitle="">
        <form onSubmit={handleFormSubmit(onSubmit)} className="form">
          <div className="form-group">
            <label htmlFor="company-name" className="text-muted">Enter Full Name</label>
            <div className="input-group">
              <input
                type="text"
                id="fullname"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
            {errors.name && <div className="alert alert-danger" role="alert">Name is required.</div>}
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="company-name" className="text-muted">Enter Company Name</label>
            <div className="input-group">
              <div className="input-group">
                <input
                  type="text"
                  id="company-name"
                  name="companyName"
                  className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                  placeholder="Enter Company Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {errors.companyName && <div className="alert alert-danger" role="alert">Company Name is required.</div>}
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="email" className="text-muted">Email</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span ><i className="fa fa-envelope"></i></span>
              </div>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {errors.email && <div className="alert alert-danger" role="alert">Email is required.</div>}
          </div>
            <div className="form-group" style={{marginTop:"5px"}}>
                        <label htmlFor="plan" className="text-muted">Please select your service plan</label>
                        <select
                          id="plan"
                          name="plan"
                          className={`form-control ${errors.plan ? 'is-invalid' : ''}`}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select one...</option>
                          <option value="basic">Basic</option>
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                          <option value="platinum">Platinum</option>
                        </select>
                        {errors.plan && <div className="alert alert-danger" role="alert">Plan is required.</div>}
                      </div>

          {formValues.companyName &&
            <div className="text-muted mt-3" style={{ marginTop: "10px" }}>
              <span>Your application will be hosted at</span>
              <div>
                <a href={getTenantUrl()}>{getTenantUrl()}</a>
              </div>
            </div>
          }

          <div className="text-center mt-3">
            <button className="btn" type="submit" disabled={submitting} style={{
              backgroundColor: 'rgb(250, 70, 22)',
              color: 'white',
            }}>
              <span>{submitting ? 'Submitting...' : 'Create'}</span>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              style={{ marginLeft: '10%', width: '22%', color: '#FFFFFF' }}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </FormStyle>
    </>
  );
}

export default RegisterComponent;

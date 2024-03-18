// app/javascript/components/AuthForm.jsx
import React from 'react';
import '../style.css';

const FormStyle = ({ children, title, subtitle, message }) => (
  <div className="vh-100" style={{ background: 'white' }}>
    <div className="row justify-content-center align-items-center h-100">
    <div className="col-md-1">
        <a  target="_blank" rel="noopener noreferrer">
          <img src="https://scalarhub.io/wp-content/uploads/2023/12/13.png" width="800vh" height="auto" alt="Description" />
        </a>
      </div>
      <div className="col-md-3 offset-md-7">
        <div className="card form-box-shadow">
          <div className="card-header">
            <div className="row justify-content-center align-items-center">
              <div className="col text-center">
                <a href="http://scalarhub.io/" target="_blank" rel="noopener noreferrer">
                  <img src="http://scalarhub.io/wp-content/uploads/2023/05/top-logo.png" width="100px" height="auto" alt="Description" />
                </a>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col text-center">
                <h6>
                  {subtitle && (
                    <div className="mb-2" style={{ color: 'green', fontSize: '1.2rem' }}>
                      &#10003; {/* Green tick symbol */}
                      {subtitle}
                    </div>
                  )}
                </h6>
                <h4>{title}</h4>
                <h6>{message}</h6>
              </div>
            </div>
          </div>

          <div className="card-body">
            {children}
          </div>
        </div>
      </div>

      {/* Image outside the card */}
      
    </div>
  </div>
);

export default FormStyle;

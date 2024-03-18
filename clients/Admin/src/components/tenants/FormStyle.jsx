// app/javascript/components/AuthForm.jsx
import React from 'react';
import '../style.css';

const FormStyle = ({ children, title, subtitle, message }) => (
  <div>
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-5 ">
        <div className="card form-box-shadow">
          <div className="card-header">
            <div className="row justify-content-center align-items-center">
            </div>
            <div className="row justify-content-center">
              <div className="col text-center">
                <h6>
                  {subtitle && (
                    <div style={{ color: 'green', fontSize: '1.2rem' }}>
                      &#10003; {/* Green tick symbol */}
                      {subtitle}
                    </div>
                  )}
                </h6>
                <h2>{title}</h2>
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

import React, { useState, useEffect } from 'react';
import TenantService from './TenantService';

const TenantListComponent = () => {
  const [tenants, setTenants] = useState([]);
  const { getTenants } = TenantService();

  useEffect(() => {
    const fetchTenantsData = async () => {
      try {
        const tenantsData = await getTenants();
        setTenants(tenantsData);
        console.log(tenantsData);
      } catch (error) {
        // Handle error
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenantsData();
  }, []);

  return (
    <div className="animated fadeIn">
      <div className="row mb-3">
        <div className="col-sm-12">
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex">
              <span><i className="fa fa-align-justify"></i> All Tenants</span>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tenant Name</th>
                    <th>URL</th>
                    <th>Plan</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map(tenant => (
                    <tr key={tenant.tenantId}>
                      <td>{tenant.tenantId}</td>
                      <td><a href={tenant.authRedirectUri}>{tenant.authRedirectUri}</a></td>
                      <td>{tenant.plan}</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantListComponent;

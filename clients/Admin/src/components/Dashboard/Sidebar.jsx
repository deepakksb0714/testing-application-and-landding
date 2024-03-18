import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Collapse, Dropdown } from 'react-bootstrap';
import '../style.css';

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  return (
    <Nav className="flex-column sidenavbar" variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="menu-link">
          Home
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Dropdown.Toggle
          onClick={() => handleSubMenuClick('tenants')}
          as={Nav.Link}
          to="#"
          className="menu-link"
        >
          Tenants
        </Dropdown.Toggle>
        <Collapse in={openSubMenu === 'tenants'}>
          <div className="menu-items">
            <Nav.Link as={Link} to="/tenant-list" className="menu-link">
              Tenant List
            </Nav.Link>
            <Nav.Link as={Link} to="/new-tenant-registration" className="menu-link">
              Create new tenant
            </Nav.Link>
          </div>
        </Collapse>
      </Nav.Item>

      <Nav.Item>
        <Dropdown.Toggle
          onClick={() => handleSubMenuClick('users')}
          as={Nav.Link}
          to="#"
          className="menu-link"
        >
          Users
        </Dropdown.Toggle>
        <Collapse in={openSubMenu === 'users'}>
          <div className="menu-items">
            <Nav.Link as={Link} to="/users/list" className="menu-link">
              Users List
            </Nav.Link>
            <Nav.Link as={Link} to="/users/create" className="menu-link">
              Create New User
            </Nav.Link>
          </div>
        </Collapse>
      </Nav.Item>

      {/* Add other menu items here */}
    </Nav>
  );
};

export default Sidebar;

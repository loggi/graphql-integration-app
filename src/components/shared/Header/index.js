import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <Navbar dark expand={true}>
        <NavbarBrand href="/">
          <div className="logo">Loggi</div>
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpen(!open)} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Other examples
              </DropdownToggle>
              <DropdownMenu right>
                <Link className="dropdown-item" to="/login">
                  Get API key
                </Link>
                <Link className="dropdown-item" to="/orders">
                  Get orders
                </Link>
                <Link className="dropdown-item" to="/shops">
                  Get shops
                </Link>
                <DropdownItem divider />
                <a
                  className="dropdown-item"
                  href="https://docs.api.loggi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to API docs
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

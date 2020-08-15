import React, { useState } from 'react';
import InfoModal from './Modal'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Modal } from 'reactstrap';

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div class="Container">
        <p>부산대학교 2020 전기 졸업과제</p>
        <Navbar color="faded" light>
            <NavbarBrand className="mr-auto">INFO</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
                <NavItem>
                  <InfoModal/>
                </NavItem>
                <NavItem>
                  <Button color="link" href="https://github.com/znznz6037/GANFaceChanger">GitHub</Button>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
    </div>
  );
}

export default Header;
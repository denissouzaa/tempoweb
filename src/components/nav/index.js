import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoNav from '../../assets/nuvem.png';
import IconLupa from '../../assets/lupa.png';

export default function NavComponent() {
    return (
        <>
            <div className="menu-bar menu-text-color ">
                <Navbar collapseOnSelect expand="lg" className="navbar-light">
                    <Container className="containerCustom marginMobile">
                    
                        <div>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav bg-light" />
                            <Navbar.Brand href="#"><img src={LogoNav} alt="Logo Nuvem" width="40px" className="me-2" />Ilhabela, SP</Navbar.Brand>

                        </div>
                        {/* <div className="personExibe">
                            <img alt="Person" rel="noreferrer" className="border border-1 p-1 rounded-circle" width="30" src={person} />
                        </div> */}
                    
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link href="#">
                                    <img src={IconLupa} alt="Pesquisa" width="25px" />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
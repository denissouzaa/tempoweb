import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoNav from '../../assets/satelite.png';

export default function NavComponent() {
    return (
        <>
            <div className="menu-bar menu-text-color ">
                <Navbar collapseOnSelect expand="lg" className="navbar-light">
                    <Container className="col-md-7 mx-auto">

                        <div>
                            <Navbar.Toggle aria-controls="navbar-nav bg-light" />
                            <Navbar.Brand href="#"><img className="me-2" src={LogoNav} width="30em"/><span>Clima Tempo</span></Navbar.Brand>

                        </div>
                        {/* <div className="personExibe">
                            <img alt="Person" rel="noreferrer" className="border border-1 p-1 rounded-circle" width="30" src={person} />
                        </div> */}

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                {/* <Nav.Link href="https://beacons.ai/denissouza" target="_blank">
                                    Contato
                                </Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LogoNav from '../../assets/nuvem.png';
import IconLupa from '../../assets/lupa.png';

export default function NavComponent() {
    return (
        <>
            <div className="menu-bar menu-text-color ">
                <Navbar collapseOnSelect expand="lg" className="navbar-light">
                    <Container className="col-md-6 mx-auto">

                        <div>
                            <Navbar.Toggle aria-controls="navbar-nav bg-light" />
                            <Navbar.Brand href="#"><img className="me-2" src="https://cdn-icons.flaticon.com/png/512/4663/premium/4663568.png?token=exp=1638553329~hmac=0a6d048a8d0bdf6de51ee5c444136334" width="40px"/><span>Clima Tempo</span></Navbar.Brand>

                        </div>
                        {/* <div className="personExibe">
                            <img alt="Person" rel="noreferrer" className="border border-1 p-1 rounded-circle" width="30" src={person} />
                        </div> */}

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link href="https://beacons.ai/denissouza" target="_blank">
                                    Contato
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}
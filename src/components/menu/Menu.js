import React, {Component} from 'react';
import * as b from 'react-bootstrap';

export default class Menu extends Component 
{
    render(){
        return (
            <b.Navbar bg="dark" expand="lg"  variant="dark">
                <b.Container>
                <b.Navbar.Brand href="#home">React-Bootstrap</b.Navbar.Brand>
                <b.Navbar.Toggle aria-controls="basic-navbar-nav" />
                <b.Navbar.Collapse id="basic-navbar-nav">
                    <b.Nav className="mr-auto">
                    <b.Nav.Link href="#home">Home</b.Nav.Link>
                    <b.Nav.Link href="#link">Link</b.Nav.Link>
                    <b.NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <b.NavDropdown.Item href="#action/3.1">Action</b.NavDropdown.Item>
                        <b.NavDropdown.Item href="#action/3.2">Another action</b.NavDropdown.Item>
                        <b.NavDropdown.Item href="#action/3.3">Something</b.NavDropdown.Item>
                        <b.NavDropdown.Divider />
                        <b.NavDropdown.Item href="#action/3.4">Separated link</b.NavDropdown.Item>
                    </b.NavDropdown>
                    </b.Nav>
                
                </b.Navbar.Collapse>
                    <b.Col xs={2} md={1} variant="float-rigth">
                        <b.Image src="http://placehold.it/50x50" roundedCircle />
                    </b.Col>
                    <b.NavDropdown title="" id="basic-nav-dropdown" className="teste">
                        <b.NavDropdown.Item href="#action/3.1">Logout</b.NavDropdown.Item>
                    </b.NavDropdown>
                </b.Container>
            </b.Navbar>
        )
    }
}
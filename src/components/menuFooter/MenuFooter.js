import React, {Component} from 'react';
import * as b from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaRegCreditCard,FaUserCircle, FaCartPlus } from "react-icons/fa";

export default class MenuFooter extends Component 
{
    render(){
        return (
            <b.Navbar id="menuFooter" bg="dark" expand="lg"  variant="dark">
                <b.Container>
                    <NavLink to="app" className="butonIcon"><FaHome size={40} /></NavLink>
                    <NavLink to="info" className="butonIcon"><FaCartPlus size={40} /></NavLink>  
                    <NavLink to="cartao" className="butonIcon"><FaRegCreditCard size={40} /></NavLink>
                    <NavLink to="info" className="butonIcon"><FaUserCircle size={40} /></NavLink>  
                </b.Container>
            </b.Navbar>
        )
    }
}
// <b.Navbar.Brand href="/cartao">React-Bootstrap</b.Navbar.Brand>
//                 <b.Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <b.Navbar.Collapse id="basic-navbar-nav">
//                     <b.Nav className="mr-auto">
//                     <b.Nav.Link><NavLink to="app">Home</NavLink></b.Nav.Link>
//                     <b.Nav.Link><NavLink to="cartao">Link</NavLink></b.Nav.Link>
//                     <b.NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                         <b.NavDropdown.Item href="#action/3.1">Action</b.NavDropdown.Item>
//                         <b.NavDropdown.Item href="#action/3.2">Another action</b.NavDropdown.Item>
//                         <b.NavDropdown.Item href="#action/3.3">Something</b.NavDropdown.Item>
//                         <b.NavDropdown.Divider />
//                         <b.NavDropdown.Item href="#action/3.4">Separated link</b.NavDropdown.Item>
//                     </b.NavDropdown>
//                     </b.Nav>
//                 </b.Navbar.Collapse>
//                     <b.NavDropdown title="" id="basic-nav-dropdown" className="teste">
//                         <b.NavDropdown.Item href="/logout">Logout</b.NavDropdown.Item>
//                     </b.NavDropdown>
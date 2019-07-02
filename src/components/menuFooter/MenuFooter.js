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
                    <NavLink to="produtos" className="butonIcon"><FaCartPlus size={40} /></NavLink>  
                    <NavLink to="cartao" className="butonIcon"><FaRegCreditCard size={40} /></NavLink>
                    <NavLink to="info" className="butonIcon"><FaUserCircle size={40} /></NavLink>  
                </b.Container>
            </b.Navbar>
        )
    }
}
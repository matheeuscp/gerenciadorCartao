import React, {Component} from 'react';
import Menu from '../menu/Menu';
import "react-bootstrap/dist/react-bootstrap.min.js";
import * as b from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import MenuFooter from '../menuFooter/MenuFooter';

export default class Detalhe extends Component {
    render(){
        return(
            <div >
                <Menu/>
                    <b.Container style={{width:'100%'}}>
                        <b.Row className='conteudo'>
                            <b.Col xs={12} md={4}  style={{width: '100%',textAlign: 'left',height:'200px', margin:'0 auto'}}>
                                <b.Image src={require("../../img/perfil.jpg")} style={{padding:'10px', border:'1px solid lightgray', marginTop:'10px'}} width="150px" height="150px" roundedCircle />
                                <div style={{float: 'right', padding:'20px', textAlign:'left'}}>
                                    <h5 style={{fontWeight: 'bold'}}>Matheus Costa</h5>
                                    <small>Cpf: 15759633708</small>
                                    <h4 style={{textAlign:'left'}}><a href="#">Editar perfil</a></h4>
                                </div>
                                <b.Table  hover size="sm" style={{marginTop:'20px',textAlign: 'left'}}>
                                    <tbody>
                                        <tr >
                                            <td colspan='2' style={{fontWeight: 'bold', background:'lightgray'}}>Conta</td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'>Configurações</td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'><NavLink to="logout">Sair</NavLink></td>
                                        </tr>
                                    </tbody>
                                </b.Table>
                            </b.Col>
                        </b.Row>
                    </b.Container>
                <MenuFooter/>
            </div>
        );
    }
}
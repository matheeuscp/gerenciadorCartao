import React, {Component} from 'react';
import Menu from '../menu/Menu';
import "react-bootstrap/dist/react-bootstrap.min.js";
import * as b from 'react-bootstrap';
import MenuFooter from '../menuFooter/MenuFooter';

export default class Detalhe extends Component {
    render(){
        return(
            <div >
              <Menu/>
              <b.Container style={{width:'100%', textAlign:'center', padding:'0'}}>
                <b.Row className='conteudo' style={{display:'inline-block', width:'100%'}} >
                        <h1 style={{margin:'30px auto 0px',}}>Extrato</h1>
                        <b.Table   hover style={{width:'90%', margin:'10px auto',textAlign:'left'}}>
                                    <thead>
                                        <tr>
                                            <th nowrap>
                                                <small className="titulo">Saldo:</small><br/>
                                                <small className="titulo">(27/05/2019)</small>
                                            </th>
                                            <th>
                                                <small className="titulo">Gasto médio no período:</small>
                                            </th>
                                            <th>
                                                <small className="titulo">Total de crédito:</small>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td nowrap>R$ 200,00</td>
                                            <td nowrap>R$ 890,00</td>
                                            <td nowrap>R$ 1.400,00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"></td>
                                        </tr>
                                    </tbody>
                        </b.Table>
                        <b.Table striped bordered hover style={{width:'90%', margin:'10px auto'}}>
                            <thead>
                                <tr>
                                    <th>
                                        <small className="titulo">Data</small>
                                    </th>
                                    <th>
                                        <small className="titulo">Produto</small>
                                    </th>
                                    <th>
                                        <small className="titulo">Consumidor</small>
                                    </th>
                                    <th>
                                        <small className="titulo">Valor</small>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>15/05</td>
                                    <td>KitKat</td>
                                    <td>Matheus</td>
                                    <td>2,99</td>
                                </tr>
                                <tr>
                                    <td>16/05</td>
                                    <td>Roupa</td>
                                    <td>Thayná</td>
                                    <td>69,99</td>
                                </tr>
                            </tbody>
                        </b.Table>
                </b.Row>
                </b.Container>
              <MenuFooter/>
            </div>
        );
    }
}
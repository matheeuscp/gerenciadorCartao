import React from 'react';
import Menu from '../menu/Menu';
import * as b from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';
import Complete from '../complete/Complete';
import Loading from '../load/Load';
import MenuFooter from '../menuFooter/MenuFooter';

export default class CardOpt extends React.Component {
  	render() {
		return (
			<div key="Payment" >
				<Menu/>
				<b.Container style={{width:'100%'}}>
					<Loading/>
					<Complete/>
					<b.Row className='conteudo'>
						<b.Col md={{ span: 6, offset: 3 }}>
							<div className="App-payment" style={{padding:'0'}}>
								<div className="form-actions">
									<NavLink to="cadcartao"><button style={{marginBottom:'15px'}} className="btn btn-primary btn-block">Adicionar Cartão</button></NavLink>
									<NavLink to="app"><button className="btn btn-primary btn-block">Gerenciar Consumidores</button></NavLink>
								</div>
							</div>
						</b.Col>
					</b.Row>
				</b.Container>
				<MenuFooter/>
			</div>
		);
	}
}

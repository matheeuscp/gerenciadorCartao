import React from 'react';
import Card from 'react-credit-cards';
import Menu from '../menu/Menu';
import * as b from 'react-bootstrap';
import {formatCreditCardNumber,formatCVC,formatExpirationDate} from './utils';
import $ from 'jquery';
import api from '../../services/api';
import TratadorErros from  '../../TratadorErros';
import PubSub from 'pubsub-js';
import './styles.css';
import 'react-credit-cards/es/styles-compiled.css';
import Complete from '../complete/Complete';
import Loading from '../load/Load';
import MenuFooter from '../menuFooter/MenuFooter';

const link = {
    'color':'white',
}
export default class CadCartao extends React.Component {
	
	state = {
		number: '',
		name: '',
		expiry: '',
		cvc: '',
		issuer: '',
		focused: '',
		formData: null,
	};

	handleCallback = ({ issuer }, isValid) => {
		if (isValid) {
			this.setState({ issuer });
		}
	};

	handleInputFocus = ({ target }) => {
		this.setState({
			focused: target.name,
		});		
	};

	handleInputChange = ({ target }) => {
		if (target.name === 'number') {
			target.value = formatCreditCardNumber(target.value);
		} else if (target.name === 'expiry') {
			target.value = formatExpirationDate(target.value);
		} else if (target.name === 'cvc') {
			target.value = formatCVC(target.value);
		}

		this.setState({ [target.name]: target.value });
	};

	
	handleSubmit = e => {
		e.preventDefault();
		const token = localStorage.getItem('auth-token');

		$('#loading-full').toggle();

		var body = {
			nome_cartao   : this.state.name,
			numero_cartao : this.state.number.trim(),
			vencimento    : this.state.expiry,
			cod_seguranca : this.state.cvc,
			user_id       :''
		}
		PubSub.publish("limpa-erros",{});    
		api.post(`/cartao/${token}`, body,  { responseType: 'json' })
			.then(response => {
				$('#loading-full').hide();
				
				if(response.statusText == 'OK')
				{
					this.setState({name:'',number:'',passwordCad:'',expiry:'', cvc:''});
					$('.complete').show();
					setTimeout(function(){  $('.complete').hide(); }, 1700);
				}else
				{
					new TratadorErros().publicaErros(response.responseJSON);
					throw new Error("login incorreto");
				}
			})
			.catch(error => {
				$('#loading-full').toggle();
				console.log(error);return;
			});

		this.form.reset();
	};

  	render() {
		const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
		return (
			<div key="Payment" >
				<Menu/>
				<b.Container style={{width:'100%'}}>
					<Loading/>
					<Complete/>
					<b.Row className='conteudo'>
						<b.Col md={{ span: 6, offset: 3 }}>
							<div className="App-payment" style={{padding:'0'}}>
								<h2 style={{color:'black',margin:0}}>Adicionar cartão</h2>
								<h6 style={{color:'black', margin:'0 auto','textAlign':'center'}}>adicione um cartão à sua conta</h6>
								<Card
									number={number}
									name={name}
									expiry={expiry}
									cvc={cvc}
									focused={focused}
									callback={this.handleCallback}
								/>
								<form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
									<div className="form-group">
										<input
											type="tel"
											name="number"
											className="form-control"
											placeholder="Número do cartão"
											pattern="[\d| ]{16,22}"
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											name="name"
											className="form-control"
											placeholder="Nome"
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
										/>
									</div>
									<div className="row">
											<div className="col-6">
												<input
												type="tel"
												name="expiry"
												className="form-control"
												placeholder="Validade"
												pattern="\d\d/\d\d"
												required
												onChange={this.handleInputChange}
												onFocus={this.handleInputFocus}
												/>
											</div>
										<div className="col-6">
											<input
											type="tel"
											name="cvc"
											className="form-control"
											placeholder="CVC"
											pattern="\d{3,4}"
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
											/>
										</div>
									</div>
									<input type="hidden" name="issuer" value={issuer} />
									<div className="form-actions">
										<button className="btn btn-primary btn-block">Cadastrar</button>
									</div>
								</form>
							</div>
				{/* <div className="App-credits">
				Made with ❤️ at <a href="https://amaro.com/">AMARO</a>.
				</div> */}
						</b.Col>
					</b.Row>
				</b.Container>
				<MenuFooter/>
			</div>
		);
	}
}

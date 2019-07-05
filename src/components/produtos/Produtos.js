import React from 'react';
import Menu from '../menu/Menu';
import * as b from 'react-bootstrap';
import * as $ from 'jquery';
import api from '../../services/api';
import TratadorErros from  '../../TratadorErros';
import PubSub from 'pubsub-js';
import 'react-credit-cards/es/styles-compiled.css';
import Complete from '../complete/Complete';
import Loading from '../load/Load';
import MenuFooter from '../menuFooter/MenuFooter';
import  './search.css';
import Spinner from 'react-bootstrap/Spinner';

function filter(word, items) {
	var length = items.length;
    var hidden = 0;

	if(length === 0){
		$(items).hide();
		return;
	}
	for (var i = 0; i < length; i++) 
	{
		if (items[i].value.toLowerCase().startsWith(word.trim())) {
			$(items[i]).show();
		}
		else {
			$(items[i]).hide();
			hidden++;
		}
    }
	//If all items are hidden, show the empty view
    if(hidden === length) {
    	$('#aviso').show();
    }
    else {
		$("#aviso").hide();
	}
}
export default class Produtos extends React.Component {
	state = { lista: [], preco:'',barCode:'', consumidor:'' };
	
	handleInputChange = ({ target }) => {
		var items = $(".dropdown-item");
		if(target.value.trim().length === 0){
			items.hide();
			$("#aviso").show();
			return;
		}
		filter(target.value.trim().toLowerCase(), items);
            const token = localStorage.getItem('auth-token');
			$('.spinnerProd').show();
			var body = {nome:target.value}
			
			PubSub.publish("limpa-erros",{});    
			api.post(`/produtos/${token}`, body, {responseType: 'json'})
				.then(response => {
					$('.spinnerProd').hide();
					if(response.data.length > 0){
						$("#aviso").css('display','none');
						this.setState({lista: response.data});
						$(".dropdown-item").click(function(){
							$('#dropdown_coins').text($(this)[0].value);
							$('#codBarra').val($(this).parent().find('.barCode').val());
							$('#preco').val($(this).parent().find('.preco').val());
							$(".dropdown").removeClass('show');
							$(".dropdown-menu").removeClass('show');
						});
					}		
				})
				.catch(error => {
					$('#loading-full').toggle();
					$('#aviso').show();
					console.log(error);
					return;
				});
		this.setState({ [target.name]: target.value });
    };
	setCode(event){
        this.setState({barCode:event.target.value});
    }

    setPreco(event){
        this.setState({preco:event.target.value});
	}
	setConsumidor(event){
        this.setState({consumidor:event.target.value});
    }
  	render() {
		return (
			<div key="Payment" >
				<Menu/>
				<b.Container style={{width:'100%'}}>
					<Loading/>
					<Complete/>
					<b.Row className='conteudo'>
						<b.Col md={{span:6,offset: 3 }}>
							<div className="App-payment" style={{padding:'0'}}>
								<h2 style={{color:'black',margin:0}}>Adicionar compra</h2>
                                <form>
									<div className="form-group">
										<div>
											<label>Nome</label>
											<div className="dropdown">
												<button style={{border:'1px solid lightgray', textAlign:'left'}} className="btn dropdown-toggle form-control" type="button" id="dropdown_coins" data-toggle="dropdown" aria-haspopup="true"
													aria-expanded="false">
													Selecione o produto
												</button>
												<div style={{width:'100%'}} id="menu" className="dropdown-menu" aria-labelledby="dropdown_coins">
													<form className="px-4 py-2">
														<input type="search" className="form-control" id="searchCoin" placeholder="BTC" onChange={this.handleInputChange} autoFocus="autofocus"/>
													</form>
													<div id="menuItems" style={{width:'100%'}}>
														<Spinner style={{margin: '5% 45%',display:'none'}} className="spinnerProd" animation="border" role="status">
															<span className="sr-only">Loading...</span>
														</Spinner>
														{
															this.state.lista.map(produto => {
																console.log(produto);
																return (
																	<div key={produto.id}>
																		<input  type="button" className="dropdown-item"  value={produto.nome}/>
																		<input type="hidden" className="dropdown-item barCode"  value={produto.barCode}/>
																		<input type="hidden" className="dropdown-item preco"  value={produto.preco}/>
																	</div>
																);
															})  
														}
													</div>
													<div id="aviso" className="dropdown-header">Nenhum produto encontrado</div>
												</div>
											</div>
										</div>
									</div>
									<div className="form-group">
										<div>
											<label>Cod. Barra</label>
												<input
												type="number"
												name="codBarra"
												id="codBarra"
												className="form-control"
												placeholder="Cod. Barra"
												pattern="\d{3,4}"
												required
												onChange={this.setCode.bind(this)}
												value={this.state.barCode}
												/>
										</div>
									</div>
									<div className="form-group">
										<div>
											<label>Preço</label>
												<input
												type="tel"
												id="preco"
												name="preco"
												className="form-control"
												placeholder="Preço"
												pattern="\d{3,4}"
												required
												onChange={this.setPreco.bind(this)}
												value={this.state.preco}
												/>
										</div>
									</div>
									<div className="form-group">
										<div>
											<label>Consumidor</label>
												<select id="consumidor" name="consumidor" className="form-control" onChange={this.setConsumidor.bind(this)} value={this.state.consumidor}>
													<option>- Selecione -</option>
												</select>
										</div>
									</div>
									<div className="form-group">
										<div>
											<label>Consumidor</label>
												<button id="consumidor" name="consumidor" className="btn btn-primary form-control" onChange={this.setConsumidor.bind(this)} value={this.state.consumidor}>
													<option>- Selecione -</option>
												</button>
										</div>
									</div>
								</form>
                            </div>
						</b.Col>
					</b.Row>
				</b.Container>
				<MenuFooter/>
			</div>
		);
	}
}
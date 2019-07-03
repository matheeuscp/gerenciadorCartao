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


function filter(word, items) {
	var length = items.length;
    var collection = [];
    var hidden = 0;
    for (var i = 0; i < length; i++) {
		if (items[i].value.toLowerCase().startsWith(word)) {
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
	
	state = { lista: [] };

	
	handleInputChange = ({ target }) => {
		var items = $(".dropdown-item");
		filter(target.value.trim().toLowerCase(), items);
            const token = localStorage.getItem('auth-token');

			$('#loading-full').toggle();
			var body = {
				nome   : target.value,
			}
			
			PubSub.publish("limpa-erros",{});    
			api.post(`/produtos/${token}`, body,  { responseType: 'json' })
				.then(response => {
					$('#loading-full').hide();
					
					if(response.data.length > 0){
						$("#aviso").css('display','none');
						this.setState({lista: response.data});
						$(".dropdown-item").click(function(){
							$('#dropdown_coins').text($(this)[0].value);
							$(".dropdown").removeClass('show');
							$(".dropdown-menu").removeClass('show');
							// $("#dropdown_coins").dropdown('toggle');
						});
					}		
					// if(response.statusText == 'OK')
					// {
					// 	this.setState({name:'',number:'',passwordCad:'',expiry:'', cvc:''});
					// }else
					// {
					// 	new TratadorErros().publicaErros(response.responseJSON);
					// 	throw new Error("login incorreto");
					// }
				})
				.catch(error => {
					$('#loading-full').toggle();
					console.log(error);return;
				});
	
		this.setState({ [target.name]: target.value });
    };

  	render() {
		const { lista } = this.state;
		
		return (
			<div key="Payment" >
				<Menu/>
				<b.Container style={{width:'100%'}}>
					<Loading/>
					<Complete/>
					<b.Row className='conteudo'>
						<b.Col md={{span:6,offset: 3 }}>
							<div className="App-payment" style={{padding:'0'}}>
								<h2 style={{color:'black',margin:0}}>Adicionar cartão</h2>
								<h6 style={{color:'black', margin:'0 auto','textAlign':'center'}}>adicione um cartão à sua conta</h6>
                                <div className="form-group">
                                    <div className="col-6">
                                        <label>Cod. Barra</label>
										<div className="dropdown">
											<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdown_coins" data-toggle="dropdown" aria-haspopup="true"
												aria-expanded="false">
												Coin
											</button>
											<div id="menu" className="dropdown-menu" aria-labelledby="dropdown_coins">
												<form className="px-4 py-2">
													<input type="search" className="form-control" id="searchCoin" placeholder="BTC" onChange={this.handleInputChange} autoFocus="autofocus"/>
												</form>
												<div id="menuItems">
												{
													this.state.lista.map(comentario => {
														return (
															<input key={comentario.id} type="button" className="dropdown-item" type="button" value={comentario.nome}/>
														);
													})  
												}
												
												</div>
												<div id="aviso" className="dropdown-header">No coins found</div>
											</div>
										</div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-6">
                                        <label>Nome</label>

											<input
											type="tel"
											name="cvc"
											className="form-control"
											placeholder="Nome"
											pattern="\d{3,4}"
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
											/>
                                    </div>

							    </div>
                                <div className="form-group">
                                    <div className="col-6">
                                        <label>Preço</label>

											<input
											type="tel"
											name="cvc"
											className="form-control"
											placeholder="Preço"
											pattern="\d{3,4}"
											required
											onChange={this.handleInputChange}
											onFocus={this.handleInputFocus}
											/>
                                    </div>

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
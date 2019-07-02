import React from 'react';
import Card from 'react-credit-cards';
import Menu from '../menu/Menu';
import * as b from 'react-bootstrap';
import $ from 'jquery';
import api from '../../services/api';
import TratadorErros from  '../../TratadorErros';
import PubSub from 'pubsub-js';
import 'react-credit-cards/es/styles-compiled.css';
import Complete from '../complete/Complete';
import Loading from '../load/Load';
import MenuFooter from '../menuFooter/MenuFooter';
import SelectSearch from 'react-select-search';
import  './search.css';

const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
];
 
export default class Produtos extends React.Component {
	
	state = {
		number: '',
		name: '',
		expiry: '',
		cvc: '',
		issuer: '',
		focused: '',
		formData: null,
	};

	handleInputChange = ({ target }) => {
		
        console.log(target);return;
		if (target.name === 'cvc') {
            console.log(target.value);
            // target.value = formatCVC(target.value);
            const token = localStorage.getItem('auth-token');

		$('#loading-full').toggle();
		var body = {
			nome   : target.value,
        }

		PubSub.publish("limpa-erros",{});    
		api.post(`/produtos/${token}`, body,  { responseType: 'json' })
			.then(response => {
				$('#loading-full').hide();

                console.log(response);
                return;
				
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
		}
	
		this.setState({ [target.name]: target.value });
    };

  	render() {
		  //Capture the event when user types into the search box

		const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
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
								<div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdown_coins" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        Coin
    </button>
    <div id="menu" className="dropdown-menu" aria-labelledby="dropdown_coins">
        <form className="px-4 py-2">
            <input type="search" className="form-control" id="searchCoin" placeholder="BTC" autoFocus="autofocus"/>
        </form>
        <div id="menuItems">
		</div>
        <div id="empty" className="dropdown-header">No coins found</div>
    </div>
</div>
        
							   {/* <div className="col-md-4" style={{marginLeft:'200px'}}>


								<form method="post" id="multiple_select_form">
									<select name="framework" id="framework" className="form-control selectpicker" data-live-search="true">
									<option value="Laravel">Laravel</option>
									<option value="Symfony">Symfony</option>
									<option value="Codeigniter">Codeigniter</option>
									<option value="CakePHP">CakePHP</option>
									<option value="Zend">Zend</option>
									<option value="Yii">Yii</option>
									<option value="Slim">Slim</option>
									</select>
									<br /><br />
									<input type="hidden" name="hidden_framework" id="hidden_framework" />
									{/* <input type="submit" name="submit" className="btn btn-info" value="Submit" /> */}
								{/* </form> */}
								{/* </div> */} */}
                                    <div className="col-6">
                                        <label>Cod. Barra</label>
                                        {/* <input
                                        type="tel"
                                        name="cvc"
                                        className="form-control"
                                        placeholder="Código de Barra"
                                        pattern="\d{3,4}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        /> */}
                                        {/* <SelectSearch options={options} value="sv" name="cvc"  onChange={this.handleInputChange}  */}
                                        {/* onFocus={this.handleInputFocus} placeholder="Choose your language" /> */}
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

// <!DOCTYPE html>
// <html>
//  <head>
//   <title>Webslesson Tutorial | How to Use Bootstrap Select Plugin with PHP JQuery</title>
//   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
//   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  
//  </head>
//  <body>
//   <br /><br />
//   <div class="container">
//    <br />
//    <h2 align="center">How to Use Bootstrap Select Plugin with PHP JQuery</h2>
//    <br />
//    <div class="col-md-4" style="margin-left:200px;">

//     <br />
    
//    </div>
//   </div>
//  </body>
// </html>


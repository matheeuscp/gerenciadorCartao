import React, { Component } from 'react';
import api from './services/api';
import { createBrowserHistory }  from 'history';
import $ from 'jquery';
import Loading from './components/load/Load';
import InputCustomizado from './components/input/InputCustomizado';
import TratadorErros from  './TratadorErros';
import PubSub from 'pubsub-js';
import Cadastro from './Cadastro';


$("#voltar").click(function () {
    $("#formCad").toggle();
        
})

class FormLogin extends Component
{
    
    constructor(){

        super();
        this.state = {email:'',password:'', msg:''};
    }

    esconder(event){
        event.preventDefault();
        $("#formCad").show();
        $("#formLogin").hide();
    }

    Login(event){
        event.preventDefault();
        const history = createBrowserHistory();

        $('#loading-full').toggle();

        var body = {
            email   : this.state.email,
            password: this.state.password
        }

        PubSub.publish("limpa-erros",{});    

        api.post('/auth/login', body,  { responseType: 'json' })
            .then(response => {
                $('#loading-full').hide();

                if(response.statusText == 'OK')
                {
                    const token = response.data.access_token;
                    localStorage.setItem('auth-token', token);
                    history.push('/app');
                    window.location.reload();
                }else
                {
                    new TratadorErros().publicaErros(response.responseJSON);
                    throw new Error("login incorreto");
                }
            })
            .catch(error => {
                $('#loading-full').toggle();
                if(error.response.status != 200){
                    new TratadorErros().publicaErros(error.response.data.error);
                    this.setState({msg:'Login ou senha incorretos'});
                }
                return;
            });
    }

    setEmail(event){
        this.setState({email:event.target.value});
    }

    setSenha(event){
        this.setState({password:event.target.value});
    }

    render(){
        return(
            <div >
                <style>{'body { background: linear-gradient(to bottom right, #75618b, #383939); }'}</style>
                <div id="formLogin" className="login-box center" style={{'textAlign':'center'}}>
                    <img src={require("./img/logo.png")} width="200px"/>
                    
                    <form onSubmit={this.Login.bind(this)} method="post"> 
                        <InputCustomizado labels="Email" id="email" type="email" name="email" value={this.state.email} placeholder="digite seu email" onChange={this.setEmail.bind(this)}/>     
                        <InputCustomizado labels="Senha" id="senha" type="password" name="password" value={this.state.password} placeholder="digite sua senha" onChange={this.setSenha.bind(this)}/>     
                        <span style={{color:'red'}}>{this.state.msg}</span>
                        <button className="button type1">
                            Logar
                        </button>
                        <a onClick={this.esconder} href='#' id="cadastrar">cadastre-se</a>
                    </form>
                </div>
                <Cadastro clicar={this.esconder} display='none'/>

            </div>
        )
    }
}

export default class Login extends Component {  
    render(){ 
        return (
            <div>
                <Loading/>
                <FormLogin/>
            </div>
    );
  }   
}
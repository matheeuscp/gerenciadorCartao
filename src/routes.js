import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from './auth';
import Login from './Login';
import Cadastro from './Cadastro';
import Logout from './Logout';
import App from './App';
import CardOpt from './components/cardOpt/CardOpt';
import CadCartao from './components/cartao/CadCartao';
import Detalhe from './components/detalhe/Detalhe';
import Produtos from './components/produtos/Produtos';
import UserInfo from './components/userInfo/UserInfo';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} 
        render={props => (
            isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: '/login', state: {from:props.location}}}/>
            )
    )}/>
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact  path="/" component={Login}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <PrivateRoute exact path="/app" component={App}/>
            <PrivateRoute exact path="/detalhe" component={Detalhe}/>
            <PrivateRoute exact path="/cartao" component={CardOpt}/>
            <PrivateRoute exact path="/info" component={UserInfo}/>
            <PrivateRoute exact path="/cadcartao" component={CadCartao}/>
            <PrivateRoute exact path="/produtos" component={Produtos}/>
            <PrivateRoute  path="/logout" component={Logout}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;
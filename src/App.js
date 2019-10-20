import React, { Component } from 'react';
import { Route, Switch, withRouter ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/Burgerbuilder/Burgerbuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const asyncCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})
const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})
const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dipatch => {
  return {
    onTryAutoSignup: () => dipatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

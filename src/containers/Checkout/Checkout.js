import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     price:0
    // }

    // componentWillMount(){
    //     const query= new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         // ['salad','1']
    //         if(param[0]==='price'){
    //             price=param[1];
    //         }else{
    //             ingredients[param[0]]=+param[1];
    //         }

    //     }
    //     this.setState({ingredients:ingredients, totalPrice: price});
    // }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />        
        if (this.props.ings) {
            const purchasedRedirect=this.props.purchased ? <Redirect to="/"/>: null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        onCheckoutContinued={this.onCheckoutContinuedHandler} />

                    
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }

        return summary
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
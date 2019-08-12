import React, { Fragment } from 'react';
import { find } from 'lodash';
import TextInput from '../components/TextInput/text-input';
import Button from '../components/Button/button';
import Section from '../components/Section/section';
import utils from '@bigcommerce/stencil-utils';


export default class Coupon extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            coupon: "TEST3",
            coupons : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.CouponSubmit = this.CouponSubmit.bind(this);

    }
    
    CouponSubmit(){
        console.log("Coupon submit button pressed")
        let code = this.state.coupon

        utils.api.cart.applyCode(code, (err, response) => {
            console.log(code)
            if (response && response.data.status === 'success') {
                console.log('Coupon was successfull in bigcomerce')
                console.log(response)
                this.state.coupons.push(this.state.coupon)
                console.log(this.state.coupons)
                window.location.reload();
            } else {
                // swal({
                //     text: response.data.errors.join('\n'),
                //     type: 'error',
                // });
                window.location.reload();
                console.log('Coupon was not successfull')
            }
        });

    }
    handleChange(event) {
       
        this.setState({coupon: event.target.value});
        }


    render() {
        return (
            <Section
                header={ 'Coupons' }
                body={
            <Fragment>
          

                <TextInput
                    id={ `Coupon` }
                    label={ 'Coupon' }
                    value= {this.state.coupon} 
                    // { this.props.address.firstName }
                    // onChange={ ({ target }) => {
                    //     this.props.onChange('Coupon', target.value) 
                
                    // console.log(target) } }
                    onChange={this.handleChange}
                    />
                   
                    <Button
                                    label={ `Apply Coupon` }
                                    onClick={ this.CouponSubmit } />

            </Fragment>
                }/>
        );
    }
}
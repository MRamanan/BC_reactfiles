import React from 'react';
import InputContainer from '../InputContainer/input-container'
import Button from '../Button/Buton';
import styles from './coupanCart.scss';

export default class couponCart extends React.PureComponent {
   render() {
        return (
            <Section
                header={ '' }
                body={
            <Fragment>
          
          <Button
                label={ `Apply Coupon` }
                onClick={ this.CouponSubmit } />
             
                <ItemLine
                        icon = 'fa fa-close'
                        label={ `Coupon (${this.props.checkout.coupons[x].code})` }
                        amount={ formatMoney(-this.props.checkout.coupons[x].discountedAmount) } 
                />

            </Fragment>
                }/>
        );
    }
}

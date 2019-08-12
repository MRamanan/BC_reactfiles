import React from 'react';
import { formatMoney } from 'accounting';
import ItemLine from "./ItemLine/item-line";
import CouponLine from "./CouponLine/coupon-line";
import styles from './cart.scss';
import Coupon from '../Coupons/coupon';
var CryptoJS = require("crypto-js");



export default class Cart extends React.PureComponent {


   
    showCoupons(){
        console.log("ShowCoupons")
        let newCoupon = true;
        let c = JSON.parse(localStorage.getItem("Coupons"));
        console.log(this.props.checkout.coupons)
        console.log(c) 
        if(c){
            console.log(c)
            for(let x = 0; x < c.length; x ++){
                if(this.props.checkout.coupons.length >= 1){
                    console.log(this.props.checkout.coupons[0])
                    if(this.props.checkout.coupons[0].code && c[x] && c[x].code == this.props.checkout.coupons[0].code && c.length != 0)
                        newCoupon = false;
                    }
                }
            if(newCoupon && this.props.checkout.coupons[0]){
                console.log("Theres a new coupon code from prev")
                c.push(this.props.checkout.coupons[0])
                localStorage.setItem("Coupons", JSON.stringify(c) )
            }
        }
        else{
            console.log("INSIDE ELSE ")
            localStorage.setItem('Coupons',  JSON.stringify(this.props.checkout.coupons)) 
        }
        if(c)
            this.props.checkout.coupons = c


        console.log(this.props.checkout.coupons)
        let table = []
        let total_discount = 0;
        for(let x = 0; x < this.props.checkout.coupons.length; x ++){
            console.log("Inside for loop")
            if(this.props.checkout.coupons[x])
            total_discount += this.props.checkout.coupons[x].discountedAmount
            table.push(
               
             
                <CouponLine
                        icon = {true}
                        index = {x}
                        lastCouponCodeUsed = {this.props.checkout.coupons[0]}
                        label={ `Coupon (${this.props.checkout.coupons[x].code})` }
                        amount={ formatMoney(-this.props.checkout.coupons[x].discountedAmount) } 
                />
            )
        }
        this.props.checkout.grandTotal = this.props.checkout.subtotal - total_discount;
        return table
    }

    render() {
        return (
            
            <div className={ styles.container }>
                <div className={ styles.cartContainer }>
              
                    <div className={ styles.cartHeaderContainer }>
                        <div className={ styles.cartHeader }>
                            Your Order
                        </div>

                        <a href={ this.props.cartLink } className={ styles.cartAction }>
                            Return to cart
                        </a>
                    </div>
                    {this.showCoupons}
                    { ['physicalItems', 'digitalItems', 'giftCertificates'].map((keyType) => (
                        (this.props.checkout.cart.lineItems[keyType] || []).map((item) => (
                            <ItemLine
                                key={ item.id }
                                label={ `${ item.quantity } x ${ item.name }` }
                                amount={ formatMoney(item.extendedSalePrice) }
                                imageUrl={ item.imageUrl }/>
                        ))
                    )) }
                </div>

                <div className={ styles.orderSummaryContainer }>
                    <ItemLine
                        label={ 'Subtotal' }
                        amount={ formatMoney(this.props.checkout.subtotal) } />

                    { this.showCoupons() }

                    <ItemLine
                        label={ 'Shipping' }
                        amount={ formatMoney(this.props.checkout.shippingCostTotal) } />

                    <ItemLine
                        label={ 'Tax' }
                        amount={ formatMoney(this.props.checkout.taxTotal) } />

                    <div className={ styles.grandTotalContainer }>
                        <div className={ styles.grandTotalLabel }>
                            Total
                        </div>

                        <div className={ styles.grandTotalAmount }>
                            { formatMoney(this.props.checkout.grandTotal) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

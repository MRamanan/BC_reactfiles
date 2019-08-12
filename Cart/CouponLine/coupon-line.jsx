import React from 'react';
import styles from './coupon-line.scss';
import Button from '../../components/Button/button';
export default class CouponLine extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            coupon: "TEST3",
            coupons : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.CouponDelete = this.CouponDelete.bind(this);

    }
    CouponDelete(){
        console.log("Coupon delete button pressed")
        console.log(this.props.index)
        let i = this.props.index
        let code = this.props.code
        let c = JSON.parse(localStorage.getItem("Coupons"));
        console.log(c)
        for(let x = 0; x < c.length; x ++){
            console.log(c[x])

            if(code == c[x].code)
                i = x
        }
        console.log(c[i])
        if (i > -1) {
            if(i == c.length-1){
                let id = c[i].id
                if(c.length == 1)
                    c = []
                else 
                    c.splice(i, 1);
                console.log('Deleteing final/last entry coupon')
                console.log('http://localhost:3000/cart.php?action=removecoupon&amp;couponid='+id)
                let s = 'http://localhost:3000/cart.php?action=removecoupon&amp;couponid='+id
                localStorage.setItem("Coupons", JSON.stringify(c) )
                window.location.href = s
            }
            else{
                c.splice(i, 1);
            localStorage.setItem("Coupons", JSON.stringify(c) )
            window.location.reload();
            }
          }
        
    }
    handleChange(event) {
        // console.log(event.target.value)
        this.setState({coupon: event.target.value});
        }
    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.labelContainer }>
                        <Button
                        label={ `X` }
                        onClick={ this.CouponDelete } />
                    

                    <div className={ styles.label }>
                        <div> { this.props.label } </div>
                    </div>

                </div>
                <div className={ styles.amount }>
                    { this.props.amount }
                </div>
               
            </div>
        );
    }
}

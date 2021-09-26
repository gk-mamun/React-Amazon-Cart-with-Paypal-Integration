import React, { useState } from 'react'
import './CartTotal.css';
import NumberFormat from 'react-number-format';
import { PayPalButton } from "react-paypal-button-v2";

function CartTotal({ items, payableAmount, setPayableAmount }) {

    const getTotalPrice = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += (parseFloat(item.price) * parseFloat(item.quantity))
        })
        setPayableAmount(total.toFixed(2));
        return total;
    }

    

    const countTotatCartItems = (items) => {
        let countItem = 0;
        items.forEach((item) => {
            countItem += parseInt(item.quantity)
        })

        return countItem;
    }

    console.log(payableAmount)

    return (
        <div className="CartTotal">
            <h3>Subtotal({countTotatCartItems(items)} items):
                <span className="CartTotal-price">
                    <NumberFormat value={getTotalPrice(items)} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/>
                </span>
            </h3>
            {/* <button>Proceed to checkout</button> */}
            <PayPalButton
            options={{
                clientId: "AREvr8peZUHBv9XKHN8jCx22NjIdzYhCNTeCmGoxSDPlZL--2gAElMq-AktpUUwtFmbzifWyAa7iXzLS",
                currency: "USD",
                }}
                amount= {payableAmount}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);

                // // OPTIONAL: Call your server to save the transaction
                // return fetch("/paypal-transaction-complete", {
                //     method: "post",
                //     body: JSON.stringify({
                //     orderId: data.orderID
                //     })
                // });
                }}
                
            />
        </div>
    )
}

export default CartTotal

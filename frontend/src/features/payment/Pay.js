import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const KEY = "pk_test_51NCMrFIoCv5jK5tf9J0YjQ7voBjnITAjFkI4jid01vowueuwMXMpQbz9vecpiPrTolNZ21dpyCw9xcGRvfVAuKvN007hVQZiYf"

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {
        setStripeToken(token)
        // console.log(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:3500/payment", 
                    {
                        tokenId: stripeToken.id,
                        amount: 2000, // 10,000 pesos
                    }
                );
                console.log(res.data)
            } catch(error) {
                console.log(error)
            }
        };
        stripeToken && makeRequest()
    }, [stripeToken])

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout 
                name='Costa'
                billingAddress
                shippingAddress
                description='Your total is 2,000 pesos'
                amount={200000}
                token={onToken}
                stripeKey={KEY}
            >
                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}>Pay Now
                </button>
            </StripeCheckout>
        </div>
    )
}

export default Pay
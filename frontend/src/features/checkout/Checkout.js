import { useSelector } from 'react-redux'
import CheckoutForm from './CheckoutForm'

const Checkout = (selectedItems) => {

    console.log('selectedItems in checkout', selectedItems)
    const content = selectedItems ? <CheckoutForm product={selectedItems}/> : <p>Loading...</p>

    return content
}

export default Checkout
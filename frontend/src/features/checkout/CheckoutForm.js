import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { useCreateOrderMutation } from './orderApiSlice';

const CheckoutForm = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { selectedItems } = location.state;

    // const [createOrder, { isSuccess, isError, error }] = useCreateOrderMutation();

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        phoneNo: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        status: '',
    });

    const onPlaceOrderClicked = async () => {
        const orderData = {
        user: userId,
        orderItems: selectedItems,
        shippingInfo: {
            shippingInfo
        },
        paymentInfo: {
            paymentInfo
        },
        itemsPrice: calculateItemsPrice(selectedItems),
        taxPrice: calculateTaxPrice(selectedItems),
        shippingPrice: calculateShippingPrice(selectedItems),
        totalPrice: calculateTotalPrice(selectedItems),
        };

        try {
        // const response = await createOrder(orderData);
        // Handle successful order creation, e.g., show success message, clear cart, etc.
        // console.log(response.data);
        console.log(orderData);
        } catch (error) {
        // Handle error, e.g., show error message
        console.log(error);
        }
    };

    // Helper functions to calculate prices
    const calculateItemsPrice = (items) => {
        // Implement your logic to calculate the items price based on the selectedItems array
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTaxPrice = (items) => {
        // Implement your logic to calculate the tax price based on the selectedItems array
        return 0; // Example: assuming no tax
    };

    const calculateShippingPrice = (items) => {
        // Implement your logic to calculate the shipping price based on the selectedItems array
        return 0; // Example: assuming free shipping
    };

    const calculateTotalPrice = (items) => {
        // Implement your logic to calculate the total price based on the selectedItems array
        return calculateItemsPrice(items) + calculateTaxPrice(items) + calculateShippingPrice(items);
    };

    const handleShippingInfoChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevShippingInfo) => ({
        ...prevShippingInfo,
        [name]: value,
        }));
    };
    
    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo((prevPaymentInfo) => ({
        ...prevPaymentInfo,
        [name]: value,
        }));
    };

    return (
        <div className="max-w-xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <div>
            <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="address" value={shippingInfo.address} onChange={handleShippingInfoChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">City: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="city" value={shippingInfo.city} onChange={handleShippingInfoChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">State: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="state" value={shippingInfo.state} onChange={handleShippingInfoChange} />
                    
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Country: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="country" value={shippingInfo.country} onChange={handleShippingInfoChange} />
                    
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Pin Code: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="number" name="pinCode" value={shippingInfo.pinCode} onChange={handleShippingInfoChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone No: </label>
                        <input className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="number" name="phoneNo" value={shippingInfo.phoneNo} onChange={handleShippingInfoChange} />
                </div>
                
                
            </form>
        </div>
        <div>
            {/* Display payment information form */}
        </div>
        <div>
            {/* Display selected items */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedItems.map((item) => (
                <li key={item.id} className="bg-white shadow p-4 rounded-md">
                <p className="text-lg font-bold mb-2">{item.name}</p>
                <p className="text-gray-500 mb-2">{item.price}</p>
                <p className="text-gray-500 mb-2">{item.quantity}</p>
                <img className="w-full h-40 object-contain" src={item.image} alt={item.name} />
                </li>
            ))}
            </ul>
        </div>
        <div className="bg-white shadow p-4 rounded-md">
            {/* Display order summary */}
            <p className="mb-2"><span className="font-bold">Items Price: </span> {calculateItemsPrice(selectedItems)}</p>
            <p className="mb-2"><span className="font-bold">Tax Price: </span> {calculateTaxPrice(selectedItems)}</p>
            <p className="mb-2"><span className="font-bold">Shipping Price: </span> {calculateShippingPrice(selectedItems)}</p>
            <p className="mb-2"><span className="font-bold">Total Price: </span> {calculateTotalPrice(selectedItems)}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={onPlaceOrderClicked}>Place Order</button>
        </div>
    );
};

export default CheckoutForm;

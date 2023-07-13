import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/cartRedux";
import { useAddNewCartProductMutation } from '../cart/cartApiSlice';
import useAuth from '../../hooks/useAuth'; 

const ProductPageForm = ({ product, userId, email, carts, users }) => {
    
    const [addNewCartProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCartProductMutation()

    const [quantity, setQuantity] = useState(1);
    // const [userId, setUserId] = useState(users[0].id);
    // const [cartId, setCartId] = useState(carts[0].id);

    const consoleLogs = () => {
        console.log('product', product)
        console.log('userId', userId)
        console.log('email', email)
        console.log('carts', carts)
        console.log('users', users)
    }

    const handleQuantity = (type) => {
        if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
        } else {
        setQuantity(quantity + 1);
        }
    };
    
    useEffect(() => {
        if (isSuccess) {
            setQuantity(1)
        }
    }, [isSuccess])

    const canSave = [quantity, userId, product._id].every(Boolean) && !isLoading
    
    const onCreateCartClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log("canSave:", canSave);
            console.log(`userId, quantity, product._id, ${userId} ${quantity} ${product._id}`);
            await addNewCartProduct({ user: userId, quantity, product: product._id, })
        }
    }

    return (
        <div className='mx-auto w-3/5  border'>
            <div className='flex justify-around'>
                <div>
                    <img className="w-80 h-auto" src={product.image?.[0].url} alt="Product Preview" />
                </div>
                <div className="flex flex-col justify-between ml-5">
                    <div>
                        <button className='border bg-red-700' onClick={consoleLogs}>Click Here</button>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <p className="mb-4">{product.description}</p>
                        <p className="text-lg font-semibold">{product.price} Pesos</p>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="flex items-center mr-3">
                            <FontAwesomeIcon icon={faMinus} onClick={() => handleQuantity("dec")}/>
                            <p className="px-2">{quantity}</p>
                            <FontAwesomeIcon icon={faPlus} onClick={() => handleQuantity("inc")} />
                        </div>
                        {/* <Button onClick={handleClick}>ADD TO CART</Button> */}
                        <button 
                            onClick={onCreateCartClicked} 
                            className="bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 hover:bg-red-800 focus:outline-none"
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPageForm
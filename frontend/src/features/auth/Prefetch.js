import { store } from '../../app/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import { productsApiSlice } from '../../features/menu/productsApiSlice';
// import { usersApiSlice } from '../user/adminUsersApiSlice';
// import { ordersApiSlice } from '.././features/orders/ordersApiSlice';
// import { cartApiSlice } from '../../features/cart/cartApiSlice';

const Prefetch = () => {

    useEffect(() => {
        // store.dispatch(adminUsersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        console.log('subscribing')
        // const getUserCart = store.dispatch(cartApiSlice.endpoints.getUserCart.initiate())
        // const getCart = store.dispatch(cartApiSlice.endpoints.getCart.initiate())
        // const getUserCart = store.dispatch(cartApiSlice.endpoints.getUserCart.initiate())
        // const orders = store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())
        // const getProducts = store.dispatch(productsApiSlice.endpoints.getProducts.initiate())
        // const getCategoryProducts = store.dispatch(productsApiSlice.endpoints.getCategoryProducts.initiate())
        return () => {
            console.log('unsubscribing')
            // users.unsubscribe()
            // orders.unsubscribe()
            // getProducts.unsubscribe()
            // getCategoryProducts.unsubscribe()
            // getUserCart.unsubscribe()
            // getCart.unsubscribe()
            // getUserCart.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default Prefetch
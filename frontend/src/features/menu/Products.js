import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Product from './Product'
import axios from "axios";
import { popularProducts } from '../../data'

import { useSelector } from 'react-redux'
import { selectProductById } from './productsApiSlice';


const Products = ({ productId, category, sort }) => {

    const product = useSelector(state => selectProductById(state, productId))

    // const [products, setProducts] = useState([]);
    // const [categoryProducts, setCategoryProducts] = useState([]);

    // useEffect(() => {
    //   const getProducts = async () => {
    //     try {
    //       const res = await axios.get(
    //         category 
    //         ? `http://localhost:3500/products?category=${category}`
    //         : "http://localhost:3500/products" 
    //       );
    //       console.log('hello',res)
    //       setProducts(res.data);
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   };
    //   getProducts();
    // }, [category]);

    // useEffect(() => {
    //   if (category) { 
    //   setCategoryProducts(
    //       products.filter((item) =>
    //         item.category === category
    //       )
    //     );
    //   }
    // }, [products, category]);

    // useEffect(() => {
    //   if (sort === "newest") {
    //     setCategoryProducts((prev) =>
    //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
    //     );
    //   } else if (sort === "asc") {
    //     setCategoryProducts((prev) =>
    //       [...prev].sort((a, b) => a.price - b.price)
    //     );
    //   } else {
    //     setCategoryProducts((prev) =>
    //       [...prev].sort((a, b) => b.price - a.price)
    //     );
    //   }
    // }, [sort]);

    // useEffect(() => {
    //   console.log(categoryProducts);
    // }, [categoryProducts]);

    if (product) {
        
        const created = new Date(product.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const available = product.available ? 'Yes' : 'No'
        
        const consoleLogs = () => {
            console.log('-----------------')
            console.log('Product.js')
            console.log('-----------------')
            console.log('product', product)
            console.log('product._id', product._id)
            console.log('product.name', product.name)
            console.log('product.category', product.category)
            console.log('product.price', product.price)
            console.log('product.createdAt', product.createdAt)
            console.log('created', created)
            console.log('product.available', product.available)
            console.log('available', available)
            console.log('product.image', product.image)
            console.log('-----------------')
            console.log('product', product)
            console.log('productId', productId)
            console.log('-----------------')
        }

        return (
            <>
                {/* <div>
                    <button className='border bg-blue-700' onClick={consoleLogs}>Click Here</button>
                </div> */}
                <div className='flex flex-wrap justify-between p-5'>
                    {/* {category
                        ? categoryProducts.map((item) => 
                        <Product item={item} key={item.id} />)
                        : products
                        .slice(0, 8)
                        .map((item) => <Product item={item} key={item.id} />)
                    } */}
                    <Product productId={productId} key={product} product={product}/>
                </div>
                {/* //   <tr >
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product._id}</td>
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.name}</td>
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.category}</td>
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{product.price}</td>
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{created}</td>
                //         <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">{available}</td>

                //         {/* <td className="px-6 py-3 bg-gray-700 text-left text-sm font-medium">
                //             <button
                //                 onClick={handleEdit}
                //             >
                //                 <FontAwesomeIcon icon={faPenToSquare} />
                //             </button>
                //         </td>
                     </tr> */}
            </>
        
        )
    } else return null
    
} 

export default Products
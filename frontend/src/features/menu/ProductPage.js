import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Redux/cartRedux";
import { selectProductById } from "./productsApiSlice";
import ProductPageForm from "./ProductPageForm";
import { selectAllUsers } from "../user/userApiSlice";
import { selectAllCarts, useGetUserCartQuery } from "../cart/cartApiSlice";
import useAuth from '../../hooks/useAuth'

const ProductPage = () => {

  const { id, email, firstname, lastname, isEmployee, isAdmin } = useAuth()

  const location = useLocation();
  const productId = location.pathname.split("/")[3];

  // const { productId } = useParams();

  

  const product = useSelector(state => selectProductById(state, productId))
  const users = useSelector(selectAllUsers)  
  const carts = useSelector(selectAllCarts)

  const content = product ? <ProductPageForm product={product} userId={id} email={email} carts={carts} users={users}/> : <p>Loading...</p>

  return content
}

export default ProductPage
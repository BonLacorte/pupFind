// import { Badge } from "@material-ui/core";
// import { Badge} from 'reactstrap'
import { Badge } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

import useAuth from "../hooks/useAuth"

const DASH_REGEX = /^\/dash(\/)?$/
const MENU_REGEX = /^\/dash\/menu(\/)?$/
const PRODUCTS_REGEX = /^\/dash\/products(\/)?$/
const ABOUT_REGEX = /^\/dash\/about(\/)?$/
const GALLERY_REGEX = /^\/dash\/gallery(\/)?$/
const CONTACT_REGEX = /^\/dash\/contact(\/)?$/
const CART_REGEX = /^\/dash\/cart(\/)?$/
const PAYMENT_REGEX = /^\/dash\/payment(\/)?$/
const SUCCESS_REGEX = /^\/dash\/success(\/)?$/
const PROFILE_REGEX = /^\/dash\/profile(\/)?$/

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id, email, firstname, lastname, isEmployee, isAdmin } = useAuth()

  const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useSendLogoutMutation()

  const categories = ['Burger', 'Pasta', 'Hungarian', 'FriesAndNacho', 'RiceMeals'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const quantity = useSelector(state => state.cart.quantity)
  const quantity = 1

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const renderCategories = () => {
    return categories.map((category, index) => (
      <Link key={index} to={`/dash/menu/${category.replace(' ', '-')}`}>
        <p className="dropdown-item">{category}</p>
      </Link>
    ));
  };

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const cartButton = (
    <Link to={`/dash/cart/${id}`}>
        <Badge count={quantity} color="primary">
            <FontAwesomeIcon icon={faCartShopping} />
        </Badge>
    </Link>
  )

  const logoutButton = (
    <button
        className="icon-button"
        title="Logout"
        onClick={sendLogout}
    >
        <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
)

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !MENU_REGEX.test(pathname) && !PRODUCTS_REGEX.test(pathname) && !ABOUT_REGEX.test(pathname) && !GALLERY_REGEX.test(pathname) && !PRODUCTS_REGEX.test(pathname) && !CART_REGEX.test(pathname) && !PAYMENT_REGEX.test(pathname) && !SUCCESS_REGEX.test(pathname) && !PROFILE_REGEX.test(pathname) && !CONTACT_REGEX.test(pathname)) {
      dashClass = "dash-header__container--small"
  }

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  const content = (
    <header className="mx-auto w-3/5">
      <div>
        <div className="w-full container mx-auto flex items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <Link to="/dash">
              <h1 className="text-3xl font-serif text-red-700">Costa's</h1>
            </Link>
          </div>
          <div className="nav-menu-wrapper flex flex-row space-x-20">
            <div className="nav-menu-wrapper  flex flex-row space-x-4 relative">
              {/* <div
                className="relative"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <p className="menu-link">Menu</p>
                <div
                  className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-md py-2 transition-opacity duration-300 ${
                    isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {renderCategories()}
                </div>
              </div> */}
              <p className="menu-link">
                {/* <Link to="/dash/about">About</Link> */}
              </p>
              <p className="menu-link">
                {/* <Link to="/dash/gallery">Gallery</Link> */}
              </p>
              <p className="menu-link">
                {/* <Link to="/dash/contact">Contact</Link> */}
              </p>
                {/* {cartButton} */}
              <p className="menu-link">
                {/* <Link to="/register">Register</Link> */}
              </p>
              <p className="menu-link">
                {/* <Link to="/login">Login</Link> */}
              </p>
              <p className="menu-link">
                {/* <Link to="/dash/profile">Profile</Link> */}
              </p>
              <p className="menu-link">
                {logoutButton}          
              </p>
              <p className="menu-link">
                {/* <Link to="/admin/dash">Admin</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;

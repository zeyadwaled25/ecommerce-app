import { Link } from "react-router";
import HeaderIcon from '../../images/online-shop.png';
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Header() {
  const cookie = new Cookies()
  const token = cookie.get('Bearer')

  async function handleLogOut() {
    await axios.post('https://ecommerce-backend-production-8110.up.railway.app/api/logout', null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    cookie.remove('Bearer')
    window.location.pathname = "/login"
  }

  const cart = useSelector(state => state.cart);

  return (
    <>
      <div className="header-container">
        <div className="container">
          <div className="header" style={{ height: '60px'}}>
            <Link className="header-icon" to="/">
              <img className="logo" src={HeaderIcon} alt="" />
              <p className="title" to="/">
                E-commerce App
              </p>
            </Link>
            { !token ?
              <div className="header-links">
                <Link className="link" aria-current="page" to="/login">
                  Login
                </Link>
                <Link className="link" to="/signup">
                  Sign Up
                </Link>
              </div> :
              <div className="header-links">
                <Link className="cart-icon" aria-current="page" to="/cart">
                  <i className="bi bi-cart3 position-relative"><span className="cart-length">{cart.length}</span></i>
                </Link>
                <Link className="link" to="/about">
                  About
                </Link>
                <Link className="link" aria-current="page" to="/login" onClick={handleLogOut}>
                  Log Out
                </Link>
              </div>}
          </div>
        </div>
      </div>
    </>
  );
}

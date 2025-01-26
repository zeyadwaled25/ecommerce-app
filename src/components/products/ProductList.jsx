import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch } from 'react-redux';
import { addToCart } from '../rtk/slices/cart-slice'
import Swal from "sweetalert2";
import CoolPage from "../../pages/website/ScrollToTop";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }
  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) =>res.json())
      .then((data) => setCategories(data))
  }
  const getProductInCategory = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) =>res.json())
      .then((data) => setProducts(data))
  }

  useEffect(() => {
    getProducts()
    getCategories()
  }, []);

  const ToastAdd = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  return (
    <>
    <div className="product-list">
      <div className="container">
        <div className="buttons-filter row justify-content-center align-items-center text-center p-5">
          {categories.map((category) => {
            return (
              <button key={category} className="btn btn-info" onClick={() => {getProductInCategory(category)}}>{category}</button>
            )
          })}
          <button className="btn btn-info" onClick={getProducts}>ALL</button>
        </div>
        <div className="cards g-3 mb-5">
        {products.map((product) => {
          return (
            <div className="card" key={product.id}>
              <div className="image img-thumbnail text-center p-2">
                <img src={product.image} className="card-img-top" alt={product.title} 
                  style={{height:'120px', width:'100px'}}  
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{`${product.title.slice(0, 20)}...`}</h5>
                <p className="card-text">{`${product.description.slice(0, 75)}...`}</p>
                <div className="buttons d-flex justify-content-between">
                  <Link to={`/product/${product.id}`} className="details btn btn-info">
                    Details
                  </Link>
                  <button className="addCart btn btn-primary" onClick={() => {
                    dispatch(addToCart(product))
                    ToastAdd.fire({
                      icon: "success",
                      title: "Add in Cart successfully",
                      html: '<i id="close-alert" class="bi bi-x-circle m-0"></i>',
                    });
                    document.getElementById('close-alert').addEventListener('click', () => {
                      ToastAdd.close();
                    });
                  }}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            )
          })}
        </div>
        <CoolPage />
      </div>
    </div>
    </>
  );
}

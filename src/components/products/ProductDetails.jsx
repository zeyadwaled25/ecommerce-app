import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../rtk/slices/cart-slice'
import Swal from "sweetalert2";
import CoolPage from "../../pages/website/ScrollToTop";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  let { productID } = useParams();

  const dispatch = useDispatch();

  const getSpecificProductFromCategory = () => {
    fetch(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  };

  const getProductInCategory = () => {
    if (product.category) {
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  };

  useEffect(() => {
    getSpecificProductFromCategory();
    getProductInCategory();
  }, [productID, product.category]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
    <div className="product-details container">
      <h1 className="mb-5">Product #{productID}</h1>
      <div className="details">
        <img className="image"
          src={product.image}
          alt={product.title}
        />
        <div className="info">
          <h3>Title: <span>{product.title}</span></h3>
          <h3>Category: <span>{product.category}</span></h3>
          <h3>Description: <span>{product.description}</span></h3>
          <h3>Price: <span>{`${product.price}$`}</span></h3>
          <button className="addCart btn btn-primary" onClick={() => {
            dispatch(addToCart(product))
            ToastAdd.fire({
              icon: "success",
              title: "Add in Cart successfully",
              html: '<i id="close-alert" class="bi bi-x-circle m-0"></i>',
            })
            document.getElementById('close-alert').addEventListener('click', () => {
              ToastAdd.close();
            });
          }}>
            Add To Cart
          </button> 
        </div>
      </div>

      <h2 className="mt-5 mb-3">Related Products</h2>
      <div className="cards gap-3 mb-5">
        {products.map((relatedProduct) => {
          if (relatedProduct.id != productID) {
            return (
              <div className="card" key={relatedProduct.id}>
                <div className="image img-thumbnail text-center p-2">
                  <img
                    src={relatedProduct.image}
                    className="card-img-top"
                    alt={relatedProduct.title}
                    style={{ height: "150px", width: "100px" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{`${relatedProduct.title.slice(0, 20)}...`}</h5>
                  <p className="card-text">{`${relatedProduct.description.slice(0, 75)}...`}</p>
                  <div className="buttons d-flex justify-content-between">
                    <Link to={`/product/${relatedProduct.id}`} className="details btn btn-primary"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }} >
                      Details
                    </Link>
                    <button className="addCart btn btn-primary" onClick={() => {
                      dispatch(addToCart(relatedProduct))
                      ToastAdd.fire({
                        icon: "success",
                        title: "Add in Cart successfully",
                        html: '<i id="close-alert" class="bi bi-x-circle m-0"></i>',
                      })
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
          }
        })}
      </div>
      <CoolPage />
    </div>
  );
}
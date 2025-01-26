import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from '../rtk/slices/cart-slice'
import Swal from "sweetalert2";
import CoolPage from "../../pages/website/ScrollToTop";

export default function Cart() {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc
  }, 0)

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="mb-3">Shopping Cart</h1>
        <button className="btn btn-danger mb-2" onClick={() => {
          cart.length ?
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Clear it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Cart has been Cleared.",
                icon: "success"
              });
              dispatch(clearCart())
            }
          })
          :
          Swal.fire({
            title: "No Items in Cart to clear!",
            icon: "warning",
            draggable: true
          });
        }}>Clear Cart</button>
        <div className="cart-details">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th className="text-start">Product Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className="text-start"><img src={product.image} alt="" /></td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price * product.quantity}</td>
                    <td><i className="bi bi-trash delete-from-cart" onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          dispatch(deleteFromCart(product))
                        }
                      });
                    }}></i></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="checkout">
            <p>Order Summary</p>
            <p>Total Items: {cart.length}</p>
            <hr />
            <p>Total Amount: {totalPrice.toFixed(2)} $</p>
            <div className="btn btn-success w-100 mt-2" onClick={() => {
              cart.length ?
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Checkout Now!"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Success!",
                    text: "Your order is on its way.",
                    icon: "success"
                  });
                  dispatch(clearCart())
                }
              })
              :
              Swal.fire({
                title: "No Items to Checkout!",
                icon: "warning",
                draggable: true
              });
            }}>Checkout Now</div>
          </div>
        </div>
        <CoolPage />
      </div>
    </div>
  );
}

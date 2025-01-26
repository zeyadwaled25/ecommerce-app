import { Routes, Route } from "react-router";
import Header from "./pages/website/Header"
import SignUp from "./components/forms/SignUp"
import Login from "./components/forms/Login"
import Slider from './pages/website/Slider';
import ProductList from './components/products/ProductList';
import About from './pages/website/About';
import ProductDetails from './components/products/ProductDetails';
import RequireAuth from "./pages/auth/RequireAuth";
import PersistLogin from "./pages/auth/PersistLogin";
import Cart from "./components/products/Cart";

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<>
                <Slider />
                <ProductList />
              </>} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:productID" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App

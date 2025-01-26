import { useState, useContext } from "react"
import axios from "axios"
import { User } from "../../pages/auth/Context"
import { Link } from "react-router"
import Cookies from "universal-cookie"

export default function Login() {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  })
  const [flag, setFlag] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const userNow = useContext(User)

  const regexEmail = /^[a-z]+(\.?[a-z0-9]){5,}[0-9]?@g(oogle)?mail\.com$/
  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/

  // Cookie
  const cookie = new Cookies()

  const submit = async (e) => {
    e.preventDefault()
    setFlag(true)

    let accept;
    regexEmail.test(dataForm.email) &&
    regexPassword.test(dataForm.password)
    ? accept = true
    : accept = false

    try {
      if (accept) {
        let res = await axios.post("https://ecommerce-backend-production-8110.up.railway.app/api/login", {
        email: dataForm.email,
        password: dataForm.password
        })
        setEmailError(false)
        setPasswordError(false)
        const token = res.data.data.token
        cookie.set('Bearer', token, {path: "/"})
        const userDetails = res.data.data.user
        userNow.setAuth({ token, userDetails });
        window.location.pathname = "/"
      }
    } catch(error) {
      if (error.response.status === 401) {
        const errorMessage = error.response.data.message;
      
        if (errorMessage === 'Incorrect password.') {
          setEmailError(false)
          setPasswordError(error.response.status);
        } else if (errorMessage === 'User not found.') {
          setPasswordError(false)
          setEmailError(error.response.status);
        }
      }
    }
  }

  return (
    <div className="login">
      <form onSubmit={submit}>
        <h1 className="m-0 mb-4 text-center">Login</h1>
        <div className="email position-relative">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter Email..." required
          value={dataForm.email}
          onChange={(e) => {
            setDataForm({...dataForm, email: e.target.value})
            setEmailError(false)
          }}
          />
          {
            regexEmail.test(dataForm.email) && flag || dataForm.email == ''? (
              emailError === 401 ? (
                <p className="error-validation">This email is not registered.</p>
              ) : (
                null
              )
            ) :
            !regexEmail.test(dataForm.email) ? (
            <p className="error-validation">Incorrect email.</p>
            ) : null
          }
        </div>
        <div className="password position-relative">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter Password..."
          value={dataForm.password}
          onChange={(e) => {
            setDataForm({...dataForm, password: e.target.value})
            setPasswordError(false)
          }}
          />
          {
            regexPassword.test(dataForm.password) && flag || dataForm.password == ''? (
              passwordError === 401 ? (
                <p className="error-validation">Incorrect Password.</p>
              ) : (
                null
              )
            ) :
            !regexPassword.test(dataForm.password) ? (
            <p className="error-validation">Password must be greater than 8 chars!.</p>
            ) : null
          }
        </div>
        <button className="btn btn-success m-auto mt-3" type="submit" style={{width: 75}}>Login</button>
        <p className="text-center m-0 mt-3">Don&apos;t have an account? <Link to={"/signup"} style={{color: 'darkcyan', fontWeight: '600', fontSize: '18px'}}>Register</Link></p>
      </form>
    </div>
  )
}
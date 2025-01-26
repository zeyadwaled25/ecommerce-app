import { useContext, useState } from "react"
import axios from "axios"
import { User } from "../../pages/auth/Context"
import Cookies from "universal-cookie"

export default function SignUp() {
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })
  const [flag, setFlag] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const userNow = useContext(User)

  const regexName = /[a-z]{3,}/
  const regexEmail = /^[a-z]+(\.?[a-z0-9]){5,}[0-9]?@g(oogle)?mail\.com$/
  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/

  // Cookie
  const cookie = new Cookies()

  const submit = async (e) => {
    e.preventDefault()
    setFlag(true)

    let accept;
    regexName.test(dataForm.name) &&
    regexEmail.test(dataForm.email) &&
    regexPassword.test(dataForm.password) &&
    dataForm.cpassword == dataForm.password
    ? accept = true
    : accept = false

    try {
      if (accept) {
        let res = await axios.post("https://ecommerce-backend-production-8110.up.railway.app/api/register", {
        name: dataForm.name,
        email: dataForm.email,
        password: dataForm.password,
        password_confirmation: dataForm.cpassword 
        })
        setEmailError(false)
        const token = res.data.data.token
        cookie.set('Bearer', token, {path: "/"})
        const userDetails = res.data.data.user
        userNow.setAuth({token, userDetails})
        window.location.pathname = "/login"
      }
    } catch(error) {
      setEmailError(error.response.status)
    }
  }

  return (
    <div className="sign-up">
      <form onSubmit={submit}>
        <h1 className="m-0 mb-4 text-center">Sign Up</h1>
        <div className="name position-relative">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Enter Name..."
          value={dataForm.name}
          onChange={(e) => {setDataForm({...dataForm, name: e.target.value})}}
          />
          {dataForm.name != ''
          ?
          !regexName.test(dataForm.name) && flag && <p className="error-validation">Username Too Short</p>
          :
          !regexName.test(dataForm.name) && flag && <p className="error-validation">Username is Required</p>

        }
        </div>
        <div className="email position-relative">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter Email..."
          value={dataForm.email}
          onChange={(e) => {setDataForm({...dataForm, email: e.target.value})}}
          />
          {dataForm.email != ''
            ?
            regexEmail.test(dataForm.email) && flag ? (
              emailError === 422 ? (
                <p className="error-validation">Email Already Exists</p>
              ) : (
                null
              )
            ) : <p className="error-validation">Invalid Email Format</p>
            :
            flag && <p className="error-validation">Email is Required</p>
          }
        </div>
        <div className="password position-relative">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter Password..."
          value={dataForm.password}
          onChange={(e) => {setDataForm({...dataForm, password: e.target.value})}}
          />
          {!regexPassword.test(dataForm.password) && flag && <p className="error-validation">The password must be at least 8 chars</p>}
        </div>
        <div className="cpassword position-relative">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input id="confirm-password" type="password" placeholder="Repeat Password..."
          value={dataForm.cpassword}
          onChange={(e) => {setDataForm({...dataForm, cpassword: e.target.value})}}/>
          {dataForm.cpassword != ''
          ?
          dataForm.cpassword != dataForm.password && flag && <p className="error-validation">The confirmation password do not match</p>
          :
          null
          }
        </div>
        <button className="btn btn-success m-auto mt-3" type="submit" style={{width: 100}}>Register</button>
      </form>
    </div>
  )
}
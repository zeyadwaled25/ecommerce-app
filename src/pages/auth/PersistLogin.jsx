import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { User } from "./Context";
import axios from "axios";
import LoadingScreen from "../website/Loading"
import Cookies from "universal-cookie";

export default function PersistLogin() {
  // Get Current User
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);

  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get('Bearer');

  // Send Refresh Token
  useEffect(() => {
    async function refresh() {
      try {
        await axios.post(`https://ecommerce-backend-production-8110.up.railway.app/api/refresh`, null, {
          headers: {
            Authorization: 'Bearer ' + getToken,
          },
        }).then((data) => {
          cookie.set("Bearer", data.data.token, {path: "/"});
          context.setAuth(() => {
            return { 
              userDetails: data.data.user,
              token: data.data.token,
            }
          });
        })
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  
    !token ? refresh() : setLoading(false)
  }, [])

  return (
    loading ? <LoadingScreen /> : <Outlet />
  )
}
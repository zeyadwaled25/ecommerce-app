import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.css"
import App from './App.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter } from "react-router";
import UserProvider from './pages/auth/Context.jsx'
import { store } from './components/rtk/store.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)

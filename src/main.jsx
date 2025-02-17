import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite/dist/flowbite.min.js';



import './../node_modules/@fortawesome/fontawesome-free/css/all.css'
import TokenContextProider from './components/Context/TokenContext.jsx'
import CartContextProvider from './components/Context/CartContext.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'


createRoot(document.getElementById('root')).render(

  
  <TokenContextProider>
    <Provider store={store}>
    <CartContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </CartContextProvider>
    </Provider>
  </TokenContextProider>
  
)

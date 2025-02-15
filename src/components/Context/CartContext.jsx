import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function AddToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        setCartId(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        toast.success(response.data.message);
        return response;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return err;
      });
  }

  async function GetCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        if (!localStorage.getItem("cartOwner")) {
          localStorage.setItem("cartOwner", response.data.data.cartOwner);
        }
        setCartId(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function RemoveItem(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setCartId(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function updateItem(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        setCartId(response.data.data._id);
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function ClearItem() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        window.location.href = response.data.session.url;
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function cashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        localStorage.setItem("cartOwner", response.data.data.user);
        window.location.href = "http://localhost:5173/allorders";
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  return (
    <CartContext.Provider
      value={{
        AddToCart,
        onlinePayment,
        cashPayment,
        GetCart,
        RemoveItem,
        updateItem,
        ClearItem,
        numOfCartItems,
        totalCartPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

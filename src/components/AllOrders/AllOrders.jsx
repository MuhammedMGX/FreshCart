import React, { useContext, useEffect, useState } from "react";
import Styles from "./AllOrders.module.css";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import Loader from "../Loader/Loader";

export default function AllOrders() {




  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(localStorage.getItem("cartOwner"));



  async function getUserOrders() {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cartOwner")}`)
      .then((response) => {
        console.log(response.data);
        setUserOrders(response.data);
        
        return response;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
  }



  useEffect(() => {
    getUserOrders()
  }, [])
  

  return (
    <>
      <div className="relative container mx-auto overflow-x-auto sm:rounded-lg mb-10">


      {userOrders.map((item)=>  <table key={item._id} className=" rounded-lg overflow-hidden w-[90%] mx-auto text-sm text-left rtl:text-right shadow-xl text-gray-500 dark:text-gray-400 my-20">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              
              <th scope="col" className="px-6 py-3 w-1/2">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>

          {item.cartItems.map((item1)=><tr key={item1._id} className="rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-start w-1/2">
              {item1.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">

                  <div>
                    <span>{item1.count}</span>
                  </div>

                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item1.price}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item1.price * item1.count}
              </td>
            </tr>)}


            <tr className="font-semibold text-black bg-gray-300 dark:text-white dark:bg-gray-700">
              

              <td className="px-6 py-3 font-normal dark:text-white">
                {new Date(item.createdAt).toISOString().replace('T', ' ').slice(0, 16).replace(/(\d{2}):(\d{2})/, (_, h, m) => ` ${+h % 12 || 12}:${m}${h < 12 ? 'am' : 'pm'}`)}
              </td>

              <td className="px-6 py-3 font-semibold  dark:text-white">
                {item.isDelivered? "Delivered" : "Not Delivered"}
              </td>

              <td className="px-6 py-3 font-semibold  dark:text-white">
                {item.isPaid? "Paid" : "Not Paid"}
              </td>

              <td className="px-6 py-3 font-semibold  dark:text-white">
                {item.paymentMethodType}
              </td>


            </tr>

          </tbody>
          </table> )}
        



      </div>
    </>
  );
}



import React from "react";
import Styles from "./ChangePassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  let Navigate = useNavigate();
  const [isloading, setisloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },

    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      password: Yup.string()
        .required("password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "password must contain at least 8 characters, one letter and one number"
        ),
      rePassword: Yup.string()
        .required("password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    onSubmit: (values) => {
      changePassword(values);
    },
  });

  async function changePassword(values) {
    setisloading(true);
    return await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);

        setisloading(false);
        Navigate("/UserProfile");

        return response;
      })
      .catch((err) => {
        setisloading(false);
        return err;
      });
  }

  return (
    <>
      <div className="w-full mx-auto h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className=" md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl"
        >
          <h1 className="text-xl font-semibold mb-5">
            Change your account password :
          </h1>

          <div className="mb-5">
            <label
              htmlFor="currentPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              name="currentPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              type="password"
              id="currentPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword ? (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">
                {formik.errors.currentPassword}
              </span>
            </div>
          ) : null}

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}

          <div className="mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              rePassword
            </label>
            <input
              name="rePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              id="rePassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}

          {isloading ? (
            <button
              type="submit"
              className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"
            >
              <i className="fa fa-spinner fa-spin dark:text-black"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"
            >
              Verify
            </button>
          )}
        </form>
      </div>
    </>
  );
}

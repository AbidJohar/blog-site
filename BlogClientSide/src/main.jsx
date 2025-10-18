/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import {Toaster}  from 'react-hot-toast'
import AddBlog from "./pages/AddBlog.jsx";
import Signup from "./pages/Signup";
import EditBlog from "./pages/EditBlog.jsx";
import Login from "./pages/Login.jsx";
import Blog from "./pages/Blog.jsx";
import AllUserBlogs from "./pages/AllUserBlogs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/my-blogs",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllUserBlogs />
          </AuthLayout>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-blog/:id",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />  
    </>
  </Provider>
);

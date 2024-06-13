import "./static/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { createRoot } from "react-dom/client";
import PostPage from "./Pages/PostPage";
import App from "./App";
import React from "react";
//路由对象，对应看帖，发帖，注册和登录
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,//app组件用于根路径
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      { path: "/Login", element: <Login /> },
      {
        path: "/PostPage/:id/:title",

        element: <PostPage />,
      },
    ],
  },
]);
//获取html根元素，找不到就error
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
// 创建根元素并渲染
const root = createRoot(rootElement);
root.render(<React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>);

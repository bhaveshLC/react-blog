import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import About from "./Components/About/About.tsx";
import Contact from "./Components/Contact/Contact.tsx";
import Login from "./Pages/Auth/Login/Login.tsx";
import Signup from "./Pages/Auth/Sign-up/Signup.tsx";
import Posts from "./Pages/Posts/Posts.tsx";
import Addpost from "./Pages/Add_Post/Addpost.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="create-post" element={<Addpost />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      ,<Route path="login" element={<Login />} />
      ,<Route path="sign-up" element={<Signup />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

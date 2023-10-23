import './App.css';
import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Main from "./pages/Main"
import Host from "./pages/Host/Host"
import About from "./pages/About"
import Login from "./pages/Login"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Main />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
    />
     <Route
      path="vans"
      element={<Vans />}
      loader={vansLoader}
    />
    <Route path="vans/:id" element={<VanDetail />} />
    <Route path="host" element={<Host />} />
    
    
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

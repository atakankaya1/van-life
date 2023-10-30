import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Main from "./pages/Main"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard, { loader as dashboardLoader } from "./pages/Host/Dashboard"
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans"
import HostVanDetail, { loader as hostVanDetailLoader } from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import Login from "./pages/Login"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Error from "./components/Error"
import "./server"
import { redirect } from "react-router-dom"
import { useSelector } from 'react-redux';


export async function requireAuth(request) {
    const isLoggedIn = localStorage.getItem("loggedin")
    const {
      loggedIn} = useSelector((state)=>{
      return state.user
  })

    if (!loggedIn) {
        const response = redirect(`/login?message=You must log in first.`)
        response.body = true 
        throw response
    }
}

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
      errorElement={<Error />}
      
    />
    <Route 
      path="vans/:id" 
      element={<VanDetail />} 
      errorElement={<Error />}
    />

    <Route path="host" element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
      />
      <Route
        path="vans"
        element={<HostVans />}
        errorElement={<Error />}
        loader={hostVansLoader}
      />
      <Route
        path="vans/:id"
        element={<HostVanDetail />}
        errorElement={<Error />}
        loader={hostVanDetailLoader}
      >
        <Route
          index
          element={<HostVanInfo />}
          loader={hostVanDetailLoader}
        />
        <Route
          path="pricing"
          element={<HostVanPricing />}
          loader={hostVanDetailLoader}
        />
        <Route
          path="photos"
          element={<HostVanPhotos />}
          loader={hostVanDetailLoader}
        />
      </Route>
    </Route>
    
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import AboutUs from './pages/AboutUs/AboutUs';
import Error from './pages/Error/Error';
import Product from './pages/Product/Product';
import { Layout } from './components/Layouts/Menu/Layouts';
import AuthLayout from './components/Layouts/Auth/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Success } from './pages/Success/Success';
import { RequireAuth } from './helpers/RequireAuth';
import { CartProvider } from './context/cartContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Menu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/about-us',  
        element: <AboutUs />  
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '*',
    element: <Error />
  }
]);

createRoot(document.getElementById('root')).render(  
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);



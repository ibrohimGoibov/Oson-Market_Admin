import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/layout"
import Cart from "./page/state/cartPage/cart"
import Category from "./page/state/categoryPage/category"
import Home from "./page/state/homePage/home"
import Product from "./page/state/productPage/product"
import SubCategories from "./page/state/subCategoriesPage/subCategories"
import UserProfile from "./page/state/userProfilePage/userProfile"
import Login from "./page/state/loginPage/login"
import Color from "./page/state/color/color"
import Account from "./page/state/account/account"

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
       
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'category',
          element: <Category />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'subCategories',
          element: <SubCategories />
        },
        {
          path: 'userProfile',
          element: <UserProfile />
        },
        {
          path: 'color',
          element: <Color />
        },
        {
          path: 'account',
          element: <Account />
        },
      ]
    },
     {
          index: true,
          element: <Login />,
        },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
import { createBrowserRouter } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProduitsPage from "../Pages/ProduitsPage";
import SingleProduitPage from "../Pages/SingleProduitPage";
import OrderPage from "../Pages/OrderPage";
import CartPage from "../Pages/CartPage";
import LoginPage from "../Pages/connexion/LoginPage";
import DashboardLayout from "../Pages/DashboardPage";
import UsersPage from "../Components/dashboard/UsersPage";
import CategoriesPage from "../Components/dashboard/CategoriesPage";
import SubcategoriesPage from "../Components/dashboard/SubcategoriesPage";
import OrdersPage from "../Components/dashboard/OrdersPage";
import MessagesPage from "../Components/dashboard/MessagesPage";
import SouhaitPage from "../Pages/SouhaitPage";
import LandingPage from "../Pages/LandingPage";
import RegisterPage from "../Pages/connexion/RegisterPage";
import NotFoundPage from "../Pages/NotFoundPage";
import ProductsPage from "../Components/dashboard/ProductsPage";
import Dashboard from "../Components/dashboard/Dashboard";
import CustomerOrdersPage from "../Components/dashboard/CustomerOrdersPage";
import OrderDetailsPage from "../Components/dashboard/OrderDetailsPage";
import CommandePage from "../Pages/CommandePage";
import CommandeDetaille from "../Pages/CommandeDetaille";
import ForgotPasswordPage from "../Pages/connexion/ForgotPasswordPage";
import VerifyEmailPage from "../Pages/connexion/VerifyEmailPage";
import ResetPasswordPage from "../Pages/connexion/ResetPasswordPage";

export const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/produits",
        element: <ProduitsPage />,
      },
      {
        path: "/produits/:id",
        element: <SingleProduitPage />,
      },
      {
        path: "/confirmation",
        element: <OrderPage />,
      },
      {
        path: "/commande",
        element: <CommandePage />,
      },
      {
        path: "/commande/:orderId",
        element: <CommandeDetaille />,
      },
      {
        path: "/panier",
        element: <CartPage />,
      },
      {
        path: "/souhaits",
        element: <SouhaitPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "/verify-email/:token",
        element: <VerifyEmailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />, // dashboard
      },
      {
        path: "/dashboard/users",
        element: <UsersPage />, // CRUD for Users
      },
      {
        path: "/dashboard/categories",
        element: <CategoriesPage />, // CRUD for Categories
      },
      {
        path: "/dashboard/subcategories",
        element: <SubcategoriesPage />, // CRUD for Subcategories
      },
      {
        path: "/dashboard/produits",
        element: <ProductsPage />, // CRUD for Products
      },
      {
        path: "/dashboard/orders",
        element: <OrdersPage />, // CRUD for Orders
      },
      {
        path: "/dashboard/orders/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "/dashboard/orders/customer/:userId",
        element: <CustomerOrdersPage />,
      },
      {
        path: "/dashboard/messages",
        element: <MessagesPage />, // CRUD for Messages
      },
    ],
  },
]);

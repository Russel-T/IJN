import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Receipts from "./components/Receipts";
import Materials from "./components/Materials";
import VendorCategory from "./components/VendorDirectory";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },

  {
    element: (
      <PrivateRoute>
        <Sidebar />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/receipts", element: <Receipts /> },
      { path: "/materials", element: <Materials /> },
      { path: "/vendors", element: <VendorCategory /> },
    ],
  },
]);

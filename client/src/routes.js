import { createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import CreatePayment from "./pages/CreatePayment";
import PaymentHistoryReport from "./pages/PaymentHistoryReport";
import EmployerRatingReport from "./pages/EmployerRatingReport";

/**
 * Application Routes
 * @type {Router}
 */
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/create-payment",
    element: <CreatePayment />
  },
  {
    path: "/payment-history-report",
    element: <PaymentHistoryReport />
  },
  {
    path: "/employer-rating-report",
    element: <EmployerRatingReport />
  }
]);
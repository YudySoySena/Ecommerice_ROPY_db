import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Customers from "../../pages/Customers";
import Inventory from "../../pages/Inventory";
import Orders from "../../pages/Orders";
import Notifications from "../../pages/Notifications";
import Promotions from "../../pages/Promotions/promotions";
import Comments from "../../pages/Comments/comments";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="customers" element={<Customers />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="orders" element={<Orders />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="promotions" element={<Promotions/>} />
      <Route path="comments" element={<Comments/>} />

    </Routes>
  );
}

export default AdminRoutes;
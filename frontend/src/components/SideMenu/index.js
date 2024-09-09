import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin/dashboard",
          },
          {
            label: "Inventario",
            key: "/admin/inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Pedidos",
            key: "/admin/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Usuarios",
            key: "/admin/customers",
            icon: <UserOutlined />,
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;
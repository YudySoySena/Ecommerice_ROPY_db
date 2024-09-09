import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";
import Logo from '../assets/images/logo.png'

function AdminHeader() {
  return (
    <div className="AdminHeader">
      <Image width={80} src={Logo}></Image>
      <Typography.Title>Bienvenido Administrador</Typography.Title>
      <Space>
        <Badge count={10} dot>
        <MailOutlined
            style={{ fontSize: 24 }}
          />
        </Badge>
        <Badge count={20}>
        <BellFilled
            style={{ fontSize: 24 }}
          />
        </Badge>
      </Space>
    </div>
  )
}

export default AdminHeader

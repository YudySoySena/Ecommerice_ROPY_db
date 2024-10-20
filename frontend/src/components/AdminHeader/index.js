import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Image, Space, Typography } from "antd";
import Logo from '../assets/images/logo.png'

const AdminHeader = () => {
    const headerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'sapce-between',
      padding: '16px',
      backgroundColor: '#f0f2f5'
    };
    const logoStyle = {
      flex: 1,
    };
    const titleStyle = {
      flex: 2,
      textAlign: 'center',
      margin: 0,
  };
  const iconsStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
  };


  return (
    <div style={headerStyle}>
      <div style={logoStyle}>
      <Image width={80} src={Logo}></Image>
      </div>
      <Typography.Title level={2} style={titleStyle}>Bienvenido Administrador</Typography.Title>
      <Space> 
      </Space>
    </div>
  )
};

export default AdminHeader

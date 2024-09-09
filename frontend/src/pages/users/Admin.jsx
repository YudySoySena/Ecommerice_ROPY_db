import { Space } from "antd";
import './admin.css';
import AdminHeader from '../../components/AdminHeader';
import SideMenu from '../../components/SideMenu';
import PageContent from '../../components/PageContent';
import AdminFooter from '../../components/AdminFooter';

function Admin() {
  return (
    <div className="Admin">
      <AdminHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <AdminFooter />
    </div>
  );
}

export default Admin;
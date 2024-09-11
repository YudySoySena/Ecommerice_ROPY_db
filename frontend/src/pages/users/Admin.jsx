import { Space } from "antd";
import './admin.css';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import SideMenu from '../../components/SideMenu';
import PageContent from '../../components/PageContent';
import AdminFooter from '../../components/AdminFooter';
import ProtectedRoute from '../../ProtectedRoute'; // Asegúrate de que la ruta sea correcta

function Admin() {
  return (
    <ProtectedRoute roleRequired="Administrador">
      <div className="Admin">
        <AdminHeader />
        <Space className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </Space>
        <AdminFooter />
      </div>
    </ProtectedRoute>
  );
}

export default Admin;
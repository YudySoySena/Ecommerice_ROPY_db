import { Space } from "antd";
import './admin.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import SideMenu from '../../components/SideMenu';
import PageContent from '../../components/PageContent';
import AdminFooter from '../../components/AdminFooter';

function Admin() {
  const { contextUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Verificar si el usuario tiene el rol de Administrador
  useEffect(() => {
    if (!contextUser) {
      setLoading(true);
    } else if (contextUser.Rol !== 'Administrador') {
      navigate('/'); // Redirigir si no es administrador
    } else {
      setLoading(false);  // Usuario verificado como administrador
    }
  }, [contextUser, navigate]);
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
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainNav } from '../components';

const MainLayout: React.FC = () => {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
};

export default MainLayout; 
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-animik-gray flex">
      <div className="hidden lg:block sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="lg:hidden">
          <AdminSidebar />
        </div>
        <AdminHeader />
        <main className="p-6 lg:p-10 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

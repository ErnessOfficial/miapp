
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-animik-dark">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

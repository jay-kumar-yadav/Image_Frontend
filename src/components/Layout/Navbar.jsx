import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Image Drive</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
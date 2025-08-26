import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const FolderList = ({ currentFolder, onFolderSelect, onNavigateUp }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFolders();
  }, [currentFolder]);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/folders?parentId=${currentFolder || ''}`);
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading folders...</div>;
  }

  return (
    <div className="p-4">
      {currentFolder && (
        <button
          onClick={onNavigateUp}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Up
        </button>
      )}
      
      <h2 className="text-xl font-semibold mb-4">Folders</h2>
      
      {folders.length === 0 ? (
        <p className="text-gray-500">No folders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => onFolderSelect(folder)}
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="font-medium">{folder.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderList;
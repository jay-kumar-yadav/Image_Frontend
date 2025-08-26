import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Layout/Navbar';
import CreateFolder from './Folder/CreateFolder';
import FolderList from './Folder/FolderList';
import FolderBreadcrumb from './Folder/FolderBreadcrumb';
import ImageUpload from './Image/ImageUpload';
import ImageList from './Image/ImageList';
import SearchImages from './Image/SearchImages';

const Dashboard = () => {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderStack, setFolderStack] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const { user } = useAuth();

  const handleFolderSelect = (folder) => {
    setFolderStack([...folderStack, currentFolder]);
    setCurrentFolder(folder._id);
  };

  const handleNavigateUp = () => {
    if (folderStack.length > 0) {
      const previousFolder = folderStack[folderStack.length - 1];
      setFolderStack(folderStack.slice(0, -1));
      setCurrentFolder(previousFolder);
    } else {
      setCurrentFolder(null);
    }
  };

  const handleBreadcrumbSelect = (folderId) => {
    // Find the index of the clicked folder in the stack
    const index = folderStack.findIndex(id => id === folderId);
    if (index !== -1) {
      setFolderStack(folderStack.slice(0, index));
      setCurrentFolder(folderId);
    }
  };

  const handleFolderCreated = () => {
    // You might want to refresh the folder list here
    console.log('Folder created, refresh needed');
  };

  const handleImageUploaded = () => {
    // You might want to refresh the image list here
    console.log('Image uploaded, refresh needed');
  };

  return (
    <div>
      <Navbar />
      <FolderBreadcrumb 
        currentFolder={currentFolder} 
        onFolderSelect={handleBreadcrumbSelect}
      />
      <div className="flex">
        <div className="w-64 bg-gray-100 min-h-screen">
          <CreateFolder 
            currentFolder={currentFolder} 
            onFolderCreated={handleFolderCreated} 
          />
          <ImageUpload 
            currentFolder={currentFolder} 
            onImageUploaded={handleImageUploaded} 
          />
          <div className="p-4">
            <button
              onClick={() => setActiveTab('browse')}
              className={`w-full text-left p-2 rounded mb-2 ${
                activeTab === 'browse' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`w-full text-left p-2 rounded ${
                activeTab === 'search' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              }`}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex-1">
          {activeTab === 'browse' ? (
            <>
              <FolderList 
                currentFolder={currentFolder}
                onFolderSelect={handleFolderSelect}
                onNavigateUp={handleNavigateUp}
              />
              <ImageList currentFolder={currentFolder} />
            </>
          ) : (
            <SearchImages />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
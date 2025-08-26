import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const FolderBreadcrumb = ({ currentFolder, onFolderSelect }) => {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentFolder) {
      fetchBreadcrumb();
    } else {
      setBreadcrumb([]);
    }
  }, [currentFolder]);

  const fetchBreadcrumb = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/folders/${currentFolder}/path`);
      setBreadcrumb(response.data);
    } catch (error) {
      console.error('Error fetching folder path:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBreadcrumbClick = (index) => {
    // Navigate to the clicked folder in the breadcrumb
    if (onFolderSelect && index < breadcrumb.length - 1) {
      // This would need to be implemented based on your folder structure
      // You might need to modify this based on how you track folder hierarchy
      console.log('Breadcrumb navigation to:', breadcrumb[index]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center px-4 py-2 bg-gray-100 border-b">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center px-4 py-2 bg-gray-100 border-b">
      <button
        onClick={() => onFolderSelect && onFolderSelect(null)}
        className="flex items-center text-blue-600 hover:text-blue-800 mr-2"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </button>
      
      {breadcrumb.length > 0 && (
        <>
          <span className="mx-2 text-gray-400">/</span>
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className={`text-blue-600 hover:text-blue-800 ${
                  index === breadcrumb.length - 1 ? 'font-semibold' : ''
                }`}
                disabled={index === breadcrumb.length - 1}
              >
                {item.name}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FolderBreadcrumb;
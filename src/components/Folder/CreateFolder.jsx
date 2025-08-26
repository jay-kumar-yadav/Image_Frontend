import React, { useState } from 'react';
import API from '../../services/api';

const CreateFolder = ({ currentFolder, onFolderCreated }) => {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setLoading(true);
    setError('');

    try {
      await API.post('/folders', {
        name: folderName.trim(),
        parentId: currentFolder
      });
      setFolderName('');
      onFolderCreated();
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-2">Create New Folder</h3>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !folderName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Folder'}
        </button>
      </form>
    </div>
  );
};

export default CreateFolder;
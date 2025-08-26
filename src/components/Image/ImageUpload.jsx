import React, { useState } from 'react';
import API from '../../services/api';

const ImageUpload = ({ currentFolder, onImageUploaded }) => {
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageName.trim() || !selectedFile) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', imageName.trim());
    formData.append('image', selectedFile);
    if (currentFolder) {
      formData.append('folderId', currentFolder);
    }

    try {
      await API.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImageName('');
      setSelectedFile(null);
      onImageUploaded();
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image Name</label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Enter image name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 ">Select Image</label>
          <input
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            
          />
        </div>
        <button
          type="submit"
          disabled={loading || !imageName.trim() || !selectedFile}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
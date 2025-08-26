import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const ImageList = ({ currentFolder }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [currentFolder]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/images?folderId=${currentFolder || ''}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading images...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      
      {images.length === 0 ? (
        <p className="text-gray-500">No images found in this folder</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="border rounded-lg overflow-hidden">
              <img
                src={`http://localhost:5000/${image.path}`}
                alt={image.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="font-medium truncate">{image.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;
import React, { useState } from 'react';
import API from '../../services/api';

const SearchImages = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await API.get(`/images/search?query=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Images</h2>
      
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by image name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((image) => (
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
      ) : query && !loading && (
        <p className="text-gray-500">No images found matching "{query}"</p>
      )}
    </div>
  );
};

export default SearchImages;
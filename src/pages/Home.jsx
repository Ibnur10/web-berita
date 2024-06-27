import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '28bdc4d150124b38b357b6e17989f5da';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

return (
  <div className="container mx-auto px-4">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-blue-600">
      {/* Use "Latest News" for Home and "Search Results for "{query}"" for Search */}
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {news.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          {article.urlToImage ? (
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="p-4 md:p-6">
            <h2 className="font-bold text-xl mb-2 line-clamp-2">{article.title}</h2>
            <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">{article.description}</p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <span className="text-xs md:text-sm text-gray-500 mb-2 md:mb-0">{new Date(article.publishedAt).toLocaleDateString()}</span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm md:text-base transition duration-300"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Home;
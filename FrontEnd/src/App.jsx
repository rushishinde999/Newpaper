import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Track which articles are expanded

  // Fetch news articles from the backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Toggle article description expansion
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">📰 Latest News</h1>
      {loading ? (
        <p className="text-center">Loading news articles...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <div
              key={article.id}
              className="card bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-gray-900">
                  {article.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {expanded[article.id]
                    ? article.description // Show full description
                    : `${article.description.substring(0, 100)}...`}{" "}
                  {/* Show trimmed description */}
                </p>
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-blue-500 hover:underline"
                >
                  {expanded[article.id] ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

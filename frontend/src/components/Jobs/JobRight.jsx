import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ArticlesDisplay from './ArticlesDisplay';

const JobRight = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3200/articles');
        setArticles(response.data.articles || []);
      } catch (error) {
        console.error('Failed to fetch news articles:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="xs:hidden md:flex lg:flex xl:flex flex-[1.8] max-w-[400px] rounded-2xl overflow-hidden backdrop-blur-md bg-white/30 shadow-xl ring-1 ring-white/20 h-[700px] flex flex-col">
      <div className="px-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600">
        News & Job Feed
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto text-gray-100">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Loading...
          </div>
        ) : articles.length === 0 ? (
          <p className="text-sm text-center text-gray-400">No job-related news found.</p>
        ) : (
          <ArticlesDisplay articles={articles} />
        )}
      </div>
    </div>
  );
};

export default JobRight;

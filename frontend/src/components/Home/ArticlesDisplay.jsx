import { BadgeCheck, Briefcase, Building2, Newspaper } from 'lucide-react';
import { useState } from 'react';

const ArticlesDisplay = ({ articles }) => {
  const categories = ['All', 'Central Govt 🏛️', 'State Govt 🏢', 'Company Jobs 💼'];
  const [category, setCategory] = useState('All');

  const getFilteredArticles = () => {
    if (category === 'All') return articles;
    if (category.includes('Central')) return articles.filter((a) => a.isCentralGovtRelated);
    if (category.includes('State')) return articles.filter((a) => a.isStateGovtRelated);
    if (category.includes('Company')) return articles.filter((a) => a.isCompanyRelated);
    return [];
  };

  const getTag = (article) => {
    if (article.isCentralGovtRelated)
      return { label: 'Central Govt', color: 'bg-indigo-100 text-indigo-700', icon: BadgeCheck };
    if (article.isStateGovtRelated)
      return { label: 'State Govt', color: 'bg-green-100 text-green-700', icon: Building2 };
    if (article.isCompanyRelated)
      return { label: 'Company', color: 'bg-yellow-100 text-yellow-700', icon: Briefcase };
    return { label: 'General', color: 'bg-gray-100 text-gray-700', icon: Newspaper };
  };

  return (
    <div className="flex flex-col w-full max-w-3xl gap-6 px-4 py-6 mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((type) => (
          <button
            key={type}
            onClick={() => setCategory(type)}
            className={`px-2 py-1 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
              category === type
                ? 'bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      {getFilteredArticles().length === 0 ? (
        <p className="mt-8 text-center text-gray-500">No articles available in this category.</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
          {getFilteredArticles().map((article, index) => {
            const tag = getTag(article);

            return (
              <div
                key={index}
                className="p-5 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-2">
                  <div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-blue-800 hover:underline"
                    >
                      {article.title}
                    </a>
                    <span className="ml-2 text-sm text-gray-500">{article.published_at}</span>
                  </div>
                  <p className="text-sm text-gray-700">{article.description}</p>
                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="italic text-gray-500">
                      {article.source || 'Unknown source'}
                    </span>
                    {tag && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${tag.color}`}
                      >
                        <tag.icon size={14} />
                        {tag?.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArticlesDisplay;

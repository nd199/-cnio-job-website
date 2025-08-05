import { Link } from 'react-router-dom';

const JobCategories = () => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4 border">
      <h1 className="text-sm font-bold mb-2">Job Categories</h1>
      <ul className="space-y-2">
        <li>
          <Link to="/jobs" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            All Jobs
          </Link>
        </li>
        <li className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
          Indian Govt Jobs
        </li>
        <li className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
          IT Jobs
        </li>
        <li className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
          Remote Jobs
        </li>
        <li className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
          Internships
        </li>
      </ul>
    </div>
  );
};

export default JobCategories;

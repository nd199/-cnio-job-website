const JobCategories = () => {
  return (
    <div className="absolute left-0 top-full mt-2 w-[280px] bg-white shadow-lg rounded-lg p-4 z-50">
      <h1 className="text-sm font-bold mb-2">Job Categories</h1>
      <ul className="space-y-2">
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

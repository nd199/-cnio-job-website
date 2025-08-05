import axios from 'axios';
import { Loader2, RefreshCcw, SearchIcon } from 'lucide-react';
import { useState } from 'react';

const JobCenter = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (!searchTerm.trim()) return true;
    return (
      (job.title && job.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (job.description && job.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (job.skills &&
        job.skills.some((skill) => skill.toLowerCase().includes(lowerCaseSearchTerm))) ||
      (job.location && job.location.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (job.company && job.company.name.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const handleSearchEvents = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const fetchJobs = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3200/jobs?source=all');
      setJobs(response.data?.data || []);
      setHasFetched(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Something went wrong while loading jobs.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-[3] w-full h-fit max-h-[calc(120vh-1rem)] overflow-y-auto bg-gray-50 rounded-l px-6 py-4">
      <div className="flex items-center justify-between pb-2 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Job Feed</h2>
        <button
          onClick={fetchJobs}
          disabled={hasFetched}
          className={`flex items-center gap-1 px-3 py-1 text-sm rounded ${
            hasFetched
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <RefreshCcw size={16} /> {hasFetched ? 'Jobs Loaded' : 'Fetch Jobs'}
        </button>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full gap-2 text-gray-600 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading jobs...</span>
        </div>
      ) : hasFetched ? (
        <div className="flex flex-col items-center w-full gap-4 mt-4">
          <div
            className="flex items-center justify-between border-2 border-black hover:border-primaryHover
          rounded-2xl p-2 relative lg:w-[350px]"
          >
            <SearchIcon className="p-0 m-0 text-xl text-black cursor-pointer hover:text-primaryHover" />
            <input
              className="w-full ml-2 bg-transparent border-none outline-none"
              placeholder="Search Jobs..."
              value={searchTerm}
              aria-label="Search jobs"
              onChange={handleSearchEvents}
            />
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            {filteredJobs?.map((job, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-between h-full p-6 bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 ease-in-out flex-[1_1_100%] md:flex-[1_1_48%] xl:flex-[1_1_31%] overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl text-wrap font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {job.title || 'Untitled Job'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {job.description || 'No description available.'}
                  </p>

                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    <p>
                      <strong>Posted by:</strong>{' '}
                      {job.postedBy?.username ||
                        job.company?.name ||
                        job.employer_name ||
                        job.postedBy ||
                        'Unknown'}
                    </p>
                    <p>
                      <strong>Type:</strong>{' '}
                      {job.jobType ||
                        job.job_employment_type ||
                        job.contract_type ||
                        job.type ||
                        'N/A'}
                    </p>
                    <p>
                      <strong>Skills:</strong>{' '}
                      {Array.isArray(job.skills)
                        ? job.skills.join(', ')
                        : job.job_required_skills?.join(', ') || 'Not specified'}
                    </p>
                    <p>
                      <strong>Location:</strong>{' '}
                      {job.location ||
                        job.job_location ||
                        job.job_city ||
                        job.job_country ||
                        job.job_location_display ||
                        'N/A'}
                    </p>
                    <p>
                      <strong>Experience:</strong>{' '}
                      {job.experience || job.job_experience || 'Not specified'}
                    </p>
                    <p>
                      <strong>Posted on:</strong>{' '}
                      {job.createdAt || job.postedOn || job.job_posted_at_datetime_utc
                        ? new Date(
                            job.createdAt || job.postedOn || job.job_posted_at_datetime_utc
                          ).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  {job.redirect_url || job.job_apply_link ? (
                    <a
                      href={job.redirect_url || job.job_apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition-all"
                    >
                      Apply Now
                    </a>
                  ) : (
                    <button
                      className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition-all"
                      disabled
                    >
                      Apply Info Missing
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          Click <strong>"Fetch Jobs"</strong> to load the latest job data.
        </div>
      )}
    </div>
  );
};

export default JobCenter;

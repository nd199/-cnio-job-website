import axios from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const HomeCenter = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchJobs = async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3200/jobs?source=all');
      setJobs(response.data?.data || []);
      setHasFetched(true);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-[3] w-full h-fit max-h-[calc(100vh-2rem)] overflow-y-auto bg-gray-50 rounded-l px-6 py-4">
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
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full gap-2 text-gray-600 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading jobs...</span>
        </div>
      ) : hasFetched ? (
        <div className="flex flex-wrap gap-6 mt-4">
          {jobs?.map((job, index) => (
            <div
              key={index}
              className="flex flex-col justify-between h-full p-6 transition-shadow bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg flex-[1_1_100%] md:flex-[1_1_48%] xl:flex-[1_1_31%]"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  {job.title || job.job_title || 'Untitled Job'}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {job.description || job.job_description || 'No description available.'}
                </p>
                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  <p>
                    <strong>Posted by:</strong>{' '}
                    <span>{job.postedBy?.username || job.employer_name || 'Unknown'}</span>
                  </p>
                  <p>
                    <strong>Type:</strong> {job.jobType || job.job_employment_type || 'N/A'}
                  </p>
                  <p>
                    <strong>Skills:</strong>{' '}
                    {Array.isArray(job.skills)
                      ? job.skills.join(', ')
                      : job.job_required_skills?.join(', ') || 'Not specified'}
                  </p>
                  <p>
                    <strong>Location:</strong>{' '}
                    {job.location || job.job_location || job.job_city || job.job_country || 'N/A'}
                  </p>
                  <p>
                    <strong>Experience:</strong>{' '}
                    {job.experience || job.job_experience || 'Not specified'}
                  </p>
                  <p>
                    <strong>Posted on:</strong>{' '}
                    {job.createdAt || job.job_posted_at_datetime_utc
                      ? new Date(
                          job.createdAt || job.job_posted_at_datetime_utc
                        ).toLocaleDateString()
                      : 'Unknown'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                {job.job_apply_link ? (
                  <a
                    href={job.job_apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Apply Now
                  </a>
                ) : (
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded cursor-not-allowed"
                    disabled
                  >
                    Apply Info Missing
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          Click <strong>"Fetch Jobs"</strong> to load the latest job data.
        </div>
      )}
    </div>
  );
};

export default HomeCenter;

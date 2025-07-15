import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const HomeCenter = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    const response = await axios.get('http://localhost:3200/jobs');
    setJobs(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex-[3] w-[100%] max-h-[calc(100vh-6rem)] overflow-y-auto bg-gray-50 rounded-l px-6 py-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-full gap-2 text-gray-600 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading jobs...</span>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="pb-2 text-2xl font-bold text-gray-800 border-b">Job Feed</h2>
          <div className="flex flex-wrap gap-6">
            {jobs?.map((job, index) => (
              <div
                key={index}
                className="flex flex-col justify-between h-full p-6 transition-shadow bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg flex-[1_1_100%] md:flex-[1_1_48%] xl:flex-[1_1_31%]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-3">{job.description}</p>

                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    <p>
                      <strong>Posted by:</strong> <span>{job.postedBy?.username || 'Unknown'}</span>
                    </p>
                    <p>
                      <strong>Type:</strong> {job.jobType}
                    </p>
                    <p>
                      <strong>Skills:</strong> {job.skills?.join(', ')}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Experience:</strong> {job.experience}
                    </p>
                    <p>
                      <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCenter;

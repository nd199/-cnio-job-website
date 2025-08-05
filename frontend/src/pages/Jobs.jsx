import { useState } from 'react';
import JobCenter from '../components/Jobs/JobCenter';
import JobLeft from '../components/Jobs/JobLeft';
import JobRight from '../components/Jobs/JobRight';

const Jobs = () => {
  const [filters, setFilters] = useState({
    experience: '',
    jobType: '',
    location: '',
    remote: [],
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-50 to-slate-200 text-slate-800 px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr_350px] gap-6">
        <JobLeft filters={filters} setFilters={setFilters} />
        <JobCenter filters={filters} />
        <JobRight />
      </div>
    </div>
  );
};

export default Jobs;

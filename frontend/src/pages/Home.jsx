import { useState } from 'react';
import HomeCenter from '../components/Home/HomeCenter';
import HomeLeft from '../components/Home/HomeLeft';
import HomeRight from '../components/Home/HomeRight';

const Home = () => {
  const [filters, setFilters] = useState({
    experience: '',
    jobType: '',
    location: '',
    remote: [],
  });

  return (
    <div className="w-full px-4">
      <div className="flex flex-row gap-4 mt-4">
        <HomeLeft filters={filters} setFilters={setFilters} />
        <HomeCenter filters={filters} />
        <HomeRight />
      </div>
    </div>
  );
};

export default Home;

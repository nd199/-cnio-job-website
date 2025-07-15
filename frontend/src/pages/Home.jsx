import HomeCenter from '../components/Home/HomeCenter';
import HomeLeft from '../components/Home/HomeLeft';
import HomeRight from '../components/Home/HomeRight';
const Home = () => {
  return (
    <div className="w-full px-4">
      <div className="flex flex-row gap-4 mt-4">
        <HomeLeft />
        <HomeCenter />
        <HomeRight />
      </div>
      <div className="w-full pt-4">
        <div className="p-4 bg-white rounded-md shadow">Learning Paths</div>
      </div>
    </div>
  );
};

export default Home;

import HomeCenter from '../components/Home/HomeCenter';
import HomeLeft from '../components/Home/HomeLeft';
const Home = () => {
  return (
    <div className="w-full px-4">
      <div className="flex flex-row gap-4 mt-4">
        <HomeLeft />
        <HomeCenter />
        <div className="flex-[1.8] max-w-[400px] rounded-lg overflow-y-auto">
          <div className="p-4 bg-white shadow-lg rounded-lg h-[460px] font-bold">
            <div className="text-lg">News & Feed</div>
          </div>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="bg-white p-4 rounded-md shadow">Learning Paths</div>
      </div>
    </div>
  );
};

export default Home;

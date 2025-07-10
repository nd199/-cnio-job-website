import HomeCenter from '../components/Home/HomeCenter';
import HomeLeft from '../components/Home/HomeLeft';

const Home = () => {
  return (
    <div className="w-[calc(100%-0.8rem)] mx-auto border-x-2 flex rounded-lg flex-col gap-4 h-[100vh] bg-gray-100 relative">
      <div className="flex flex-row gap-4">
        <HomeLeft />
        <HomeCenter />
        <div className="mt-2 flex-[1.8] max-w-[400px] rounded-lg overflow-y-auto h-auto">
          <div className="p-4 h-[460px] font-bold shadow-2xl bg-white rounded-lg">
            <div className="font-bold text-lg">News & Feed</div>
          </div>
        </div>
      </div>
      <div className=" w-full pt-4">
        <div className="bg-white p-4 rounded-md shadow">Learning Paths</div>
      </div>
    </div>
  );
};

export default Home;

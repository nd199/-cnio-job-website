import { LucideArrowBigDownDash } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-[calc(100%-1rem)] mx-auto border-x-2 flex rounded-lg flex-col gap-4 h-[100vh] bg-gray-100">
      <div className="flex flex-row gap-4">
        {/* left */}
        <div className="flex-[1.6] rounded-lg flex items-center flex-col gap-4 h-auto">
          <div className="mt-2 w-full h-[400px] bg-white rounded-lg shadow-2xl p-2 font-bold">
            <div className="w-full text-lg shadow-sm bg-transparent">AI Assistant</div>
          </div>
          {expand ? (
            <div className="w-full h-[190px] bg-white rounded-lg shadow-2xl relative">
              <div className="bg-white p-4 font-bold rounded-lg">Sort / Tags</div>
              <LucideArrowBigDownDash
                className="w-full absolute -bottom-4 animate-bounce size-6 cursor-pointer"
                onClick={() => setExpand(!expand)}
              />
            </div>
          ) : (
            <div className="w-full h-[100px] bg-white rounded-lg shadow-2xl relative">
              <div className="bg-white p-4 font-bold rounded-lg">Sort / Tags</div>
              <LucideArrowBigDownDash
                className="w-full absolute -bottom-4 animate-bounce size-6 cursor-pointer"
                onClick={() => setExpand(!expand)}
              />
            </div>
          )}
          <div className="w-full h-[100px] bg-white rounded-lg shadow-2xl relative">
            <div className="bg-white p-4 font-bold rounded-lg"></div>
          </div>
        </div>
        {/* center */}
        <div className="flex-[3] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-l">
          <div className="p-4 space-y-4">
            <p className="text-xl font-semibold">Job Feed</p>
            {[...Array(20)].map((_, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                Job Card #{idx + 1}
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="mt-2 flex-[1.6] rounded-lg overflow-y-auto h-auto">
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

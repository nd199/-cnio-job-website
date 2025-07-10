const HomeCenter = () => {
  return (
    <div className="flex-[3] max-h-[calc(100vh-6rem)] overflow-y-auto  rounded-l">
      <div className="p-4 space-y-4">
        <p className="text-xl font-semibold">Job Feed</p>
        {[...Array(20)].map((_, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
            Job Card #{idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCenter;

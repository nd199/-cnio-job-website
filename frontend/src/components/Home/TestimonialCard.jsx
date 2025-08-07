const TestimonialCard = ({ name, role, quote }) => {
  return (
    <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl shadow-md w-[180px] text-xs">
      <p className="text-gray-200 italic mb-2">“{quote}”</p>
      <div className="text-yellow-400 font-semibold">{name}</div>
      <div className="text-white-500">{role}</div>
    </div>
  );
};

export default TestimonialCard;

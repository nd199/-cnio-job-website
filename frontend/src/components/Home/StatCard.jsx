import TypeWriter from '../../assets/TypeWriting/TypeWriting';

const StatCard = ({ title, value, icon }) => {
  return (
    <div
      className="backdrop-blur-md p-3 rounded-xl shadow-md w-[180px] flex flex-1
     flex-col items-center"
    >
      <div className="text-l mb-1">{icon}</div>
      <div className="text-xs font-semibold text-gray-600">{title}</div>
      <TypeWriter values={value} />
    </div>
  );
};

export default StatCard;

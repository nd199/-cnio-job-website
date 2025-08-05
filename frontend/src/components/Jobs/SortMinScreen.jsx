import { LucideArrowBigDownDash } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SortMinScreen = ({ filters, setFilters, setExpand, expand }) => {
  return (
    <div className="w-full h-[140px] bg-white rounded-lg shadow-2xl relative p-4">
      <div className="text-lg font-bold">Sort / Filter</div>
      <div className="mt-2">
        <label className="block py-1 text-sm font-bold text-gray-700">Experience</label>
        <Slider
          min={0}
          max={15}
          value={filters.experience || 0}
          onChange={(value) => setFilters({ ...filters, experience: value })}
          dots={true}
          marks={{ 0: '0', 3: '3', 6: '6', 9: '9', 12: '12', 15: '15 yrs' }}
          included={false}
          dotStyle={{ backgroundColor: '#e5e7eb', borderColor: '#e5e7eb' }}
          activeDotStyle={{ backgroundColor: '#3b82f6', borderColor: '#3b82f6' }}
          className="w-full"
        />
      </div>
      <LucideArrowBigDownDash
        className="absolute w-full cursor-pointer -left-1 -bottom-4 animate-bounce size-6"
        onClick={() => setExpand(!expand)}
      />
    </div>
  );
};

export default SortMinScreen;

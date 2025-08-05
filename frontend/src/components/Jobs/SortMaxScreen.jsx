import { LucideArrowBigDownDash } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SortMaxScreen = ({
  filters,
  setFilters,
  locationInput,
  filteredCities,
  setLocationInput,
  setFilteredCities,
  indianCities,
  setExpand,
  expand,
}) => {
  return (
    <div className="relative w-full h-auto p-10 space-y-3 bg-white rounded-lg shadow-2xl">
      <div className="p-0 m-0 text-lg font-bold">Sort / Tags</div>
      <div className="pt-5 pb-10">
        <label className="block text-sm font-medium text-gray-700">Experience Level</label>
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Job Type</label>
        <select
          value={filters.jobType}
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Remote Options</label>
        <div className="flex flex-col gap-4">
          <label>
            <input
              type="checkbox"
              checked={filters.remoteOptions?.includes('Remote')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...(filters.remoteOptions ?? []), 'Remote']
                  : (filters.remoteOptions ?? []).filter((opt) => opt !== 'Remote');
                setFilters({ ...filters, remoteOptions: updated });
              }}
              className="mr-2"
            />
            Remote
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.remoteOptions?.includes('On-site')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.remoteOptions, 'On-site']
                  : filters.remoteOptions.filter((opt) => opt !== 'On-site');
                setFilters({ ...filters, remoteOptions: updated });
              }}
              className="mr-2"
            />
            On-site
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.remoteOptions?.includes('Hybrid')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.remoteOptions, 'Hybrid']
                  : filters.remoteOptions.filter((opt) => opt !== 'Hybrid');
                setFilters({ ...filters, remoteOptions: updated });
              }}
              className="mr-2"
            />
            Hybrid
          </label>
        </div>
      </div>
      <div className="relative space-y-2">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={locationInput}
          onChange={(e) => {
            const val = e.target.value;
            setLocationInput(val);
            setFilters({ ...filters, location: val });
            setFilteredCities(
              indianCities.filter((city) => city.toLowerCase().includes(val.toLowerCase()))
            );
          }}
          placeholder="Type a city, state or country"
          className="w-full p-2 border rounded"
        />
        {locationInput && (
          <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border rounded shadow-lg max-h-48">
            {filteredCities.map((city) => (
              <li
                key={city}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setLocationInput(city);
                  setFilters({ ...filters, location: city });
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <LucideArrowBigDownDash
        className="absolute w-full cursor-pointer -left-1 -bottom-4 animate-bounce size-6"
        onClick={() => setExpand(!expand)}
      />
    </div>
  );
};

export default SortMaxScreen;

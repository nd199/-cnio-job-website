import {
  Briefcase,
  Building2,
  Home,
  Mail,
  MessageSquareMoreIcon,
  SearchIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { useState } from 'react';
import BottomNav from './BottomNav';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchEvents = (e) => {
    setSearchTerm(e.target.value);
    setShowSearchDropdown(true);
  };

  return (
    <div className="w-full flex justify-between items-center px-30 h-24 shadow-md font-body m-auto transition border-color duration-300 ease-in-out gap-4 sm:px-5 xs:px-5">
      <div className="hidden sm:flex text-2xl font-heading text-primary">CN.IO Jobs</div>
      <ul className="hidden lg:flex flex-row gap-4 justify-between items-center">
        <li className=" flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Home className="" />
          <a href="">Home</a>
        </li>
        <li className=" flex gap-2 items-center  text-black hover:text-primaryHover text-subheading ">
          <Briefcase />
          <a href="">Jobs</a>
        </li>
        <li className="flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Building2 />
          <a href="">Companies</a>
        </li>
        <li className="flex gap-2 items-center text-black hover:text-primaryHover text-subheading ">
          <Mail />
          <a href="">Contact Us</a>
        </li>
      </ul>
      <div className="flex flex-row xs:w-full xs:flex-row-reverse md:w-fit md:flex-row-reverse items-center justify-between gap-4">
        <div
          className="flex items-center justify-between border-2 border-black hover:border-primaryHover rounded-2xl p-2
          relative"
        >
          <SearchIcon className="text-black hover:text-primaryHover text-xl m-0 p-0 cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none ml-2 w-full"
            placeholder="Search Jobs..."
            value={searchTerm}
            aria-label="Search jobs"
            onChange={handleSearchEvents}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Your enter key logic here
                console.log('Enter pressed!', e.target.value);
                // For example, trigger search or submit form
              }
            }}
          />
          {showSearchDropdown && (
            <div className="w-[240px] h-[200px] shadow-md rounded-md absolute top-12 left-0 border-gray-700"></div>
          )}
        </div>
        <BottomNav open={open} setOpen={setOpen} className="hidden sm:block" />
        <div className="flex items-center gap-4 justify-between text-subheading">
          <UserCircle2Icon className="cursor-pointer" />
        </div>
      </div>
      <div>
        <MessageSquareMoreIcon
          className="text-black hover:text-primaryHover cursor-pointer text-xl transition duration-200 ease-in-out"
          aria-label="Messages"
        />
      </div>
    </div>
  );
};

export default Navbar;

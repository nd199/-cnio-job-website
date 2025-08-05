import {
  Briefcase,
  Building2,
  Home,
  Mail,
  MessageSquareMoreIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { useState } from 'react';
import JobCategories from './JobCategories';

const Navbar = ({ setShowMessages }) => {
  const [showJobsCategories, setShowJobCategories] = useState(false);

  return (
    <div className="w-full fixed top-0 flex justify-between items-center px-10 h-20 shadow-md font-body m-auto transition border-color duration-300 ease-in-out gap-4 sm:px-5 xs:px-5 z-[200] bg-white">
      <div className="hidden text-2xl cursor-pointer sm:flex font-heading text-primary">
        <a href="#">CN.IO Jobs</a>
      </div>
      <ul className="flex-row items-center justify-between hidden gap-4 lg:flex">
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading">
          <Home className="" />
          <a href="">Home</a>
        </li>
        <li
          className="relative flex items-center gap-2 text-black hover:text-primaryHover text-subheading"
          onClick={() => setShowJobCategories(true)}
        >
          <Briefcase />
          Jobs
          {showJobsCategories && <JobCategories />}
        </li>
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading ">
          <Building2 />
          <a href="">Companies</a>
        </li>
        <li className="flex items-center gap-2 text-black hover:text-primaryHover text-subheading ">
          <Mail />
          <a href="">Contact Us</a>
        </li>
      </ul>
      <div className="flex items-center justify-between gap-4 text-subheading xs:w-full xs:flex-row-reverse md:w-fit md:flex-row-reverse">
        <MessageSquareMoreIcon
          size={28}
          className="text-xl text-black transition duration-200 ease-in-out cursor-pointer hover:text-primaryHover"
          aria-label="Messages"
          onClick={() => setShowMessages(true)}
        />
        <div className="flex items-center justify-between gap-4 text-subheading">
          <UserCircle2Icon size={28} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import {
  Briefcase,
  Building2,
  ChevronDown,
  Home,
  Mail,
  MessageSquareMoreIcon,
  UserCircle2Icon,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCategories from './JobCategories';

const Navbar = ({ setShowMessages }) => {
  const [showJobsCategories, setShowJobCategories] = useState(false);
  const timeoutRef = useRef(null);

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowJobCategories(false);
    }, 500); // 0.5 sec delay before hiding
  };

  // If mouse re-enters, clear the hiding timeout
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="w-full fixed top-0 flex justify-between items-center px-10 h-20 shadow-md font-body z-[200] bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-800 text-white">
      <div className="hidden text-2xl cursor-pointer sm:flex font-heading text-primary">
        <Link to="/">CN.IO Jobs</Link>
      </div>

      <ul className="flex-row items-center justify-between hidden gap-4 lg:flex relative">
        <li className="flex items-center gap-2 text-white hover:text-pink-400 text-subheading">
          <Home />
          <Link to="/">Home</Link>
        </li>

        <li
          className="relative flex items-center gap-2 text-white hover:text-pink-400 text-subheading cursor-pointer"
          onClick={() => setShowJobCategories((prev) => !prev)}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <Briefcase />
          <span>Jobs</span>
          <ChevronDown className="w-4 h-4" />
          {showJobsCategories && (
            <div
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="absolute top-full left-0 mt-2 z-50"
            >
              <JobCategories />
            </div>
          )}
        </li>

        <li className="flex items-center gap-2 text-white hover:text-pink-400 text-subheading">
          <Building2 />
          <a href="#">Companies</a>
        </li>

        <li className="flex items-center gap-2 text-white hover:text-pink-400 text-subheading">
          <Mail />
          <a href="#">Contact Us</a>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <MessageSquareMoreIcon
          size={28}
          className="text-white cursor-pointer hover:text-pink-400"
          onClick={() => setShowMessages(true)}
        />
        <Link to="/profile" className="text-white hover:text-pink-400">
          <UserCircle2Icon size={28} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

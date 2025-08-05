import { Briefcase, Building2, Home, Mail, UserCircle2Icon } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-0 left-0 right-0 flex items-center justify-around h-16 bg-white border-t border-gray-300 shadow-md">
      <a
        href="#"
        className="flex flex-col items-center justify-center text-black text-subheading hover:text-primaryHover"
        aria-label="Home"
      >
        <Home size={20} />
        <span className="mt-1 text-xs">Home</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-black text-subheading hover:text-primaryHover"
        aria-label="Jobs"
      >
        <Briefcase size={20} />
        <span className="mt-1 text-xs">Jobs</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-black text-subheading hover:text-primaryHover"
        aria-label="Companies"
      >
        <Building2 size={20} />
        <span className="mt-1 text-xs">Companies</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-black text-subheading hover:text-primaryHover"
        aria-label="Contact"
      >
        <Mail size={20} />
        <span className="mt-1 text-xs">Contact</span>
      </a>
    </nav>
  );
};

export default BottomNav;

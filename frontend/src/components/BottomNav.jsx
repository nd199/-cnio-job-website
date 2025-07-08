import { Briefcase, Building2, Home, Mail, UserCircle2Icon } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-300 flex justify-around items-center h-16 sm:flex md:flex lg:hidden xl:hidden">
      <a
        href="#"
        className="flex flex-col items-center justify-center text-subheading text-black hover:text-primaryHover"
        aria-label="Home"
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-subheading text-black hover:text-primaryHover"
        aria-label="Jobs"
      >
        <Briefcase size={20} />
        <span className="text-xs mt-1">Jobs</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-subheading text-black hover:text-primaryHover"
        aria-label="Companies"
      >
        <Building2 size={20} />
        <span className="text-xs mt-1">Companies</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-subheading text-black hover:text-primaryHover"
        aria-label="Contact"
      >
        <Mail size={20} />
        <span className="text-xs mt-1">Contact</span>
      </a>

      <a
        href="#"
        className="flex flex-col items-center justify-center text-subheading text-black hover:text-primaryHover"
        aria-label="Profile"
      >
        <UserCircle2Icon size={20} />
        <span className="text-xs mt-1">Profile</span>
      </a>
    </nav>
  );
};

export default BottomNav;

import { Outlet } from 'react-router-dom';
import BottomNav from './components/Navigation/BottomNav';
import Navbar from './components/Navigation/Navbar';

const Layout = () => {
  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden">
      <Navbar />
      <main className="pt-20 h-full overflow-y-auto">
        <Outlet />
      </main>
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-inner h-16 block lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PmScreen from './components/Messages/PmScreen';
import BottomNav from './components/Navigation/BottomNav';
import Navbar from './components/Navigation/Navbar';

const Layout = () => {
  const [showMessages, setShowMessages] = useState(true);

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
      <Navbar setShowMessages={setShowMessages} />
      <main className="h-full pt-20 overflow-y-auto">
        {showMessages && <PmScreen setShowMessages={setShowMessages} />}
        <Outlet />
      </main>
      <div className="fixed bottom-0 left-0 z-50 block w-full h-16 bg-white shadow-inner lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;

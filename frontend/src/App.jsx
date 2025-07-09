import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import PmScreen from './components/PmScreen';
import Home from './pages/Home';

function App() {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setShowMessages={setShowMessages} />
      <main className="pt-28 flex-1 overflow-y-auto">
        {showMessages && <PmScreen setShowMessages={setShowMessages} />}
        <Home />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;

import { useState } from 'react';
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import PmScreen from './components/PmScreen';

function App() {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setShowMessages={setShowMessages} />
      <main className="mt-24 flex-1 relative">
        {showMessages && <PmScreen setShowMessages={setShowMessages} />}
      </main>
      <BottomNav />
    </div>
  );
}

export default App;

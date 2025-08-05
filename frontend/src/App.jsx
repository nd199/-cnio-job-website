import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

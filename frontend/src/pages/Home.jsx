import Features from '../components/Home/Features';
import Footer from '../components/Home/Footer';
import HowItWorks from '../components/Home/HowItWorks';
import LandingPage from '../components/Home/LandingPage';
import SuccessShowcase from '../components/Home/SuccessShowcase';

const Home = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-[var(--background)] text-[var(--text)] relative">
      <LandingPage />
      <Features />
      <HowItWorks />
      <SuccessShowcase />
      <Footer />
    </div>
  );
};

export default Home;

import Features from '../components/Home/Features';
import LandingPage from '../components/Home/LandingPage';

const Home = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-[var(--background)] text-[var(--text)] relative">
      <LandingPage />
      <Features />

      <div className="snap-start min-h-screen flex items-center justify-center px-12 bg-[var(--surface)]">
        <div className="text-center text-sm text-[var(--text)]/60 space-y-4">
          <p>© {new Date().getFullYear()} CNIO Jobs. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-[var(--text)]/50 text-xs">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

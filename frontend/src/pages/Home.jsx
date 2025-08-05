import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full bg-[var(--background)] text-[var(--text)] relative">
      <div className="snap-start min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 -left-10 w-[350px] h-[550px] bg-[var(--highlight)] opacity-30 rounded-full blur-[140px] z-0"></div>
        <div className="absolute top-10 -right-10 w-[500px] h-[500px] bg-[var(--primary)] opacity-25 rounded-full blur-[160px] z-0"></div>
        <div className="absolute bottom-0 -right-10 w-[600px] h-[600px] bg-[var(--accent)] opacity-35 rounded-full blur-[120px] z-0"></div>

        <div className="z-10 text-center px-6 md:px-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--highlight)] to-[var(--accent)]">
            Find Your Dream Job
            <br />
            With a Human Touch
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--text)]/80">
            Where career meets clarity. Intelligent matching, real-time insights, and the freedom to
            choose what's right for you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button className="px-6 py-3 text-lg font-semibold rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--accent)]  transition">
                Explore Jobs
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                className="px-6 py-3 text-lg font-semibold rounded-xl border-[var(--text)] text-[var(--text)] hover:bg-[var(--surface)] hover:border-[var(--accent)] transition"
              >
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

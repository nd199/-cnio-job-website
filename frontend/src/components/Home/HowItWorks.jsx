const Section = ({ title, backgroundUrl, children }) => (
  <div className="relative w-full h-[520px] rounded-xl shadow-lg overflow-hidden group">
    <div
      className="absolute inset-0 bg-cover bg-center filter brightness-50 transition-transform duration-700 group-hover:scale-105"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    ></div>
    <div className="relative z-10 flex flex-col justify-center h-full p-12 backdrop-blur-md text-white space-y-6">
      <h3 className="text-5xl font-extrabold drop-shadow-lg">{title}</h3>
      <ul className="list-disc list-inside text-xl space-y-5">{children}</ul>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="snap-start min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center py-20 px-10 md:px-20 gap-14">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">How It Works</h2>
        <p className="text-slate-300 text-lg md:text-xl">
          Everything you need to get started — whether you're looking for a job or looking to hire.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        <Section title="For Job Seekers" backgroundUrl="/images/Graduate.jpg">
          <li>Create your profile and add your skills.</li>
          <li>Get matched with jobs using our smart algorithm.</li>
          <li>Track applications, interviews, and offers.</li>
          <li>Build your personal brand with a clean dashboard.</li>
        </Section>

        <Section title="For Employers" backgroundUrl="/images/Employer.jpg">
          <li>Post job listings quickly and easily.</li>
          <li>Access a curated pool of verified candidates.</li>
          <li>Manage applications and schedule interviews.</li>
          <li>Track engagement and hiring performance.</li>
        </Section>
      </div>
    </section>
  );
};

export default HowItWorks;

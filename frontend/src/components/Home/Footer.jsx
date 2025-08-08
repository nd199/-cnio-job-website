const FooterScreen = () => {
  return (
    <div className="snap-start min-h-screen w-full bg-[var(--surface)] px-6 h-full flex items-center justify-center">
      <div className="w-full max-w-7xl space-y-10 flex flex-col items-center justify-center">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text)]">
            Let’s build your future, together.
          </h2>
          <p className="text-[var(--text)]/70 max-w-xl mx-auto text-base md:text-lg">
            Trusted by job seekers and teams across the globe.
          </p>
        </div>

        <div className="w-full flex justify-center items-center ml-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 text-sm text-[var(--text)]/80 items-start">
            <div>
              <h3 className="font-semibold mb-5 text-[var(--text)]">Company</h3>
              <ul className="space-y-5">
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-[var(--text)]">Resources</h3>
              <ul className="space-y-5">
                <li>
                  <a href="/help">Help Center</a>
                </li>
                <li>
                  <a href="/guides">Guides</a>
                </li>
                <li>
                  <a href="/api">API Docs</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-5 text-[var(--text)]">Legal</h3>
              <ul className="space-y-5">
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Use</a>
                </li>
                <li>
                  <a href="/cookies">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-[var(--text)] text-center">Stay in touch</h3>
          <form className="w-[400px] flex flex-col space-y-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-white/5 px-4 py-2 rounded-md border border-white/10 text-sm w-full"
            />
            <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white px-4 py-2 rounded-md text-sm w-full">
              Subscribe
            </button>
          </form>
        </div>

        <div className="pt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center text-sm md:text-base text-[var(--text)]/60 uppercase tracking-wide">
          <span>🇮🇳 India</span>
          <span>🇺🇸 USA</span>
          <span>🇩🇪 Germany</span>
          <span>🇧🇷 Brazil</span>
          <span>🇫🇷 France</span>
          <span>🇳🇱 Netherlands</span>
          <span>🇯🇵 Japan</span>
          <span>🇰🇷 Korea</span>
          <span>🇨🇦 Canada</span>
          <span>🇦🇺 Australia</span>
          <span>🇿🇦 South Africa</span>
          <span>🇸🇬 Singapore</span>
        </div>

        <div className="text-center text-xs text-[var(--text)]/60">
          © {new Date().getFullYear()} MADE With LOVE ❤️ CN.IO Jobs. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FooterScreen;

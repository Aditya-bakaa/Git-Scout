import SearchBar from "../components/SearchBar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <div className="home__brand">
        <span className="home__brand-mark">&gt;_</span>
        <span className="home__brand-name">gitscout</span>
      </div>

      <section className="home__search-section">
        <SearchBar />
        <p className="home__hint">
          try <code>torvalds</code>, <code>gaearon</code>, or your own username
        </p>
      </section>

      <HeroSection />
    </main>
  );
}

export default Home;

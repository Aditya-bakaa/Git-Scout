import "./HeroSection.css";

const FEATURES = [
  {
    tag: "scout",
    text: "Pull any public GitHub profile like bio, followers, tenure, repo count.",
  },
  {
    tag: "rank",
    text: "Surface the repos that earned the most stars, so you see their best work first.",
  },
  {
    tag: "score",
    text: "A transparent 0-100 Hire Score built from stars, forks, followers and tenure.",
  },
];

function HeroSection() {
  return (
    <section className="hero">
      <p className="hero__eyebrow"># hiring recon for github profiles</p>
      <h1 className="hero__title">
        Know who you're hiring
        <br />
        before the interview.
      </h1>
      <p className="hero__subtitle">
        Search a GitHub username to get a scouting report: their strongest
        repos, their footprint, and a score that explains itself.
      </p>

      <ul className="hero__features">
        {FEATURES.map((f) => (
          <li key={f.tag} className="hero__feature">
            <span className="hero__feature-tag">{f.tag}</span>
            <span className="hero__feature-text">{f.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HeroSection;

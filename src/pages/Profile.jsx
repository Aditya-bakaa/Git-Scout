import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { scoutUser, GitHubError } from "../utils/github.js";
import { computeScore, topRepos, topLanguages } from "../utils/score.js";
import ScoreGauge from "../components/ScoreGauge.jsx";
import StatBlock from "../components/StatBlock.jsx";
import RepoCard from "../components/RepoCard.jsx";
import Loader from "../components/Loader.jsx";
import "./Profile.css";

function Profile() {
  const { username } = useParams();

  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  // Re-runs whenever the username in the URL changes, so searching a new
  // profile from an already-open report page fetches fresh data.
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setStatus("loading");
      try {
        const { user, repos } = await scoutUser(username);
        if (cancelled) return;
        setUser(user);
        setRepos(repos);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(
          err instanceof GitHubError ? err.message : "Something went wrong."
        );
        setStatus("error");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <main className="profile">
      <Link to="/" className="profile__back">
        $ cd ..
      </Link>

      {status === "loading" && <Loader label={`scouting ${username}`} />}

      {status === "error" && (
        <div className="profile__error">
          <p className="profile__error-text">! {errorMessage}</p>
          <Link to="/" className="profile__error-link">
            try another username →
          </Link>
        </div>
      )}

      {status === "ready" && user && (
        <ProfileReport user={user} repos={repos} />
      )}
    </main>
  );
}

function ProfileReport({ user, repos }) {
  const score = computeScore(user, repos);
  const best = topRepos(repos, 5);
  const languages = topLanguages(repos, 5);

  return (
    <>
      <section className="profile__header">
        <img
          className="profile__avatar"
          src={user.avatar_url}
          alt={`${user.login}'s GitHub avatar`}
          width={88}
          height={88}
        />
        <div className="profile__identity">
          <h1 className="profile__name">{user.name || user.login}</h1>
          <a
            className="profile__login"
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            @{user.login}
          </a>
          {user.bio && <p className="profile__bio">{user.bio}</p>}
        </div>
        <ScoreGauge score={score.total} />
      </section>

      <section className="profile__stats">
        <StatBlock label="Repos" value={score.repoCount} />
        <StatBlock label="Followers" value={user.followers} />
        <StatBlock label="Total stars" value={score.totalStars} />
        <StatBlock label="Total forks" value={score.totalForks} />
        <StatBlock
          label="On GitHub"
          value={`${score.accountAgeYears}y`}
        />
      </section>

      {languages.length > 0 && (
        <section className="profile__languages">
          <h2 className="profile__section-title"># top languages</h2>
          <ul className="profile__language-list">
            {languages.map((l) => (
              <li key={l.language} className="profile__language-chip">
                {l.language}
                <span className="profile__language-count">{l.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="profile__repos">
        <h2 className="profile__section-title"># top repos by stars</h2>
        {best.length === 0 ? (
          <p className="profile__empty">
            No public, non-fork repos to rank yet.
          </p>
        ) : (
          <div className="profile__repo-list">
            {best.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} rank={i + 1} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Profile;

import "./RepoCard.css";

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function RepoCard({ repo, rank }) {
  return (
    <a
      className="repo-card"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
    >
      <span className="repo-card__rank">#{rank}</span>
      <div className="repo-card__body">
        <div className="repo-card__top">
          <span className="repo-card__name">{repo.name}</span>
          {repo.language && (
            <span className="repo-card__language">{repo.language}</span>
          )}
        </div>
        {repo.description && (
          <p className="repo-card__desc">{repo.description}</p>
        )}
      </div>
      <div className="repo-card__stats">
        <span className="repo-card__stat">
          ★ {formatStars(repo.stargazers_count)}
        </span>
        <span className="repo-card__stat repo-card__stat--muted">
          ⑂ {formatStars(repo.forks_count)}
        </span>
      </div>
    </a>
  );
}

export default RepoCard;

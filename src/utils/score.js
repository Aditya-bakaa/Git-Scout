

function logPoints(value, max, divisor) {
  if (value <= 0) return 0;
  return Math.min(max, Math.round(Math.log2(value + 1) * divisor));
}

export function computeScore(user, repos) {
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const repoCount = repos.length;

  const accountAgeYears =
    (Date.now() - new Date(user.created_at).getTime()) /
    (1000 * 60 * 60 * 24 * 365);

  const breakdown = {
    stars: logPoints(totalStars, 40, 3.25),
    followers: logPoints(user.followers, 25, 2.16),
    forks: logPoints(totalForks, 15, 1.47),
    repos: Math.min(12, Math.round(repoCount * 0.8)),
    tenure: Math.min(8, Math.round(accountAgeYears * 1.6)),
  };

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return {
    total: Math.min(100, total),
    breakdown,
    totalStars,
    totalForks,
    repoCount,
    accountAgeYears: Math.floor(accountAgeYears),
  };
}

export function scoreTier(score) {
  if (score >= 85) return { label: "Exceptional", color: "var(--accent)" };
  if (score >= 65) return { label: "Strong", color: "var(--accent)" };
  if (score >= 45) return { label: "Promising", color: "var(--warn)" };
  if (score >= 25) return { label: "Early stage", color: "var(--warn)" };
  return { label: "Just getting started", color: "var(--danger)" };
}

export function topRepos(repos, count = 5) {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

export function topLanguages(repos, count = 5) {
  const counts = {};
  for (const r of repos) {
    if (!r.language) continue;
    counts[r.language] = (counts[r.language] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([language, count]) => ({ language, count }));
}

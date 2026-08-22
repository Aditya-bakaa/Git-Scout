const API_BASE = "https://api.github.com";


export class GitHubError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (res.status === 404) {
    throw new GitHubError("That username doesn't exist on GitHub.", 404);
  }

  if (res.status === 403) {
    // Unauthenticated requests are capped at 60/hour per IP by GitHub.
    throw new GitHubError(
      "GitHub's rate limit was hit. Wait a bit and try again.",
      403
    );
  }

  if (!res.ok) {
    throw new GitHubError(`GitHub API error (${res.status}).`, res.status);
  }

  return res.json();
}

export function getUser(username) {
  return request(`/users/${encodeURIComponent(username)}`);
}

// Pulls every public repo (paginated) sorted by last-updated, then hands
// back the raw array so the caller can re-sort by stars, language, etc.
export async function getAllRepos(username) {
  const perPage = 100;
  let page = 1;
  let repos = [];

  while (true) {
    const batch = await request(
      `/users/${encodeURIComponent(
        username
      )}/repos?per_page=${perPage}&page=${page}&sort=updated`
    );
    repos = repos.concat(batch);
    if (batch.length < perPage) break;
    page += 1;
    // Safety valve so one wildly prolific account can't spin us forever.
    if (page > 5) break;
  }

  return repos.filter((r) => !r.fork);
}

export async function scoutUser(username) {
  const [user, repos] = await Promise.all([
    getUser(username),
    getAllRepos(username),
  ]);
  return { user, repos };
}

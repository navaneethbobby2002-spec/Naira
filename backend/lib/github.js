export function getGithubEnv() {
  return {
    token: process.env.GITHUB_TOKEN || "",
    owner: process.env.GITHUB_OWNER || "",
    repo: process.env.GITHUB_REPO || "",
    branch: process.env.GITHUB_BRANCH || "main"
  };
}

export function hasGithubConfig() {
  const { token, owner, repo } = getGithubEnv();
  return Boolean(token && owner && repo);
}

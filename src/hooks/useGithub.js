import { useState, useEffect } from 'react';

const FALLBACK_PROFILE = {
  login: 'Santanu-Dubey',
  name: 'Santanu Dubey',
  bio: 'B.Tech CSE Student | Web, Backend, AI/ML & Cybersecurity',
  public_repos: 18,
  followers: 12,
  following: 15,
  html_url: 'https://github.com/Santanu-Dubey',
};

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'assetflow-erp',
    description: 'Full-stack ERP system for organizational asset lifecycle and department tracking.',
    language: 'JavaScript',
    stargazers_count: 5,
    html_url: 'https://github.com/Santanu-Dubey/assetflow-erp',
  },
  {
    id: 2,
    name: 'phishguard-forensics',
    description: 'Cybersecurity email analyzer with header forensics, SPF/DKIM validation & AI explanation.',
    language: 'Python',
    stargazers_count: 8,
    html_url: 'https://github.com/Santanu-Dubey',
  },
  {
    id: 3,
    name: 'edge-ai-drone-pest-control',
    description: 'YOLO-based computer vision drone pest detection model for precision agriculture.',
    language: 'Python',
    stargazers_count: 4,
    html_url: 'https://github.com/Santanu-Dubey',
  },
  {
    id: 4,
    name: 'project-eventra',
    description: 'Interactive event discovery and companion platform with reactive UI.',
    language: 'JavaScript',
    stargazers_count: 3,
    html_url: 'https://github.com/Santanu-Dubey',
  },
];

const TOP_LANGUAGES = [
  { name: 'Python', percentage: 42, color: '#1D3C9C' },
  { name: 'JavaScript', percentage: 34, color: '#3F8A1F' },
  { name: 'C++', percentage: 14, color: '#FF9F1C' },
  { name: 'SQL & HTML/CSS', percentage: 10, color: '#111111' },
];

export function useGithub() {
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [languages] = useState(TOP_LANGUAGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cachedData = sessionStorage.getItem('github_data_santanu');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setProfile(parsed.profile || FALLBACK_PROFILE);
        setRepos(parsed.repos || FALLBACK_REPOS);
        return;
      } catch {
        // Fallback to fetch
      }
    }

    async function fetchGithub() {
      setLoading(true);
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Santanu-Dubey'),
          fetch('https://api.github.com/users/Santanu-Dubey/repos?sort=updated&per_page=6'),
        ]);

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();

          const formattedRepos = reposData.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || 'Full-stack & AI/ML project repository.',
            language: r.language || 'Code',
            stargazers_count: r.stargazers_count || 0,
            html_url: r.html_url,
          }));

          setProfile(profileData);
          setRepos(formattedRepos.length > 0 ? formattedRepos : FALLBACK_REPOS);

          sessionStorage.setItem(
            'github_data_santanu',
            JSON.stringify({
              profile: profileData,
              repos: formattedRepos.length > 0 ? formattedRepos : FALLBACK_REPOS,
            })
          );
        }
      } catch (err) {
        console.warn('Using cached GitHub data fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGithub();
  }, []);

  return { profile, repos, languages, loading };
}

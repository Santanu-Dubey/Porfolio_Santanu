import React from 'react';
import { useGithub } from '../hooks/useGithub';
import { Reveal } from '../components/ui/Reveal';
import { Star, GitFork, ExternalLink, Code2 } from 'lucide-react';
import { GithubGlyph } from '../components/icons/socialIcons';

export function GithubSection() {
  const { profile, repos, languages } = useGithub();

  // Generate 52 weeks x 7 days contribution dot field
  const weeks = 28;
  const daysPerWeek = 7;

  return (
    <section
      id="github"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
              Open Source Cadence
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
              Building in Public
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-ink-muted max-w-[65ch] mx-auto mt-3">
              "I regularly use GitHub to experiment with new technologies, build projects, and document my learning journey."
            </p>
            <div className="mt-4">
              <a
                href={profile.html_url || 'https://github.com/Santanu-Dubey'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo hover:text-leaf border-b border-dashed border-indigo/40 pb-0.5"
                aria-label="Visit Santanu Dubey on GitHub"
              >
                <GithubGlyph className="w-3.5 h-3.5" />
                <span>github.com/Santanu-Dubey</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* 1. Contribution Graph as a Field of Tiny Pen Dots */}
        <Reveal delay={0.2} className="mb-16">
          <div className="text-center mb-4">
            <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">
              ✦ Activity Stream • Dot Field ✦
            </span>
          </div>

          <div className="overflow-x-auto pb-4 flex justify-center">
            <div className="inline-grid grid-flow-col grid-rows-7 gap-1.5 p-4 select-none">
              {Array.from({ length: weeks * daysPerWeek }).map((_, i) => {
                // Pseudo-random realistic activity level (0: none, 1: low, 2: mid, 3: high)
                const rand = (i * 17 + (i % 5) * 31) % 100;
                const level = rand > 75 ? 3 : rand > 50 ? 2 : rand > 30 ? 1 : 0;
                const r = level === 3 ? 3.2 : level === 2 ? 2.4 : level === 1 ? 1.6 : 1.0;
                const opacity = level === 3 ? 0.9 : level === 2 ? 0.6 : level === 1 ? 0.35 : 0.12;

                return (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 flex items-center justify-center"
                    title={`Day ${i + 1}: ${level > 0 ? `${level * 2} commits` : 'rest day'}`}
                  >
                    <span
                      className="rounded-full bg-ink transition-transform hover:scale-150"
                      style={{
                        width: `${r * 2}px`,
                        height: `${r * 2}px`,
                        opacity,
                        backgroundColor: level === 3 ? 'var(--indigo)' : 'var(--ink)',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 2. Most-Used Languages Breakdown & Selected Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start select-none">
          {/* Languages breakdown */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo" />
              <span>Language Distribution</span>
            </h3>

            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-ink">
                    <span>{lang.name}</span>
                    <span className="text-ink-muted">{lang.percentage}%</span>
                  </div>
                  {/* Pen stroke line indicator */}
                  <div className="h-1.5 w-full bg-ink-faint rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Repositories */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
              <GithubGlyph className="w-5 h-5 text-leaf" />
              <span>Selected Repositories</span>
            </h3>

            <div className="space-y-6">
              {repos.slice(0, 4).map((repo) => (
                <div key={repo.id} className="pb-4 border-b border-dashed border-ink/15">
                  <div className="flex items-center justify-between">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-lg font-bold text-ink hover:text-indigo transition-colors flex items-center gap-2"
                      aria-label={`Repository ${repo.name}`}
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-ink-muted" />
                    </a>

                    <div className="flex items-center gap-3 text-xs font-mono text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-marigold" />
                        {repo.stargazers_count}
                      </span>
                      <span className="px-2 py-0.5 rounded-full border border-ink/20">
                        {repo.language}
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                    {repo.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

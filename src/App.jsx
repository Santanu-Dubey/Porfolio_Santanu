import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/layout/Navbar';
import { SocialRail } from './components/layout/SocialRail';
import { Cursor } from './components/layout/Cursor';
import { Intro } from './components/layout/Intro';
import { Footer } from './components/layout/Footer';
import { MandalaBackground } from './components/art/MandalaBackground';
import { InkBurst } from './components/art/InkBurst';
import { FishCanvas } from './engines/fish/FishCanvas';

// Portfolio Sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Hackathons } from './sections/Hackathons';
import { Certifications } from './sections/Certifications';
import { GithubSection } from './sections/GithubSection';
import { Learning } from './sections/Learning';
import { Achievements } from './sections/Achievements';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Initialize Lenis smooth scrolling synced with GSAP
  useLenis(introFinished);

  return (
    <div className="paper-canvas min-h-screen relative overflow-x-hidden">
      {/* SVG Filters for ink wobble & organic line jitter */}
      <svg className="hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="ink-wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Opening Intro Sequence (Stroke-dash draw, max 3.8s with Skip button) */}
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}

      {/* Layer 1: Edge Fabric Vignette (Indigo & Leaf Green block-print depth) */}
      <div className="fabric-vignette" aria-hidden="true" />

      {/* Layer 2: Paper Grain Overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Layer 3: Giant Faint Rotating Background Mandala & Floating Petals */}
      <MandalaBackground />

      {/* Layer 4: Interactive Fish School Canvas (Boids flocking & cursor fleeing) */}
      <FishCanvas />

      {/* Layer 5: Custom Animated Pen-Ink Cursor & Click Bursts */}
      <Cursor />
      <InkBurst />

      {/* Navigation & Fixed Elements */}
      <Navbar />
      <SocialRail />

      {/* Main Continuous Box-Free Content Flow */}
      <main className="relative z-20 flex flex-col gap-16 sm:gap-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Hackathons />
        <Certifications />
        <GithubSection />
        <Learning />
        <Achievements />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

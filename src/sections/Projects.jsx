import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PROJECTS } from '../data/projects';
import { MandalaWheel } from '../components/art/MandalaWheel';
import { ProjectBloomDetails } from '../components/art/ProjectBloomDetails';
import { MoreProjectsTrail } from '../components/art/MoreProjectsTrail';
import { Reveal } from '../components/ui/Reveal';
import { useMotion } from '../context/MotionContext';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const { reducedMotion, isTouch } = useMotion();

  useEffect(() => {
    // Only apply GSAP scroll pinning on desktop when motion is allowed
    if (reducedMotion || isTouch || window.innerWidth < 1024) return;

    const section = sectionRef.current;
    const pinEl = pinRef.current;
    if (!section || !pinEl) return;

    const count = FEATURED_PROJECTS.length;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${count * 600}`,
      pin: pinEl,
      scrub: 0.5,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * count),
          count - 1
        );
        setActiveIndex(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion, isTouch]);

  const activeProject = FEATURED_PROJECTS[activeIndex] || FEATURED_PROJECTS[0];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 sm:px-8 select-none"
    >
      <div ref={pinRef} className="max-w-7xl mx-auto flex flex-col justify-center min-h-[90vh]">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
              Radial Showcase
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
              The Mandala Wheel
            </h2>
            <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
              Scroll or tap a petal to rotate the wheel. Each project unfolds onto the paper without container cards.
            </p>
          </Reveal>
        </div>

        {/* Desktop Layout: Wheel on left/center, Blooming Details on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Wheel Column */}
          <div className="lg:col-span-6 flex justify-center">
            <MandalaWheel
              projects={FEATURED_PROJECTS}
              activeIndex={activeIndex}
              onSelectProject={(idx) => setActiveIndex(idx)}
              size={500}
            />
          </div>

          {/* Details Column (No cards, text written directly on paper) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <ProjectBloomDetails project={activeProject} />
          </div>
        </div>

        {/* More Projects Dot Trail */}
        <MoreProjectsTrail />
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { Mandala } from '../components/art/Mandala';
import { Reveal } from '../components/ui/Reveal';
import { useMotion } from '../context/MotionContext';
import { Mail, Send, Check } from 'lucide-react';
import { GithubGlyph, LinkedinGlyph } from '../components/icons/socialIcons';

export function Contact() {
  const { triggerBurst } = useMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerBurst(window.innerWidth / 2, window.innerHeight / 2);
    setSubmitted(true);

    // Open mail client with prefilled details
    const subject = encodeURIComponent(`Project / Internship Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Santanu,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${PROFILE.links.emailRaw}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full text-center mb-12">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
            Initiate Collaboration
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.8rem)] font-bold text-ink leading-tight">
            {PROFILE.contact.heading}
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-muted max-w-[62ch] mx-auto mt-4 leading-relaxed">
            {PROFILE.contact.subheading}
          </p>
        </Reveal>

        {/* Quick direct communication links */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 font-mono text-xs uppercase tracking-wider">
            <a
              href={`mailto:${PROFILE.links.emailRaw}`}
              className="inline-flex items-center gap-2 text-ink hover:text-indigo border-b border-dashed border-ink/30 pb-0.5 transition-colors"
              aria-label="Send direct email to Santanu Dubey"
            >
              <Mail className="w-3.5 h-3.5 text-indigo" />
              <span>{PROFILE.links.emailRaw}</span>
            </a>

            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ink hover:text-leaf border-b border-dashed border-ink/30 pb-0.5 transition-colors"
              aria-label="View Santanu's GitHub profile"
            >
              <GithubGlyph className="w-3.5 h-3.5 text-leaf" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ink hover:text-indigo border-b border-dashed border-ink/30 pb-0.5 transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <LinkedinGlyph className="w-3.5 h-3.5 text-indigo" />
              <span>LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Message Form with Big Spinning Mandala Submit Button */}
      <div className="max-w-2xl mx-auto w-full">
        <Reveal delay={0.3}>
          <form onSubmit={handleSubmit} className="space-y-6 select-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1 text-left">
                <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full bg-transparent border-b-2 border-ink/30 focus:border-indigo py-2 text-base font-serif text-ink placeholder:text-ink-muted/40 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full bg-transparent border-b-2 border-ink/30 focus:border-indigo py-2 text-base font-serif text-ink placeholder:text-ink-muted/40 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's discuss an internship, technical project, or software challenge..."
                className="w-full bg-transparent border-b-2 border-ink/30 focus:border-indigo py-2 text-base font-serif text-ink placeholder:text-ink-muted/40 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* The Big Spinning Mandala Acts as the Main Button */}
            <div className="flex flex-col items-center justify-center pt-8">
              <button
                type="submit"
                className="relative group w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center focus-visible:outline-none cursor-pointer"
                aria-label="Send message to Santanu Dubey"
              >
                {/* Big spinning outer mandala ring */}
                <div className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-105">
                  <Mandala
                    size={192}
                    color="var(--ink)"
                    spin={true}
                    className="w-full h-full group-hover:stroke-indigo"
                  />
                </div>

                {/* Center Core Action Badge */}
                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-paper border border-ink/50 group-hover:border-indigo flex flex-col items-center justify-center transition-all group-hover:scale-110">
                  {submitted ? (
                    <>
                      <Check className="w-6 h-6 text-leaf mb-1" />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-leaf font-semibold">
                        Sent!
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-indigo mb-1 transition-transform group-hover:translate-x-1" />
                      <span className="font-serif text-xs sm:text-sm font-bold text-ink uppercase tracking-wider">
                        Send Ink
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                        Message
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

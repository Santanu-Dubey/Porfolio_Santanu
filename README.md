# Santanu Dubey — Animated Portfolio

> **"One Smooth, Box-Free World"**  
> A continuous, single-page living paper canvas crafted with black fineliner pen mandala art, custom 2D canvas fish boids, Matter.js physics ball pool, and GSAP pinned mandala wheel.

---

## 🎨 Creative Philosophy

- **Zero Boxes or Cards:** Absolute eradication of rectangular cards, bordered panels, drop shadows, and section dividing lines. Content sits directly on warm paper (`#F8F4EA`), unfolding as art grows across the page.
- **Radial Black Pen Art Style:** Perfectly radial mandala geometry featuring hatched lotus petals, teardrop arches, rings of dots, and solid ink pointed petal tips.
- **Living Canvas:** Idle micro-movements ensure the page is never static — 16 flocking fish that panic and flee the cursor, 36 floating skill ball medallions, buoy bobbing social medallions, and rotating background mandalas.
- **Fluid Themes:** Instantaneous toggle between the traditional **Ink** palette and the organic **Indigo-Green** fabric wash.

---

## 🛠 Tech Stack

| Domain | Technology | Single Responsibility |
|---|---|---|
| **Core Framework** | React 18 + Vite | Component structure, fast bundle, JSX |
| **Styling** | Tailwind CSS v3 + Custom CSS | Fluid typography (`clamp()`), spacing, CSS tokens |
| **Physics Simulation** | Matter.js (`matter-js`) | Skills Ball Pool (collision, cluster centroid gravity, drag/throw) |
| **Fish School Simulation** | Custom Canvas 2D Engine | 16 pen-drawn boids with Craig Reynolds rules & 180px panic flee radius |
| **Smooth Scrolling** | Lenis (`lenis`) | Inertia smooth scrolling synchronized with GSAP ticker |
| **Scroll Pinning & Scrubbing** | GSAP + ScrollTrigger | Pinning and scrubbed rotation of the Projects Mandala Wheel |
| **UI Springs & Transitions** | Framer Motion | Opening sequence, magnetic buttons, ink ripples, whileInView reveals |
| **Typography** | `@fontsource/fraunces` | Self-hosted luxury editorial serif font |
| **Icons** | Custom Inline SVG | 36+ custom pen-drawn mandala technology and social glyphs |

---

## 📁 Project Structure

```
santanu-portfolio/
├── public/
│   ├── favicon.svg                    # Mandala vector favicon
│   ├── og-image.png                   # Open Graph social banner (1200x630)
│   ├── robots.txt                     # SEO bot instructions
│   ├── resume.pdf                     # [PLACEHOLDER] Official downloadable resume
│   ├── photo-placeholder.webp         # [PLACEHOLDER] About section portrait
│   └── projects/                      # [PLACEHOLDERS] 800x500 WebP screenshot previews
│       ├── phishguard.webp
│       ├── assetflow.webp
│       ├── drone-ai.webp
│       ├── eventra.webp
│       ├── segmentation.webp
│       └── ott.webp
├── src/
│   ├── main.jsx                       # Application entry point & provider wrapper
│   ├── App.jsx                        # 5-depth layer composition & section flow
│   ├── assets/textures/               # Texture storage
│   ├── styles/
│   │   ├── index.css                  # Main CSS combining Tailwind & art imports
│   │   ├── tokens.css                 # CSS variables (--paper, --ink, --indigo, --green)
│   │   └── art.css                    # Paper grain texture, fabric vignette, fine-line ink
│   ├── data/                          # 100% Content Data (Edit without touching components)
│   │   ├── profile.js                 # Bio, roles, education, contact links
│   │   ├── skills.js                  # 36 technologies, petal patterns, radii
│   │   ├── projects.js                # 6 featured wheel projects + 4 utility projects
│   │   ├── hackathons.js              # SIH, Hacknexus 2.0, Odoo Hackathon '26
│   │   ├── certifications.js          # Credly & training certificate records
│   │   ├── experience.js              # CSRBOX & HEX Software internships
│   │   └── learning.js                # Currently Learning topics & verified Achievements
│   ├── context/
│   │   ├── ThemeContext.jsx           # Ink vs. Indigo-Green palette switcher
│   │   └── MotionContext.jsx          # prefers-reduced-motion & shared pointer Ref
│   ├── hooks/
│   │   ├── useCursor.js               # Lagging ring, ink trail, interactive swelling
│   │   ├── useMagnetic.js             # Spring attraction toward pointer
│   │   ├── useScrollProgress.js       # Window scroll percentage & Y coordinate
│   │   ├── useLenis.js                # Smooth scrolling synchronized with GSAP
│   │   └── useGithub.js               # GitHub REST API with sessionStorage caching
│   ├── engines/
│   │   ├── fish/
│   │   │   ├── boids.js               # Separation, alignment, cohesion, panic flee
│   │   │   ├── drawFish.js            # Pen-drawn fish: fins, scales, sine spine
│   │   │   └── FishCanvas.jsx         # 60fps RAF canvas with click scattering
│   │   └── balls/
│   │       ├── physics.js             # Matter.js world, cursor repulsion, cluster forces
│   │       └── BallPool.jsx           # Canvas physics component with drag & throw
│   ├── components/
│   │   ├── layout/                    # Navbar, SocialRail, Footer, Cursor, Intro
│   │   ├── art/                       # Mandala, MandalaBackground, Vine, PenText, InkBurst
│   │   ├── icons/                     # MandalaIcon, techIcons, socialIcons
│   │   └── ui/                        # MagneticButton, Reveal
│   ├── sections/                      # Hero, About, Skills, Projects, Experience, etc.
│   └── utils/
│       ├── math.js                    # lerp, clamp, distance, angle
│       └── constants.js               # Boids and ball pool physics configurations
├── index.html                         # SEO title, meta descriptions, Open Graph tags
├── tailwind.config.js                 # Tailwind v3 setup with custom typography & colors
├── vite.config.js                     # Chunk-split production build configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.16.0)
- npm 9+

### Installation & Local Development
```bash
# Clone or navigate to the repository
cd porfolio_bengalistyle_2

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized, chunk-split production bundle inside the `dist/` directory with zero warnings.

---

## 📝 How to Edit Content

All textual content and external links are strictly isolated in `src/data/`:

| File | Content Controlled |
|---|---|
| `src/data/profile.js` | Name, title, typewriter cycling roles, bio copy, education milestones, email, LinkedIn, GitHub links |
| `src/data/skills.js` | Technologies in the Ball Pool, petal pattern assignments, radii, screen-reader aria labels |
| `src/data/projects.js` | Featured 6 Mandala Wheel projects, Problem/Solution statements, GitHub/Live links, More Projects |
| `src/data/experience.js` | Timeline vine leaves, organizations, project-based training descriptions |
| `src/data/hackathons.js` | Stepping stone titles, projects, role, and algorithmic tags |
| `src/data/certifications.js` | Floating medallion titles, issuers, and verification URLs |
| `src/data/learning.js` | Drifting keyword rings and verified milestone cards |

---

## 📌 Placeholder Catalog (Ready for Replacement)

The following assets and links have been provided as fully working, styled placeholders and can be replaced with production assets:

1. **Profile Photo:**
   - Location: `public/photo-placeholder.webp`
   - Replacement: Drop your portrait into `public/` and update `PROFILE.about.photo` in `src/data/profile.js`.
2. **Resume PDF:**
   - Location: `public/resume.pdf`
   - Replacement: Drop your real resume PDF into `public/resume.pdf`.
3. **LinkedIn URL:**
   - Location: `src/data/profile.js` -> `PROFILE.links.linkedin`
   - Current value: `https://linkedin.com/in/santanu-dubey`
4. **Project Screenshots:**
   - Locations:
     - `public/projects/phishguard.webp`
     - `public/projects/assetflow.webp`
     - `public/projects/drone-ai.webp`
     - `public/projects/eventra.webp`
     - `public/projects/segmentation.webp`
     - `public/projects/ott.webp`
   - Replacement: Replace with actual product UI captures (recommended 800x500 WebP).
5. **Project Links:**
   - Location: `src/data/projects.js`
   - PhishGuard Forensics GitHub & Live links
   - Edge-AI Drone GitHub link
   - Eventra GitHub link
   - Customer Segmentation & OTT Analysis GitHub links
6. **Certificate Verification Links:**
   - Location: `src/data/certifications.js`
   - Add Credly URLs or verification badges for IBM SkillsBuild and workshop credentials.

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub: `https://github.com/Santanu-Dubey/portfolio`.
2. Go to [Vercel](https://vercel.com) and click **"Add New..." -> "Project"**.
3. Import your GitHub repository.
4. Keep the default Vite build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

---

## ♿ Accessibility & Performance Features

- **No Box Containers:** Smooth visual reading flow without artificial rectangular borders.
- **prefers-reduced-motion:** Detects user preferences; freezes the fish school and ball cluster, replacing high-motion transitions with gentle fades.
- **Touch Detection:** Mobile viewports disable hover magnets, downscale particle counts (8 fish, 24 balls), and preserve native smooth scrolling without gesture trapping.
- **Resource Efficiency:** Canvases pause simulation loops via `IntersectionObserver` when scrolled off-screen or when the browser tab is hidden.
- **SEO & Social Sharing:** Rich Open Graph, Twitter cards, meta descriptions, and sitemap/robots configurations included.

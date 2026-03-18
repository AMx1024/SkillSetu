# SkillSetu — 48-Hour MVP Prototype TODO

> **Scope**: Class demo prototype — demonstrate core product concept
> **Stack**: Next.js · React · TypeScript · Tailwind CSS · Framer Motion
> **Data**: Local JSON files (no database, no backend, no auth)
> **Content**: 5 careers · ~6 skills · 3–4 subskills each · 1–2 questions per skill

---

## Phase 0 — Project Setup *(~1 hour)*

### 0.1 Initialize Project
- [ ] Create Next.js app: `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- [ ] Verify dev server runs: `npm run dev`
- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] (Optional) Install D3.js for graph visualization: `npm install d3 @types/d3`

### 0.2 Tailwind Design Tokens
- [ ] Configure `tailwind.config.ts` with custom theme:
  ```
  colors:
    primary:    #2563EB  (Electric Blue)
    secondary:  #6366F1  (Indigo)
    accent:     #22D3EE  (Neon Cyan)
    accent2:    #A78BFA  (Soft Purple)
    bg-dark:    #0F172A
    bg-darker:  #020617
  ```
- [ ] Add Google Fonts to `layout.tsx`:
  - Headings: **Inter** (or Satoshi if self-hosted)
  - Body: **DM Sans**
  - Code/tags: **JetBrains Mono**
- [ ] Create CSS utility classes in `globals.css`:
  - `.glass` — glassmorphism (backdrop-blur, translucent bg, subtle border)
  - `.clay` — claymorphism (rounded-2xl, inner shadow, outer shadow, soft 3D)
  - `.glow-btn` — gradient glow hover effect for CTAs

### 0.3 Folder Structure
- [ ] Create directory layout:
  ```
  src/
  ├── app/
  │   ├── page.tsx                  # Landing page
  │   ├── layout.tsx                # Root layout + fonts + nav
  │   ├── careers/
  │   │   └── page.tsx              # Career explorer
  │   ├── career/
  │   │   └── [id]/
  │   │       └── page.tsx          # Single career → skills
  │   ├── skills/
  │   │   └── [id]/
  │   │       └── page.tsx          # Skill detail page
  │   ├── practice/
  │   │   └── [skillId]/
  │   │       └── page.tsx          # Practice question
  │   └── dashboard/
  │       └── page.tsx              # Mastery dashboard
  ├── components/
  │   ├── Navbar.tsx
  │   ├── Footer.tsx
  │   ├── CareerCard.tsx
  │   ├── SkillCard.tsx
  │   ├── SubskillTag.tsx
  │   ├── ResourceCard.tsx
  │   ├── QuestionCard.tsx
  │   ├── ProgressBar.tsx
  │   ├── HeroSection.tsx
  │   └── MasteryRadar.tsx          # (optional)
  ├── data/
  │   ├── careers.json
  │   ├── skills.json
  │   └── questions.json
  ├── lib/
  │   └── mastery.ts                # Mastery score logic + localStorage helpers
  └── types/
      └── index.ts                  # TypeScript interfaces
  ```

---

## Phase 1 — Data Layer *(~2 hours)*

### 1.1 TypeScript Interfaces
- [ ] Define types in `src/types/index.ts`:
  ```ts
  interface Career {
    id: string;
    name: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    avgSalary: string;
    learningTime: string;
    skills: string[];     // skill IDs
  }

  interface Skill {
    name: string;
    description: string;
    subskills: string[];
    resources: Resource[];
  }

  interface Resource {
    type: "video" | "article" | "course" | "book";
    title: string;
    url: string;
    duration?: string;
  }

  interface Question {
    id: string;
    skill: string;          // skill ID
    subskill?: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    difficulty: number;     // 1–5
  }

  interface MasteryState {
    [skillId: string]: number;  // 0–100
  }
  ```

### 1.2 Create `careers.json`
- [ ] Add 5 careers with real data:
  1. **Process Engineer** — skills: thermodynamics, fluid_mechanics, heat_transfer, process_simulation, numerical_methods, python_for_engineers
  2. **Data Scientist** — skills: statistics, machine_learning, deep_learning, python_for_engineers, data_visualization, sql
  3. **Machine Learning Engineer** — skills: machine_learning, deep_learning, python_for_engineers, linear_algebra, mlops, software_engineering
  4. **Chemical Process Engineer** — skills: thermodynamics, fluid_mechanics, heat_transfer, process_simulation, reaction_engineering, safety_engineering
  5. **Investment Analyst** — skills: financial_modeling, statistics, python_for_engineers, economics, valuation, risk_analysis
- [ ] Each career has: `id`, `name`, `description` (1–2 sentences), `difficulty`, `avgSalary`, `learningTime`, `skills[]`

### 1.3 Create `skills.json`
- [ ] Add ~15–20 unique skills (union across all careers)
- [ ] Each skill has:
  - `name` — display name
  - `description` — 1–2 sentence explanation
  - `subskills` — array of 3–4 subskill names (strings)
  - `resources` — array of 1–2 resources with `{ type, title, url, duration? }`
- [ ] Use real YouTube / article URLs where possible (or placeholder links)

### 1.4 Create `questions.json`
- [ ] Add 1–2 MCQ questions per skill (~20–30 total)
- [ ] Each question has: `id`, `skill` (matching skill ID), `question`, `options` (4 choices), `answer`, `explanation`, `difficulty` (1–5)
- [ ] Write realistic questions (not placeholder text)

### 1.5 Data Loader Utilities
- [ ] Create helper functions in `src/lib/data.ts`:
  - `getCareers()` → returns all careers
  - `getCareerById(id)` → returns single career
  - `getSkillById(id)` → returns single skill
  - `getSkillsForCareer(careerId)` → returns skill objects for a career
  - `getQuestionsForSkill(skillId)` → returns questions for a skill
- [ ] All functions import from JSON files directly (static imports)

### 1.6 Mastery Store (localStorage)
- [ ] Create `src/lib/mastery.ts`:
  - `getMastery(): MasteryState` — read from localStorage, default to `DEMO_DEFAULTS` if empty
  - `getSkillMastery(skillId): number` — returns score for one skill, default `0`
  - `updateMastery(skillId, isCorrect): number` — correct: `+15`, incorrect: `+5`, cap at `100`
  - `resetMastery()` — clear all scores (for demo reset button)
  - `seedDemoData()` — write demo defaults to localStorage if not already present

### 1.7 Pre-Populated Demo Mastery Data
- [ ] Define `DEMO_DEFAULTS` constant in `mastery.ts`:
  ```ts
  const DEMO_DEFAULTS: MasteryState = {
    thermodynamics: 55,
    fluid_mechanics: 20,
    heat_transfer: 10,
    statistics: 40,
    machine_learning: 65,
    python_for_engineers: 80,
  };
  ```
- [ ] On first app load (in root `layout.tsx` or a client provider), call `seedDemoData()` to populate localStorage so the dashboard is never empty during the demo
- [ ] `resetMastery()` should re-seed demo defaults (not clear to empty)

---

## Phase 2 — Layout & Landing Page *(~4 hours)*

### 2.1 Root Layout (`layout.tsx`)
- [ ] Set metadata: title "SkillSetu — Master Skills That Get You Hired", description
- [ ] Import Google Fonts (Inter, DM Sans, JetBrains Mono)
- [ ] Dark gradient background (`bg-darker` → `bg-dark`)
- [ ] Include `<Navbar />` and `<Footer />`

### 2.2 Navbar Component
- [ ] Sticky top navbar, glassmorphic background on scroll
- [ ] Logo: "SkillSetu" text (bold, gradient text or accent color)
- [ ] Nav links: Careers · Skills · Dashboard
- [ ] "Get Started" CTA button (glow effect)
- [ ] Mobile: hamburger menu with slide-out drawer
- [ ] Links use Next.js `<Link>` for client-side navigation

### 2.3 Hero Section
- [ ] Two-column layout (stack on mobile)
- [ ] **Left column:**
  - Headline: **"Master Skills That Actually Get You Hired"** (large, bold)
  - Subtext: "Choose a career → learn the exact skills → practice with real problems"
  - Two CTA buttons:
    - Primary "Start Learning" → links to `/careers`
    - Secondary "Explore Careers" → links to `/careers`
- [ ] **Right column:**
  - Animated flow diagram showing: Career → Skill → Subskill → Resource → Practice
  - Use Framer Motion `motion.div` for staggered reveal
  - Glassmorphic floating cards with subtle float animation
- [ ] Entrance animation: fade-up on load

### 2.4 Product Explanation Section
- [ ] Three large claymorphic cards (grid, responsive):
  - **Career Roadmaps**: icon + title + description + "Explore Roadmaps" link
  - **Skill Graph**: icon + title + description + mini tree visualization
  - **Structured Learning**: icon + title + "Career → Skill → Subskill → Resource → Practice" visual
- [ ] Framer Motion: scroll-triggered `whileInView` fade-up

### 2.5 How It Works Section
- [ ] Visual step diagram (horizontal on desktop, vertical on mobile):
  1. Choose Career
  2. Learn Skills
  3. Practice
  4. Build Mastery
  5. Get Job Ready
- [ ] Each step: icon + title + short description
- [ ] Connected by animated lines/arrows
- [ ] Framer Motion stagger on scroll

### 2.6 CTA Section
- [ ] Large centered block:
  - Headline: "Start mastering skills today."
  - Two buttons: "Get Started" + "Explore Careers"
- [ ] Gradient background or glassmorphic panel

### 2.7 Footer
- [ ] Simple footer: logo, "Built for a class demo", links to github (optional)
- [ ] Minimal styling

---

## Phase 3 — Career Explorer *(~3 hours)*

### 3.1 Career Explorer Page (`/careers`)
- [ ] Page title: "Explore Careers"
- [ ] Subtitle: "Choose a career path and see exactly what skills you need"
- [ ] Load all careers from `getCareers()`
- [ ] Render grid of `<CareerCard />` components (2 or 3 columns, 1 on mobile)

### 3.2 CareerCard Component
- [ ] Claymorphic card with:
  - Career name (bold heading)
  - Description (1–2 lines)
  - Difficulty badge (color-coded: green/yellow/red)
  - Average salary
  - Learning time estimate
  - Skill count: "6 skills required"
- [ ] Hover effect: card lifts slightly + shadow increases (Framer Motion `whileHover`)
- [ ] Click → navigates to `/career/[id]`

### 3.3 Career Detail Page (`/career/[id]`)
- [ ] Load career by ID: `getCareerById(params.id)`
- [ ] Load associated skills: `getSkillsForCareer(params.id)`
- [ ] **Header section:**
  - Career name (h1)
  - Description
  - Metadata: difficulty, salary, learning time
- [ ] **Skills grid:**
  - Grid of `<SkillCard />` components
  - Each links to `/skills/[skillId]`
- [ ] **Roadmap visualization (optional):**
  - Simple vertical or horizontal flow diagram showing skill order
  - Framer Motion stagger animation

### 3.4 SkillCard Component
- [ ] Claymorphic card with:
  - Skill name
  - Subskill count (e.g., "4 subskills")
  - Mastery progress bar (read current mastery from localStorage)
  - Mastery percentage label
- [ ] Hover lift effect
- [ ] Click → navigates to `/skills/[skillId]`

---

## Phase 4 — Skill Pages *(~4 hours)*

### 4.1 Skill Detail Page (`/skills/[id]`)
- [ ] Load skill by ID: `getSkillById(params.id)`
- [ ] Load questions: `getQuestionsForSkill(params.id)`
- [ ] Read current mastery: `getSkillMastery(params.id)`

### 4.2 Skill Header
- [ ] Skill name (h1)
- [ ] Skill description
- [ ] Mastery progress bar with current score
- [ ] "Practice Now" CTA button → links to `/practice/[skillId]`

### 4.3 Subskills Section
- [ ] Section title: "Subskills"
- [ ] Render as tag pills or small cards:
  - Each displays subskill name
  - Styled with `JetBrains Mono` font
  - Glassmorphic tag style with subtle border
- [ ] Use `<SubskillTag />` component

### 4.4 Resources Section
- [ ] Section title: "Learning Resources"
- [ ] Grid/list of `<ResourceCard />` components
- [ ] **ResourceCard:**
  - Resource type icon (🎥 video, 📄 article, 📚 book, 🎓 course)
  - Resource title
  - Duration (if available)
  - "Open Resource" button → opens URL in new tab (`target="_blank"`)
  - Glassmorphic card style

### 4.5 Questions Preview
- [ ] Section: "Practice Questions Available" with count
- [ ] "Start Practice" CTA button → links to `/practice/[skillId]`

### 4.6 Skill Graph Visualization (D3.js)
- [ ] Create `<SkillGraph />` component in `src/components/SkillGraph.tsx`
- [ ] Create `src/data/skill_dependencies.json`:
  ```json
  [
    { "from": "thermodynamics", "to": "phase_equilibrium" },
    { "from": "phase_equilibrium", "to": "distillation" },
    { "from": "linear_algebra", "to": "optimization" },
    { "from": "optimization", "to": "machine_learning" },
    { "from": "statistics", "to": "machine_learning" },
    { "from": "machine_learning", "to": "deep_learning" }
  ]
  ```
- [ ] Render a **top-down tree diagram** using D3.js (`d3-hierarchy` + `d3-tree`):
  - Nodes: rounded glassmorphic pills with skill name
  - Edges: curved SVG paths with gradient stroke
  - Node coloring based on mastery (red → yellow → green)
  - Hover: node glows + tooltip showing mastery %
  - Click: navigate to `/skills/[skillId]`
- [ ] If D3 is too complex under time pressure, fallback to a **pure CSS/HTML tree**:
  - Vertical flow using flexbox
  - `Thermodynamics → Phase Equilibrium → Distillation` with arrow connectors
  - Still color-coded by mastery
- [ ] Place the graph on:
  - `/career/[id]` page — show dependency tree for that career's skills
  - Landing page Section 5 — as an interactive preview
- [ ] Responsive: horizontal scroll on mobile if tree is wide

---

## Phase 5 — Practice System *(~5 hours)*

### 5.1 Practice Page (`/practice/[skillId]`)
- [ ] Load questions for skill: `getQuestionsForSkill(params.skillId)`
- [ ] State management:
  - `currentQuestionIndex` — tracks which question the user is on
  - `selectedOption` — currently selected answer (null initially)
  - `isSubmitted` — whether answer has been submitted
  - `isCorrect` — result after submission
  - `masteryGain` — points gained (+15 or +5)

### 5.2 QuestionCard Component
- [ ] Display question text (large, clear)
- [ ] Difficulty badge (1–5 stars or label)
- [ ] Skill name label at top

### 5.3 Answer Options
- [ ] Render 4 option buttons (vertical stack)
- [ ] Each option:
  - Claymorphic button style
  - Click → selects this option (highlight with primary color border)
  - Only one selectable at a time (radio behavior)
- [ ] Pre-submit states:
  - Default: neutral glass style
  - Selected: blue border glow
- [ ] Post-submit states:
  - Correct answer: green border + ✓ icon
  - Incorrect selected: red border + ✗ icon
  - Correct (if user picked wrong): green border shown

### 5.4 Submit & Feedback Flow
- [ ] "Submit Answer" button (disabled until an option is selected)
- [ ] On submit:
  1. Set `isSubmitted = true`
  2. Compare `selectedOption` with `question.answer`
  3. Set `isCorrect`
  4. Call `updateMastery(skillId, isCorrect)` → returns new score
  5. Set `masteryGain` to +15 or +5
  6. Show visual feedback
- [ ] **Feedback panel (appears after submit):**
  - Result: "Correct! 🎉" or "Incorrect"
  - Points gained: "+15 mastery" or "+5 mastery"
  - Explanation text from question data
  - Animated mastery progress bar update (Framer Motion `animate`)
- [ ] "Next Question" button → advance to next question
- [ ] If last question → "Back to Skill" button or "View Dashboard"

### 5.5 Practice Completion Summary
- [ ] After all questions answered, show summary:
  - Questions attempted
  - Correct / incorrect count
  - Total mastery gained this session
  - Updated skill mastery score
  - "View Dashboard" and "Practice Again" buttons

---

## Phase 6 — Mastery System *(~2 hours)*

### 6.1 Mastery Logic (already scaffolded in Phase 1.6)
- [ ] Verify `updateMastery()` works:
  - Correct answer: score += 15 (cap at 100)
  - Incorrect answer: score += 5 (cap at 100)
  - Persists to localStorage immediately
- [ ] Ensure mastery reads correctly on:
  - SkillCard (career page)
  - Skill detail page header
  - Practice page progress bar
  - Dashboard

### 6.2 ProgressBar Component
- [ ] Reusable `<ProgressBar />` component
- [ ] Props: `value` (0–100), `label` (skill name), `size` ("sm" | "md" | "lg")
- [ ] Visual:
  - Background: dark translucent bar
  - Fill: gradient from primary (#2563EB) to accent (#22D3EE)
  - Percentage label on the right
  - Animated fill width (Framer Motion `motion.div` with `animate={{ width }}`)
- [ ] Color transitions:
  - 0–39: reddish gradient (at risk)
  - 40–69: yellow/amber gradient (medium)
  - 70–100: green/cyan gradient (stable)

### 6.3 Mastery Change Toast
- [ ] When mastery updates (after practice submit), show a brief toast notification:
  - "+15 Mastery in Thermodynamics!" (or +5)
  - Auto-dismiss after 3 seconds
  - Framer Motion slide-in from top-right

---

## Phase 7 — Dashboard *(~4 hours)*

### 7.1 Dashboard Page (`/dashboard`)
- [ ] Page title: "Your Mastery Dashboard"
- [ ] Read all mastery scores from localStorage
- [ ] If empty (no practice done), show empty state:
  - "You haven't practiced any skills yet"
  - CTA: "Start Learning" → `/careers`

### 7.2 Overall Stats Bar
- [ ] Top stats strip showing:
  - **Total Skills Practiced**: count of skills with mastery > 0
  - **Average Mastery**: mean of all practiced skill scores
  - **Highest Skill**: name + score of top skill
- [ ] Glassmorphic cards in a row

### 7.3 Skill Mastery Grid
- [ ] Grid of skill mastery cards (one per practiced skill)
- [ ] Each card:
  - Skill name
  - Mastery score (large number)
  - `<ProgressBar />` component
  - Risk label: "At Risk" (<40) / "Medium" (40–69) / "Stable" (70+)
  - "Practice" button → links to `/practice/[skillId]`
- [ ] Claymorphic card style
- [ ] Sort by: highest mastery first (or lowest mastery first for "needs attention")

### 7.4 Mastery Heatmap (Optional but impressive)
- [ ] Simple grid heatmap showing all skills:
  - Green cells = high mastery
  - Yellow cells = medium
  - Red cells = low or unpracticed
- [ ] Tooltip on hover showing skill name + score

### 7.5 Reset Button
- [ ] "Reset All Progress" button (bottom of page)
- [ ] Confirm dialog before clearing
- [ ] Calls `resetMastery()` and refreshes page
- [ ] Useful for demo resets

---

## Phase 8 — UI Polish & Animations *(~4 hours)*

### 8.1 Page Transitions
- [ ] Wrap pages with Framer Motion `motion.div` for fade-in on route change
- [ ] Optional: use `AnimatePresence` in layout for exit animations

### 8.2 Scroll Animations
- [ ] Landing page sections: `whileInView` fade-up with stagger
- [ ] Career cards: stagger entrance on page load
- [ ] Skill cards: stagger entrance

### 8.3 Hover Microinteractions
- [ ] All cards: `whileHover={{ y: -4, boxShadow: "..." }}` lift effect
- [ ] Buttons: gradient glow intensifies on hover
- [ ] Skill tags: subtle scale on hover

### 8.4 Loading States
- [ ] Add skeleton loaders for pages (or simple loading spinners)
- [ ] Ensure no layout shift on hydration

### 8.5 Responsive Design
- [ ] Test all pages at breakpoints: 375px (mobile), 768px (tablet), 1024px+
- [ ] Navbar: hamburger menu on mobile
- [ ] Hero: stack columns on mobile
- [ ] Card grids: 1 column mobile, 2 tablet, 3 desktop
- [ ] Practice options: full-width on mobile

### 8.6 Empty States & Edge Cases
- [ ] Dashboard with no progress → empty state with CTA
- [ ] Skill with no questions → "No practice questions yet" message
- [ ] Career with missing skill data → graceful fallback
- [ ] 404 page: styled consistently

### 8.7 Final Visual Polish
- [ ] Consistent spacing and padding across all pages
- [ ] Verify glassmorphism looks good on all backgrounds
- [ ] Check color contrast for accessibility (text on dark backgrounds)
- [ ] Add subtle gradient borders on key cards
- [ ] Verify all fonts load correctly

---

## Phase 9 — Testing & Demo Prep *(~2 hours)*

### 9.1 Manual Testing
- [ ] Walk through complete user flow:
  1. Land on homepage
  2. Click "Explore Careers"
  3. Click a career card
  4. Click a skill card
  5. Read resources section
  6. Click "Practice Now"
  7. Answer question(s)
  8. See mastery update
  9. Navigate to dashboard
  10. See progress reflected
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile viewport

### 9.2 Content Review
- [ ] Verify all 5 careers have data
- [ ] Verify all skills have subskills and resources
- [ ] Verify all questions have correct answers and explanations
- [ ] Fix any typos or broken links

### 9.3 Demo Script
- [ ] Write a 2-minute demo walkthrough script:
  1. Show landing page → explain concept
  2. Navigate to career explorer
  3. Pick "Data Scientist"
  4. Show required skills
  5. Open "Statistics" skill
  6. Show subskills + resources
  7. Start practice
  8. Answer question correctly → show +15
  9. Answer wrong → show +5 + explanation
  10. Show dashboard with mastery bars
- [ ] Pre-populate some mastery scores for a richer dashboard demo

### 9.4 Build Verification
- [ ] Run `npm run build` — fix any build errors
- [ ] Run `npm run start` — verify production mode works
- [ ] (Optional) Deploy to Vercel for live demo URL

---

## Time Budget Summary

| Phase | Estimated Time | Description |
|-------|---------------|-------------|
| Phase 0 | ~1 hr | Project setup, Tailwind config, folder structure |
| Phase 1 | ~2 hrs | Types, JSON data files, data helpers, mastery store |
| Phase 2 | ~4 hrs | Layout, navbar, landing page (hero + sections) |
| Phase 3 | ~3 hrs | Career explorer + career detail page |
| Phase 4 | ~4 hrs | Skill detail page (subskills, resources, questions) |
| Phase 5 | ~5 hrs | Practice question system with full feedback flow |
| Phase 6 | ~2 hrs | Mastery scoring, progress bar, toast notifications |
| Phase 7 | ~4 hrs | Dashboard with stats, grid, heatmap |
| Phase 8 | ~4 hrs | Animations, responsive design, polish |
| Phase 9 | ~2 hrs | Testing, content review, demo prep |
| **Total** | **~31 hrs** | **~17 hrs buffer for iteration and debugging** |

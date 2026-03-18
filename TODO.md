# SkillSetu — Master TODO List

> Synthesized from: **PRD v1.0**, **Tech Stack Doc**, **Design Doc**
> MVP Scope: 5 domains · 20 job profiles · 150 skills · 600 subskills · 1500 tasks

---

## Phase 0 — Project Setup & Infrastructure

### 0.1 Repository & Tooling
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS with custom design tokens (colors, fonts, spacing)
- [ ] Install and configure shadcn/ui component library
- [ ] Install Framer Motion for animations
- [ ] Set up ESLint, Prettier, and Husky pre-commit hooks
- [ ] Create project folder structure (`/app`, `/components`, `/lib`, `/prisma`, `/public`, `/styles`, `/server`, `/workers`, `/scripts`, `/admin`)
- [ ] Set up environment variable management (`.env.local`, `.env.production`)

### 0.2 Database & ORM
- [ ] Provision PostgreSQL database (Supabase)
- [ ] Install and configure Prisma ORM
- [ ] Define initial `schema.prisma` with all core models (see Phase 1.3)
- [ ] Run initial migration
- [ ] Set up Prisma Client and seed script

### 0.3 Backend API
- [ ] Install and configure tRPC with Next.js App Router
- [ ] Set up tRPC context (session, db client)
- [ ] Create API router structure (`/server/routers/`)
- [ ] Configure end-to-end type safety between client/server

### 0.4 Background Job System (Redis + BullMQ)
- [ ] Install Redis (local dev + hosted for prod)
- [ ] Install and configure BullMQ (or Inngest as alternative)
- [ ] Set up job queue infrastructure (`/workers/`)
- [ ] Create worker service with graceful shutdown
- [ ] Implement retry handling and dead-letter queue
- [ ] Create job dashboard for monitoring (Bull Board)
- [ ] Define scheduled jobs:
  - [ ] Decay engine — runs every 6–12 hours
  - [ ] Daily task generator — runs daily at configurable time
  - [ ] Progress snapshot aggregation — runs nightly
  - [ ] Weekly report generation — runs weekly

### 0.5 Caching Layer (Redis)
- [ ] Configure Redis for caching (shared instance with job queue or separate)
- [ ] Set up cache middleware for tRPC/API routes
- [ ] Implement cache strategies:
  - [ ] Skill graph query caching (TTL-based)
  - [ ] API response caching for read-heavy endpoints
  - [ ] Search result caching
  - [ ] User mastery snapshot caching
- [ ] Cache invalidation on data writes

### 0.6 Hosting & CI/CD
- [ ] Connect repo to Vercel for frontend deployment
- [ ] Connect Supabase project for database hosting
- [ ] Set up Cloudflare R2 for file/asset storage (Proof Vault uploads)
- [ ] Configure preview deployments on PRs
- [ ] Set up CI pipeline (lint, type-check, test, build)

### 0.7 Observability & Monitoring
- [ ] Integrate Sentry for error monitoring (frontend + backend)
- [ ] Set up structured server logging (Pino / Winston)
- [ ] Create error dashboards and alert rules
- [ ] Set up uptime monitoring (BetterUptime / UptimeRobot)
- [ ] Configure performance monitoring (Sentry Performance or Vercel Analytics)

### 0.8 Analytics
- [ ] Integrate PostHog for product analytics
- [ ] Set up event tracking plan (page views, skill engagement, resource usage)
- [ ] Configure PostHog feature flags for gradual rollout

### 0.9 Email System
- [ ] Set up Resend (or Postmark) for transactional email
- [ ] Create email templates:
  - [ ] Welcome / onboarding email
  - [ ] Password reset
  - [ ] Decay alert (high-risk skills notification)
  - [ ] Weekly progress report
  - [ ] Milestone / badge unlocked
- [ ] Build notification service layer (email + in-app dispatch)

### 0.10 Security Foundations
- [ ] Rate limiting on all API endpoints (express-rate-limit / Upstash Ratelimit)
- [ ] Input sanitization middleware (zod validation on all tRPC inputs)
- [ ] RBAC role system: `user`, `admin`, `content_editor`
- [ ] Auth middleware on all protected routes
- [ ] File upload security:
  - [ ] File type validation (allowlist)
  - [ ] File size limits
  - [ ] Virus/malware scanning (ClamAV or cloud service)
- [ ] CORS configuration
- [ ] CSP headers
- [ ] SQL injection prevention (Prisma parameterized by default)

### 0.11 Testing Infrastructure
- [ ] Install and configure Vitest for unit + integration tests
- [ ] Install and configure Playwright for E2E tests
- [ ] Set up test database (separate Supabase project or local Docker)
- [ ] Create test utilities: DB seeding, auth mocking, API helpers
- [ ] Add test commands to CI pipeline
- [ ] Define minimum coverage thresholds

### 0.12 Feature Flags
- [ ] Configure PostHog feature flags (or LaunchDarkly)
- [ ] Flag AI features behind feature gate
- [ ] Flag beta features for gradual rollout
- [ ] Create feature flag utility wrapper for server + client

---

## Phase 1 — Authentication & User Profiles *(Week 1)*

### 1.1 Authentication System
- [ ] Install and configure Clerk (or NextAuth.js)
- [ ] Set up Google OAuth login
- [ ] Set up email/OTP login
- [ ] Create sign-in page with glassmorphic styling
- [ ] Create sign-up page with glassmorphic styling
- [ ] Implement protected route middleware
- [ ] Handle auth callback and session management
- [ ] Test login/logout/session persistence flows

### 1.2 User Profile
- [ ] Design `user` database model (id, name, email, avatar, role, created_at, etc.)
- [ ] Create user profile page UI
- [ ] Implement profile editing (name, avatar)
- [ ] Build "Select Target Job Role" onboarding step
  - [ ] UI: searchable job role selector
  - [ ] Store selected job profile in `user` record
- [ ] Create user settings page (notification prefs, account management)

### 1.3 Database Schema — Core Models
- [ ] `user` table (with `role` field for RBAC: user/admin/content_editor)
- [ ] `domain` table
- [ ] `job_profile` table (with fields: required_skills, expected_proficiency, roadmap)
- [ ] `skill_node` table (importance_weight, mastery_score, decay_risk, version)
- [ ] `subskill_node` table (version)
- [ ] `skill_dependency` table (edges for DAG)
- [ ] `resource` table (type, duration, difficulty, source, est_learning_time, subskill_tag)
- [ ] `task` table (type, difficulty 1–5, correct_answer, expected_time, concept_tags)
- [ ] `task_attempt` table (user_id, task_id, score, time_taken, timestamp, success)
- [ ] `user_skill_state` table (mastery_score per subskill & skill, last_practice_timestamp)
- [ ] `proof_vault` table (task_score, timestamp, uploaded_files, project_submissions)
- [ ] `daily_task` table
- [ ] `career_mapping` table
- [ ] `skill_progress` table
- [ ] `resource_interaction` table
- [ ] `learning_session` table (user_id, skill_id, start_time, end_time, duration)
- [ ] `progress_snapshot` table (user_id, date, mastery_snapshot_json)
- [ ] `skill_graph_version` table (version_id, created_at, changelog)
- [ ] `notification` table (user_id, type, payload, read, created_at)

### 1.4 Tests — Phase 1
- [ ] Unit tests: auth middleware, role validation
- [ ] Integration tests: sign-up flow, session management
- [ ] E2E test: full login → onboarding → dashboard flow

---

## Phase 2 — Landing Page & Marketing Site *(Week 2)*

> **Moved from Phase 9 → Phase 2** — needed early for waitlist, validation, SEO, and early user acquisition.

### 2.1 Navigation
- [ ] Sticky top navbar (Notion-style minimalist)
  - [ ] Logo
  - [ ] Links: Careers, Skills, Resources, Community, Pricing
  - [ ] Sign In + Get Started buttons
- [ ] Mobile hamburger menu

### 2.2 Hero Section
- [ ] Two-column layout:
  - [ ] Left: headline ("Master Skills That Actually Get You Hired"), subheadline, CTA buttons
  - [ ] Right: animated UI preview (Career → Skill → Subskill → Resource → Practice)
- [ ] Glassmorphic floating cards animation (Framer Motion)
- [ ] CTA: "Start Learning" (primary) + "Explore Careers" (secondary)

### 2.3 Social Proof Strip
- [ ] Horizontal strip with institution logos (IIT, NIT, BITS, IISc)
- [ ] Stats counters: 100+ Careers, 5000+ Skills, 50k+ Resources, 1M+ Questions
- [ ] Counter animation on scroll-into-view

### 2.4 Product Explanation
- [ ] Three large claymorphic cards:
  - [ ] **Career Roadmaps** — interactive career → skills visualization, CTA: "Explore Roadmaps"
  - [ ] **Skill Graph** — knowledge tree preview
  - [ ] **Structured Learning** — Career → Skill → Subskill → Resource → Practice flow
- [ ] Scroll-triggered entrance animations

### 2.5 Career Explorer Preview
- [ ] Searchable career card grid (sample data)
- [ ] Cards: difficulty, salary, skills required, learning time
- [ ] Hover expand interaction

### 2.6 Skill Map Preview
- [ ] Embedded interactive graph (D3.js mini version)
- [ ] Node click → link to full skill page

### 2.7 Learning Workflow
- [ ] Visual step diagram: Choose Career → Learn Skills → Practice → Build Projects → Get Job Ready
- [ ] Scroll-based node highlighting

### 2.8 AI Learning Assistant Teaser
- [ ] Feature preview card for AI Skill Mentor
- [ ] Capabilities list: explain concepts, suggest resources, generate questions, track progress
- [ ] "Coming Soon" badge (gated behind feature flag)

### 2.9 Community Section
- [ ] Leaderboards, skill streaks, weekly challenges, peer discussions preview

### 2.10 Pricing Section
- [ ] Two-tier pricing cards:
  - [ ] **Free**: career maps, basic resources, limited questions
  - [ ] **Pro** ($8–12/mo): AI mentor, advanced questions, projects, certifications
- [ ] Toggle: monthly / annual
- [ ] Glassmorphic card styling

### 2.11 Final CTA
- [ ] Large centered CTA: "Start mastering skills today."
- [ ] Buttons: "Get Started" + "Explore Careers"

### 2.12 Footer
- [ ] Company links, social media, legal pages
- [ ] Newsletter signup (connected to email system)

### 2.13 Design System Implementation
- [ ] Color palette:
  - [ ] Primary: Electric Blue (#2563EB)
  - [ ] Secondary: Indigo (#6366F1)
  - [ ] Background: Dark Gradient (#0F172A → #020617)
  - [ ] Accents: Neon Cyan, Soft Purple
- [ ] Typography:
  - [ ] Headings: Inter / Satoshi
  - [ ] Body: Inter / DM Sans
  - [ ] Code/skill tags: JetBrains Mono
- [ ] Component library (shadcn/ui customized):
  - [ ] Career card, Skill node, Skill card, Resource card, Question card
  - [ ] Glass panels, Buttons (gradient glow hover)
- [ ] Microinteractions:
  - [ ] Card hover: lift + shadow increase
  - [ ] Skill node: pulse animation
  - [ ] Button: gradient glow effect
  - [ ] Scroll-based reveal animations

### 2.14 SEO
- [ ] Proper `<title>` tags per page
- [ ] Meta descriptions per page
- [ ] Semantic HTML (`<main>`, `<section>`, `<article>`)
- [ ] Single `<h1>` per page with proper heading hierarchy
- [ ] Open Graph / Twitter Card meta tags

---

## Phase 3 — Content Pipeline & Data Ingestion *(Week 3)*

> **New phase** — defines how the 150 skills / 600 subskills / 1500 tasks actually get created.

### 3.1 Content Schema Definition
- [ ] Define skill JSON schema (name, description, domain, importance_weight, prerequisites)
- [ ] Define subskill JSON schema (name, parent_skill, description, resources, tags)
- [ ] Define task JSON schema (type, difficulty, question, answer, hints, concept_tags, expected_time)
- [ ] Define resource JSON schema (type, url, source, duration, difficulty, subskill_tag)
- [ ] Define career/job profile JSON schema

### 3.2 Content Ingestion Scripts
- [ ] Build bulk import script: JSON → Prisma seed (`/scripts/seed-content.ts`)
- [ ] Validate skill graph integrity on import:
  - [ ] No circular dependencies
  - [ ] All prerequisite edges point to existing skills
  - [ ] All subskills have a parent skill
  - [ ] All tasks have a valid subskill tag
- [ ] Create resource scraper (optional: pull curated resources from known sources)
- [ ] Build task authoring format (Markdown or YAML templates for non-technical editors)

### 3.3 Content Seeding
- [ ] Seed 5 domains
- [ ] Seed 20 job profiles with required skills and expected proficiency
- [ ] Seed 150 skills with importance weights
- [ ] Seed 600 subskills linked to parent skills
- [ ] Seed skill dependency edges (prerequisite relationships)
- [ ] Seed 1500 tasks across subskills
- [ ] Seed initial resources

### 3.4 Data Versioning
- [ ] Implement versioned skill graph:
  - [ ] `skill_graph_version` table tracking changelog per version
  - [ ] Migration scripts for graph schema changes
  - [ ] Graph integrity checks before version publish
- [ ] Ensure user progress is preserved across graph version updates
- [ ] Rollback mechanism for broken graph versions

### 3.5 Tests — Phase 3
- [ ] Unit tests: JSON schema validation, graph integrity checks
- [ ] Integration tests: seed script end-to-end, version migration

---

## Phase 4 — Skill Graph & Core Pages *(Week 4)*

### 4.1 Skill Graph API Layer
- [ ] Build tRPC routers for:
  - [ ] `job_profile.getAll` / `job_profile.getById`
  - [ ] `skill.getByJobProfile` / `skill.getById`
  - [ ] `subskill.getBySkill` / `subskill.getById`
  - [ ] `skill_dependency.getPrerequisites`
- [ ] Cache graph queries in Redis (read-heavy, rarely written)

### 4.2 Skill Graph Visualization (D3.js)
- [ ] Install D3.js
- [ ] Build interactive graph component (Obsidian/GitHub-style)
  - [ ] Render skill nodes with edges
  - [ ] Nodes pulse on hover (microinteraction)
  - [ ] Click node → navigate to skill detail page
  - [ ] Zoom and pan controls
- [ ] Add dependency highlighting (prerequisite chains)
- [ ] Responsive layout for mobile/tablet

### 4.3 Skill Page (Core Learning Unit)
- [ ] Create `/skills/[skillId]` route
- [ ] Display: skill description, subskills list, resources, questions
- [ ] Subskill cards showing mastery status
- [ ] Resource list grouped by type (video, article, course, book)
- [ ] Question preview section (MCQ, coding, conceptual)
- [ ] Glassmorphic card layout with claymorphic depth

### 4.4 Career Explorer Page
- [ ] Create `/careers` route
- [ ] Career cards showing: difficulty, avg salary, skills required, learning time
- [ ] Hover → card expands with detail preview
- [ ] Click → navigate to career detail page with full roadmap
- [ ] Career Roadmap visualization (tree/branch diagram)
  - [ ] Interactive: branches animate on scroll (Framer Motion)

### 4.5 Prerequisite Gating System
- [ ] Validate prerequisites before allowing skill/subskill access
- [ ] Learning path ordering: enforce correct sequence
- [ ] Skill unlock logic: subskill locked until prerequisite mastery ≥ threshold
- [ ] UI: locked skill indicators with "complete X first" messaging
- [ ] Dependency-aware recommendations

### 4.6 Search System (Meilisearch / Algolia)
> **Moved from Phase 11 → Phase 4** — required for career explorer, skill discovery, and resource discovery.

- [ ] Set up Meilisearch or Algolia
- [ ] Index: skills, subskills, job profiles, resources
- [ ] Sync database changes to search index (on write hooks)
- [ ] Global search bar (cmd+K / ctrl+K shortcut)
- [ ] Instant results with fuzzy matching
- [ ] Categorized results: careers, skills, resources
- [ ] Skill suggestion autocomplete
- [ ] Cache search results in Redis

### 4.7 Tests — Phase 4
- [ ] Unit tests: prerequisite validation logic, search indexing
- [ ] Integration tests: graph API queries, search results
- [ ] E2E tests: career explorer → skill page → resource view flow

---

## Phase 5 — Task / Question System *(Week 5)*

### 5.1 Task Bank
- [ ] Support task types: concept questions, numerical problems, case studies, simulation tasks
- [ ] Support difficulty levels: Basic (1) → Industry (5)
- [ ] Store per task: correct_answer, expected_completion_time, difficulty, concept_tags

### 5.2 Task UI
- [ ] Create task attempt page (`/practice/[taskId]`)
- [ ] Render question based on type:
  - [ ] MCQ renderer
  - [ ] Numerical input renderer
  - [ ] Free-text / conceptual renderer
  - [ ] Code editor renderer (for coding tasks)
- [ ] Timer component showing elapsed vs expected time
- [ ] Submit answer → score calculation
- [ ] Result feedback UI (correct/wrong, explanation)
- [ ] Difficulty badge display

### 5.3 Task Attempt Tracking
- [ ] Record every attempt: user_id, task_id, score, time_taken, timestamp, success/failure
- [ ] Build tRPC router: `taskAttempt.create`, `taskAttempt.getByUser`
- [ ] Aggregate attempt history per subskill
- [ ] Rate limiting on task submissions (prevent abuse)

### 5.4 Learning Session Tracking
- [ ] Track learning sessions: user_id, skill_id, start_time, end_time, duration
- [ ] Time-on-skill tracking (aggregate per day/week)
- [ ] Resource watch/read tracking (resource_interaction table)
- [ ] Surface session data on dashboard

### 5.5 Tests — Phase 5
- [ ] Unit tests: score calculation, attempt recording
- [ ] Integration tests: task submission flow
- [ ] E2E test: select task → solve → see result → mastery update

---

## Phase 6 — Mastery Score Engine *(Week 6)*

### 6.1 Mastery Calculation
- [ ] Implement mastery formula: `mastery_new = mastery_old + difficulty_weight × accuracy × consistency_factor`
- [ ] Define difficulty_weight mapping for levels 1–5
- [ ] Define consistency_factor based on streak/frequency
- [ ] Harder questions increase mastery more (weight scaling)
- [ ] Store mastery at subskill level
- [ ] Aggregate mastery to skill level (weighted average of subskill scores)

### 6.2 Mastery Update Pipeline
- [ ] Trigger mastery recalculation on each task attempt submission
- [ ] Update `user_skill_state` table
- [ ] Invalidate Redis cache for affected user-skill mastery
- [ ] Expose tRPC endpoint: `mastery.getBySkill`, `mastery.getBySubskill`

### 6.3 Mastery Visualization
- [ ] Mastery progress bar per subskill
- [ ] Mastery radar chart per skill (Dashboard)
- [ ] Skill mastery heatmap visualization
- [ ] Color coding: green (≥70 stable), yellow (40–70 medium), red (<40 high risk)

### 6.4 Progress Snapshots
- [ ] Nightly job: snapshot user mastery state into `progress_snapshot` table
- [ ] Store daily aggregate: total mastery gain, skills practiced, time spent
- [ ] Use snapshots for weekly reports and career fit analysis
- [ ] Historical trend queries for dashboard graphs

### 6.5 Tests — Phase 6
- [ ] Unit tests: mastery formula, aggregation logic, snapshot generation
- [ ] Integration tests: attempt → mastery update → cache invalidation

---

## Phase 7 — Skill Decay Engine *(Week 7)*

### 7.1 Decay Model Implementation
- [ ] Implement exponential decay: `mastery = mastery × e^(−λt)`
- [ ] Define λ (forgetting rate) — configurable per skill/subskill
- [ ] Track `last_practice_timestamp` per user-subskill pair
- [ ] Compute `t` (time since last practice)

### 7.2 Decay Engine Runner (BullMQ Scheduled Job)
- [ ] Create decay calculation worker (`/workers/decay-engine.ts`)
- [ ] Schedule via BullMQ: run every 6–12 hours
- [ ] Process all active users in batches
- [ ] Update `user_skill_state` with decayed mastery values
- [ ] Classify risk levels:
  - [ ] Mastery < 40 → **High risk**
  - [ ] 40–70 → **Medium risk**
  - [ ] \> 70 → **Stable**
- [ ] Retry failed jobs with exponential backoff

### 7.3 Decay Alerts & Notifications
- [ ] Generate decay alert notifications for high-risk skills
- [ ] Store in `notification` table
- [ ] Surface decay alerts on user dashboard
- [ ] Send email notification for critical decay (via email system)
- [ ] Weak skill detection: identify skills trending downward

### 7.4 Daily Task Recommendation Engine
- [ ] Create daily task generator worker (`/workers/daily-tasks.ts`)
- [ ] Schedule via BullMQ: run daily
- [ ] Implement priority formula: `priority = skill_weight × decay_risk`
- [ ] Generate daily task plan:
  - [ ] 1 high-priority revision task (decaying skill)
  - [ ] 1 medium-priority reinforcement task
  - [ ] 1 optional new learning task
- [ ] Respect user time limits (configurable daily time budget)
- [ ] Dependency-aware: ensure prerequisites are met before recommending advanced tasks

### 7.5 Daily Task UI
- [ ] Create daily task dashboard section
- [ ] Show prioritized task list with decay context
- [ ] "Start" button → navigate to task attempt page
- [ ] Mark tasks as completed after attempt

### 7.6 Resource Recommendation Engine
- [ ] Trigger resource suggestions on:
  - [ ] Task failure
  - [ ] Excessive completion time
  - [ ] Repeated mistakes on same concept
- [ ] Ranking rules:
  - [ ] Shortest resource covering the concept
  - [ ] Highest quality source
  - [ ] Difficulty matching user level
- [ ] Show recommended resources inline after failed attempt

### 7.7 Tests — Phase 7
- [ ] Unit tests: decay formula, priority scoring, recommendation logic
- [ ] Integration tests: decay worker end-to-end, daily task generation
- [ ] E2E test: decay alert → daily task → practice → mastery recovery

---

## Phase 8 — Proof Vault & Career Mapping *(Week 8)*

### 8.1 Proof Vault
- [ ] Create `/proof-vault` page
- [ ] Display proof history: task scores, timestamps, uploaded files
- [ ] File upload system (Cloudflare R2):
  - [ ] Support formats: PDF, code notebooks, simulation files, images
  - [ ] Drag-and-drop upload UI
  - [ ] File type allowlist validation
  - [ ] File size limit enforcement
  - [ ] Virus scanning integration
- [ ] Project submission flow
- [ ] Export proof history (PDF / JSON download)

### 8.2 Career Mapping
- [ ] Map skills to real career opportunities
  - [ ] Internship programs (AICTE, government schemes, etc.)
  - [ ] Job roles with skill requirements
- [ ] Career Fit Score: `fit_score = completed_required_skills / total_required_skills`
- [ ] Career fit dashboard showing:
  - [ ] Eligibility percentage per career
  - [ ] Missing skills list
  - [ ] Recommended next learning steps
- [ ] Create `/careers/[careerId]/fit` page

### 8.3 Tests — Phase 8
- [ ] Unit tests: fit score calculation, file validation
- [ ] Integration tests: file upload → storage → retrieval
- [ ] E2E test: upload proof → view in vault → export

---

## Phase 9 — Dashboard, Gamification & Community *(Week 9)*

### 9.1 User Dashboard
- [ ] Create `/dashboard` page
- [ ] Skill mastery heatmap
- [ ] Decay alerts panel
- [ ] Weak skill detection & suggestions
- [ ] Weekly progress graph (from progress_snapshot data)
- [ ] Learning streak counter
- [ ] Mastery radar chart (skill-level overview)
- [ ] Personal skill graph visualization (mini graph)
- [ ] Learning session summary (time spent today/week)

### 9.2 Gamification System
- [ ] Daily streak tracking & display
- [ ] Weekly mastery gain metric
- [ ] Consistency score calculation
- [ ] Milestone badges system:
  - [ ] Define badge criteria (e.g., "10-day streak", "5 skills mastered")
  - [ ] Badge award logic
  - [ ] Badge display on profile
- [ ] Leaderboard page:
  - [ ] Weekly/monthly rankings
  - [ ] Filter by skill/domain
- [ ] Weekly challenges system

### 9.3 Community Features
- [ ] Peer discussion threads (per skill or subskill)
- [ ] Skill streaks visibility (public profile opt-in)

### 9.4 Weekly Report Emails
- [ ] Generate weekly report from progress_snapshot data
- [ ] Send via email system: mastery gains, decay risks, streaks, recommendations
- [ ] In-app weekly summary view

---

## Phase 10 — Admin Panel

### 10.1 Admin Dashboard
- [ ] Create `/admin` route (protected: role === 'admin')
- [ ] Admin overview: user count, active learners, content stats
- [ ] Admin analytics dashboard: engagement, retention, content usage

### 10.2 Content Management
- [ ] Skill editor: create/edit/delete skills and subskills
- [ ] Task editor: create/edit/delete tasks with preview
- [ ] Resource editor: add/edit/delete resources
- [ ] Career/job profile editor
- [ ] Skill graph visual editor (drag-drop dependencies)

### 10.3 Content Review & Moderation
- [ ] Review queue for community-submitted content
- [ ] Approve/reject workflow
- [ ] Content quality metrics

### 10.4 User Management
- [ ] User list with search/filter
- [ ] Role assignment (user/admin/content_editor)
- [ ] User activity overview

---

## Phase 11 — AI Layer *(Post-MVP, Feature-Flagged)*

### 11.1 AI Career Navigator
- [ ] Integrate OpenAI / Anthropic API
- [ ] Generate personalized learning paths based on current skills & target career
- [ ] Detect missing skills in user profile vs career requirements

### 11.2 AI Learning Assistant
- [ ] Chat-based skill mentor
- [ ] Concept explanations on demand
- [ ] Resource suggestions based on learning context

### 11.3 AI Question Generator
- [ ] Auto-generate practice questions per subskill
- [ ] Vary difficulty based on user mastery level
- [ ] Review and quality-filter generated questions

### 11.4 AI Skill Gap Analyzer
- [ ] Analyze user mastery across all skills
- [ ] Identify weakest areas and recommend focus paths
- [ ] Periodic report generation

---

## Phase 12 — Performance & Polish

### 12.1 Performance Targets
- [ ] Achieve LCP < 2.5s
- [ ] Achieve TTI < 3s
- [ ] Implement image optimization (Next.js `<Image>`)
- [ ] Lazy load below-fold sections
- [ ] Edge caching via Vercel/Cloudflare

### 12.2 CMS (Optional)
- [ ] Evaluate Sanity as headless CMS for skill/resource content
- [ ] If adopted: set up schemas, studio, and API integration

---

## Phase 13 — Monetization & Future Features

### 13.1 Subscription System
- [ ] Integrate payment provider (Stripe / Razorpay)
- [ ] Free vs Pro tier gating
- [ ] Subscription management page

### 13.2 Future Feature Pipeline
- [ ] AI learning paths
- [ ] Skill certifications
- [ ] Job matching
- [ ] Portfolio generation from Proof Vault

---

## Coverage Summary

| Area | Status |
|---|---|
| Infrastructure | ✅ Complete (Redis, queues, caching, CI/CD) |
| Backend API | ✅ Complete (tRPC, routers, middleware) |
| Frontend / UI | ✅ Complete (landing page, all sections, design system) |
| Data Models | ✅ Complete (18 tables incl. sessions, snapshots, versions) |
| Algorithms | ✅ Complete (mastery, decay, priority, fit score) |
| Content Pipeline | ✅ Complete (schemas, scripts, validation, versioning) |
| Background Jobs | ✅ Complete (BullMQ, workers, scheduling, retries) |
| Admin Tooling | ✅ Complete (admin panel, editors, moderation) |
| Security | ✅ Complete (rate limiting, RBAC, validation, uploads) |
| Observability | ✅ Complete (Sentry, logging, uptime, alerts) |
| Testing | ✅ Complete (Vitest, Playwright, per-phase tests) |
| Email System | ✅ Complete (Resend, templates, notifications) |
| Caching | ✅ Complete (Redis, API/graph/search caching) |
| Feature Flags | ✅ Complete (PostHog, AI gating, rollout) |
| Data Versioning | ✅ Complete (versioned graph, migrations, integrity) |

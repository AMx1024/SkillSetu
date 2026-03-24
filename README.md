<h1 align="center">SkillSetu</h1>
<p align="center"><b>Master Skills That Actually Get You Hired</b></p>

<p align="center">
A skill-centric learning platform that maps careers → skills → subskills → resources → tasks, and tracks mastery over time.
</p>

<hr>

<h2>🚀 Core Concept</h2>

<pre>
Career → Skills → Subskills → Resources → Tasks → Mastery → Decay → Revision
</pre>

<ul>
<li>No random learning</li>
<li>No skill decay</li>
<li>Direct path to job readiness</li>
</ul>

<hr>

<h2>🧠 Features</h2>

<h3>1. Career-First Learning</h3>
<ul>
<li>Select a target job role</li>
<li>Get structured skill roadmap</li>
<li>Track career readiness via fit score</li>
</ul>

<h3>2. Skill Graph</h3>
<ul>
<li>Directed graph of skills</li>
<li>Dependency-based learning</li>
<li>Subskills as atomic units</li>
</ul>

<h3>3. Mastery Tracking</h3>
<ul>
<li>Accuracy</li>
<li>Difficulty</li>
<li>Consistency</li>
<li>Recency</li>
</ul>

<h3>4. Skill Decay Engine</h3>
<pre>mastery = mastery × e^(−λt)</pre>
<ul>
<li>Detects forgetting</li>
<li>Triggers revision automatically</li>
</ul>

<h3>5. Daily Task Recommendation</h3>
<pre>priority = skill_weight × decay_risk</pre>
<ul>
<li>Focus on highest ROI learning</li>
<li>Time-constrained scheduling</li>
</ul>

<h3>6. Resource Recommendation</h3>
<ul>
<li>Triggered on failure or delay</li>
<li>Shortest effective resource first</li>
</ul>

<h3>7. Proof Vault</h3>
<ul>
<li>Stores completed tasks</li>
<li>Project files and outputs</li>
<li>Acts as skill portfolio</li>
</ul>

<h3>8. Career Fit Score</h3>
<pre>fit_score = completed_skills / total_required_skills</pre>

<h3>9. Dashboard</h3>
<ul>
<li>Mastery heatmap</li>
<li>Decay alerts</li>
<li>Progress tracking</li>
</ul>

<h3>10. Gamification</h3>
<ul>
<li>Streaks</li>
<li>Milestones</li>
<li>Consistency score</li>
</ul>

<hr>

<h2>🧱 System Flow</h2>

<pre>
User
 → Job Profile
 → Skills
 → Subskills
 → Resources
 → Tasks
 → Attempts
 → Mastery Update
 → Decay Engine
 → Daily Tasks
 → Career Fit
</pre>

<hr>

<h2>🖥️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
<li>Next.js</li>
<li>TypeScript</li>
<li>Tailwind CSS</li>
<li>shadcn/ui</li>
<li>Framer Motion</li>
</ul>

<h3>Backend</h3>
<ul>
<li>Node.js + tRPC</li>
</ul>

<h3>Database</h3>
<ul>
<li>PostgreSQL</li>
<li>Prisma ORM</li>
</ul>

<h3>AI Layer</h3>
<ul>
<li>OpenAI API</li>
</ul>

<h3>Infra</h3>
<ul>
<li>Vercel</li>
<li>Supabase</li>
<li>Cloudflare R2</li>
</ul>

<hr>

<h2>📊 Database (Core Tables)</h2>

<ul>
<li>user</li>
<li>job_profile</li>
<li>skill_node</li>
<li>subskill_node</li>
<li>task</li>
<li>task_attempt</li>
<li>resource</li>
<li>user_skill_state</li>
<li>skill_dependency</li>
</ul>

<hr>

<h2>🎯 Vision</h2>

<p>
At SkillSetu, our goal is to become the global platform for engineering students to learn the right skills, master them with depth, and translate that mastery into real employability.
</p>

<p>
We aim to build a system where every engineering branch — from core fields to emerging domains — has a clear, structured path from learning to getting hired.
</p>

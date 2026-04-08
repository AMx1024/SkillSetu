<div align="center">
  <img src="https://img.icons8.com/wired/128/education.png" alt="SkillSetu Logo" width="80" />
  <h1>SkillSetu</h1>
  <p><b>Master Skills That Actually Get You Hired</b></p>
  <p><i>A skill-centric learning platform mapping careers → skills → subskills → resources → tasks.</i></p>
</div>

<hr />

## 🎯 Vision
At **SkillSetu**, we aim to provide engineering students with a clear, structured path from learning to employability. We map the path, and you master the skills with depth and precision.

<hr />

## 📊 Feature Implementation Status
The following table tracks the current progress of the SkillSetu platform features.

<table width="100%">
  <thead>
    <tr style="background-color: #1a1a1a;">
      <th align="left">PRD Feature</th>
      <th align="center">Status</th>
      <th align="left">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Career-First Learning</strong></td>
      <td align="center">✅ Done</td>
      <td>3 careers, skill roadmaps, metadata</td>
    </tr>
    <tr>
      <td><strong>Skill Graph (D3)</strong></td>
      <td align="center">✅ Done</td>
      <td>Interactive, draggable, clickable, per-career</td>
    </tr>
    <tr>
      <td><strong>Subskill Layer</strong></td>
      <td align="center">✅ Done</td>
      <td>48 subskills with resources</td>
    </tr>
    <tr>
      <td><strong>Resource Layer</strong></td>
      <td align="center">⚠️ Partial</td>
      <td>Resources displayed but no quality ranking or difficulty matching</td>
    </tr>
    <tr>
      <td><strong>Task / Question System</strong></td>
      <td align="center">✅ Done</td>
      <td>MCQ practice with ~276KB question bank</td>
    </tr>
    <tr>
      <td><strong>Task Attempt Tracking</strong></td>
      <td align="center">⚠️ Minimal</td>
      <td>Tracks correct/incorrect count per session; no persistent history</td>
    </tr>
    <tr>
      <td><strong>Mastery Score System</strong></td>
      <td align="center">⚠️ Basic</td>
      <td>Flat +15/+5 scoring; missing difficulty weighting, recency</td>
    </tr>
    <tr>
      <td><strong>Skill Decay Engine</strong></td>
      <td align="center">❌ Not Built</td>
      <td><code>mastery = mastery * e^(-λt)</code> — not implemented</td>
    </tr>
    <tr>
      <td><strong>Daily Task Recommendation</strong></td>
      <td align="center">❌ Not Built</td>
      <td><code>priority = skill_weight * decay_risk</code> — not implemented</td>
    </tr>
    <tr>
      <td><strong>Resource Recommendation</strong></td>
      <td align="center">❌ Not Built</td>
      <td>No failure-triggered resource suggestions</td>
    </tr>
    <tr>
      <td><strong>Proof Vault</strong></td>
      <td align="center">❌ Not Built</td>
      <td>No task score history, no file uploads, no portfolio</td>
    </tr>
    <tr>
      <td><strong>Career Fit Score</strong></td>
      <td align="center">❌ Not Built</td>
      <td><code>fit_score = completed/total</code> — not calculated</td>
    </tr>
    <tr>
      <td><strong>Dashboard - Basic Stats</strong></td>
      <td align="center">✅ Done</td>
      <td>Skills practiced, avg mastery, top skill</td>
    </tr>
    <tr>
      <td><strong>Dashboard - Heatmap</strong></td>
      <td align="center">✅ Done</td>
      <td>Color-coded grid with tooltips</td>
    </tr>
    <tr>
      <td><strong>Gamification</strong></td>
      <td align="center">❌ Not Built</td>
      <td>No streaks, milestones, consistency score, or badges</td>
    </tr>
    <tr>
      <td><strong>Authentication</strong></td>
      <td align="center">❌ Not Built</td>
      <td>No user accounts, no login/signup</td>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td align="center">❌ Not Built</td>
      <td>All data is static JSON + localStorage</td>
    </tr>
    <tr>
      <td><strong>AI Layer</strong></td>
      <td align="center">❌ Not Built</td>
      <td>No AI career navigator, learning assistant, or gap analyzer</td>
    </tr>
    <tr>
      <td><strong>Internship Mapping</strong></td>
      <td align="center">❌ Not Built</td>
      <td>—</td>
    </tr>
  </tbody>
</table>

<hr />

## 🛠️ Tech Stack
Modern, high-performance tools powering the platform:

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Visuals**: [D3.js](https://d3js.org/) (Skill Graphs) & [Recharts](https://recharts.org/) (Dashboards)
- **Draft/Future**: Prisma ORM, NextAuth.js (Integration in progress)

<hr />

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-repo/skillsetu.git

# Navigate to the project directory
cd skillsetu/skillsetu

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


const starterHtml = `<section class="hero-card">
  <p class="badge">Creative Toolkit</p>
  <h1>Build polished interfaces in half the time</h1>
  <p class="description">
    Aurora UI gives product teams a flexible component system for launching
    faster and designing with confidence.
  </p>
  <div class="actions">
    <button class="primary">Explore Demo</button>
    <button class="secondary">See Components</button>
  </div>
</section>`;

const starterCss = `:root {
  --accent: #5b8def;
  --surface: #fffaf5;
  --text: #1e1b18;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  font-family: "Trebuchet MS", "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(91, 141, 239, 0.22), transparent 24%),
    linear-gradient(135deg, #f4f0ea, #efe7dc 56%, #f7f3ee);
}

.hero-card {
  width: min(100%, 760px);
  padding: 40px;
  border-radius: 24px;
  background: var(--surface);
  border: 1px solid rgba(30, 27, 24, 0.08);
  box-shadow: 0 24px 60px rgba(56, 40, 24, 0.12);
}

.badge {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(91, 141, 239, 0.12);
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.74rem;
}

h1 {
  margin: 18px 0 14px;
  font-size: clamp(2.2rem, 4vw, 4.25rem);
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.description {
  max-width: 56ch;
  color: rgba(30, 27, 24, 0.72);
  font-size: 1.05rem;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

button {
  border: none;
  border-radius: 999px;
  padding: 14px 22px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.primary {
  background: var(--accent);
  color: white;
}

.secondary {
  background: rgba(30, 27, 24, 0.08);
  color: var(--text);
}`;

const tasks = [
  {
    id: "headline",
    label: "Headline updated to Design faster with Aurora UI",
    check: (html) => /<h1[^>]*>\s*Design faster with Aurora UI\s*<\/h1>/i.test(html),
  },
  {
    id: "button",
    label: "Primary button changed to Start Free Trial",
    check: (html) =>
      /<button[^>]*class=["'][^"']*primary[^"']*["'][^>]*>\s*Start Free Trial\s*<\/button>/i.test(
        html
      ),
  },
  {
    id: "accent",
    label: "Accent color updated to #ff6b6b",
    check: (_, css) => /--accent\s*:\s*#ff6b6b\s*;/i.test(css),
  },
  {
    id: "radius",
    label: "Hero card border radius increased to at least 32px",
    check: (_, css) => {
      const match = css.match(/\.hero-card\s*\{[\s\S]*?border-radius\s*:\s*(\d+)px\s*;/i);
      return Boolean(match && Number(match[1]) >= 32);
    },
  },
  {
    id: "badge",
    label: "Badge added with the text New Release",
    check: (html) => /<[^>]+class=["'][^"']*badge[^"']*["'][^>]*>\s*New Release\s*<\/[^>]+>/i.test(html),
  },
];

const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const previewFrame = document.getElementById("previewFrame");
const previewBtn = document.getElementById("previewBtn");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const report = document.getElementById("report");

function injectStarterCode() {
  htmlEditor.value = starterHtml;
  cssEditor.value = starterCss;
  renderPreview();
  resetTaskHighlights();
  report.className = "report empty";
  report.innerHTML =
    "<p>Submit the edited assignment to see completed tasks, missed tasks, and a short design analysis report.</p>";
}

function renderPreview() {
  const doc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>${cssEditor.value}</style>
      </head>
      <body>
        ${htmlEditor.value}
      </body>
    </html>
  `;

  previewFrame.srcdoc = doc;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateTaskHighlights(completedIds) {
  document.querySelectorAll("#taskList li").forEach((item) => {
    if (completedIds.includes(item.dataset.task)) {
      item.style.color = "var(--success)";
      item.style.fontWeight = "700";
    } else {
      item.style.color = "";
      item.style.fontWeight = "";
    }
  });
}

function resetTaskHighlights() {
  document.querySelectorAll("#taskList li").forEach((item) => {
    item.style.color = "";
    item.style.fontWeight = "";
  });
}

function buildAnalysis(completedCount, missedCount) {
  if (completedCount === tasks.length) {
    return [
      "You completed the full visual brief and your submission reflects careful alignment with the client request.",
      "The edit set shows strong attention to UI detail because both copy changes and styling changes were delivered together.",
      "If this were a real review, the next step would be checking spacing, responsiveness, and accessibility polish before shipping.",
    ];
  }

  if (completedCount >= 3) {
    return [
      "You handled the core direction well, especially the main interface changes that visibly shift the design.",
      "A few details are still missing, which suggests the visual pass was strong but the final checklist review was incomplete.",
      "Before submitting in a real workflow, do one last requirement-by-requirement scan so small misses do not reduce an otherwise solid result.",
    ];
  }

  return [
    "The submission shows partial progress, but several requested changes are still missing from the implementation.",
    "This usually means the design intent was started in the preview but not fully translated into the underlying code.",
    "A stronger workflow here is to update one task at a time, preview after each change, and only submit once every brief item is visibly confirmed.",
  ];
}

function submitAssignment() {
  const html = htmlEditor.value;
  const css = cssEditor.value;

  const completed = tasks.filter((task) => task.check(html, css));
  const missed = tasks.filter((task) => !task.check(html, css));

  updateTaskHighlights(completed.map((task) => task.id));
  renderPreview();

  const completedPercent = Math.round((completed.length / tasks.length) * 100);
  const analysis = buildAnalysis(completed.length, missed.length);

  report.className = "report";
  report.innerHTML = `
    <div class="report-grid">
      <div class="stat-card">
        <span>Completed</span>
        <strong>${completed.length}</strong>
      </div>
      <div class="stat-card">
        <span>Missed</span>
        <strong>${missed.length}</strong>
      </div>
      <div class="stat-card">
        <span>Score</span>
        <strong>${completedPercent}%</strong>
      </div>
    </div>

    <div class="status-section">
      <div class="status-card completed">
        <h3>Completed Tasks</h3>
        <ul class="status-list">
          ${
            completed.length
              ? completed.map((task) => `<li>${escapeHtml(task.label)}</li>`).join("")
              : "<li>No tasks fully matched yet.</li>"
          }
        </ul>
      </div>
      <div class="status-card missed">
        <h3>Missed Tasks</h3>
        <ul class="status-list">
          ${
            missed.length
              ? missed.map((task) => `<li>${escapeHtml(task.label)}</li>`).join("")
              : "<li>Nothing missed. The brief is complete.</li>"
          }
        </ul>
      </div>
    </div>

    <h3 class="analysis-title">Analysis Report</h3>
    <ul class="analysis-list">
      ${analysis.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
    </ul>
  `;
}

previewBtn.addEventListener("click", renderPreview);
resetBtn.addEventListener("click", injectStarterCode);
submitBtn.addEventListener("click", submitAssignment);

htmlEditor.addEventListener("input", renderPreview);
cssEditor.addEventListener("input", renderPreview);

injectStarterCode();

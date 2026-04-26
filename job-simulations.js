const simulationDomains = {
  creative: {
    label: "Creative",
    jobs: {
      ui: {
        title: "UI/UX Designer Simulation",
        intro: "Select a product scenario and respond like a thoughtful UI/UX designer.",
        tasks: [
          {
            title: "Map the user journey",
            detail: "A student career app has a high drop-off rate before course recommendations appear.",
            scenario: "Users open the app, answer two questions, and leave before completing the full flow. Explain how you would study the problem and redesign the journey.",
            rubric: {
              focus: ["research", "user journey", "pain point", "friction"],
              action: ["flow", "simplify", "wireframe", "prototype"],
              user: ["student", "feedback", "test", "usability"]
            }
          },
          {
            title: "Design the interface",
            detail: "The team wants a mobile-first dashboard that feels simple for first-year students.",
            scenario: "Describe the layout, hierarchy, and UI choices you would make so students quickly understand their next action.",
            rubric: {
              focus: ["layout", "hierarchy", "spacing", "navigation"],
              action: ["button", "screen", "cta", "visual"],
              user: ["clarity", "accessible", "easy", "student"]
            }
          },
          {
            title: "Test and improve",
            detail: "During testing, users say the app looks nice but still feels confusing.",
            scenario: "Write how you would gather feedback, identify the confusion, and improve the design in the next iteration.",
            rubric: {
              focus: ["test", "feedback", "observe", "issue"],
              action: ["improve", "iterate", "change", "refine"],
              user: ["usability", "clarity", "user", "experience"]
            }
          }
        ]
      },
      graphic: {
        title: "Graphic Designer Simulation",
        intro: "Select a design brief and respond like a graphic designer.",
        tasks: [
          {
            title: "Build a poster concept",
            detail: "A college fest needs a poster that attracts registrations in two days.",
            scenario: "Explain how you would choose the headline, colors, imagery, and layout to make the poster eye-catching and clear.",
            rubric: {
              focus: ["brief", "audience", "message", "goal"],
              action: ["headline", "color", "typography", "layout"],
              user: ["attention", "clear", "visual", "impact"]
            }
          },
          {
            title: "Create brand consistency",
            detail: "The client says their social posts look different on every platform.",
            scenario: "Describe how you would create a consistent visual system for the brand across multiple graphics.",
            rubric: {
              focus: ["brand", "consistency", "guideline", "identity"],
              action: ["palette", "font", "template", "icons"],
              user: ["recognizable", "clear", "audience", "trust"]
            }
          },
          {
            title: "Revise from feedback",
            detail: "The client likes your concept but says the design feels too busy.",
            scenario: "Write how you would respond to the feedback and revise the design while protecting the main message.",
            rubric: {
              focus: ["feedback", "priority", "message", "problem"],
              action: ["revise", "simplify", "remove", "balance"],
              user: ["client", "audience", "clarity", "readability"]
            }
          }
        ]
      },
      animator: {
        title: "Animator Simulation",
        intro: "Select a motion challenge and respond like an animator.",
        tasks: [
          {
            title: "Storyboard a scene",
            detail: "You need to create a short animated opening for a learning app.",
            scenario: "Explain how you would plan the key frames, pacing, and story beats before animating.",
            rubric: {
              focus: ["storyboard", "scene", "timing", "beats"],
              action: ["frames", "sequence", "plan", "motion"],
              user: ["viewer", "clarity", "emotion", "story"]
            }
          },
          {
            title: "Animate movement",
            detail: "A character walk cycle looks stiff and unrealistic.",
            scenario: "Describe how you would improve the movement to make it feel smooth and believable.",
            rubric: {
              focus: ["movement", "timing", "pose", "motion"],
              action: ["adjust", "smooth", "spacing", "weight"],
              user: ["natural", "believable", "viewer", "expressive"]
            }
          },
          {
            title: "Polish timing",
            detail: "The animation communicates the idea, but it lacks energy.",
            scenario: "Write how you would refine timing and transitions so the final animation feels more engaging.",
            rubric: {
              focus: ["timing", "transition", "pace", "energy"],
              action: ["polish", "refine", "pause", "speed"],
              user: ["engaging", "viewer", "emotion", "impact"]
            }
          }
        ]
      },
      video: {
        title: "Video Editor Simulation",
        intro: "Select an editing situation and respond like a video editor.",
        tasks: [
          {
            title: "Select the best clips",
            detail: "You received 40 minutes of footage for a 60-second promo video.",
            scenario: "Explain how you would review the footage and choose the best clips for a strong final cut.",
            rubric: {
              focus: ["goal", "story", "review", "select"],
              action: ["trim", "sequence", "clip", "cut"],
              user: ["engaging", "viewer", "clear", "message"]
            }
          },
          {
            title: "Build the story arc",
            detail: "The raw footage has good moments, but no clear structure.",
            scenario: "Describe how you would organize the edit into a beginning, middle, and end.",
            rubric: {
              focus: ["structure", "story", "hook", "flow"],
              action: ["arrange", "sequence", "transition", "music"],
              user: ["attention", "viewer", "clear", "retention"]
            }
          },
          {
            title: "Improve viewer retention",
            detail: "Analytics show people stop watching after the first 10 seconds.",
            scenario: "Write how you would change pacing, captions, or visual rhythm to keep viewers watching longer.",
            rubric: {
              focus: ["analytics", "retention", "problem", "drop"],
              action: ["pacing", "caption", "hook", "shorten"],
              user: ["viewer", "engagement", "attention", "clarity"]
            }
          }
        ]
      },
      content: {
        title: "Content Creator Simulation",
        intro: "Select a content challenge and respond like a creator.",
        tasks: [
          {
            title: "Pick a content angle",
            detail: "You want to make a post about career mistakes students should avoid.",
            scenario: "Explain how you would choose an angle that is useful, original, and appealing to your audience.",
            rubric: {
              focus: ["topic", "audience", "angle", "value"],
              action: ["hook", "format", "idea", "structure"],
              user: ["student", "engaging", "useful", "clear"]
            }
          },
          {
            title: "Write or script",
            detail: "The idea is strong, but the first draft feels boring.",
            scenario: "Describe how you would rewrite the content so the opening is stronger and the message stays engaging.",
            rubric: {
              focus: ["script", "hook", "message", "structure"],
              action: ["rewrite", "shorten", "clarify", "sequence"],
              user: ["audience", "engaging", "attention", "tone"]
            }
          },
          {
            title: "Measure what worked",
            detail: "One post got high reach but low saves, while another had fewer views but better comments.",
            scenario: "Write how you would evaluate the results and what you would improve in your next post.",
            rubric: {
              focus: ["metrics", "reach", "comments", "saves"],
              action: ["analyze", "compare", "improve", "test"],
              user: ["audience", "engagement", "learning", "next"]
            }
          }
        ]
      }
    }
  },
  tech: {
    label: "Technology",
    jobs: {
      dev: {
        title: "Software Developer Simulation",
        intro: "Select an engineering situation and respond like a software developer.",
        tasks: [
          {
            title: "Build a login flow",
            detail: "A new app needs a secure but simple login system for students.",
            scenario: "Explain how you would build the login flow, including validation, security basics, and a clear user experience.",
            rubric: {
              focus: ["login", "authentication", "validation", "security"],
              action: ["build", "error", "form", "backend"],
              user: ["user", "clear", "safe", "experience"]
            }
          },
          {
            title: "Handle user errors",
            detail: "Users keep entering invalid data and do not understand what went wrong.",
            scenario: "Describe how you would detect invalid input and design helpful error handling.",
            rubric: {
              focus: ["input", "validation", "error", "problem"],
              action: ["check", "message", "prevent", "handle"],
              user: ["helpful", "clear", "user", "recover"]
            }
          },
          {
            title: "Ship a cleaner version",
            detail: "The feature works, but the code is messy and hard to maintain.",
            scenario: "Write how you would refactor the feature while keeping it stable for users.",
            rubric: {
              focus: ["refactor", "maintain", "code", "structure"],
              action: ["clean", "test", "split", "improve"],
              user: ["stable", "performance", "bug", "quality"]
            }
          }
        ]
      },
      data: {
        title: "Data Analyst Simulation",
        intro: "Select an analytics situation and respond like a data analyst.",
        tasks: [
          {
            title: "Clean a dataset",
            detail: "You receive student survey data with duplicates and missing values.",
            scenario: "Explain how you would prepare the dataset before using it for analysis.",
            rubric: {
              focus: ["clean", "duplicate", "missing", "quality"],
              action: ["remove", "fix", "prepare", "check"],
              user: ["accurate", "analysis", "reliable", "decision"]
            }
          },
          {
            title: "Spot patterns",
            detail: "A team wants to know why some students complete the app journey and others leave early.",
            scenario: "Describe how you would analyze the data and identify meaningful patterns.",
            rubric: {
              focus: ["pattern", "segment", "trend", "question"],
              action: ["compare", "filter", "measure", "analyze"],
              user: ["insight", "decision", "team", "impact"]
            }
          },
          {
            title: "Present the insight",
            detail: "You found an important trend, but non-technical teammates need to understand it quickly.",
            scenario: "Write how you would present the result and recommendation in a simple way.",
            rubric: {
              focus: ["insight", "story", "recommendation", "chart"],
              action: ["present", "explain", "summarize", "visualize"],
              user: ["team", "clear", "decision", "non-technical"]
            }
          }
        ]
      },
      web: {
        title: "Web Developer Simulation",
        intro: "Select a web development problem, write your code, and get judged based on the HTML, CSS, and JavaScript elements you included.",
        tasks: [
          {
            title: "Build a hero landing section",
            detail: "Create a clean landing page with a hero, short description, and a clear call-to-action button.",
            scenario: "Write HTML, CSS, and optional JavaScript for a landing section that includes a main heading, supporting paragraph, CTA button, and a responsive layout that works on mobile.",
            mode: "code",
            starterCode: "<section class=\"hero\">\n  <h1>Build your future in tech</h1>\n  <p>Learn practical skills with guided projects and clear career paths.</p>\n  <button>Start learning</button>\n</section>",
            requiredElements: [
              { label: "main heading", keywords: ["<h1", "<h2"] },
              { label: "supporting paragraph", keywords: ["<p"] },
              { label: "call-to-action button", keywords: ["<button", "type=\"button\"", "type='button'"] },
              { label: "container or section structure", keywords: ["<section", "<main", "<div"] },
              { label: "responsive styling", keywords: ["@media", "max-width", "min-width", "flex", "grid"] }
            ],
            bonusElements: [
              { label: "hover or interaction styling", keywords: [":hover", "transition", "transform"] },
              { label: "accessible naming", keywords: ["aria-label", "role=", "<label"] }
            ]
          },
          {
            title: "Build an interactive contact form",
            detail: "Create a contact form with name, email, message, and a submit interaction that gives feedback to the user.",
            scenario: "Write the code for a contact form. It should include input fields, a textarea, a submit button, and either validation or a success/error message using JavaScript or inline browser validation.",
            mode: "code",
            starterCode: "<form id=\"contactForm\">\n  <label>Name</label>\n  <input type=\"text\" name=\"name\">\n\n  <label>Email</label>\n  <input type=\"email\" name=\"email\">\n\n  <label>Message</label>\n  <textarea name=\"message\"></textarea>\n\n  <button type=\"submit\">Send</button>\n</form>",
            requiredElements: [
              { label: "form element", keywords: ["<form"] },
              { label: "name field", keywords: ["name=\"name\"", "id=\"name\"", "placeholder=\"name"] },
              { label: "email field", keywords: ["type=\"email\"", "name=\"email\"", "id=\"email\""] },
              { label: "message field", keywords: ["<textarea", "name=\"message\"", "id=\"message\""] },
              { label: "submit button", keywords: ["type=\"submit\"", "<button"] },
              { label: "validation or feedback logic", keywords: ["addEventListener", "preventDefault", "required", "alert(", "innerText", "textContent"] }
            ],
            bonusElements: [
              { label: "error message area", keywords: ["error", "invalid", "warning"] },
              { label: "success state", keywords: ["success", "submitted", "thank you"] }
            ]
          },
          {
            title: "Build a responsive feature card layout",
            detail: "Create a feature section with three cards that stack well on mobile and align in columns on larger screens.",
            scenario: "Write code for a responsive feature layout with three cards. Each card should have a title, short text, and clear structure. Use CSS to make it adapt across screen sizes.",
            mode: "code",
            starterCode: "<section class=\"features\">\n  <article class=\"card\">\n    <h3>Fast learning</h3>\n    <p>Short projects that build real skills.</p>\n  </article>\n</section>",
            requiredElements: [
              { label: "feature section wrapper", keywords: ["<section", "class=\"features", "id=\"features"] },
              { label: "multiple cards", keywords: ["<article", "class=\"card", "<div class=\"card"] },
              { label: "card headings", keywords: ["<h3", "<h2"] },
              { label: "card descriptions", keywords: ["<p"] },
              { label: "layout CSS", keywords: ["display: grid", "display:grid", "display: flex", "display:flex"] },
              { label: "responsive breakpoint", keywords: ["@media", "max-width", "min-width"] }
            ],
            bonusElements: [
              { label: "spacing and polish", keywords: ["gap:", "padding:", "border-radius", "box-shadow"] },
              { label: "semantic structure", keywords: ["<article", "<section", "<main"] }
            ]
          }
        ]
      },
      ai: {
        title: "AI Engineer Simulation",
        intro: "Select an AI product situation and respond like an AI engineer.",
        tasks: [
          {
            title: "Define the use case",
            detail: "A team wants to add AI to their app but has no clear problem statement.",
            scenario: "Explain how you would identify a useful AI use case instead of adding AI just for trend value.",
            rubric: {
              focus: ["use case", "problem", "value", "goal"],
              action: ["define", "scope", "workflow", "evaluate"],
              user: ["reliable", "useful", "user", "business"]
            }
          },
          {
            title: "Build the workflow",
            detail: "The AI output is useful, but the full product flow feels unreliable.",
            scenario: "Describe how you would connect inputs, model output, checks, and user-facing fallback behavior.",
            rubric: {
              focus: ["workflow", "input", "output", "validation"],
              action: ["build", "fallback", "guardrail", "integrate"],
              user: ["reliable", "safe", "clear", "experience"]
            }
          },
          {
            title: "Evaluate quality",
            detail: "Users say the assistant is sometimes helpful and sometimes wrong.",
            scenario: "Write how you would measure output quality and improve it over time.",
            rubric: {
              focus: ["evaluate", "quality", "mistake", "measure"],
              action: ["test", "review", "improve", "prompt"],
              user: ["trust", "reliable", "user", "accuracy"]
            }
          }
        ]
      },
      cyber: {
        title: "Cybersecurity Analyst Simulation",
        intro: "Select a security situation and respond like a cybersecurity analyst.",
        tasks: [
          {
            title: "Review suspicious activity",
            detail: "Multiple failed login attempts are reported from unusual locations.",
            scenario: "Explain how you would investigate the alerts and decide whether they are a real threat.",
            rubric: {
              focus: ["alert", "log", "suspicious", "investigate"],
              action: ["review", "verify", "isolate", "respond"],
              user: ["risk", "security", "threat", "evidence"]
            }
          },
          {
            title: "Identify weak points",
            detail: "A small company wants to know where its systems are most vulnerable.",
            scenario: "Describe how you would assess the environment and prioritize the biggest weaknesses.",
            rubric: {
              focus: ["weakness", "risk", "access", "vulnerability"],
              action: ["audit", "check", "prioritize", "recommend"],
              user: ["security", "protection", "business", "impact"]
            }
          },
          {
            title: "Recommend action",
            detail: "You identified risky password habits and outdated software in several teams.",
            scenario: "Write how you would recommend fixes that are practical and effective.",
            rubric: {
              focus: ["issue", "risk", "policy", "priority"],
              action: ["recommend", "update", "train", "monitor"],
              user: ["practical", "security", "team", "reduce"]
            }
          }
        ]
      }
    }
  },
  civil: {
    label: "Civil Services",
    jobs: {
      ias: {
        title: "IAS Officer Simulation",
        intro: "Select a situation and respond like a real IAS officer.",
        tasks: [
          {
            title: "Review a district issue",
            detail: "Water shortage is affecting several villages before summer peaks.",
            scenario: "You are the district officer. Tanker supply is irregular, public frustration is rising, and local officials are blaming each other. Explain your response.",
            rubric: {
              focus: ["survey", "analyze", "identify", "data"],
              action: ["immediate", "urgent", "tankers", "short term"],
              planning: ["long term", "plan", "infrastructure", "solution"],
              people: ["community", "coordinate", "department", "public"]
            }
          },
          {
            title: "Plan an action response",
            detail: "Students in remote areas are dropping out because transport to school is unreliable.",
            scenario: "You have one week to present a district plan. Describe the steps you would take to understand the issue, coordinate departments, and improve school access.",
            rubric: {
              focus: ["survey", "data", "identify", "ground"],
              action: ["transport", "bus", "immediate", "safety"],
              planning: ["budget", "policy", "plan", "long term"],
              people: ["education", "parents", "department", "community"]
            }
          },
          {
            title: "Present to the public",
            detail: "A rumor has spread online that the administration ignored a local welfare problem.",
            scenario: "Write the response you would give in a public meeting to calm people, explain the facts, and restore trust.",
            rubric: {
              focus: ["facts", "clarify", "issue", "listen"],
              action: ["respond", "explain", "assure", "address"],
              planning: ["follow up", "monitor", "action plan", "timeline"],
              people: ["public", "citizens", "trust", "community"]
            }
          }
        ]
      },
      ips: {
        title: "IPS Officer Simulation",
        intro: "Select a situation and respond like a real IPS officer.",
        tasks: [
          {
            title: "Assess a security situation",
            detail: "A festival crowd is growing faster than expected and tension is rising in one area.",
            scenario: "As the police officer in charge, explain how you would assess the risk, gather information, and prevent escalation.",
            rubric: {
              focus: ["intel", "assess", "risk", "situation"],
              action: ["deploy", "control", "immediate", "patrol"],
              planning: ["route", "backup", "coordination", "monitor"],
              people: ["public", "team", "communication", "safety"]
            }
          },
          {
            title: "Deploy a response plan",
            detail: "A protest has blocked a major road, and social media posts are increasing panic.",
            scenario: "Describe your step-by-step response to control the situation while protecting law, safety, and public rights.",
            rubric: {
              focus: ["facts", "ground", "risk", "information"],
              action: ["barricade", "officers", "traffic", "urgent"],
              planning: ["backup", "strategy", "coordination", "de-escalate"],
              people: ["public", "rights", "communication", "safety"]
            }
          },
          {
            title: "Report outcomes",
            detail: "A security incident was contained, but the public is demanding answers.",
            scenario: "Write how you would report what happened, what action was taken, and how future incidents will be prevented.",
            rubric: {
              focus: ["incident", "facts", "evidence", "report"],
              action: ["action", "response", "control", "investigate"],
              planning: ["prevention", "training", "review", "improve"],
              people: ["public", "confidence", "team", "safety"]
            }
          }
        ]
      },
      ifs: {
        title: "IFS Officer Simulation",
        intro: "Select a situation and respond like a real IFS officer.",
        tasks: [
          {
            title: "Prepare a briefing note",
            detail: "A neighboring country has announced a policy that may affect trade and student mobility.",
            scenario: "Explain how you would prepare a briefing note for senior officials with clear risks, opportunities, and diplomatic priorities.",
            rubric: {
              focus: ["policy", "brief", "risk", "opportunity"],
              action: ["summarize", "analyze", "recommend", "prepare"],
              planning: ["priority", "strategy", "long term", "impact"],
              people: ["relations", "students", "trade", "country"]
            }
          },
          {
            title: "Draft a diplomatic response",
            detail: "A sensitive international statement needs a careful official reply.",
            scenario: "Write how you would respond firmly while protecting the relationship and national interest.",
            rubric: {
              focus: ["facts", "context", "issue", "position"],
              action: ["draft", "respond", "balance", "protect"],
              planning: ["strategy", "future", "impact", "follow up"],
              people: ["relationship", "national interest", "diplomatic", "respect"]
            }
          },
          {
            title: "Coordinate a meeting",
            detail: "A bilateral meeting is coming up with limited time and several unresolved topics.",
            scenario: "Describe how you would prepare the agenda, priorities, and negotiation goals.",
            rubric: {
              focus: ["agenda", "issue", "priority", "brief"],
              action: ["prepare", "coordinate", "align", "summarize"],
              planning: ["goal", "strategy", "outcome", "next step"],
              people: ["delegation", "relationship", "officials", "coordination"]
            }
          }
        ]
      },
      irs: {
        title: "IRS Officer Simulation",
        intro: "Select a situation and respond like a real IRS officer.",
        tasks: [
          {
            title: "Review a tax case",
            detail: "A business return shows mismatched figures across reported documents.",
            scenario: "Explain how you would review the case, verify facts, and decide whether the issue is an error or a possible compliance concern.",
            rubric: {
              focus: ["documents", "review", "verify", "mismatch"],
              action: ["check", "notice", "investigate", "evidence"],
              planning: ["process", "record", "next step", "compliance"],
              people: ["fairness", "taxpayer", "department", "clarity"]
            }
          },
          {
            title: "Recommend next action",
            detail: "You found unusual reporting patterns but no direct proof of fraud yet.",
            scenario: "Write the next action you would recommend and why it is the most reasonable step.",
            rubric: {
              focus: ["facts", "risk", "pattern", "case"],
              action: ["notice", "clarify", "review", "escalate"],
              planning: ["procedure", "document", "follow up", "compliance"],
              people: ["fair", "clear", "taxpayer", "department"]
            }
          },
          {
            title: "Explain the reasoning",
            detail: "Your decision will be reviewed by senior officers and may affect public trust.",
            scenario: "Describe how you would explain your reasoning clearly and professionally.",
            rubric: {
              focus: ["evidence", "facts", "basis", "reasoning"],
              action: ["explain", "document", "justify", "summarize"],
              planning: ["logic", "rule", "process", "consistency"],
              people: ["clarity", "fairness", "trust", "professional"]
            }
          }
        ]
      },
      ies: {
        title: "IES Officer Simulation",
        intro: "Select a situation and respond like a real IES officer.",
        tasks: [
          {
            title: "Study a public project brief",
            detail: "A government infrastructure project has technical goals but also budget pressure.",
            scenario: "Explain how you would read the brief, identify the core constraints, and frame the engineering problem.",
            rubric: {
              focus: ["brief", "technical", "constraint", "project"],
              action: ["study", "identify", "analyze", "assess"],
              planning: ["budget", "timeline", "feasibility", "priority"],
              people: ["public", "department", "impact", "stakeholder"]
            }
          },
          {
            title: "Evaluate options",
            detail: "Two technical designs are available, but one is cheaper and the other is more durable.",
            scenario: "Write how you would compare the options and recommend the best path for a public project.",
            rubric: {
              focus: ["options", "compare", "cost", "technical"],
              action: ["evaluate", "measure", "recommend", "justify"],
              planning: ["long term", "maintenance", "risk", "feasibility"],
              people: ["public", "impact", "budget", "department"]
            }
          },
          {
            title: "Recommend a plan",
            detail: "Senior officials need a practical recommendation before approving the project.",
            scenario: "Describe the plan you would present and how you would support it with logic, data, and public value.",
            rubric: {
              focus: ["data", "analysis", "need", "problem"],
              action: ["recommend", "present", "justify", "support"],
              planning: ["timeline", "budget", "execution", "sustainability"],
              people: ["public", "stakeholder", "department", "value"]
            }
          }
        ]
      }
    }
  }
};

const simulationData = Object.values(simulationDomains).reduce((allJobs, domain) => {
  return { ...allJobs, ...domain.jobs };
}, {});

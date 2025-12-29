export type SubjectKey =
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "history"
  | "economics"
  | "computerScience"
  | "english";

export interface Subject {
  id: SubjectKey;
  name: string;
  summary: string;
  weeklyFocus: string[];
  examTips: string[];
}

export interface Resource {
  id: string;
  subject: SubjectKey | "general";
  title: string;
  description: string;
  url: string;
  type: "video" | "article" | "book" | "problem_set" | "tool";
  duration?: string;
  skillTags: string[];
}

export interface PracticeQuestion {
  id: string;
  subject: SubjectKey;
  prompt: string;
  answer: string;
  difficulty: "foundation" | "intermediate" | "advanced";
  concepts: string[];
}

export const subjects: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    summary:
      "High-value quantitative section focusing on algebra, calculus, and data interpretation.",
    weeklyFocus: [
      "Concept consolidation with mixed problem sets",
      "Speed drills for arithmetic and algebra",
      "Mock tests emphasizing accuracy under time pressure",
      "Formula flashcards & spaced repetition review",
    ],
    examTips: [
      "Derive formulae to reinforce memory before relying on rote recall.",
      "Track common calculation traps and build a personal checklist.",
      "Use weekend full-length mocks to calibrate pacing.",
    ],
  },
  {
    id: "physics",
    name: "Physics",
    summary:
      "Concept-driven questions requiring strong fundamentals in mechanics, waves, and electromagnetism.",
    weeklyFocus: [
      "Rebuild conceptual notes with visual diagrams",
      "Alternate between numerical and qualitative problems",
      "Review past year papers to discover repeating themes",
      "Simulate experiment-based questions for clarity",
    ],
    examTips: [
      "Translate every problem into known laws before manipulating equations.",
      "Memorize boundary conditions and unit systems for quick validation.",
      "Highlight inter-topic links, e.g., SHM ↔ waves ↔ optics.",
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    summary:
      "Balanced preparation across Physical, Inorganic, and Organic chemistry with emphasis on reaction logic.",
    weeklyFocus: [
      "Alternate between inorganic fact revision and reaction mechanisms",
      "Solve numericals in physical chemistry after reading theory",
      "Maintain reaction flashcards with functional group transformations",
      "Quiz yourself on qualitative analysis and periodic trends",
    ],
    examTips: [
      "Build a wall chart of periodic trends for rapid daily reference.",
      "Practice mechanism writing to reinforce reagent-product mapping.",
      "Use mnemonic devices to retain inorganic chemistry exceptions.",
    ],
  },
  {
    id: "biology",
    name: "Biology",
    summary:
      "Retention-heavy subject requiring high recall accuracy and application of key processes.",
    weeklyFocus: [
      "Convert complex processes into flow diagrams and mind maps",
      "Attempt assertion-reason and statement-based MCQs daily",
      "Summarize NCERT margin notes into quick review sheets",
      "Revise lab techniques and classification tables twice weekly",
    ],
    examTips: [
      "Annotate diagrams with keywords to reinforce terminologies.",
      "Teach a quick concept aloud to deepen retention.",
      "Schedule nightly low-intensity reviews using spaced repetition.",
    ],
  },
  {
    id: "history",
    name: "History",
    summary:
      "Blend of timeline accuracy with thematic analysis for modern and world history.",
    weeklyFocus: [
      "Consolidate timelines with cause-effect annotations",
      "Practice writing 200-word analytical answers",
      "Curate quote bank for essays and long answers",
      "Revise map-based questions and landmark events",
    ],
    examTips: [
      "Map every event to its social, economic, and political impact.",
      "Use spaced repetition to retain factual chronology.",
      "Develop essay introductions and conclusions for major themes.",
    ],
  },
  {
    id: "economics",
    name: "Economics",
    summary:
      "Quantitative and theoretical understanding across micro, macro, and statistics.",
    weeklyFocus: [
      "Solve past year numerical questions with time targets",
      "Update short notes on policy developments weekly",
      "Alternate between theory revision and case study practice",
      "Review graphs and derivations to ensure conceptual clarity",
    ],
    examTips: [
      "Create layered mind maps to connect macroeconomic indicators.",
      "Translate theoretical models into real-world examples.",
      "Memorize formulas by re-deriving them every weekend.",
    ],
  },
  {
    id: "computerScience",
    name: "Computer Science",
    summary:
      "Programming, data structures, and computational thinking tested via problem-solving.",
    weeklyFocus: [
      "Daily coding practice with alternating topics",
      "Revise algorithms and analyze complexity trade-offs",
      "Build quick reference sheets for data structure operations",
      "Attempt timed mock tests to improve debugging speed",
    ],
    examTips: [
      "Implement algorithms from scratch without auto-complete.",
      "Maintain error logbooks to avoid repeating mistakes.",
      "Balance conceptual study with hands-on coding challenges.",
    ],
  },
  {
    id: "english",
    name: "English",
    summary:
      "Critical reading, vocabulary, and verbal reasoning with emphasis on comprehension speed.",
    weeklyFocus: [
      "Practice RC sets with active annotation strategies",
      "Iterate on vocabulary lists using spaced repetition apps",
      "Record and review speaking drills for orals/interviews",
      "Alternate grammar drills with writing polished essays",
    ],
    examTips: [
      "Skim passages first, then deep dive with a question-first approach.",
      "Maintain a personal idiom and phrase sheet for quick recall.",
      "Use audio summaries to reinforce new vocabulary.",
    ],
  },
];

export const resources: Resource[] = [
  {
    id: "math-art-of-problem-solving",
    subject: "mathematics",
    title: "AoPS Competitive Math Series",
    description:
      "Progressive problem sets covering algebra, number theory, combinatorics, and geometry.",
    url: "https://artofproblemsolving.com/school",
    type: "problem_set",
    duration: "3-4 hrs / week",
    skillTags: ["problem-solving", "speed", "accuracy"],
  },
  {
    id: "physics-ocw-mechanics",
    subject: "physics",
    title: "MIT OCW: 8.01 Classical Mechanics",
    description:
      "Concept-first lecture series with assignments that mirror competitive exam difficulty.",
    url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
    type: "video",
    duration: "15 hrs total",
    skillTags: ["mechanics", "visualization", "derivations"],
  },
  {
    id: "chemistry-named-reactions",
    subject: "chemistry",
    title: "Organic Chemistry Tutor - Named Reactions",
    description:
      "Concise breakdowns of high-yield reactions, reagents, and mechanisms.",
    url: "https://www.organicchemistrytutor.com/named-reactions/",
    type: "article",
    skillTags: ["organic-chemistry", "mechanisms"],
  },
  {
    id: "biology-anatomy-app",
    subject: "biology",
    title: "Complete Anatomy 3D Visualization",
    description:
      "Interactive tool to visualize anatomical structures with quizzes for retention.",
    url: "https://www.completeanatomy.com/",
    type: "tool",
    skillTags: ["visual-learning", "retention"],
  },
  {
    id: "history-crash-course",
    subject: "history",
    title: "Crash Course World History Playlist",
    description:
      "Fast-moving videos that provide thematic context and exam-friendly narratives.",
    url: "https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9",
    type: "video",
    duration: "40 videos",
    skillTags: ["contextualization", "timelines"],
  },
  {
    id: "economics-mankiw",
    subject: "economics",
    title: "Principles of Economics – Mankiw Summary Notes",
    description:
      "Concise chapter summaries with example questions and graphical explanations.",
    url: "https://college.cengage.com/economics/mankiw/principles/6e/students/index.html",
    type: "article",
    skillTags: ["macro", "micro", "graphs"],
  },
  {
    id: "cs-leetcode-patterns",
    subject: "computerScience",
    title: "NeetCode Roadmap",
    description:
      "Structured problem sequence focusing on data structures & algorithms mastery.",
    url: "https://neetcode.io/roadmap",
    type: "problem_set",
    skillTags: ["algorithms", "data-structures"],
  },
  {
    id: "english-word-power",
    subject: "english",
    title: "Word Power Made Easy – Practice Decks",
    description:
      "Daily vocabulary drills with etymology-based retention techniques.",
    url: "https://wordpowermadeeasy.com/",
    type: "book",
    skillTags: ["vocabulary", "etymology"],
  },
  {
    id: "general-pomodoro",
    subject: "general",
    title: "Focus To-Do Pomodoro & Tasks",
    description:
      "Pomodoro timer integrated with task management and streak tracking.",
    url: "https://www.focustodo.cn/",
    type: "tool",
    skillTags: ["productivity", "time-management"],
  },
  {
    id: "general-active-recall",
    subject: "general",
    title: "Active Recall Playbook",
    description:
      "Step-by-step guide to building flashcards and retrieval practice systems.",
    url: "https://www.notebooktech.com/active-recall-guide",
    type: "article",
    skillTags: ["memory", "spaced-repetition"],
  },
];

export const questionBank: PracticeQuestion[] = [
  {
    id: "math-1",
    subject: "mathematics",
    difficulty: "foundation",
    prompt:
      "If the function f(x) = ax^2 + bx + c passes through (1,3), (2,8), and (3,15), determine the value of a + b + c.",
    answer:
      "Solving the system yields a = 1, b = 0, c = 2, so a + b + c = 3.",
    concepts: ["quadratic-equations", "simultaneous-equations"],
  },
  {
    id: "math-2",
    subject: "mathematics",
    difficulty: "advanced",
    prompt:
      "Evaluate the sum of the infinite series S = 1/(1·2) + 1/(2·3) + 1/(3·4) + …",
    answer:
      "Use telescoping: S = Σ (1/n − 1/(n+1)) = 1. Limit tends to 1 as n → ∞.",
    concepts: ["infinite-series", "telescoping-series"],
  },
  {
    id: "physics-1",
    subject: "physics",
    difficulty: "intermediate",
    prompt:
      "A block of mass m on a frictionless table is attached to a spring with constant k and displaced by x. Derive the expression for time period.",
    answer:
      "Simple harmonic motion gives T = 2π√(m/k). Independence from displacement highlights linear restoring force.",
    concepts: ["shm", "spring-mass-system"],
  },
  {
    id: "physics-2",
    subject: "physics",
    difficulty: "advanced",
    prompt:
      "Explain how energy is conserved when a charged particle spirals in a uniform magnetic field emitting synchrotron radiation.",
    answer:
      "Magnetic fields perform no work; energy loss manifests as radiation. A separate electric field or power source must supply energy to sustain motion.",
    concepts: ["electromagnetism", "radiation"],
  },
  {
    id: "chemistry-1",
    subject: "chemistry",
    difficulty: "foundation",
    prompt:
      "State and explain the trend of ionization enthalpy down a group and across a period.",
    answer:
      "Down a group: decreases due to increased atomic radius and shielding. Across a period: increases with higher nuclear charge and smaller radius.",
    concepts: ["periodic-trends"],
  },
  {
    id: "chemistry-2",
    subject: "chemistry",
    difficulty: "advanced",
    prompt:
      "Predict the major product for the reaction of 2-methylpropene with HBr in the presence of ROOR.",
    answer:
      "Peroxide effect induces anti-Markovnikov addition. Product: 1-bromobutane via radical mechanism.",
    concepts: ["organic-chemistry", "radicals"],
  },
  {
    id: "biology-1",
    subject: "biology",
    difficulty: "foundation",
    prompt:
      "Differentiate between transcription and translation in terms of location, template, and output.",
    answer:
      "Transcription (nucleus): DNA→mRNA. Translation (cytoplasm/ribosome): mRNA→polypeptide using tRNA and rRNA.",
    concepts: ["central-dogma"],
  },
  {
    id: "history-1",
    subject: "history",
    difficulty: "intermediate",
    prompt:
      "Analyze the economic factors that contributed to the outbreak of the French Revolution.",
    answer:
      "Mounting national debt, regressive tax system burdening Third Estate, poor harvests, and stagnant wages catalyzed revolutionary pressures.",
    concepts: ["french-revolution", "economic-history"],
  },
  {
    id: "economics-1",
    subject: "economics",
    difficulty: "intermediate",
    prompt:
      "Explain the IS-LM model adjustment when fiscal policy increases government spending.",
    answer:
      "IS curve shifts right; equilibrium income and interest rates rise. If monetary policy accomodates, LM can shift right to stabilize interest rates.",
    concepts: ["macroeconomics"],
  },
  {
    id: "computer-1",
    subject: "computerScience",
    difficulty: "advanced",
    prompt:
      "Design a dynamic programming state for counting the number of ways to make sum S using unlimited coins of denominations d₁…dₙ.",
    answer:
      "Let dp[i] denote ways to make sum i. Initialize dp[0]=1. For each coin d and sum s≥d: dp[s]+=dp[s-d]. Order coins outermost to avoid permutations.",
    concepts: ["dynamic-programming", "combinatorics"],
  },
  {
    id: "english-1",
    subject: "english",
    difficulty: "foundation",
    prompt:
      "Draft a thesis statement comparing two poems addressing the theme of resilience.",
    answer:
      "Example: “While Poem A portrays resilience as an individualistic triumph, Poem B frames it as a communal endeavor, revealing how structure and imagery reshape perseverance into either solitary defiance or collective renewal.”",
    concepts: ["literary-analysis", "writing"],
  },
];


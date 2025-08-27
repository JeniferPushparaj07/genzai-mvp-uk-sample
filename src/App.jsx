import React, { useEffect, useRef, useState } from 'react';
import {
  Brain,
  GraduationCap,
  Briefcase,
  Sparkles,
  Gamepad2,
  Upload,
  Accessibility,
  Moon,
  Sun,
  ShieldCheck,
  BookOpenCheck,
  MessagesSquare,
  CheckCircle2,
  FileText,
  Search,
} from 'lucide-react';

// A simple utility to concatenate class names
const cx = (...xs) => xs.filter(Boolean).join(' ');

// A simple hook for persisting state to local storage
function useLocalStorage(key, init) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV];
}

// Mock AI response function to simulate an API call
async function demoAnswer(prompt) {
  const canned = ["Let's break that down…", "Here’s an analogy…", "A quick summary then an example…"];
  return `${canned[Math.floor(Math.random() * canned.length)]} ${prompt}`;
}

// Function to transform an explanation based on the user's chosen style
function transformExplanation(text, style) {
  switch (style) {
    case 'bullets':
      return `• ${text.replace(/\\.\\s*/g, '\\n• ')}`;
    case 'steps':
      return `Step 1→2→3. ${text}`;
    case 'analogy':
      return `Imagine a story: ${text}`;
    default:
      return `In one sentence: ${text}`;
  }
}

// Function to score a CV against a Job Description
function scoreCVvsJD(cvText, jdText) {
  const norms = (s) => s.toLowerCase().replace(/[^a-z0-9\\s]/g, '');
  const cv = norms(cvText).split(/\\s+/);
  const jd = norms(jdText).split(/\\s+/);
  const set = new Set(jd);
  let hits = 0;
  for (const w of cv) {
    if (set.has(w)) {
      hits++;
    }
  }
  const score = jd.length ? Math.min(100, Math.round((hits / jd.length) * 120)) : 0;
  const freq = {};
  for (const w of jd) {
    freq[w] = (freq[w] || 0) + 1;
  }
  const top = Object.entries(freq)
    .filter(([w]) => w.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([w]) => w);
  return { score, top };
}

// Inbuilt UK curriculum demo data
const UK_CLASSES = {
  "KS3 (Years 7–9)": {
    subjects: ["Maths", "Biology", "Chemistry", "Physics", "Computer Science", "Geography", "History", "English"],
    objectives: {
      Maths: ["Use ratio and proportion", "Solve linear equations", "Area and perimeter"],
      Biology: ["Cell structure and functions", "Organs & systems", "Photosynthesis basics"],
      Chemistry: ["Particle model", "Elements, compounds, mixtures", "Acids and alkalis"],
      Physics: ["Forces and motion", "Energy transfers", "Waves: sound & light"],
      "Computer Science": ["Algorithms and flowcharts", "Scratch/Python basics", "Data representation"],
      Geography: ["UK physical landscapes", "Weather & climate", "Population change"],
      History: ["Medieval England", "Industrial Revolution", "World War I"],
      English: ["Non‑fiction analysis", "Narrative devices", "Grammar & punctuation"]
    }
  },
  "GCSE (Years 10–11)": {
    subjects: ["Maths", "Biology", "Chemistry", "Physics", "Computer Science", "Business", "Geography", "History", "English Language"],
    objectives: {
      Maths: ["Simultaneous equations", "Quadratics (factor/solve)", "Statistics: averages & spread"],
      Biology: ["Enzymes & digestion", "Homeostasis", "Genetics: Punnett squares"],
      Chemistry: ["Ionic/covalent bonding", "Reacting masses", "Electrolysis"],
      Physics: ["Forces & vectors", "Electricity: V=IR", "Radioactivity"],
      "Computer Science": ["Trace pseudocode", "Time/space complexity (informal)", "Databases & SQL"],
      Business: ["Marketing mix", "Cash‑flow forecasts", "Stakeholders"],
      Geography: ["Coasts & rivers", "Resource management", "Global development"],
      History: ["Weimar & Nazi Germany", "Health & Medicine", "Cold War"],
      "English Language": ["Paper 1 Q2/Q3 techniques", "Comparative analysis", "Evaluation"]
    }
  },
  "A‑Level (Years 12–13)": {
    subjects: ["Maths", "Biology", "Chemistry", "Physics", "Computer Science", "Economics", "Psychology"],
    objectives: {
      Maths: ["Differentiation & integration", "Proof by induction", "Vectors"],
      Biology: ["Translation & transcription", "Immune response", "Ecology & sampling"],
      Chemistry: ["Organic mechanisms", "Equilibrium & Kc", "Thermodynamics"],
      Physics: ["SHM", "Electric fields & capacitors", "Quantum phenomena"],
      "Computer Science": ["Complexity & Big‑O", "OOP patterns", "Database normalisation"],
      Economics: ["Elasticities", "Market failure & gov. intervention", "Monetary policy"],
      Psychology: ["Research methods", "Attachment theories", "Biopsychology basics"]
    }
  }
};

// Main application component
export default function GenZAI_MVP_v3() {
  const [tagline] = useState("Moving minds to an immersive world");
  
  // State for accessibility settings
  const [dark, setDark] = useLocalStorage("a11y_dark", false);
  const [highContrast, setHighContrast] = useLocalStorage("a11y_contrast", false);
  const [bigText, setBigText] = useLocalStorage("a11y_bigtext", false);
  const [dyslexia, setDyslexia] = useLocalStorage("a11y_dyslexia", false);
  const [reduceMotion, setReduceMotion] = useLocalStorage("a11y_reduce_motion", false);

  const [tab, setTab] = useState("student");
  // State for the user's psychometric profile
  const [profile, setProfile] = useLocalStorage("genzai_profile", {
    assessed: false,
    style: "bullets",
    tone: "encouraging",
    pace: "normal"
  });

  // Apply dark mode class to the HTML root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Dynamic class names based on accessibility settings
  const appClass = cx(
    "min-h-screen font-sans",
    dark ? "bg-gray-950 text-gray-100" : "bg-white text-slate-900",
    highContrast ? "contrast-150" : "",
    bigText ? "text-[17px]" : "text-base",
    dyslexia ? "tracking-wide" : ""
  );

  return (
    <div className={appClass}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-purple-600 text-white rounded px-3 py-1">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 p-3 flex items-center justify-between gap-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 flex-wrap">
        <LogoArea />
        <A11yBar
          dark={dark}
          setDark={setDark}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          bigText={bigText}
          setBigText={setBigText}
          dyslexia={dyslexia}
          setDyslexia={setDyslexia}
          reduceMotion={reduceMotion}
          setReduceMotion={setReduceMotion}
        />
      </header>

      <main id="main" className="container mx-auto max-w-6xl px-4 pb-24">
        <Hero tagline={tagline} />
        {!profile.assessed ? (
          <PsychometricOnboarding profile={profile} setProfile={setProfile} />
        ) : (
          <>
            {/* Tabs for different user modes */}
            <div className="mt-6">
              <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-full space-x-1 sm:space-x-2">
                <button
                  onClick={() => setTab("student")}
                  className={cx(
                    "flex-1 p-2 rounded-full font-medium transition-colors duration-200 text-sm md:text-base",
                    tab === "student" ? "bg-white shadow-sm dark:bg-gray-700" : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <GraduationCap className="h-4 w-4 inline-block mr-1 md:mr-2" /> Student
                </button>
                <button
                  onClick={() => setTab("pro")}
                  className={cx(
                    "flex-1 p-2 rounded-full font-medium transition-colors duration-200 text-sm md:text-base",
                    tab === "pro" ? "bg-white shadow-sm dark:bg-gray-700" : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <Briefcase className="h-4 w-4 inline-block mr-1 md:mr-2" /> Professional
                </button>
                <button
                  onClick={() => setTab("hobby")}
                  className={cx(
                    "flex-1 p-2 rounded-full font-medium transition-colors duration-200 text-sm md:text-base",
                    tab === "hobby" ? "bg-white shadow-sm dark:bg-gray-700" : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <Gamepad2 className="h-4 w-4 inline-block mr-1 md:mr-2" /> Hobbyist
                </button>
              </div>

              {/* Tab content based on the selected tab */}
              {tab === "student" && <StudentMode profile={profile} reduceMotion={reduceMotion} />}
              {tab === "pro" && <ProfessionalMode profile={profile} />}
              {tab === "hobby" && <HobbyMode profile={profile} />}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-6xl px-4 py-6 text-sm flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" /> Inclusive, privacy‑first, UK‑only MVP.
        </div>
      </footer>
    </div>
  );
}

// ---------- Header Components ----------
function LogoArea() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center overflow-hidden">
        <span className="text-white font-bold">GZ</span>
      </div>
      <div>
        <div className="font-bold text-lg">GenZ.AI</div>
        <div className="text-xs opacity-70">Moving minds to an immersive world</div>
      </div>
    </div>
  );
}

function A11yBar({
  dark, setDark, highContrast, setHighContrast,
  bigText, setBigText, dyslexia, setDyslexia,
  reduceMotion, setReduceMotion
}) {
  return (
    <div className="flex items-center gap-3 text-sm flex-wrap justify-end">
      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs flex items-center gap-1">
        <Accessibility className="h-3 w-3" /> Inclusive
      </span>
      <div className="flex items-center gap-1" title="Dark mode">
        <Sun className="h-4 w-4" />
        <button
          onClick={() => setDark(!dark)}
          className={cx(
            "w-10 h-6 rounded-full p-1 transition-colors duration-200",
            dark ? "bg-purple-600" : "bg-gray-400"
          )}
        >
          <div
            className={cx(
              "w-4 h-4 bg-white rounded-full transition-transform duration-200",
              dark ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
        <Moon className="h-4 w-4" />
      </div>
      <label className="flex items-center gap-2">
        High contrast
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={cx(
            "w-10 h-6 rounded-full p-1 transition-colors duration-200",
            highContrast ? "bg-purple-600" : "bg-gray-400"
          )}
        >
          <div
            className={cx(
              "w-4 h-4 bg-white rounded-full transition-transform duration-200",
              highContrast ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </label>
      <label className="flex items-center gap-2">
        Larger text
        <button
          onClick={() => setBigText(!bigText)}
          className={cx(
            "w-10 h-6 rounded-full p-1 transition-colors duration-200",
            bigText ? "bg-purple-600" : "bg-gray-400"
          )}
        >
          <div
            className={cx(
              "w-4 h-4 bg-white rounded-full transition-transform duration-200",
              bigText ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </label>
      <label className="flex items-center gap-2">
        Dyslexia-friendly
        <button
          onClick={() => setDyslexia(!dyslexia)}
          className={cx(
            "w-10 h-6 rounded-full p-1 transition-colors duration-200",
            dyslexia ? "bg-purple-600" : "bg-gray-400"
          )}
        >
          <div
            className={cx(
              "w-4 h-4 bg-white rounded-full transition-transform duration-200",
              dyslexia ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </label>
      <label className="flex items-center gap-2">
        Reduce motion
        <button
          onClick={() => setReduceMotion(!reduceMotion)}
          className={cx(
            "w-10 h-6 rounded-full p-1 transition-colors duration-200",
            reduceMotion ? "bg-purple-600" : "bg-gray-400"
          )}
        >
          <div
            className={cx(
              "w-4 h-4 bg-white rounded-full transition-transform duration-200",
              reduceMotion ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </label>
    </div>
  );
}

function Hero({ tagline }) {
  return (
    <section className="mt-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6" /> GenZ.AI – Adaptive Learning & Careers
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 leading-relaxed">
            <p>{tagline}. Psychometric onboarding tunes <strong className="font-bold">tone, pace & style</strong> across Student, Professional and Hobbyist modes.</p>
            <ul className="list-disc pl-5 mt-2 text-sm opacity-90">
              <li>Student: pick class → subject appears → ask questions → retry explanations until it clicks.</li>
              <li>Professional: CV→ATS tailoring to a JD + job search demo.</li>
              <li>Hobbyist: free chat & micro‑lessons.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-200/70 to-indigo-200/70 dark:from-purple-900/40 dark:to-indigo-900/40 p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Compliance‑first
            </h3>
            <ul className="text-sm opacity-90 space-y-1">
              <li>GDPR + Age‑Appropriate Design Code</li>
              <li>Privacy by default (no external sends in this demo)</li>
              <li>Keyboard & screen‑reader friendly UI</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Psychometric Component ----------
function PsychometricOnboarding({ profile, setProfile }) {
  const [style, setStyle] = useState(profile.style || "bullets");
  const [tone, setTone] = useState(profile.tone || "encouraging");
  const [pace, setPace] = useState(profile.pace || "normal");

  function save() {
    setProfile({ assessed: true, style, tone, pace });
  }

  return (
    <section className="mt-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="pb-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" /> Quick Psychometric + Survey
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <div className="text-sm font-medium">Learning style</div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent w-full mt-1 dark:bg-gray-700"
              value={style}
              onChange={e => setStyle(e.target.value)}
            >
              <option value="bullets">Visual/Bullets</option>
              <option value="steps">Step‑by‑step</option>
              <option value="analogy">Analogies/Stories</option>
              <option value="simple">Concise one‑liners</option>
            </select>
          </div>
          <div>
            <div className="text-sm font-medium">Tone</div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent w-full mt-1 dark:bg-gray-700"
              value={tone}
              onChange={e => setTone(e.target.value)}
            >
              <option value="encouraging">Encouraging</option>
              <option value="neutral">Neutral</option>
              <option value="direct">Direct</option>
            </select>
          </div>
          <div>
            <div className="text-sm font-medium">Pace</div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent w-full mt-1 dark:bg-gray-700"
              value={pace}
              onChange={e => setPace(e.target.value)}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>
          <div className="md:col-span-3 mt-2">
            <button
              onClick={save}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 inline-block mr-2" /> Save & Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Student Mode Components ----------
function StudentMode({ profile, reduceMotion }) {
  const classNamesList = Object.keys(UK_CLASSES);
  const [klass, setKlass] = useState(classNamesList[0]);
  const [subject, setSubject] = useState(UK_CLASSES[classNamesList[0]].subjects[0]);
  const [question, setQuestion] = useState("");
  const [progress, setProgress] = useState(0);
  const [explain, setExplain] = useState("");

  useEffect(() => {
    setSubject(UK_CLASSES[klass].subjects[0]);
    setExplain("");
    setProgress(0);
  }, [klass]);

  async function ask() {
    const goal = (UK_CLASSES[klass].objectives[subject] || [])[0] || "Understand the topic";
    const raw = await demoAnswer(`(${profile.tone} tone, ${profile.pace} pace) ${subject}: ${question}. Learning goal: ${goal}`);
    setExplain(transformExplanation(raw, profile.style));
    setProgress(p => Math.min(100, p + 40));
    setQuestion("");
  }

  return (
    <section className="mt-6 grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="pb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5" /> Student – Class & Subject
            </h2>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <div className="text-sm font-medium">Class</div>
                <select
                  className="w-full border rounded-lg px-2 py-2 bg-transparent dark:bg-gray-700 mt-1"
                  value={klass}
                  onChange={e => setKlass(e.target.value)}
                >
                  {classNamesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <div className="text-sm font-medium">Subject</div>
                <select
                  className="w-full border rounded-lg px-2 py-2 bg-transparent dark:bg-gray-700 mt-1"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                >
                  {UK_CLASSES[klass].subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-600">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={`Ask a ${subject} question`}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
              <button
                onClick={ask}
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                <Sparkles className="h-4 w-4 inline-block mr-1" /> Explain
              </button>
            </div>
            {explain && (
              <pre className={cx(
                "whitespace-pre-wrap text-sm border rounded-lg p-3 bg-gray-100 dark:bg-gray-700",
                reduceMotion ? "" : "animate-in fade-in duration-300"
              )}>
                {explain}
              </pre>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="pb-2">
            <h3 className="text-xl font-bold">Tips</h3>
          </div>
          <div className="text-sm opacity-80">
            Switch class/subject, ask follow‑ups, and try again until it makes sense. The aim is your understanding, not dependence on AI.
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Professional Mode Components ----------
function ProfessionalMode({ profile }) {
  return (
    <section className="mt-6 grid gap-6 md:grid-cols-2">
      <ATSTailor profile={profile} />
      <JobSearchDemo />
    </section>
  );
}

function ATSTailor({ profile }) {
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  
  function tailor() {
    const { score, top } = scoreCVvsJD(cv, jd);
    setScore(score);
    setSuggestions(top);
  }

  function renderATS() {
    const lines = cv.split(/\\n+/).map(l => l.trim()).filter(Boolean);
    return lines.map(l => {
      const hit = suggestions.find(k => l.toLowerCase().includes(k));
      return hit ? `• ${l} — (${hit})` : `• ${l}`;
    }).join("\\n");
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="pb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5" /> CV → ATS Tailoring
        </h2>
      </div>
      <div className="space-y-3">
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-36 resize-y"
          placeholder="Paste your CV (text)"
          value={cv}
          onChange={e => setCv(e.target.value)}
        />
        <textarea
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-28 resize-y"
          placeholder="Paste Job Description"
          value={jd}
          onChange={e => setJd(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={tailor}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4 inline-block mr-2" /> Tailor
          </button>
          {score != null && (
            <div className="flex items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto">
              <span className="text-sm">Match:</span>
              <div className="w-full sm:w-40 h-2 rounded-full bg-gray-200 dark:bg-gray-600">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-300" style={{ width: `${score}%` }}></div>
              </div>
              <span className="text-sm font-medium">{score}%</span>
            </div>
          )}
        </div>
        {score != null && (
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="text-sm font-medium mb-1">Top JD keywords</div>
              <div className="flex flex-wrap gap-1">
                {suggestions.slice(0, 10).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">ATS‑ready bullets</div>
              <pre className="text-xs whitespace-pre-wrap border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-100 dark:bg-gray-700">{renderATS()}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function JobSearchDemo() {
  const [keyword, setKeyword] = useState("data analyst");
  const [location, setLocation] = useState("UK");
  const [jobs, setJobs] = useState([]);

  // Demo: client‑side fake results.
  function search() {
    const sample = [
      { title: "Graduate Data Analyst", company: "NHS Trust", where: "London", link: "#" },
      { title: "Junior BI Analyst", company: "RetailCo", where: "Manchester", link: "#" },
      { title: "Operations Analyst", company: "Gov Dept", where: "Leeds", link: "#" },
    ];
    const k = keyword.toLowerCase();
    const l = location.toLowerCase();
    setJobs(
      sample.filter(j =>
        j.title.toLowerCase().includes(k) || j.company.toLowerCase().includes(k)
      ).filter(j =>
        l === "uk" || j.where.toLowerCase().includes(l)
      )
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="pb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-5 w-5" /> Job Search (demo)
        </h2>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Keyword"
            className="sm:col-span-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <button
            onClick={search}
            className="col-span-1 sm:col-span-3 bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </div>
        <div className="space-y-2">
          {jobs.map((j, i) => (
            <div key={i} className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
              <div className="font-medium">{j.title}</div>
              <div className="text-sm opacity-80">{j.company} — {j.where}</div>
              <a className="text-sm underline text-purple-600" href={j.link} target="_blank" rel="noreferrer">
                View
              </a>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className="text-sm opacity-70">
              Try a search to see demo results. In production, connect to an open API via your backend.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Hobbyist Component ----------
function HobbyMode({ profile }) {
  const [q, setQ] = useState("");
  const [log, setLog] = useState([{ who: "bot", text: "Hi! What are you curious about today?" }]);

  async function send() {
    const a = await demoAnswer(`(${profile.tone} tone, ${profile.pace} pace) ${q}`);
    setLog(l => [...l, { who: "you", text: q }, { who: "bot", text: a }]);
    setQ("");
  }

  return (
    <section className="mt-6 grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="pb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessagesSquare className="h-5 w-5" /> Hobbyist – Free Chat
            </h2>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ask anything"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                value={q}
                onChange={e => setQ(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
              />
              <button
                onClick={send}
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                Send
              </button>
            </div>
            <div className="mt-3 space-y-2 max-h-80 overflow-y-auto p-2">
              {log.map((m, i) => (
                <div
                  key={i}
                  className={cx(
                    "text-sm p-3 rounded-lg",
                    m.who === "you"
                      ? "bg-purple-100 dark:bg-purple-900/30 self-end"
                      : "bg-green-100 dark:bg-green-900/30"
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="pb-2">
            <h3 className="text-xl font-bold">Micro‑lesson</h3>
          </div>
          <div className="text-sm opacity-90">
            Hook this to your content pipeline to auto‑generate 90‑second mini lessons with a quick quiz.
          </div>
        </div>
      </div>
    </section>
  );
}

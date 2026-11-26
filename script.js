"use strict";

const GOOGLE_FORM = {

  formResponseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdgMjBpqzvsjHVNIy4F47AckWY_SuMSi_0OFe2f6TfqXhlR7g/formResponse",

  entries: {
    usesAi:      "entry.1929647538",   
    aiExamples:  "entry.910082531",   
    awareness:   "entry.401084156",   
    aspirations: "entry.1729711572",   
    concerns:    "entry.1391207267",   
    involvement: "entry.51103094",   
    feedback:    "entry.256561035",   
    trust:       "entry.2056650839",   
    version:     ""
  },

  multiSelectSeparator: "; ",
  timeoutMs: 15000
};

const QUESTIONNAIRE_VERSION = "v1";


const SHOW_EXAMPLES_TO_PEOPLE_WHO_SAID_NO = true;

const EXPLAINER = {
  title: "A quick introduction to the AI Growth Zone",
  intro: "So that everyone starts from the same place, here’s a short summary. We’re not asking you to agree or disagree with it.",
  paragraphs: [
    "PLACEHOLDER – replace this with verified, factual explanation of the North East AI Growth Zone"
  ],
  sourceNote: "" // Optional: e.g. "Source: UK Government, January 2025".
};

// Text shown on the thank-you screen.
const THANK_YOU = {
  sent:   "Your answers have been sent. We really appreciate you taking the time to share your views.",
  test:   "This was a test run in preview mode, so nothing was sent or saved. Once you connect your Google Form, real answers will be sent.",
  // Optional extra paragraph, e.g. what happens next. Only add statements that are true.
  extra:  ""
};

const NOT_SURE = { label: "Not sure", exclusive: true };

const SCREENS = [

  {
    id: "usesAi",
    type: "single",
    accent: "blue",
    title: "Do you use AI in your day-to-day life?",
    hint: "Think about your phone, apps, websites and gadgets. There’s no right answer.",
    options: [
      { label: "Yes" },
      { label: "No" },
      { label: "Not sure" }
    ]
  },

  /* ---- Q1b: which tools (shown to everyone unless switched off) --- */
  {
    id: "aiExamples",
    type: "multi",
    accent: "teal",
    title: "Which of these do you use?",
    // The hint changes depending on the answer to Q1, so nobody feels tested.
    hint: (answers) => {
      if (answers.usesAi === "No") {
        return "Lots of everyday tools use AI behind the scenes without us noticing. Do any of these ring a bell? Choose as many as you like.";
      }
      if (answers.usesAi === "Not sure") {
        return "Not sure? These everyday examples might help. Choose any that you use.";
      }
      return "Choose as many as you like. Some of these might surprise you, as AI is often hidden inside everyday tools.";
    },
    showIf: (answers) => SHOW_EXAMPLES_TO_PEOPLE_WHO_SAID_NO || answers.usesAi !== "No",
    options: [
      { icon: "🎙️", label: "Voice assistants",                          hint: "Such as Siri or Alexa" },
      { icon: "🗺️", label: "Sat-nav and traffic prediction",            hint: "Apps that predict traffic and suggest the quickest route" },
      { icon: "🎬", label: "Streaming or shopping recommendations",     hint: "The “you might also like…” suggestions" },
      { icon: "🌡️", label: "Smart thermostats or home devices",         hint: "Heating or gadgets that learn your routine" },
      { icon: "📷", label: "AI-powered photo editing",                  hint: "Phone or app tools that enhance, tidy up or change photos" },
      { icon: "💬", label: "Chatbots or AI assistants",                 hint: "Tools you can chat or ask questions to, online or in apps" },
      { icon: "✍️", label: "Predictive text, autocorrect or smart email features", hint: "Suggested words, spelling fixes or reply suggestions" },
      { icon: "➕", label: "Other", allowText: true, textLabel: "What else do you use?" },
      { icon: "🚫", label: "None of these", exclusive: true },
      { icon: "🤷", label: "Not sure",      exclusive: true }
    ]
  },

  {
    id: "awareness",
    type: "single",
    accent: "purple",
    title: "Before today, had you heard of the North East AI Growth Zone?",
    hint: "No problem either way. We’re just keen to know where people are starting from.",
    options: [
      { label: "Yes" },
      { label: "No" },
      { label: "Not sure" }
    ]
  },

  /* ---- Short explanation: only for people who haven't heard of it ------- */
  {
    id: "explainer",
    type: "info",
    accent: "green",
    countsAsQuestion: false,           // not counted as a "question" in the progress bar
    title: EXPLAINER.title,
    showIf: (answers) => answers.awareness === "No" || answers.awareness === "Not sure"
  },

  {
    id: "aspirations",
    type: "text",
    accent: "orange",
    title: "Imagine it’s five years from now and the AI Growth Zone has gone well for your family. What’s different?",
    hint: "Take your time. A few words or a few paragraphs, whatever feels right. Please don’t include names or personal details.",
    placeholder: "Type your thoughts here…",
    maxLength: 1500
  },

  {
    id: "concerns",
    type: "multi",
    accent: "blue",
    title: "What, if anything, worries you about AI being used in the North East?",
    hint: "Choose as many as you like.",
    options: [
      { label: "Jobs and employment" },
      { label: "Privacy and personal data" },
      { label: "Fairness, discrimination or inequality" },
      { label: "Energy use, water use or environmental impacts" },
      { label: "Cost of living or energy bills" },
      { label: "I don’t have any concerns", exclusive: true },
      { label: "Something else", allowText: true, textLabel: "What else worries you?" },
      { label: "Not sure", exclusive: true }
    ]
  },

  {
    id: "involvement",
    type: "multi",
    accent: "teal",
    title: "If a data centre were proposed near you, how would you like to be involved?",
    hint: "Choose as many as you like.",
    options: [
      { label: "Being kept informed about proposals",           hint: "Clear, plain-English updates as plans develop" },
      { label: "Receiving information about the likely impacts", hint: "For example jobs, noise, traffic, energy and water use" },
      { label: "Attending local consultation events",           hint: "Drop-ins, public meetings or exhibitions" },
      { label: "Speaking directly with the people planning it" },
      { label: "Submitting feedback on the proposals",          hint: "In writing or online" },
      { label: "Taking part in local decision-making",          hint: "For example through a community panel" },
      { label: "Other", allowText: true, textLabel: "How else would you like to be involved?" },
      { label: "I wouldn’t want to be involved", exclusive: true },
      { label: "Not sure", exclusive: true }
    ]
  },

  {
    id: "feedback",
    type: "multi",
    accent: "purple",
    title: "How would you prefer to give feedback about the AI Growth Zone?",
    hint: "Choose as many as you like.",
    options: [
      { label: "Online questionnaire" },
      { label: "Conversational AI chatbot" },
      { label: "Telephone interview with a researcher" },
      { label: "In-person discussion" },
      { label: "Focus group",       hint: "A small group conversation with other local people" },
      { label: "Written feedback",  hint: "For example a letter or an email" },
      { label: "Other", allowText: true, textLabel: "How would you like to give feedback?" }
    ]
  },

  {
    id: "trust",
    type: "scale",
    accent: "green",
    title: "If you gave your views on how Growth Zone money is spent, how much would you trust the North East Mayoral Strategic Authority to take them into account?",
    hint: "Choose a number from 0 to 10. There’s no right or wrong answer.",
    lowLabel:  "0 = No trust at all",
    highLabel: "10 = Complete trust",
    lowSrText:  "no trust at all",
    highSrText: "complete trust",
    notSure: NOT_SURE
  }
];


/* ---------- 4.1  Remembered state --------------------------------------- */
// Everything the person has chosen is kept in this object, in local memory only until sent.
const state = {
  current: "intro",    // which screen is showing
  answers: {},         // e.g. { usesAi: "Yes", concerns: ["Jobs and employment"], ... }
  completed: false,    // true after a response has been sent
  sending: false,      // true while sending (prevents double-clicks)
  lastPreviewPayload: null
};

// Quick shortcuts to parts of the page.
const $ = (id) => document.getElementById(id);
const dom = {
  intro: $("screen-intro"),
  form: $("questionnaire"),
  done: $("screen-done"),
  host: $("step-host"),
  start: $("start-button"),
  back: $("back-button"),
  next: $("next-button"),
  progressWrap: $("progress-wrap"),
  progressLabel: $("progress-label"),
  progressBar: $("progress-bar"),
  progressFill: $("progress-fill"),
  status: $("form-status"),
  error: $("form-error"),
  honeypot: $("website"),
  testBanner: $("test-banner"),
  doneTitle: $("done-title"),
  doneMessage: $("done-message"),
  debugBox: $("debug-box"),
  debugOutput: $("debug-output"),
  restart: $("restart-button"),
  logo: $("brand-logo")
};

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value === null || value === undefined) continue;
    if (key === "text") node.textContent = value;
    else node.setAttribute(key, value === true ? "" : value);
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child);
  }
  return node;
}

const CHECK_SVG = () => {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", "m5 12.5 4.5 4.5L19 7.5");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "3.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.append(path);
  return svg;
};

// "Branching": some screens only appear for some answers (see showIf above).
function getPath() {
  return SCREENS.filter((screen) => !screen.showIf || screen.showIf(state.answers));
}
function getScreen(id) {
  return SCREENS.find((s) => s.id === id);
}
function isQuestion(screen) {
  return screen.countsAsQuestion !== false;
}
function resolveText(value) {
  return typeof value === "function" ? value(state.answers) : value;
}

function renderScreen(screen) {
  const headingId = `${screen.id}-title`;
  const hintId = `${screen.id}-hint`;

  const heading = el("h2", { id: headingId, class: "step__title", tabindex: "-1", text: screen.title });
  const hintText = resolveText(screen.hint);
  const hint = hintText ? el("p", { id: hintId, class: "step__hint", text: hintText }) : null;

  let body;
  if (screen.type === "single" || screen.type === "multi") body = renderChoices(screen, headingId, hint ? hintId : null);
  else if (screen.type === "text") body = renderTextBox(screen, headingId, hint ? hintId : null);
  else if (screen.type === "scale") body = renderScale(screen, headingId, hint ? hintId : null);
  else if (screen.type === "info") body = renderExplainer();

  dom.host.setAttribute("data-accent", screen.accent || "blue");
  dom.host.replaceChildren(el("div", { class: "step" }, heading, hint, body));
  syncOtherFields();
}

/* Pick-one and pick-several questions */
function renderChoices(screen, headingId, hintId) {
  const multi = screen.type === "multi";
  const saved = state.answers[screen.id];

  const list = el("div", {
    class: "options",
    role: multi ? "group" : "radiogroup",
    "aria-labelledby": headingId,
    "aria-describedby": hintId
  });

  screen.options.forEach((option, index) => {
    const inputId = `${screen.id}-option-${index}`;
    const isChecked = multi ? Array.isArray(saved) && saved.includes(option.label) : saved === option.label;

    const input = el("input", {
      type: multi ? "checkbox" : "radio",
      id: inputId,
      name: screen.id,
      value: option.label,
      "data-exclusive": option.exclusive ? "true" : false,
      "data-allow-text": option.allowText ? "true" : false
    });
    input.checked = isChecked;

    const box = el("span", { class: "option__box" },
      option.icon ? el("span", { class: "option__icon", "aria-hidden": "true", text: option.icon }) : null,
      el("span", { class: "option__text" },
        el("span", { class: "option__label", text: option.label }),
        option.hint ? el("span", { class: "option__hint", text: option.hint }) : null
      ),
      el("span", { class: "option__mark", "aria-hidden": "true" }, CHECK_SVG())
    );

    const wrap = el("div", { class: "option-wrap" },
      el("label", { class: multi ? "option option--multi" : "option" }, input, box)
    );

    // "Other" / "Something else": a small text box that appears when ticked.
    if (option.allowText) {
      const textId = `${screen.id}-other-text`;
      const textInput = el("input", {
        type: "text",
        id: textId,
        class: "text-input",
        maxlength: "200",
        autocomplete: "off",
        "data-other-for": screen.id
      });
      textInput.value = state.answers[`${screen.id}__text`] || "";
      wrap.append(
        el("div", { class: "other-field", "data-other-field": "true", hidden: true },
          el("label", { class: "other-field__label", for: textId, text: option.textLabel || "Please tell us more" }),
          textInput
        )
      );
    }
    list.append(wrap);
  });
  return list;
}

/* Open writing box */
function renderTextBox(screen, headingId, hintId) {
  const counterId = `${screen.id}-counter`;
  const area = el("textarea", {
    id: `${screen.id}-textarea`,
    class: "textarea",
    rows: "7",
    maxlength: String(screen.maxLength || 1500),
    placeholder: screen.placeholder || "",
    "aria-labelledby": headingId,
    "aria-describedby": [hintId, counterId].filter(Boolean).join(" ")
  });
  area.value = state.answers[screen.id] || "";
  const counter = el("p", { id: counterId, class: "counter", "aria-hidden": "true" });
  const update = () => { counter.textContent = `${area.value.length} / ${area.maxLength}`; };
  area.addEventListener("input", update);
  update();
  return el("div", {}, area, counter);
}

/* 0–10 scale plus "Not sure" */
function renderScale(screen, headingId, hintId) {
  const saved = state.answers[screen.id];
  const wrap = el("div", {
    class: "scale-group",
    role: "radiogroup",
    "aria-labelledby": headingId,
    "aria-describedby": hintId
  });

  const scale = el("div", { class: "scale" });
  for (let n = 0; n <= 10; n++) {
    const value = String(n);
    const input = el("input", { type: "radio", name: screen.id, id: `${screen.id}-${n}`, value });
    input.checked = saved === value;
    const srExtra = n === 0 ? `, ${screen.lowSrText}` : n === 10 ? `, ${screen.highSrText}` : "";
    scale.append(
      el("label", { class: "scale__item" }, input,
        el("span", { class: "scale__num" }, value, srExtra ? el("span", { class: "sr-only", text: srExtra }) : null)
      )
    );
  }

  const ends = el("div", { class: "scale__ends", "aria-hidden": "true" },
    el("span", { text: screen.lowLabel }),
    el("span", { text: screen.highLabel })
  );

  // "Not sure" is in the SAME radio group, so choosing it un-selects any number.
  const notSureInput = el("input", { type: "radio", name: screen.id, id: `${screen.id}-notsure`, value: screen.notSure.label });
  notSureInput.checked = saved === screen.notSure.label;
  const notSure = el("div", { class: "option-wrap" },
    el("label", { class: "option" }, notSureInput,
      el("span", { class: "option__box" },
        el("span", { class: "option__text" }, el("span", { class: "option__label", text: screen.notSure.label })),
        el("span", { class: "option__mark", "aria-hidden": "true" }, CHECK_SVG())
      )
    )
  );

  wrap.append(scale, ends, notSure);
  return wrap;
}

/* The short "what is the AI Growth Zone?" screen */
function renderExplainer() {
  const isPlaceholder = EXPLAINER.paragraphs.some((p) => p.trim().toUpperCase().startsWith("PLACEHOLDER"));
  return el("div", {},
    isPlaceholder
      ? el("div", { class: "editor-note", role: "note" },
          el("strong", { text: "Editor note: " }),
          "this screen still contains placeholder text. Replace it with your verified explanation in script.js (EXPLAINER) before you share the questionnaire.")
      : null,
    EXPLAINER.intro ? el("p", { class: "step__hint", text: EXPLAINER.intro }) : null,
    EXPLAINER.paragraphs.map((text) => el("p", { class: "step__paragraph", text })),
    EXPLAINER.sourceNote ? el("p", { class: "step__hint", text: EXPLAINER.sourceNote }) : null
  );
}

dom.host.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  const screen = getScreen(state.current);
  if (!screen) return;

  if (screen.type === "single" || screen.type === "scale") {
    state.answers[screen.id] = input.value;
  }

  if (screen.type === "multi" && input.type === "checkbox") {
    // EXCLUSIVE OPTIONS: "None of these" / "Not sure" can't be combined with others.
    if (input.checked) {
      const pickedIsExclusive = input.dataset.exclusive === "true";
      dom.host.querySelectorAll('input[type="checkbox"]').forEach((other) => {
        if (other === input) return;
        if (pickedIsExclusive) other.checked = false;                              // exclusive clears the rest
        else if (other.dataset.exclusive === "true") other.checked = false;        // normal choice clears exclusives
      });
    }
    state.answers[screen.id] = Array.from(dom.host.querySelectorAll('input[type="checkbox"]:checked')).map((c) => c.value);
    syncOtherFields();
  }
  refreshControls();
});

dom.host.addEventListener("input", (event) => {
  const input = event.target;
  const screen = getScreen(state.current);
  if (!screen) return;
  if (input.tagName === "TEXTAREA") state.answers[screen.id] = input.value;
  if (input.dataset && input.dataset.otherFor) state.answers[`${input.dataset.otherFor}__text`] = input.value;
  refreshControls();
});

// Show the "please tell us more" box only while its option is ticked.
function syncOtherFields() {
  dom.host.querySelectorAll(".option-wrap").forEach((wrap) => {
    const checkbox = wrap.querySelector('input[data-allow-text="true"]');
    const field = wrap.querySelector("[data-other-field]");
    if (checkbox && field) field.hidden = !checkbox.checked;
  });
}

function hasAnswer(screen) {
  const value = state.answers[screen.id];
  if (screen.type === "multi") return Array.isArray(value) && value.length > 0;
  if (screen.type === "text") return typeof value === "string" && value.trim() !== "";
  if (screen.type === "info") return true;
  return value !== undefined && value !== null && value !== "";
}

function refreshControls() {
  const path = getPath();
  const screen = getScreen(state.current);
  if (!screen) return;

  const questions = path.filter(isQuestion);
  const total = questions.length;
  // Number of the current question; for the explainer, the number of questions already done.
  const position = isQuestion(screen)
    ? questions.indexOf(screen) + 1
    : path.slice(0, path.indexOf(screen)).filter(isQuestion).length;

  let label;
  if (!isQuestion(screen)) label = "A quick introduction";
  else {
    label = `Question ${position} of ${total}`;
    if (position === total) label += " · Last question";
    else if (position / total >= 0.7) label += " · Nearly there";
  }
  dom.progressLabel.textContent = label;
  dom.progressFill.style.width = `${Math.round((position / total) * 100)}%`;
  dom.progressBar.setAttribute("aria-valuemax", String(total));
  dom.progressBar.setAttribute("aria-valuenow", String(position));
  dom.progressBar.setAttribute("aria-valuetext", label);

  // Button text: "Skip" if nothing chosen yet, "Next" once they have, "Send" at the end.
  const isLast = path[path.length - 1] === screen;
  if (state.sending) return;
  if (isLast) dom.next.textContent = "Send my answers";
  else if (screen.type === "info") dom.next.textContent = "Continue";
  else dom.next.textContent = hasAnswer(screen) ? "Next" : "Skip";
}

function showScreen(id, { push = true } = {}) {
  // Safety rules for odd cases (e.g. browser Back after finishing).
  if (id === "done" && !state.completed) id = "intro";
  if (state.completed && id !== "done" && id !== "intro") id = "done";
  const target = getScreen(id);
  if (target && !getPath().includes(target)) {
    const earlier = SCREENS.slice(0, SCREENS.indexOf(target)).reverse().find((s) => getPath().includes(s));
    id = earlier ? earlier.id : "intro";
  }

  state.current = id;
  dom.error.hidden = true;
  dom.status.textContent = "";

  dom.intro.hidden = id !== "intro";
  dom.form.hidden = id === "intro" || id === "done";
  dom.done.hidden = id !== "done";
  dom.progressWrap.hidden = id === "intro" || id === "done";

  let headingToFocus;
  if (id === "intro") headingToFocus = $("intro-title");
  else if (id === "done") headingToFocus = dom.doneTitle;
  else {
    renderScreen(getScreen(id));
    refreshControls();
    headingToFocus = dom.host.querySelector(".step__title");
  }

  if (push) {
    const index = ((history.state && history.state.index) || 0) + 1;
    try { history.pushState({ id, index }, "", id === "intro" ? location.pathname + location.search : `#${id}`); } catch (e) { /* ignore */ }
  }

  window.scrollTo({ top: 0, behavior: "instant" });   // jump straight to the top of the new screen
  if (headingToFocus) headingToFocus.focus({ preventScroll: true });
}

window.addEventListener("popstate", (event) => {
  const id = (event.state && event.state.id) || "intro";
  showScreen(id, { push: false });
});

function goNext() {
  const path = getPath();
  const position = path.findIndex((s) => s.id === state.current);
  const next = path[position + 1];
  if (next) showScreen(next.id);
  else finish();
}

function goBack() {
  if (state.sending) return;
  const path = getPath();
  const position = path.findIndex((s) => s.id === state.current);
  const previous = position > 0 ? path[position - 1].id : "intro";
  // Use the real browser history when possible so the stack stays tidy.
  if (history.state && history.state.index > 0) history.back();
  else showScreen(previous, { push: false });
}

function cleanFormUrl(url) {
  return String(url || "").trim().replace(/\/viewform.*$/i, "/formResponse").replace(/\?.*$/, "");
}
function cleanEntryId(value) {
  const v = String(value || "").trim();
  return /^\d+$/.test(v) ? `entry.${v}` : v;
}

// Is Section 1 filled in properly? Returns a list of problems (empty = all good).
function getConfigProblems() {
  const problems = [];
  if (!/^https:\/\/docs\.google\.com\/forms\/d\/e\/[A-Za-z0-9_-]+\/formResponse$/.test(cleanFormUrl(GOOGLE_FORM.formResponseUrl))) {
    problems.push("formResponseUrl is not set (or is not a valid Google Forms /formResponse address).");
  }
  SCREENS.filter((s) => s.type !== "info").forEach((screen) => {
    if (!/^entry\.\d+$/.test(cleanEntryId(GOOGLE_FORM.entries[screen.id]))) {
      problems.push(`entries.${screen.id} is not set (should look like entry.1234567890).`);
    }
  });
  if (GOOGLE_FORM.entries.version && !/^entry\.\d+$/.test(cleanEntryId(GOOGLE_FORM.entries.version))) {
    problems.push("entries.version is set but is not a valid entry ID. Leave it as \"\" if unused.");
  }
  return problems;
}
const isConfigured = () => getConfigProblems().length === 0;

function findOption(screen, label) {
  return (screen.options || []).find((o) => o.label === label);
}

// Turn the stored answers into one tidy piece of text per question.
// Only screens that apply to this person are included (so stale answers from
// a path they changed their mind about are dropped).
function buildPayload() {
  const payload = {};
  for (const screen of getPath()) {
    if (screen.type === "info") continue;
    const value = state.answers[screen.id];
    let text = "";

    if (screen.type === "multi") {
      const picked = Array.isArray(value) ? value : [];
      text = picked.map((label) => {
        const option = findOption(screen, label);
        const extra = option && option.allowText ? (state.answers[`${screen.id}__text`] || "").trim() : "";
        return extra ? `${label}: ${extra}` : label;
      }).join(GOOGLE_FORM.multiSelectSeparator);
    } else if (typeof value === "string") {
      text = value.trim();
    }
    if (text !== "") payload[screen.id] = text;
  }
  if (GOOGLE_FORM.entries.version) payload.version = QUESTIONNAIRE_VERSION;
  return payload;
}

async function sendToGoogle(payload) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    body.append(cleanEntryId(GOOGLE_FORM.entries[key]), value);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GOOGLE_FORM.timeoutMs);
  try {
    // "no-cors" is how a website talks to Google Forms: the browser sends the
    // answers but is NOT allowed to read Google's reply. So if this line finishes
    // without an error, Google's server DID answer, but we can't see whether it
    // accepted the answers. 
    await fetch(cleanFormUrl(GOOGLE_FORM.formResponseUrl), {
      method: "POST",
      mode: "no-cors",
      credentials: "omit",
      cache: "no-store",
      referrerPolicy: "no-referrer",
      body,
      signal: controller.signal
    });
    return true;
  } catch (error) {
    return false;   // offline, blocked, or too slow
  } finally {
    clearTimeout(timer);
  }
}

async function finish() {
  if (state.sending) return;

  // Spam trap: if the hidden field was filled in, a robot did it. Pretend all is well.
  if (dom.honeypot.value.trim() !== "") {
    state.completed = true;
    state.answers = {};
    showScreen("done");
    renderDone("sent", null);
    return;
  }

  const payload = buildPayload();

  // PREVIEW MODE: don't send anything; just show what would have been sent.
  if (!isConfigured()) {
    state.completed = true;
    state.answers = {};
    showScreen("done");
    renderDone("test", payload);
    return;
  }

  state.sending = true;
  dom.error.hidden = true;
  dom.next.disabled = true;
  dom.back.disabled = true;
  dom.next.textContent = "Sending…";
  dom.status.textContent = "Sending your answers…";

  const ok = await sendToGoogle(payload);

  state.sending = false;
  dom.next.disabled = false;
  dom.back.disabled = false;
  dom.status.textContent = "";

  if (ok) {
    state.completed = true;
    state.answers = {};      // clear answers from memory (helpful on shared devices)
    showScreen("done");
    renderDone("sent", null);
  } else {
    dom.next.textContent = "Try again";
    dom.error.hidden = false;
    dom.error.replaceChildren(
      el("p", {}, el("strong", { text: "We couldn’t confirm that your answers were sent." })),
      el("p", { text: "Please check your internet connection and press “Try again”. Your answers are still here, so nothing has been lost." })
    );
  }
}

function renderDone(kind, payload) {
  dom.doneMessage.textContent = kind === "test" ? THANK_YOU.test : THANK_YOU.sent;
  const existingExtra = document.getElementById("done-extra");
  if (existingExtra) existingExtra.remove();
  if (THANK_YOU.extra && kind === "sent") {
    dom.doneMessage.insertAdjacentElement("afterend", el("p", { id: "done-extra", class: "step__hint", text: THANK_YOU.extra }));
  }
  if (kind === "test" && payload) {
    const lines = Object.entries(payload).map(([key, value]) => `${GOOGLE_FORM.entries[key] || key}  (${key}):\n   ${value}`);
    dom.debugOutput.textContent = lines.join("\n\n") || "(no answers given)";
    dom.debugBox.hidden = false;
  } else {
    dom.debugBox.hidden = true;
    dom.debugOutput.textContent = "";
  }
}

dom.start.addEventListener("click", () => {
  state.answers = {};
  state.completed = false;
  dom.honeypot.value = "";
  showScreen(getPath()[0].id);
});

dom.form.addEventListener("submit", (event) => {
  event.preventDefault();       // stops the page reloading
  if (!state.sending) goNext(); 
});

dom.back.addEventListener("click", goBack);

dom.restart.addEventListener("click", () => {
  state.answers = {};
  state.completed = false;
  showScreen("intro");
});

// Warn before accidentally leaving with unsent answers (e.g. refreshing the page).
window.addEventListener("beforeunload", (event) => {
  if (!state.completed && state.current !== "intro" && Object.keys(state.answers).length > 0) {
    event.preventDefault();
    event.returnValue = "";
  }
});

(function setupLogo() {
  const logo = dom.logo;
  if (!logo) return;
  const show = () => { if (logo.naturalWidth > 0) { logo.hidden = false; } };
  logo.addEventListener("load", show);
  if (logo.complete) show();
})();

// Start-up checks
(function init() {
  try { history.replaceState({ id: "intro", index: 0 }, "", location.pathname + location.search); } catch (e) { /* ignore */ }

  const problems = getConfigProblems();
  if (problems.length > 0) {
    dom.testBanner.hidden = false;
    console.info("[Questionnaire] Preview mode – Google Form not fully connected:\n - " + problems.join("\n - "));
  }
})();
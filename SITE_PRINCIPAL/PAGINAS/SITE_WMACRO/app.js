// ============================================================
// QUICKMACRO — app.js v2.0.0
// Architecture: Dashboard (stats only) | Editor (full page)
// ============================================================

// --- CONSTANTS & DEMO SEED DATA ---
const DEFAULT_CATEGORIES = [];

const DEFAULT_VARIABLES = [
  {
    name: "saudacao",
    type: "temporal",
    color: "#3b82f6",
    rules: [
      { val: "Bom dia", start: "00:00", end: "12:00" },
      { val: "Boa tarde", start: "12:01", end: "18:00" },
      { val: "Boa noite", start: "18:01", end: "23:59" },
    ],
  },
  { name: "Nome do Cliente", type: "static", color: "#10b981", defaultVal: "Nome do Cliente" },
];

const DEFAULT_MACROS = [];

const EMOJI_CATEGORIES = {
  smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
  ],
  people: [
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👍",
    "👎",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "👏",
    "🙌",
    "👐",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💅",
    "🤳",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "👂",
    "🦻",
    "👃",
    "🧠",
    "🦷",
    "🦴",
    "👀",
    "👁️",
    "👅",
    "👄",
    "💋",
    "🩸",
  ],
  nature: [
    "🌲",
    "🌳",
    "🌴",
    "🌵",
    "🌾",
    "🌿",
    "🍀",
    "🍁",
    "🍂",
    "🍃",
    "🍄",
    "🐚",
    "🌻",
    "🌼",
    "🌷",
    "🌱",
    "🌹",
    "🥀",
    "🌺",
    "🌸",
    "💮",
    "🦄",
    "🦁",
    "🐯",
    "🐆",
    "🐱",
    "🐶",
    "🐺",
    "🐻",
    "🐨",
    "🐼",
    "🐭",
    "🐰",
    "🦊",
    "🦝",
    "🐮",
    "🐷",
    "🐗",
    "🐵",
    "🐒",
    "🦍",
    "🦧",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🦅",
    "🦆",
    "🦢",
    "🦉",
    "🦚",
    "🦜",
    "🐊",
    "🐢",
    "🦎",
    "🐍",
    "🐲",
    "🐙",
    "🦑",
    "🦞",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
  ],
  food: [
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🍳",
    "🥘",
    "🍲",
    "🥣",
    "🥗",
    "🍿",
    "🧈",
    "🧂",
    "🥫",
    "🍱",
    "🍘",
    "🍙",
    "🍚",
    "🍛",
    "🍜",
    "🍝",
    "🍠",
    "🍢",
    "🍣",
    "🍤",
    "🍥",
    "🍡",
    "🥟",
    "🥠",
    "🥡",
    "🍦",
    "🍧",
    "🍨",
    "🍩",
    "🍪",
    "🎂",
    "🍰",
    "🧁",
    "🥧",
    "🍫",
    "🍬",
    "🍭",
    "🍮",
    "🍯",
    "🍼",
    "🥛",
    "☕",
    "🍵",
    "🍶",
    "🍾",
    "🍷",
    "🍸",
    "🍹",
    "🍺",
    "🍻",
    "🥂",
    "🥃",
  ],
  activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
    "🎱",
    "🪀",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥍",
    "🏏",
    "🥅",
    "⛳",
    "🪁",
    "🏹",
    "🎣",
    "🤿",
    "🥊",
    "🥋",
    "🎽",
    "🛹",
    "🛷",
    "⛸️",
    "🥌",
    "🎿",
    "⛷️",
    "🏂",
    "🏋️",
    "🤼",
    "🤸",
    "⛹️",
    "🧘",
    "🏄",
    "🏊",
    "🤽",
    "🚣",
    "🧗",
    "🚴",
    "🚵",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🎖️",
    "🎟️",
    "🎫",
    "🎬",
    "🎭",
    "🎨",
    "🎪",
    "🎤",
    "🎧",
    "🎼",
    "🎹",
    "🥁",
    "🎷",
    "🎺",
    "🎸",
    "🪕",
    "🎻",
    "🎲",
    "♟️",
    "🎯",
    "🎳",
    "🎮",
    "🎰",
    "🧩",
  ],
  travel: [
    "🚀",
    "🛸",
    "🚁",
    "🛩️",
    "✈️",
    "🛫",
    "🛬",
    "🪂",
    "🛰️",
    "🚂",
    "🚃",
    "🚄",
    "🚆",
    "🚇",
    "🚉",
    "🚌",
    "🚍",
    "🚎",
    "🚐",
    "🚑",
    "🚒",
    "🚓",
    "🚕",
    "🚗",
    "🚙",
    "🚚",
    "🚜",
    "🛵",
    "🚲",
    "🚨",
    "🚥",
    "🚦",
    "🛑",
    "🚧",
    "⚓",
    "⛵",
    "🛶",
    "🚤",
    "🚢",
  ],
  objects: [
    "💡",
    "🔦",
    "🕯️",
    "🪔",
    "🗑️",
    "🛢️",
    "💸",
    "💵",
    "💰",
    "💳",
    "💎",
    "⚖️",
    "🔧",
    "🪛",
    "🔨",
    "🛠️",
    "⚙️",
    "🛡️",
    "🔑",
    "🗝️",
    "🔫",
    "🧪",
    "🧫",
    "🔬",
    "🔭",
    "📡",
    "💉",
    "💊",
    "🩹",
    "🩺",
    "🚪",
    "🛏️",
    "🛋️",
    "🪑",
    "🚿",
    "🛁",
    "🧼",
    "🪥",
    "🧹",
    "🧺",
  ],
  symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉️",
    "✡️",
    "☯️",
    "🛐",
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
    "🔀",
    "🔁",
    "🔂",
    "▶️",
    "⏩",
    "⏭️",
    "⏯️",
    "◀️",
    "⏪",
    "🔼",
    "🔽",
    "⚠️",
    "⚡",
    "❌",
    "⭕",
    "🛑",
    "⛔",
    "🚫",
    "💯",
    "♨️",
    "🚳",
    "🔞",
    "🚸",
    "🚭",
  ],
};

const PILL_COLORS = [
  "pill-blue",
  "pill-orange",
  "pill-green",
  "pill-purple",
  "pill-pink",
];

// --- APP STATE ---
let state = {
  macros: [],
  categories: [],
  variables: [],
  activeTab: "dashboard",
  currentTheme: "dark",
  geminiApiKey: "",
  userProfile: null,
  macrosViewMode: localStorage.getItem("quickmacros_view_mode") || "grid",
};

// --- EDITOR HISTORY STATE (UNDO/REDO) ---
let editorHistory = [];
let editorHistoryIndex = -1;

// --- DOM REFERENCES ---
const el = {
  menuItems: document.querySelectorAll(".menu-item[data-tab]"),
  tabPanels: document.querySelectorAll(".tab-panel"),
  btnThemeToggle: document.getElementById("btn-theme-toggle"),
  themeIconLight: document.getElementById("theme-icon-light"),
  themeIconDark: document.getElementById("theme-icon-dark"),

  // Dashboard
  workspaceEmpty: document.getElementById("workspace-empty"),
  workspaceActive: document.getElementById("workspace-active"),
  statTotalMacros: document.getElementById("stat-total-macros"),
  statTotalCopies: document.getElementById("stat-total-copies"),
  statTotalCategories: document.getElementById("stat-total-categories"),
  usageChartContainer: document.getElementById("usage-chart-container"),
  usageRankingContainer: document.getElementById("usage-ranking-container"),
  btnCreateFirstMacro: document.getElementById("btn-create-first-macro"),
  dashQuickCreate: document.getElementById("dash-quick-create"),

  // Editor tab
  modalTitle: document.getElementById("modal-title"),
  modalForm: document.getElementById("macro-form"),
  modalId: document.getElementById("macro-id"),
  modalName: document.getElementById("macro-name-input"),
  modalCategory: document.getElementById("macro-category-select"),
  modalDesc: document.getElementById("macro-desc-input"),
  editorContainer: document.getElementById("macro-editor-container"),
  btnCancelModal: document.getElementById("btn-cancel-modal"),
  btnEditorBack: document.getElementById("btn-editor-back"),

  // Editor toolbar
  fontFamilySelect: document.getElementById("editor-font-family"),
  fontSizeSelect: document.getElementById("editor-font-size"),
  btnTextColor: document.getElementById("btn-text-color"),
  colorPalettePopover: document.getElementById("color-palette-popover"),
  btnBold: document.getElementById("btn-bold"),
  btnItalic: document.getElementById("btn-italic"),
  btnUnderline: document.getElementById("btn-underline"),
  btnStrikethrough: document.getElementById("btn-strikethrough"),
  btnClearFormat: document.getElementById("btn-clear-format"),
  btnHighlightColor: document.getElementById("btn-highlight-color"),
  highlightPalettePopover: document.getElementById("highlight-palette-popover"),
  btnAlignLeft: document.getElementById("btn-align-left"),
  btnAlignCenter: document.getElementById("btn-align-center"),
  btnAlignRight: document.getElementById("btn-align-right"),
  btnListBullet: document.getElementById("btn-list-bullet"),
  btnListOrdered: document.getElementById("btn-list-ordered"),
  btnLinkInsert: document.getElementById("btn-link-insert"),
  btnEditorAddVar: document.getElementById("btn-editor-add-var"),
  btnEditorAi: document.getElementById("btn-editor-ai"),
  btnEditorImage: document.getElementById("btn-editor-image"),
  btnUndo: document.getElementById("btn-undo"),
  btnRedo: document.getElementById("btn-redo"),
  editorImageUpload: document.getElementById("editor-image-upload"),
  btnEditorEmoji: document.getElementById("btn-editor-emoji"),
  emojiPicker: document.getElementById("emoji-picker"),
  emojiGridContent: document.getElementById("emoji-grid-content"),
  helperVariablesList: document.getElementById("helper-variables-list"),
  btnGoToVariablesTab: document.getElementById("btn-go-to-variables-tab"),

  // Macros tab
  btnNewMacro: document.getElementById("btn-new-macro"),
  searchInput: document.getElementById("search-input"),
  macrosCategoryFilter: document.getElementById("macros-category-filter"),
  macroList: document.getElementById("macro-list"),
  emptySearchState: document.getElementById("empty-search-state"),

  // Variables tab
  varManagerForm: document.getElementById("variable-manager-form"),
  varNameInput: document.getElementById("var-name"),
  varTypeSelect: document.getElementById("var-type"),
  varStaticContainer: document.getElementById("var-static-container"),
  varDefaultValInput: document.getElementById("var-default-val"),
  varTemporalContainer: document.getElementById("var-temporal-container"),
  btnAddTaskRule: document.getElementById("btn-add-temporal-rule"),
  temporalRulesList: document.getElementById("temporal-rules-list"),
  tableVariablesBody: document.getElementById("table-variables-body"),
  varColorInput: document.getElementById("var-color"),
  categoryManagerForm: document.getElementById("category-manager-form"),
  catNameInput: document.getElementById("cat-name"),
  catColorInput: document.getElementById("cat-color"),
  listCategories: document.getElementById("list-categories"),

  // Variable Creation Modal
  modalNewVarOverlay: document.getElementById("modal-new-variable"),
  modalVarForm: document.getElementById("modal-variable-form"),
  modalVarName: document.getElementById("modal-var-name"),
  modalVarType: document.getElementById("modal-var-type"),
  modalVarStaticContainer: document.getElementById("modal-var-static-container"),
  modalVarDefaultVal: document.getElementById("modal-var-default-val"),
  modalVarTemporalContainer: document.getElementById("modal-var-temporal-container"),
  modalTemporalRulesList: document.getElementById("modal-temporal-rules-list"),
  btnModalAddTemporalRule: document.getElementById("btn-modal-add-temporal-rule"),
  modalVarColor: document.getElementById("modal-var-color"),
  modalVarColorHex: document.getElementById("modal-var-color-hex"),
  btnCloseVarModal: document.getElementById("btn-close-var-modal"),
  btnModalCancelVar: document.getElementById("btn-modal-cancel-var"),


  // Settings
  btnExportData: document.getElementById("btn-export-data"),
  btnImportTrigger: document.getElementById("btn-import-trigger"),
  importDataFile: document.getElementById("import-data-file"),
  btnResetData: document.getElementById("btn-reset-data"),
  settingsGeminiKey: document.getElementById("settings-gemini-key"),
  btnSaveGeminiKey: document.getElementById("btn-save-gemini-key"),

  // Toast
  toast: document.getElementById("toast-notification"),
  toastMessage: document.getElementById("toast-message"),

  // Prefill Page (replaces modal)
  prefillPageBadge: document.getElementById("prefill-page-badge"),
  prefillPageTitle: document.getElementById("prefill-page-title"),
  prefillFieldsContainer: document.getElementById("prefill-fields-container"),
  prefillNoVars: document.getElementById("prefill-no-vars"),
  prefillPreviewOutput: document.getElementById("prefill-preview-output"),
  btnPrefillBack: document.getElementById("btn-prefill-back"),
  btnPrefillCopy: document.getElementById("btn-prefill-copy"),
  btnPrefillCopyText: document.getElementById("btn-prefill-copy-text"),
  prefillCopyIcon: document.getElementById("prefill-copy-icon"),
  prefillCopyHint: document.getElementById("prefill-copy-hint"),
  btnPrefillCopyToLibrary: document.getElementById("btn-prefill-copy-to-library"),
  
  // Share Macros Modal
  btnShareMacrosModal: document.getElementById("btn-share-macros-modal"),
  modalShareMacros: document.getElementById("modal-share-macros"),
  shareModalList: document.getElementById("share-modal-list"),
  btnSaveShares: document.getElementById("btn-save-shares"),
  btnCancelShares: document.getElementById("btn-cancel-shares"),
  btnCloseShareModal: document.getElementById("btn-close-share-modal"),

  // View Mode & Features
  btnViewGrid: document.getElementById("btn-view-grid"),
  btnViewList: document.getElementById("btn-view-list"),
  editorAiTone: document.getElementById("editor-ai-tone"),
  teamLibSearchInput: document.getElementById("team-lib-search-input"),
  cloudSyncStatus: document.getElementById("cloud-sync-status"),
  syncStatusText: document.getElementById("sync-status-text"),
};

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  initEmojiPicker();
  setupEventListeners();
  applyTheme(state.currentTheme);
  renderMacrosList();
  renderConfigVariables();
  renderConfigCategories();
  renderCategoriesSelectors();
  renderMacrosCategoryFilterOptions();
  checkMacrosExistState();
  lucide.createIcons();
  initCustomSelects();

  el.varColorInput.value = getRandomColor(state.variables.map((v) => v.color));
  el.catColorInput.value = getRandomColor(state.categories.map((c) => c.color));

  const varHexLbl = el.varManagerForm.querySelector(".color-hex-label");
  if (varHexLbl) varHexLbl.textContent = el.varColorInput.value;
  const catHexLbl = el.categoryManagerForm.querySelector(".color-hex-label");
  if (catHexLbl) catHexLbl.textContent = el.catColorInput.value;
});

// =============================================
// EDITOR HISTORY (UNDO/REDO)
// =============================================
function saveEditorState() {
  const content = el.editorContainer.innerHTML;
  if (editorHistoryIndex >= 0 && editorHistory[editorHistoryIndex] === content) {
    return;
  }
  editorHistory = editorHistory.slice(0, editorHistoryIndex + 1);
  editorHistory.push(content);
  editorHistoryIndex = editorHistory.length - 1;
  updateUndoRedoButtons();
}

function undoEditor() {
  if (editorHistoryIndex > 0) {
    editorHistoryIndex--;
    el.editorContainer.innerHTML = editorHistory[editorHistoryIndex];
    updateUndoRedoButtons();
  }
}

function redoEditor() {
  if (editorHistoryIndex < editorHistory.length - 1) {
    editorHistoryIndex++;
    el.editorContainer.innerHTML = editorHistory[editorHistoryIndex];
    updateUndoRedoButtons();
  }
}

function updateUndoRedoButtons() {
  if (el.btnUndo) {
    el.btnUndo.disabled = (editorHistoryIndex <= 0);
  }
  if (el.btnRedo) {
    el.btnRedo.disabled = (editorHistoryIndex >= editorHistory.length - 1);
  }
}

// =============================================
// DATABASE
// =============================================
function initDatabase() {
  const localCats = localStorage.getItem("quickmacros_categories");
  state.categories = localCats
    ? JSON.parse(localCats)
    : [...DEFAULT_CATEGORIES];
  if (!localCats) saveData("quickmacros_categories", state.categories);

  const localVars = localStorage.getItem("quickmacros_variables");
  state.variables = localVars ? JSON.parse(localVars) : [...DEFAULT_VARIABLES];
  if (!localVars) saveData("quickmacros_variables", state.variables);

  const localMacros = localStorage.getItem("quickmacros_data");
  state.macros = localMacros ? JSON.parse(localMacros) : [...DEFAULT_MACROS];
  if (!localMacros) saveData("quickmacros_data", state.macros);

  const localTheme = localStorage.getItem("quickmacros_theme");
  state.currentTheme = localTheme || "dark";
  if (!localTheme) localStorage.setItem("quickmacros_theme", "dark");

  const localGeminiKey = localStorage.getItem("quickmacros_gemini_key");
  state.geminiApiKey = localGeminiKey !== null ? localGeminiKey : "";
  if (localGeminiKey === null) {
    localStorage.setItem("quickmacros_gemini_key", state.geminiApiKey);
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// =============================================
// NAVIGATION / TABS
// =============================================
// Tab IDs that live in the sidebar as navigation items
const NAV_TABS = ["dashboard", "macros", "variables", "settings"];

// Prefill page state
let prefillState = {
  macro: null,
  returnTab: "macros",
};

function switchTab(tabId) {
  state.activeTab = tabId;

  // Update sidebar active state (only for real nav tabs)
  el.menuItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
  });

  // Show/hide panels
  el.tabPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== `tab-${tabId}`);
  });

  // Tab-specific refresh
  if (tabId === "dashboard") checkMacrosExistState();
  if (tabId === "macros") {
    renderMacrosList();
    renderMacrosCategoryFilterOptions();
  }
  if (tabId === "variables") {
    renderConfigVariables();
    renderConfigCategories();
  }
  if (tabId === "prefill") {
    renderPrefillPage();
  }
  if (tabId === "profile") {
    if (typeof fbProfile !== "undefined") fbProfile.refresh();
  }
  if (tabId === "team") {
    if (typeof fbTeam !== "undefined") {
      if (fbTeam.activeMember) {
        document.getElementById("team-members-view")?.classList.add("hidden");
        document.getElementById("team-library-view")?.classList.remove("hidden");
      } else {
        document.getElementById("team-members-view")?.classList.remove("hidden");
        document.getElementById("team-library-view")?.classList.add("hidden");
        fbTeam.refresh();
      }
    }
  }
  if (tabId === "settings") {
    if (el.settingsGeminiKey) {
      el.settingsGeminiKey.value = state.geminiApiKey || "";
    }
  }

  lucide.createIcons();
}

// =============================================
// THEME
// =============================================
function applyTheme(theme) {
  state.currentTheme = theme;
  localStorage.setItem("quickmacros_theme", theme);
  document.body.classList.toggle("theme-dark", theme === "dark");
  document.body.classList.toggle("theme-light", theme !== "dark");
  document.querySelectorAll(".theme-icon-light").forEach(item => {
    item.classList.toggle("hidden", theme === "dark");
  });
  document.querySelectorAll(".theme-icon-dark").forEach(item => {
    item.classList.toggle("hidden", theme !== "dark");
  });
}

// =============================================
// DASHBOARD STATE
// =============================================
function checkMacrosExistState() {
  if (state.macros.length === 0) {
    el.workspaceEmpty.classList.remove("hidden");
    el.workspaceActive.classList.add("hidden");
  } else {
    el.workspaceEmpty.classList.add("hidden");
    el.workspaceActive.classList.remove("hidden");
    renderStatsDashboard();
  }
}

// =============================================
// DASHBOARD STATS RENDERING
// =============================================
function renderStatsDashboard() {
  // Animated counters
  const totalMacros = state.macros.length;
  const totalCopies = state.macros.reduce(
    (s, m) => s + (m.copied_count || 0),
    0,
  );
  const totalCategories = state.categories.length;

  animateCounter(el.statTotalMacros, totalMacros);
  animateCounter(el.statTotalCopies, totalCopies);
  animateCounter(el.statTotalCategories, totalCategories);

  // --- Chart ---
  el.usageChartContainer.innerHTML = "";
  const sorted = [...state.macros].sort(
    (a, b) => (b.copied_count || 0) - (a.copied_count || 0),
  );
  const maxCount = Math.max(...state.macros.map((m) => m.copied_count || 0), 1);
  const top5 = sorted.slice(0, 5);

  top5.forEach((m) => {
    const count = m.copied_count || 0;
    const percent = Math.round((count / maxCount) * 100);
    const catObj = state.categories.find((c) => c.id === m.category);
    const catColor = catObj ? catObj.color : "#3b82f6";
    const row = document.createElement("div");
    row.className = "chart-row";
    row.innerHTML = `
            <span class="chart-label" title="${escapeHTML(m.title)}">${escapeHTML(m.title)}</span>
            <div class="chart-bar-wrapper">
                <div class="chart-bar-fill" data-width="${percent}" style="background:${catColor};"></div>
            </div>
            <span class="chart-value">${count}x</span>
        `;
    el.usageChartContainer.appendChild(row);
  });

  // Animate bars on next frame
  requestAnimationFrame(() => {
    document.querySelectorAll(".chart-bar-fill[data-width]").forEach((bar) => {
      bar.style.width = bar.getAttribute("data-width") + "%";
    });
  });

  // --- Ranking ---
  el.usageRankingContainer.innerHTML = "";
  const badgeClasses = ["gold", "silver", "bronze", "other", "other"];
  const rankList = document.createElement("ul");
  rankList.className = "ranking-list";

  top5.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = "ranking-item";
    li.innerHTML = `
            <span class="ranking-badge ${badgeClasses[i] || "other"}">${i + 1}</span>
            <span class="ranking-name" title="${escapeHTML(m.title)}">${escapeHTML(m.title)}</span>
            <span class="ranking-count">${m.copied_count || 0} envios</span>
        `;
    rankList.appendChild(li);
  });
  el.usageRankingContainer.appendChild(rankList);

  // --- Top Macros Cards ---
  renderDashTopMacros(sorted);
}

function renderDashTopMacros(sortedMacros) {
  const container = document.getElementById("dash-top-macros-list");
  if (!container) return;
  container.innerHTML = "";

  // Show up to 5 most-used macros
  const top = sortedMacros.slice(0, 5);

  top.forEach((macro) => {
    const catObj = state.categories.find((c) => c.id === macro.category);
    const catColor = catObj ? catObj.color : "#64748b";
    const catName = catObj ? catObj.name : macro.category;
    const count = macro.copied_count || 0;

    const card = document.createElement("div");
    card.className = "dash-macro-card";
    card.title = "Clique para editar";
    card.innerHTML = `
            <span class="badge dash-macro-badge"
                  style="background-color:${catColor}1a;color:${catColor};border:1px solid ${catColor}30;">
                ${escapeHTML(catName)}
            </span>
            <div class="dash-macro-card-body">
                <p class="dash-macro-title">${escapeHTML(macro.title)}</p>
                <p class="dash-macro-desc">${escapeHTML(macro.description || "Sem descrição.")}</p>
            </div>
            <div class="dash-macro-footer">
                <span class="dash-macro-count">
                    <i data-lucide="copy" style="width:13px;height:13px;vertical-align:-2px;"></i>
                    ${count} ${count === 1 ? "cópia" : "cópias"}
                </span>
                <span class="dash-macro-edit-hint">
                    <i data-lucide="edit-2" style="width:13px;height:13px;vertical-align:-2px;"></i>
                    Editar
                </span>
            </div>
        `;

    card.addEventListener("click", () => openPrefillPage(macro));
    container.appendChild(card);
  });

  lucide.createIcons();
}

// =============================================
// PREFILL PAGE — Open / Logic
// =============================================
let _prefillMacro = null; // currently open macro

function openPrefillPage(macro, returnTab = "macros") {
  _prefillMacro = macro;
  _prefillReturnTab = returnTab;

  // Header
  const catObj = state.categories.find((c) => c.id === macro.category);
  const catColor = catObj ? catObj.color : "#64748b";
  const catName = catObj ? catObj.name : macro.category;

  const badgeEl = document.getElementById("prefill-page-badge");
  const titleEl = document.getElementById("prefill-page-title");
  badgeEl.textContent = catName;
  badgeEl.style.cssText = `background-color:${catColor}1a;color:${catColor};border:1px solid ${catColor}30;`;
  titleEl.textContent = macro.title;

  // Extract unique variable names from body (data-var attributes)
  const tmp = document.createElement("div");
  tmp.innerHTML = macro.body;
  const pills = tmp.querySelectorAll(".var-pill[data-var]");
  const varNames = [
    ...new Set([...pills].map((p) => p.getAttribute("data-var"))),
  ];

  // Build input fields
  const fieldsContainer = document.getElementById("prefill-fields-container");
  const noVarsEl = document.getElementById("prefill-no-vars");
  fieldsContainer.innerHTML = "";
  if (varNames.length === 0) {
    noVarsEl.classList.remove("hidden");
    fieldsContainer.classList.add("hidden");
  } else {
    noVarsEl.classList.add("hidden");
    fieldsContainer.classList.remove("hidden");

    varNames.forEach((name) => {
      const varDef = state.variables.find((v) => v.name === name);

      // Compute smart default
      let defaultVal = "";
      if (varDef) {
        if (varDef.type === "temporal") {
          defaultVal = resolveTemporalVar(varDef);
        } else {
          defaultVal = varDef.defaultVal || "";
        }
      }

      const group = document.createElement("div");
      group.className = "prefill-field-group";

      if (varDef && varDef.type === "temporal") {
        // Temporal variables: show as read-only display, not editable
        group.innerHTML = `
                  <label class="prefill-field-label">
                      <span class="var-pill" style="font-size:11px;padding:2px 8px;">${escapeHTML(name)}</span>
                      <span class="prefill-temporal-badge" title="Preenchido automaticamente pelo horário">⏰</span>
                  </label>
                  <div class="prefill-temporal-value">${escapeHTML(defaultVal || "—")}</div>
                  <input type="hidden" class="prefill-field-input" data-var="${escapeHTML(name)}" value="${escapeHTML(defaultVal)}">
              `;
      } else {
        // Static variables: use placeholder only (no value), disappears on focus
        group.innerHTML = `
                  <label class="prefill-field-label">
                      <span class="var-pill" style="font-size:11px;padding:2px 8px;">${escapeHTML(name)}</span>
                  </label>
                  <input
                      type="text"
                      class="prefill-field-input"
                      data-var="${escapeHTML(name)}"
                      placeholder="${escapeHTML(defaultVal || name)}"
                      autocomplete="off"
                      spellcheck="true"
                      lang="pt-BR"
                  >
              `;
        group
          .querySelector("input")
          .addEventListener("input", updatePrefillPreview);
      }
      fieldsContainer.appendChild(group);
    });
  }

  // Initial preview render
  updatePrefillPreview();

  // Reset copy button
  const copyTextEl = document.getElementById("btn-prefill-copy-text");
  const copyIconEl = document.getElementById("prefill-copy-icon");
  copyTextEl.textContent = "Copiar Resposta";
  copyIconEl.setAttribute("data-lucide", "copy");

  // Show/hide "Salvar na Minha Biblioteca" button if opened from Team or macro is not in personal collection
  if (el.btnPrefillCopyToLibrary) {
    const isAlreadyMine = state.macros.some((m) => m.id === macro.id);
    if (returnTab === "team" || !isAlreadyMine) {
      el.btnPrefillCopyToLibrary.classList.remove("hidden");
    } else {
      el.btnPrefillCopyToLibrary.classList.add("hidden");
    }
  }

  // Switch to prefill tab (no sidebar highlight)
  el.tabPanels.forEach((p) =>
    p.classList.toggle("hidden", p.id !== "tab-prefill"),
  );
  el.menuItems.forEach((i) => i.classList.remove("active"));

  lucide.createIcons();
  // Focus first input
  const firstInput = fieldsContainer.querySelector("input");
  if (firstInput) setTimeout(() => firstInput.focus(), 120);
}

function closePrefillPage() {
  switchTab(_prefillReturnTab || "macros");
  _prefillMacro = null;
  _prefillReturnTab = null;
}

let _prefillReturnTab = null;

function resolveTemporalVar(varDef) {
  if (!varDef.rules || varDef.rules.length === 0) return "";
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const rule of varDef.rules) {
    const s = timeToMinutes(rule.start);
    const e = timeToMinutes(rule.end);
    if (e >= s) {
      if (mins >= s && mins <= e) return rule.val;
    } else {
      // crosses midnight
      if (mins >= s || mins <= e) return rule.val;
    }
  }
  // fallback: closest rule by start time
  let closest = varDef.rules[0];
  let minDiff = Infinity;
  varDef.rules.forEach((r) => {
    const diff = Math.abs(timeToMinutes(r.start) - mins);
    if (diff < minDiff) {
      minDiff = diff;
      closest = r;
    }
  });
  return closest.val;
}

function updatePrefillPreview() {
  if (!_prefillMacro) return;

  // Build a values map from inputs
  const values = {};
  document
    .getElementById("prefill-fields-container")
    .querySelectorAll(".prefill-field-input")
    .forEach((inp) => {
      const varName = inp.getAttribute("data-var");
      values[varName] = inp.value.trim() || inp.placeholder;
    });

  // Clone body and replace pills with resolved values
  const tmp = document.createElement("div");
  tmp.innerHTML = _prefillMacro.body;

  tmp.querySelectorAll(".var-pill[data-var]").forEach((pill) => {
    const name = pill.getAttribute("data-var");
    const varDef = state.variables.find((v) => v.name === name);
    const color = varDef?.color || "#3b82f6";
    const span = document.createElement("span");
    span.className = "prefill-resolved-var";
    span.style.setProperty("--pill-color", color);
    span.textContent = values[name] || name;
    pill.replaceWith(span);
  });

  document.getElementById("prefill-preview-output").innerHTML = tmp.innerHTML;
}

function copyPrefillText() {
  if (!_prefillMacro) return;

  // Build final plain + rich text from preview
  const preview = document
    .getElementById("prefill-preview-output")
    .cloneNode(true);
  // Remove any contenteditable artefacts
  preview
    .querySelectorAll("[contenteditable]")
    .forEach((el) => el.removeAttribute("contenteditable"));

  // Try clipboard with HTML, fall back to plain text
  const htmlContent = preview.innerHTML;
  const plainContent = preview.innerText || preview.textContent;

  const success = () => {
    // Increment copy count
    const idx = state.macros.findIndex((m) => m.id === _prefillMacro.id);
    if (idx !== -1) {
      state.macros[idx].copied_count =
        (state.macros[idx].copied_count || 0) + 1;
      _prefillMacro = state.macros[idx];
      saveData("quickmacros_data", state.macros);
    }

    // Button feedback
    const copyTextEl = document.getElementById("btn-prefill-copy-text");
    const copyIconEl = document.getElementById("prefill-copy-icon");
    const copyBtnEl = document.getElementById("btn-prefill-copy");
    copyTextEl.textContent = "Copiado! ✓";
    copyIconEl.setAttribute("data-lucide", "check");
    lucide.createIcons();
    copyBtnEl.classList.add("btn-copied");
    setTimeout(() => {
      copyTextEl.textContent = "Copiar Resposta";
      copyIconEl.setAttribute("data-lucide", "copy");
      lucide.createIcons();
      copyBtnEl.classList.remove("btn-copied");
    }, 2000);

    showToast("Macro copiada!");
  };

  if (navigator.clipboard && window.ClipboardItem) {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const item = new window.ClipboardItem({ "text/html": blob });
    navigator.clipboard
      .write([item])
      .then(success)
      .catch(() => {
        navigator.clipboard.writeText(plainContent).then(success);
      });
  } else {
    navigator.clipboard
      .writeText(plainContent)
      .then(success)
      .catch(() => {
        // Legacy execCommand fallback
        const ta = document.createElement("textarea");
        ta.value = plainContent;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        success();
      });
  }
}

function animateCounter(el, target) {
  if (!el) return;
  const duration = 800;
  const start = performance.now();
  const from = parseInt(el.textContent) || 0;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// =============================================
// EDITOR — Open / Close
// =============================================
// previousTab: remember where to return on cancel
let editorReturnTab = "macros";

function openEditor(macro = null, returnTab = "macros") {
  editorReturnTab = returnTab;

  el.modalForm.reset();
  el.colorPalettePopover.classList.add("hidden");
  el.emojiPicker.classList.add("hidden");
  renderCategoriesSelectors();

  if (macro) {
    el.modalTitle.textContent = "Editar Macro";
    el.modalId.value = macro.id;
    el.modalName.value = macro.title;
    el.modalCategory.value = macro.category;
    el.modalDesc.value = macro.description || "";
    el.editorContainer.innerHTML = macro.body;
  } else {
    el.modalTitle.textContent = "Nova Macro";
    el.modalId.value = "";
    el.modalCategory.value = state.categories[0]?.id || "";
    el.editorContainer.innerHTML = "";
  }

  // Initialize Undo/Redo history stack
  editorHistory = [el.editorContainer.innerHTML];
  editorHistoryIndex = 0;
  updateUndoRedoButtons();
  refreshCustomSelect(el.modalCategory);

  renderEditorHelperVariables();

  // Switch to editor tab (no sidebar highlight)
  el.tabPanels.forEach((p) =>
    p.classList.toggle("hidden", p.id !== "tab-editor"),
  );
  el.menuItems.forEach((i) => i.classList.remove("active"));

  el.modalName.focus();
  lucide.createIcons();
}

function closeEditor() {
  switchTab(editorReturnTab);
}

// =============================================
// EDITOR — Save
// =============================================
function handleEditorSubmit(e) {
  e.preventDefault();

  const id = el.modalId.value;
  const title = el.modalName.value.trim();
  const category = el.modalCategory.value;
  const description = el.modalDesc.value.trim();
  const body = el.editorContainer.innerHTML.trim();

  if (!title || !body) {
    showToast("Preencha o Nome e o Conteúdo.", false);
    return;
  }

  let isNew = false;

  if (id) {
    const idx = state.macros.findIndex((m) => m.id === id);
    if (idx !== -1) {
      state.macros[idx] = {
        ...state.macros[idx],
        title,
        category,
        description,
        body,
      };
      showToast("Macro editada com sucesso!");
    }
  } else {
    const newMacro = {
      id: "macro_" + Date.now(),
      title,
      category,
      description,
      body,
      copied_count: 0,
    };
    state.macros.unshift(newMacro);
    showToast("Macro criada! 🎉");
    isNew = true;
  }

  saveData("quickmacros_data", state.macros);

  // After create → go to Macros tab
  // After edit   → return to wherever we came from
  switchTab(isNew ? "macros" : editorReturnTab);
}

// =============================================
// DELETE MACRO — immediate animated removal
// =============================================
function deleteMacro(id, cardElement = null) {
  // Animate card out immediately if we have the DOM element
  if (cardElement) {
    cardElement.style.transition = "all 0.25s ease";
    cardElement.style.transform = "scale(0.92)";
    cardElement.style.opacity = "0";
    setTimeout(() => cardElement.remove(), 250);
  }

  state.macros = state.macros.filter((m) => m.id !== id);
  saveData("quickmacros_data", state.macros);
  showToast("Macro excluída.");

  // If dashboard is active, refresh stats
  if (state.activeTab === "dashboard") {
    checkMacrosExistState();
  }
}

// =============================================
// EDITOR HELPERS
// =============================================
function renderEditorHelperVariables() {
  el.helperVariablesList.innerHTML = "";

  if (state.variables.length === 0) {
    el.helperVariablesList.innerHTML = `<p class="helper-sidebar-tip">Nenhuma variável disponível.</p>`;
    return;
  }

  state.variables.forEach((v) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-helper-var-pill";
    const color = v.color || "#3b82f6";
    btn.innerHTML = `
            <div class="var-name-with-color">
                <span class="var-color-dot" style="background-color:${color};"></span>
                <span>${escapeHTML(v.name)}</span>
            </div>
            <span class="var-pill-type">${v.type === "temporal" ? "Horário" : "Fixo"}</span>
        `;
    btn.addEventListener("click", () => insertVariablePill(v.name));
    el.helperVariablesList.appendChild(btn);
  });
}

function insertVariablePill(varName) {
  const varDef = state.variables.find((v) => v.name === varName);
  const color = varDef?.color || "#3b82f6";
  const pill = document.createElement("span");
  pill.className = "var-pill";
  pill.setAttribute("data-var", varName);
  pill.setAttribute("contenteditable", "false");
  pill.style.setProperty("--pill-color", color);
  pill.textContent = varName;

  el.editorContainer.focus();
  const sel = window.getSelection();
  let inserted = false;
  if (sel && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    if (el.editorContainer.contains(range.commonAncestorContainer)) {
      range.deleteContents();
      range.insertNode(pill);
      const after = document.createRange();
      after.setStartAfter(pill);
      after.collapse(true);
      sel.removeAllRanges();
      sel.addRange(after);
      inserted = true;
    }
  }
  if (!inserted) {
    el.editorContainer.appendChild(pill);
  }
  saveEditorState();
}

// =============================================
// EMOJI PICKER
// =============================================
function initEmojiPicker() {
  renderEmojisGrid("smileys");
  el.emojiPicker.querySelectorAll(".emoji-tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      el.emojiPicker
        .querySelectorAll(".emoji-tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderEmojisGrid(btn.getAttribute("data-category"));
    });
  });
}

function renderEmojisGrid(category) {
  el.emojiGridContent.innerHTML = "";
  (EMOJI_CATEGORIES[category] || []).forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-btn";
    btn.textContent = emoji;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      insertTextAtCaret(emoji);
    });
    el.emojiGridContent.appendChild(btn);
  });
}

function insertTextAtCaret(text) {
  el.editorContainer.focus();
  const sel = window.getSelection();
  let inserted = false;
  if (sel && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    if (el.editorContainer.contains(range.commonAncestorContainer)) {
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      inserted = true;
    }
  }
  if (!inserted) {
    el.editorContainer.appendChild(document.createTextNode(text));
  }
  saveEditorState();
}

// Rich text
function formatDoc(cmd, value = null) {
  el.editorContainer.focus();
  document.execCommand(cmd, false, value);
  saveEditorState();
}

function handleImageInsert(e) {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith("image/")) {
    showToast("Selecione uma imagem válida.", false);
    return;
  }
  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = document.createElement("img");
    img.src = evt.target.result;
    img.alt = "Imagem";
    el.editorContainer.focus();
    const sel = window.getSelection();
    let inserted = false;
    if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      if (el.editorContainer.contains(range.commonAncestorContainer)) {
        range.deleteContents();
        range.insertNode(img);
        const p = document.createElement("div");
        p.innerHTML = "<br>";
        img.parentNode.insertBefore(p, img.nextSibling);
        inserted = true;
      }
    }
    if (!inserted) {
      el.editorContainer.appendChild(img);
    }
    saveEditorState();
  };
  reader.readAsDataURL(file);
  e.target.value = "";
}

// =============================================
// MACROS LIST (Minhas Macros tab)
// =============================================
let activeMacrosFilterCategory = "all";

function renderMacrosCategoryFilterOptions() {
  el.macrosCategoryFilter.innerHTML = `<option value="all">Todas as Categorias</option>`;
  state.categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    el.macrosCategoryFilter.appendChild(opt);
  });
  el.macrosCategoryFilter.value = activeMacrosFilterCategory;
  refreshCustomSelect(el.macrosCategoryFilter);
}

function renderMacrosList() {
  el.macroList.innerHTML = "";
  if (state.macrosViewMode === "list") {
    el.macroList.classList.add("view-compact-list");
    if (el.btnViewList) el.btnViewList.classList.add("active");
    if (el.btnViewGrid) el.btnViewGrid.classList.remove("active");
  } else {
    el.macroList.classList.remove("view-compact-list");
    if (el.btnViewGrid) el.btnViewGrid.classList.add("active");
    if (el.btnViewList) el.btnViewList.classList.remove("active");
  }

  const q = el.searchInput.value.toLowerCase().trim();
  activeMacrosFilterCategory = el.macrosCategoryFilter.value;

  const filtered = state.macros.filter((m) => {
    const matchCat =
      activeMacrosFilterCategory === "all" ||
      m.category === activeMacrosFilterCategory;
    const matchSearch =
      m.title.toLowerCase().includes(q) ||
      (m.description || "").toLowerCase().includes(q) ||
      m.body.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    el.emptySearchState.classList.remove("hidden");
  } else {
    el.emptySearchState.classList.add("hidden");
    filtered.forEach((macro) => buildMacroCard(macro));
  }
  if (typeof fbProfile !== "undefined" && fbAuth.currentUser) {
    fbProfile.renderShareList();
  }
  lucide.createIcons();
}

function buildMacroCard(macro) {
  const item = document.createElement("li");
  item.className = "macro-item";
  item.setAttribute("data-id", macro.id);
  item.setAttribute("draggable", "true");

  const catObj = state.categories.find((c) => c.id === macro.category);
  const catColor = catObj ? catObj.color : "#64748b";
  const catName = catObj ? catObj.name : macro.category;

  const isShared = (state.userProfile?.sharedMacros || []).includes(macro.id);
  const shareIconHtml = isShared ? `<span class="macro-share-badge" title="Compartilhada com a equipe" style="color: var(--accent-purple); display: inline-flex; align-items: center; margin-left: 8px;"><i data-lucide="share-2" style="width:14px;height:14px;"></i></span>` : '';

  item.innerHTML = `
        <span class="badge" style="background-color:${catColor}1a;color:${catColor};border:1px solid ${catColor}30;">
            ${escapeHTML(catName)}
        </span>
        <div class="macro-item-header" style="display:flex; align-items:center; justify-content:space-between; width:100%; margin-top:8px;">
            <span class="macro-item-title" style="display:flex; align-items:center;">
                ${escapeHTML(macro.title)}
                ${shareIconHtml}
            </span>
        </div>
        <p class="macro-item-desc" style="margin-top:4px;">${escapeHTML(macro.description || "Sem descrição.")}</p>
        <div class="macro-card-actions">
            <button class="btn-table-action btn-card-edit" title="Editar">
                <i data-lucide="edit-2"></i>
            </button>
            <button class="btn-table-action btn-card-delete btn-action-danger" title="Excluir">
                <i data-lucide="trash-2"></i>
            </button>
        </div>
    `;

  // Click anywhere on the card (not on action buttons) → open prefill page
  item.addEventListener("click", (e) => {
    if (!e.target.closest(".macro-card-actions")) {
      openPrefillPage(macro);
    }
  });

  item.querySelector(".btn-card-edit").addEventListener("click", (e) => {
    e.stopPropagation();
    openEditor(macro, "macros");
  });

  item.querySelector(".btn-card-delete").addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm(`Excluir a macro "${macro.title}"?`)) {
      deleteMacro(macro.id, item);
    }
  });

  // Drag & Drop
  item.addEventListener("dragstart", (e) => {
    item.classList.add("dragging");
    e.dataTransfer.setData("text/plain", macro.id);
  });
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    const target = e.target.closest(".macro-item");
    if (target && !target.classList.contains("dragging"))
      target.classList.add("drag-over");
  });
  item.addEventListener("dragleave", (e) => {
    const target = e.target.closest(".macro-item");
    if (target) target.classList.remove("drag-over");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    el.macroList
      .querySelectorAll(".macro-item")
      .forEach((c) => c.classList.remove("drag-over"));
  });
  item.addEventListener("drop", (e) => {
    e.preventDefault();
    const target = e.target.closest(".macro-item");
    if (!target) return;
    target.classList.remove("drag-over");
    const draggedId = e.dataTransfer.getData("text/plain");
    const targetId = target.getAttribute("data-id");
    if (draggedId && targetId && draggedId !== targetId) {
      const di = state.macros.findIndex((m) => m.id === draggedId);
      const ti = state.macros.findIndex((m) => m.id === targetId);
      if (di !== -1 && ti !== -1) {
        const [moved] = state.macros.splice(di, 1);
        state.macros.splice(ti, 0, moved);
        saveData("quickmacros_data", state.macros);
        renderMacrosList();
      }
    }
  });

  el.macroList.appendChild(item);
}

// =============================================
// VARIABLES & CATEGORIES
// =============================================
function renderCategoriesSelectors() {
  el.modalCategory.innerHTML = "";
  state.categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.name;
    el.modalCategory.appendChild(opt);
  });
  refreshCustomSelect(el.modalCategory);
}

function renderConfigCategories() {
  el.listCategories.innerHTML = "";
  if (state.categories.length === 0) {
    el.listCategories.innerHTML = `
      <li style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;list-style:none;">
        Nenhuma categoria cadastrada ainda.
      </li>
    `;
    lucide.createIcons();
    return;
  }
  state.categories.forEach((cat) => {
    const li = document.createElement("li");
    li.className = "category-config-item";
    li.innerHTML = `
            <div class="category-badge-wrapper">
                <span class="category-color-dot" style="background-color:${cat.color};"></span>
                <span class="category-name-label">${escapeHTML(cat.name)}</span>
            </div>
            <button class="btn-table-action btn-delete-cat" title="Apagar Categoria">
                <i data-lucide="trash-2"></i>
            </button>
        `;
    li.querySelector(".btn-delete-cat").addEventListener("click", () => {
      if (confirm(`Remover categoria "${cat.name}"?`)) deleteCategory(cat.id);
    });
    el.listCategories.appendChild(li);
  });
  lucide.createIcons();
}

function deleteCategory(catId) {
  state.categories = state.categories.filter((c) => c.id !== catId);
  saveData("quickmacros_categories", state.categories);
  if (typeof fbFirestore !== "undefined" && fbFirestore.deleteCategory) {
    fbFirestore.deleteCategory(catId);
  }
  state.macros.forEach((m) => {
    if (m.category === catId) m.category = "outros";
  });
  saveData("quickmacros_data", state.macros);
  renderConfigCategories();
  renderCategoriesSelectors();
  renderMacrosCategoryFilterOptions();
  showToast("Categoria removida.");
}

function renderConfigVariables() {
  el.tableVariablesBody.innerHTML = "";
  if (state.variables.length === 0) {
    el.tableVariablesBody.innerHTML = `
      <tr>
        <td colspan="4" style="padding:24px;text-align:center;color:var(--text-muted);font-size:13px;">
          Nenhuma variável cadastrada ainda.
        </td>
      </tr>
    `;
    lucide.createIcons();
    return;
  }
  state.variables.forEach((v) => {
    const tr = document.createElement("tr");
    let valSnippet = "";
    const color = v.color || "#3b82f6";

    if (v.type === "temporal") {
      valSnippet = `<div class="table-rules-container">`;
      (v.rules || []).forEach((r) => {
        valSnippet += `<div class="table-rule-badge" style="font-size:11px;margin-bottom:2px;">
                    <strong>${escapeHTML(r.val)}:</strong> ${r.start} - ${r.end}
                </div>`;
      });
      valSnippet += `</div>`;
    } else {
      valSnippet = escapeHTML(v.defaultVal || "(sem valor padrão)");
    }

    tr.innerHTML = `
            <td>
              <div class="var-name-with-color">
                <span class="var-color-dot" style="background-color:${color};"></span>
                <span>${escapeHTML(v.name)}</span>
              </div>
            </td>
            <td><span class="badge">${v.type === "temporal" ? "Horário" : "Fixo"}</span></td>
            <td>${valSnippet}</td>
            <td>
                <button class="btn-table-action btn-delete-var" title="Apagar Variável">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        `;
    tr.querySelector(".btn-delete-var").addEventListener("click", () => {
      if (confirm(`Excluir a variável "${v.name}"?`)) deleteVariable(v.name);
    });
    el.tableVariablesBody.appendChild(tr);
  });
  lucide.createIcons();
}

function deleteVariable(name) {
  state.variables = state.variables.filter(
    (v) => v.name.toLowerCase() !== name.toLowerCase(),
  );
  saveData("quickmacros_variables", state.variables);
  if (typeof fbFirestore !== "undefined" && fbFirestore.deleteVariable) {
    fbFirestore.deleteVariable(name);
  }
  renderConfigVariables();
  renderEditorHelperVariables();
  showToast("Variável excluída.");
}

function addTemporalRuleInputRow(rule = null) {
  const row = document.createElement("div");
  row.className = "temporal-rule-row";

  const valInput = Object.assign(document.createElement("input"), {
    type: "text",
    placeholder: "Saudação...",
    required: true,
    spellcheck: true,
  });
  valInput.setAttribute("lang", "pt-BR");
  const startInput = Object.assign(document.createElement("input"), {
    type: "time",
    required: true,
  });
  const endInput = Object.assign(document.createElement("input"), {
    type: "time",
    required: true,
  });
  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.className = "btn-remove-rule";
  btnRemove.innerHTML = `<i data-lucide="x"></i>`;
  btnRemove.addEventListener("click", () => row.remove());

  if (rule) {
    valInput.value = rule.val;
    startInput.value = rule.start;
    endInput.value = rule.end;
  }

  row.append(valInput, startInput, endInput, btnRemove);
  el.temporalRulesList.appendChild(row);
  lucide.createIcons();
}

// Modal-specific temporal rule input row creator
function addModalTemporalRuleInputRow(rule = null) {
  const row = document.createElement("div");
  row.className = "temporal-rule-row";

  const valInput = Object.assign(document.createElement("input"), {
    type: "text",
    placeholder: "Saudação...",
    required: true,
    spellcheck: true,
  });
  valInput.setAttribute("lang", "pt-BR");
  const startInput = Object.assign(document.createElement("input"), {
    type: "time",
    required: true,
  });
  const endInput = Object.assign(document.createElement("input"), {
    type: "time",
    required: true,
  });
  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.className = "btn-remove-rule";
  btnRemove.innerHTML = `<i data-lucide="x"></i>`;
  btnRemove.addEventListener("click", () => row.remove());

  if (rule) {
    valInput.value = rule.val;
    startInput.value = rule.start;
    endInput.value = rule.end;
  }

  row.append(valInput, startInput, endInput, btnRemove);
  el.modalTemporalRulesList.appendChild(row);
  lucide.createIcons();
}

function openNewVarModal() {
  el.modalVarForm.reset();
  
  const color = getRandomColor(state.variables.map((v) => v.color));
  el.modalVarColor.value = color;
  el.modalVarColorHex.textContent = color;
  
  el.modalVarType.value = "static";
  refreshCustomSelect(el.modalVarType);
  
  el.modalVarStaticContainer.classList.remove("hidden");
  el.modalVarTemporalContainer.classList.add("hidden");
  el.modalTemporalRulesList.innerHTML = "";
  
  el.modalNewVarOverlay.classList.add("active");
  lucide.createIcons();
  setTimeout(() => el.modalVarName.focus(), 50);
}

function closeNewVarModal() {
  el.modalNewVarOverlay.classList.remove("active");
}


function checkTimeOverlap(rules) {
  const intervals = [];
  for (const rule of rules) {
    const s = timeToMinutes(rule.start),
      e = timeToMinutes(rule.end);
    if (e >= s) intervals.push({ s, e, rule });
    else {
      intervals.push({ s, e: 1440, rule });
      intervals.push({ s: 0, e, rule });
    }
  }
  for (let i = 0; i < intervals.length; i++)
    for (let j = i + 1; j < intervals.length; j++) {
      const a = intervals[i],
        b = intervals[j];
      if (a.rule !== b.rule && Math.max(a.s, b.s) < Math.min(a.e, b.e))
        return true;
    }
  return false;
}

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// =============================================
// EVENT LISTENERS
// =============================================
function updateCloudSyncStatus() {
  const dot = document.querySelector("#cloud-sync-status .status-dot");
  const text = document.getElementById("sync-status-text");
  if (!dot || !text) return;

  if (!navigator.onLine) {
    dot.className = "status-dot offline";
    text.textContent = "Offline";
  } else if (typeof fbAuth !== "undefined" && fbAuth.currentUser) {
    dot.className = "status-dot online";
    text.textContent = "Online";
  } else {
    dot.className = "status-dot local";
    text.textContent = "Local";
  }
}

function checkUrlTeamInvite() {
  const params = new URLSearchParams(window.location.search);
  const teamCode = params.get("team");
  if (teamCode) {
    switchTab("profile");
    const input = document.getElementById("profile-join-team-code");
    if (input) {
      input.value = teamCode;
      showToast(`Código da equipe '${teamCode}' preenchido!`);
    }
  }
}

function setupEventListeners() {
  // Sidebar nav tabs
  el.menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab");
      if ((tab === "profile" || tab === "team") && !fbAuth.currentUser) {
        fbAuth.requireAuth();
        return;
      }
      switchTab(tab);
    });
  });

  // Sidebar Nova Macro button (no data-tab)
  const btnSidebarNew = document.getElementById("btn-sidebar-new-macro");
  if (btnSidebarNew)
    btnSidebarNew.addEventListener("click", () => {
      if (!fbAuth.requireAuth()) return;
      openEditor(null, "macros");
    });

  // Theme toggle
  el.btnThemeToggle.addEventListener("click", () => {
    applyTheme(state.currentTheme === "light" ? "dark" : "light");
  });

  // Mobile theme toggle
  document.getElementById("btn-theme-toggle-mobile")?.addEventListener("click", () => {
    applyTheme(state.currentTheme === "light" ? "dark" : "light");
  });

  // Dashboard empty state button
  el.btnCreateFirstMacro.addEventListener("click", () => {
    if (!fbAuth.requireAuth()) return;
    openEditor(null, "dashboard");
  });

  // Dashboard quick create card
  if (el.dashQuickCreate)
    el.dashQuickCreate.addEventListener("click", () => {
      if (!fbAuth.requireAuth()) return;
      openEditor(null, "macros");
    });

  // Sidebar profile & notification buttons
  const btnSidebarProfile = document.getElementById("btn-sidebar-profile");
  if (btnSidebarProfile)
    btnSidebarProfile.addEventListener("click", () => {
      if (!fbAuth.requireAuth()) return;
      switchTab("profile");
    });
  const btnSidebarNotif = document.getElementById("btn-sidebar-notif");
  if (btnSidebarNotif)
    btnSidebarNotif.addEventListener("click", () => switchTab("profile"));

  // Editor Back / Cancel
  if (el.btnEditorBack) el.btnEditorBack.addEventListener("click", closeEditor);
  if (el.btnCancelModal)
    el.btnCancelModal.addEventListener("click", closeEditor);

  // Prefill Page
  if (el.btnPrefillBack)
    el.btnPrefillBack.addEventListener("click", () =>
      switchTab(_prefillReturnTab || "macros"),
    );
  if (el.btnPrefillCopy)
    el.btnPrefillCopy.addEventListener("click", copyPrefillText);

  // Editor Form Save
  el.modalForm.addEventListener("submit", handleEditorSubmit);

  // Editor Toolbar
  el.fontFamilySelect.addEventListener("change", (e) =>
    formatDoc("fontName", e.target.value),
  );
  el.fontSizeSelect.addEventListener("change", (e) =>
    formatDoc("fontSize", e.target.value),
  );
  el.btnBold.addEventListener("click", () => formatDoc("bold"));
  el.btnItalic.addEventListener("click", () => formatDoc("italic"));
  el.btnUnderline.addEventListener("click", () => formatDoc("underline"));
  el.btnStrikethrough.addEventListener("click", () => formatDoc("strikeThrough"));
  el.btnClearFormat.addEventListener("click", () => formatDoc("removeFormat"));

  el.btnTextColor.addEventListener("click", (e) => {
    e.stopPropagation();
    el.colorPalettePopover.classList.toggle("hidden");
    if (el.highlightPalettePopover) el.highlightPalettePopover.classList.add("hidden");
  });
  el.colorPalettePopover.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      formatDoc("foreColor", dot.getAttribute("data-color"));
      el.colorPalettePopover.classList.add("hidden");
    });
  });

  if (el.btnHighlightColor) {
    el.btnHighlightColor.addEventListener("click", (e) => {
      e.stopPropagation();
      el.highlightPalettePopover.classList.toggle("hidden");
      el.colorPalettePopover.classList.add("hidden");
    });
  }
  if (el.highlightPalettePopover) {
    el.highlightPalettePopover.querySelectorAll(".color-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        formatDoc("hiliteColor", dot.getAttribute("data-color"));
        el.highlightPalettePopover.classList.add("hidden");
      });
    });
  }

  if (el.btnAlignLeft) el.btnAlignLeft.addEventListener("click", () => formatDoc("justifyLeft"));
  if (el.btnAlignCenter) el.btnAlignCenter.addEventListener("click", () => formatDoc("justifyCenter"));
  if (el.btnAlignRight) el.btnAlignRight.addEventListener("click", () => formatDoc("justifyRight"));

  if (el.btnListBullet) el.btnListBullet.addEventListener("click", () => formatDoc("insertUnorderedList"));
  if (el.btnListOrdered) el.btnListOrdered.addEventListener("click", () => formatDoc("insertOrderedList"));

  if (el.btnLinkInsert) {
    el.btnLinkInsert.addEventListener("click", () => {
      const url = prompt("Insira a URL do link (ex: https://google.com):");
      if (url) {
        formatDoc("createLink", url);
      }
    });
  }

  // Undo / Redo Click Handlers
  if (el.btnUndo) {
    el.btnUndo.addEventListener("click", () => {
      undoEditor();
    });
  }
  if (el.btnRedo) {
    el.btnRedo.addEventListener("click", () => {
      redoEditor();
    });
  }

  // Debounced input listener for manual typing in editor
  let editorInputTimeout = null;
  el.editorContainer.addEventListener("input", () => {
    clearTimeout(editorInputTimeout);
    editorInputTimeout = setTimeout(() => {
      saveEditorState();
    }, 500);
  });

  // Handle paste in editor: sanitize pasted content to preserve caret visibility
  el.editorContainer.addEventListener("paste", () => {
    setTimeout(() => {
      el.editorContainer.querySelectorAll("*").forEach((node) => {
        if (node.style && node.style.caretColor === "transparent" && !node.classList.contains("var-pill")) {
          node.style.caretColor = "auto";
        }
      });
      saveEditorState();
    }, 0);
  });

  // Hotkeys (Ctrl+Z / Ctrl+Y)
  el.editorContainer.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        undoEditor();
      } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        redoEditor();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
      if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        redoEditor();
      }
    }
  });


  el.btnEditorAddVar.addEventListener("click", (e) => {
    e.stopPropagation();
    openNewVarModal();
  });

  // Modal events setup
  if (el.btnCloseVarModal) {
    el.btnCloseVarModal.addEventListener("click", closeNewVarModal);
  }
  if (el.btnModalCancelVar) {
    el.btnModalCancelVar.addEventListener("click", closeNewVarModal);
  }
  if (el.modalNewVarOverlay) {
    el.modalNewVarOverlay.addEventListener("click", (e) => {
      if (e.target === el.modalNewVarOverlay) closeNewVarModal();
    });
  }

  if (el.modalVarType) {
    el.modalVarType.addEventListener("change", (e) => {
      el.modalVarStaticContainer.classList.toggle(
        "hidden",
        e.target.value === "temporal",
      );
      el.modalVarTemporalContainer.classList.toggle(
        "hidden",
        e.target.value !== "temporal",
      );
    });
  }

  if (el.btnModalAddTemporalRule) {
    el.btnModalAddTemporalRule.addEventListener("click", () => addModalTemporalRuleInputRow());
  }

  if (el.modalVarColor) {
    el.modalVarColor.addEventListener("input", (e) => {
      if (el.modalVarColorHex) el.modalVarColorHex.textContent = e.target.value;
    });
  }

  if (el.modalVarForm) {
    el.modalVarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = el.modalVarName.value.trim();
      const type = el.modalVarType.value;
      if (!name) return;

      let obj = { name, type, color: el.modalVarColor.value };
      if (type === "static") {
        obj.defaultVal = el.modalVarDefaultVal.value.trim();
      } else {
        const rows = el.modalTemporalRulesList.querySelectorAll(".temporal-rule-row");
        const rules = [];
        rows.forEach((r) => {
          const inputs = r.querySelectorAll("input");
          rules.push({
            val: inputs[0].value.trim(),
            start: inputs[1].value,
            end: inputs[2].value,
          });
        });
        if (rules.length === 0) {
          showToast("Adicione pelo menos uma regra temporal.", false);
          return;
        }
        if (checkTimeOverlap(rules)) {
          showToast("Conflito de horários detectado!", false);
          return;
        }
        obj.rules = rules;
      }

      const idx = state.variables.findIndex(
        (v) => v.name.toLowerCase() === name.toLowerCase(),
      );
      if (idx !== -1) {
        state.variables[idx] = obj;
        showToast("Variável atualizada.");
      } else {
        state.variables.push(obj);
        showToast("Variável cadastrada.");
      }

      saveData("quickmacros_variables", state.variables);
      closeNewVarModal();
      renderConfigVariables();
      renderEditorHelperVariables();
    });
  }


  el.btnEditorImage.addEventListener("click", () =>
    el.editorImageUpload.click(),
  );
  el.editorImageUpload.addEventListener("change", handleImageInsert);

  el.btnEditorEmoji.addEventListener("click", (e) => {
    e.stopPropagation();
    el.emojiPicker.classList.toggle("hidden");
  });

  if (el.btnEditorAi) {
    el.btnEditorAi.addEventListener("click", async () => {
      const sel = window.getSelection();
      let textToProcess = "";
      let isSelection = false;
      let range = null;

      if (sel && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
        if (el.editorContainer.contains(range.commonAncestorContainer)) {
          textToProcess = range.toString().trim();
          if (textToProcess.length > 0) {
            isSelection = true;
          }
        }
      }

      if (!isSelection) {
        textToProcess = el.editorContainer.innerHTML.trim();
      }

      if (!textToProcess) {
        showToast("Escreva algo no editor antes de melhorar com IA.", false);
        return;
      }

      const originalHTML = el.btnEditorAi.innerHTML;
      el.btnEditorAi.disabled = true;
      el.btnEditorAi.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px;height:14px;"></i> Processando...`;
      lucide.createIcons();

      try {
        const improvedText = await callGeminiAI(textToProcess);
        if (improvedText) {
          saveEditorState(); // Save state before AI modification
          if (isSelection && range) {
            range.deleteContents();
            const temp = document.createElement("div");
            temp.innerHTML = improvedText;
            const frag = document.createDocumentFragment();
            let child;
            while ((child = temp.firstChild)) {
              frag.appendChild(child);
            }
            range.insertNode(frag);
          } else {
            el.editorContainer.innerHTML = improvedText;
          }
          saveEditorState(); // Save state after AI modification
          showToast("Texto melhorado com IA!");
        }
      } catch (err) {
        console.error(err);
        showToast("Erro na API do Gemini. Verifique a chave nas Configurações.", false);
      } finally {
        el.btnEditorAi.disabled = false;
        el.btnEditorAi.innerHTML = originalHTML;
        lucide.createIcons();
      }
    });
  }

  if (el.btnSaveGeminiKey) {
    el.btnSaveGeminiKey.addEventListener("click", async () => {
      if (el.settingsGeminiKey) {
        const keyVal = el.settingsGeminiKey.value.trim();
        if (!keyVal) {
          state.geminiApiKey = "";
          localStorage.removeItem("quickmacros_gemini_key");
          showToast("Chave API do Gemini removida.");
          return;
        }

        const originalHTML = el.btnSaveGeminiKey.innerHTML;
        el.btnSaveGeminiKey.disabled = true;
        el.btnSaveGeminiKey.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px;height:14px;"></i> Testando...`;
        lucide.createIcons();

        const result = await testGeminiAPIKey(keyVal);
        if (result.ok) {
          state.geminiApiKey = keyVal;
          localStorage.setItem("quickmacros_gemini_key", keyVal);
          showToast("Chave API válida e salva com sucesso!");
        } else {
          showToast(`Erro na validação: ${result.error}`, false);
        }

        el.btnSaveGeminiKey.disabled = false;
        el.btnSaveGeminiKey.innerHTML = originalHTML;
        lucide.createIcons();
      }
    });
  }

  const geminiForm = document.getElementById("gemini-key-form");
  if (geminiForm) {
    geminiForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }


  document.addEventListener("click", () => {
    el.colorPalettePopover.classList.add("hidden");
    if (el.highlightPalettePopover) el.highlightPalettePopover.classList.add("hidden");
    el.emojiPicker.classList.add("hidden");
  });

  el.btnGoToVariablesTab.addEventListener("click", () =>
    switchTab("variables"),
  );

  // View mode toggle
  if (el.btnViewGrid) {
    el.btnViewGrid.addEventListener("click", () => {
      state.macrosViewMode = "grid";
      localStorage.setItem("quickmacros_view_mode", "grid");
      renderMacrosList();
    });
  }
  if (el.btnViewList) {
    el.btnViewList.addEventListener("click", () => {
      state.macrosViewMode = "list";
      localStorage.setItem("quickmacros_view_mode", "list");
      renderMacrosList();
    });
  }

  // Keyboard Shortcuts (Ctrl+K and Ctrl+S)
  document.addEventListener("keydown", (e) => {
    const isCmdOrCtrl = e.ctrlKey || e.metaKey;
    if (!isCmdOrCtrl) return;

    if (e.key.toLowerCase() === "k") {
      e.preventDefault();
      switchTab("macros");
      if (el.searchInput) {
        el.searchInput.focus();
        el.searchInput.select();
      }
    }

    if (e.key.toLowerCase() === "s") {
      const editorTab = document.getElementById("tab-editor");
      if (editorTab && !editorTab.classList.contains("hidden")) {
        e.preventDefault();
        const form = document.getElementById("editor-form");
        if (form) form.requestSubmit();
      }
    }
  });

  window.addEventListener("online", updateCloudSyncStatus);
  window.addEventListener("offline", updateCloudSyncStatus);

  // Macros tab
  el.btnNewMacro.addEventListener("click", () => openEditor(null, "macros"));
  el.searchInput.addEventListener("input", renderMacrosList);
  el.macrosCategoryFilter.addEventListener("change", renderMacrosList);

  // Variables type toggle
  el.varTypeSelect.addEventListener("change", (e) => {
    el.varStaticContainer.classList.toggle(
      "hidden",
      e.target.value === "temporal",
    );
    el.varTemporalContainer.classList.toggle(
      "hidden",
      e.target.value !== "temporal",
    );
  });

  el.btnAddTaskRule.addEventListener("click", () => addTemporalRuleInputRow());

  el.varManagerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = el.varNameInput.value.trim();
    const type = el.varTypeSelect.value;
    if (!name) return;

    let obj = { name, type, color: el.varColorInput.value };
    if (type === "static") {
      obj.defaultVal = el.varDefaultValInput.value.trim();
    } else {
      const rows = el.temporalRulesList.querySelectorAll(".temporal-rule-row");
      const rules = [];
      rows.forEach((r) => {
        const inputs = r.querySelectorAll("input");
        rules.push({
          val: inputs[0].value.trim(),
          start: inputs[1].value,
          end: inputs[2].value,
        });
      });
      if (rules.length === 0) {
        showToast("Adicione pelo menos uma regra temporal.", false);
        return;
      }
      if (checkTimeOverlap(rules)) {
        showToast("Conflito de horários detectado!", false);
        return;
      }
      obj.rules = rules;
    }

    const idx = state.variables.findIndex(
      (v) => v.name.toLowerCase() === name.toLowerCase(),
    );
    if (idx !== -1) {
      state.variables[idx] = obj;
      showToast("Variável atualizada.");
    } else {
      state.variables.push(obj);
      showToast("Variável cadastrada.");
    }

    saveData("quickmacros_variables", state.variables);
    el.varManagerForm.reset();
    el.varColorInput.value = getRandomColor(state.variables.map((v) => v.color));
    const varHexLbl = el.varManagerForm.querySelector(".color-hex-label");
    if (varHexLbl) varHexLbl.textContent = el.varColorInput.value;
    refreshCustomSelect(el.varTypeSelect);
    el.temporalRulesList.innerHTML = "";
    el.varStaticContainer.classList.remove("hidden");
    el.varTemporalContainer.classList.add("hidden");
    renderConfigVariables();
    renderEditorHelperVariables();
  });

  el.categoryManagerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = el.catNameInput.value.trim();
    const color = el.catColorInput.value;
    if (!name) return;
    const id = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_");
    if (state.categories.some((c) => c.id === id)) {
      showToast("Esta categoria já existe.", false);
      return;
    }
    state.categories.push({ id, name, color });
    saveData("quickmacros_categories", state.categories);
    el.categoryManagerForm.reset();
    el.catColorInput.value = getRandomColor(state.categories.map((c) => c.color));
    const catHexLbl = el.categoryManagerForm.querySelector(".color-hex-label");
    if (catHexLbl) catHexLbl.textContent = el.catColorInput.value;
    renderConfigCategories();
    renderCategoriesSelectors();
    renderMacrosCategoryFilterOptions();
    showToast("Categoria cadastrada.");
  });

  el.varColorInput.addEventListener("input", (e) => {
    const lbl = el.varManagerForm.querySelector(".color-hex-label");
    if (lbl) lbl.textContent = e.target.value;
  });

  el.catColorInput.addEventListener("input", (e) => {
    const lbl = el.categoryManagerForm.querySelector(".color-hex-label");
    if (lbl) lbl.textContent = e.target.value;
  });

  // Settings
  el.btnExportData.addEventListener("click", exportDatabase);
  el.btnImportTrigger.addEventListener("click", () =>
    el.importDataFile.click(),
  );
  el.importDataFile.addEventListener("change", importDatabase);
  el.btnResetData.addEventListener("click", () => {
    if (confirm("Apagar todos os dados e restaurar exemplos?")) {
      localStorage.clear();
      initDatabase();
      renderMacrosList();
      renderConfigVariables();
      renderConfigCategories();
      renderCategoriesSelectors();
      renderMacrosCategoryFilterOptions();
      switchTab("dashboard");
      showToast("Banco de dados restaurado!");
    }
  });

  // Toggle AI Tutorial Box
  document.getElementById("btn-toggle-ai-tutorial")?.addEventListener("click", () => {
    const tutorialBox = document.getElementById("ai-tutorial-box");
    if (tutorialBox) {
      tutorialBox.classList.toggle("hidden");
    }
  });

  // Mobile shortcuts and Visual Theme in Settings
  document.getElementById("btn-toggle-theme-settings")?.addEventListener("click", () => {
    const nextTheme = state.currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
  document.getElementById("btn-mobile-settings")?.addEventListener("click", () => switchTab("settings"));
  document.getElementById("btn-mobile-help")?.addEventListener("click", () => switchTab("help"));
}

// =============================================
// BACKUP
// =============================================
function exportDatabase() {
  const data = {
    macros: state.macros,
    categories: state.categories,
    variables: state.variables,
    theme: state.currentTheme,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quickmacro_backup_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Backup exportado!");
}

function importDatabase(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (!imported.macros || !imported.categories || !imported.variables)
        throw new Error();
      state.macros = imported.macros;
      state.categories = imported.categories;
      state.variables = imported.variables;
      state.currentTheme = imported.theme || "light";
      saveData("quickmacros_data", state.macros);
      saveData("quickmacros_categories", state.categories);
      saveData("quickmacros_variables", state.variables);
      localStorage.setItem("quickmacros_theme", state.currentTheme);
      applyTheme(state.currentTheme);
      renderMacrosList();
      renderConfigVariables();
      renderConfigCategories();
      renderCategoriesSelectors();
      renderMacrosCategoryFilterOptions();
      switchTab("dashboard");
      showToast("Dados importados!");
    } catch {
      showToast("Arquivo de backup inválido.", false);
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

// =============================================
// TOAST
// =============================================
function showToast(message, isSuccess = true) {
  el.toastMessage.textContent = message;
  const iw = el.toast.querySelector(".toast-icon-wrapper");
  if (iw) {
    el.toast.style.backgroundColor = isSuccess
      ? "var(--color-success)"
      : "var(--color-danger)";
    iw.innerHTML = isSuccess
      ? `<i data-lucide="check-circle" class="toast-icon"></i>`
      : `<i data-lucide="alert-triangle" class="toast-icon"></i>`;
    lucide.createIcons();
  }
  el.toast.classList.remove("hidden");
  setTimeout(() => el.toast.classList.add("hidden"), 2800);
}

// =============================================
// UTILS
// =============================================
function escapeHTML(str) {
  if (!str) return "";
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        tag
      ] || tag,
  );
}

const COLOR_PALETTE = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231",
  "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabed4",
  "#469990", "#dcbeff", "#9A6324", "#800000", "#aaffc3",
  "#808000", "#ffd8b1", "#000075", "#a9a9a9", "#e6beff",
];

function getRandomColor(existing = []) {
  const used = new Set(existing);
  const avail = COLOR_PALETTE.filter((c) => !used.has(c));
  if (avail.length > 0) {
    return avail[Math.floor(Math.random() * avail.length)];
  }
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// =============================================
// CUSTOM SELECT
// =============================================
function initCustomSelects() {
  document.querySelectorAll("select").forEach(enhanceSelect);
}

function enhanceSelect(selectEl) {
  if (selectEl.dataset.customSelect || selectEl.dataset.noCustom === "true" || selectEl.id === "editor-ai-tone") return;
  selectEl.dataset.customSelect = "true";

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select-wrapper";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "custom-select-trigger";
  trigger.innerHTML = `
    <span class="custom-select-value">${selectEl.options[selectEl.selectedIndex]?.text || ""}</span>
    <i data-lucide="chevron-down" class="arrow" style="width:16px;height:16px;"></i>
  `;

  const dropdown = document.createElement("div");
  dropdown.className = "custom-select-dropdown hidden";

  function buildOptions() {
    dropdown.innerHTML = "";
    [...selectEl.options].forEach((opt, i) => {
      const item = document.createElement("div");
      item.className = "custom-select-option";
      if (i === selectEl.selectedIndex) item.classList.add("selected");
      item.textContent = opt.text;
      item.dataset.value = opt.value;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        selectEl.value = opt.value;
        selectEl.dispatchEvent(new Event("change", { bubbles: true }));
        closeDropdown();
      });
      dropdown.appendChild(item);
    });
  }

  function syncValue() {
    const val = trigger.querySelector(".custom-select-value");
    val.textContent = selectEl.options[selectEl.selectedIndex]?.text || "";
    dropdown.querySelectorAll(".custom-select-option").forEach((item) => {
      item.classList.toggle("selected", item.dataset.value === selectEl.value);
    });
  }

  function openDropdown() {
    buildOptions();
    dropdown.classList.remove("hidden");
    trigger.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    dropdown.classList.add("hidden");
    trigger.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains("hidden")) {
      openDropdown();
    } else {
      closeDropdown();
    }
  });

  selectEl.addEventListener("change", syncValue);

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) closeDropdown();
  });

  selectEl.parentNode.insertBefore(wrapper, selectEl);
  wrapper.appendChild(trigger);
  wrapper.appendChild(dropdown);
  wrapper.appendChild(selectEl);

  selectEl.classList.add("custom-select-native");

  selectEl._customRefresh = function () {
    const val = trigger.querySelector(".custom-select-value");
    val.textContent = selectEl.options[selectEl.selectedIndex]?.text || "";
    buildOptions();
    dropdown.querySelectorAll(".custom-select-option").forEach((item) => {
      item.classList.toggle("selected", item.dataset.value === selectEl.value);
    });
  };

  lucide.createIcons();
}

function refreshCustomSelect(selectEl) {
  if (selectEl && selectEl._customRefresh) selectEl._customRefresh();
}

async function callGeminiAI(text) {
  if (!state.geminiApiKey) {
    showToast("Por favor, configure sua chave do Gemini nas Configurações.", false);
    return null;
  }

  const activeVars = state.variables.map(v => `{${v.name}}`).join(", ");
  const varInstruction = activeVars
    ? `Variáveis disponíveis do sistema: ${activeVars}. Mantenha as tags HTML de variáveis existentes.`
    : "";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": state.geminiApiKey
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Você é um assistente de escrita profissional para macros de respostas rápidas de atendimento.
          Use um tom de voz estritamente profissional, cortês, claro e objetivo.
          ${varInstruction}
          Corrija erros ortográficos e de concordância, escreva de maneira mais fluida e melhore a formatação visual do texto a seguir.
          Mantenha o formato HTML, links e as variáveis em formato HTML.
          Retorne APENAS o texto revisado e polido final (não use markdown block como \`\`\`html ou similar, retorne a string direta de HTML).

Texto original:
${text}`
        }]
      }]
    })
  });
  
  if (!response.ok) {
    throw new Error("Erro na chamada à API do Gemini.");
  }
  
  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Sem resposta válida do Gemini.");
  
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```html")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

async function testGeminiAPIKey(key) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Olá"
          }]
        }]
      })
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.error?.message || "Erro desconhecido da API.";
      return { ok: false, error: msg };
    }
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: err.message || "Erro de conexão de rede." };
  }
}


// =============================================
// FIREBASE AUTH + FIRESTORE MODULE
// =============================================
const fbAuth = {
  currentUser: null,

  requireAuth() {
    if (!this.currentUser) {
      const modal = document.getElementById("modal-auth");
      if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("active");
      }
      document.getElementById("auth-tab-login")?.click();
      return false;
    }
    return true;
  },

  closeAuthModal() {
    const modal = document.getElementById("modal-auth");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("active");
    }
    // Restore tabs and forms to default (login form)
    const tabs = document.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = "flex";
    document.getElementById("auth-tab-login")?.classList.add("active");
    document.getElementById("auth-tab-register")?.classList.remove("active");
    document.getElementById("auth-login-form")?.classList.remove("hidden");
    document.getElementById("auth-register-form")?.classList.add("hidden");
    document.getElementById("auth-recovery-form")?.classList.add("hidden");
    document.getElementById("auth-email-link-form")?.classList.add("hidden");
  },

  generateTeamCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  },

  async getUserDoc(uid) {
    if (!window._fbDb || !window._fbFns) return null;
    const { doc, getDoc } = window._fbFns;
    const snap = await getDoc(doc(window._fbDb, "users", uid));
    return snap.exists() ? snap.data() : null;
  },

  async setUserDoc(uid, data) {
    if (!window._fbDb || !window._fbFns) return;
    const { doc, setDoc } = window._fbFns;
    await setDoc(doc(window._fbDb, "users", uid), data, { merge: true });
  },

  async ensureUserProfile(user) {
    let profile = await this.getUserDoc(user.uid);
    if (!profile) {
      profile = {
        uid: user.uid,
        name: user.displayName || "Usuário",
        email: user.email || "",
        photoURL: user.photoURL || "",
        teamCode: this.generateTeamCode(),
        teamMembers: [],
        sharedMacros: [],
        createdAt: new Date().toISOString(),
      };
      await this.setUserDoc(user.uid, profile);
      await fbFirestore.saveAllData();
    }
    state.userProfile = profile;
    return profile;
  },

  async login(email, password) {
    if (!window._fbAuth || !window._fbFns) return { ok: false, error: "Firebase não carregado." };
    try {
      const cred = await window._fbFns.signInWithEmailAndPassword(window._fbAuth, email, password);
      return { ok: true, user: cred.user };
    } catch (e) { return { ok: false, error: this.translateError(e.code) }; }
  },

  async register(name, email, password) {
    if (!window._fbAuth || !window._fbFns) return { ok: false, error: "Firebase não carregado." };
    try {
      const cred = await window._fbFns.createUserWithEmailAndPassword(window._fbAuth, email, password);
      await window._fbFns.updateProfile(cred.user, { displayName: name });
      return { ok: true, user: cred.user };
    } catch (e) { return { ok: false, error: this.translateError(e.code) }; }
  },

  async loginWithGoogle() {
    if (!window._fbAuth || !window._fbFns) return { ok: false, error: "Firebase não carregado." };
    try {
      const cred = await window._fbFns.signInWithPopup(window._fbAuth, window._fbGoogleProvider);
      return { ok: true, user: cred.user };
    } catch (e) {
      if (e.code === "auth/popup-closed-by-user") return { ok: false, error: null };
      return { ok: false, error: this.translateError(e.code) };
    }
  },

  async logout() {
    if (window._fbAuth && window._fbFns) await window._fbFns.signOut(window._fbAuth);
  },

  translateError(code) {
    const map = {
      "auth/invalid-email": "E-mail inválido.",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/invalid-credential": "E-mail ou senha incorretos.",
      "auth/email-already-in-use": "Este e-mail já está cadastrado.",
      "auth/weak-password": "Senha muito fraca. Use ao menos 6 caracteres.",
      "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
      "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    };
    return map[code] || "Ocorreu um erro. Tente novamente.";
  },

  updateSidebarUI(user) {
    const icon = document.getElementById("sidebar-avatar-icon");
    const text = document.getElementById("sidebar-avatar-text");
    const img  = document.getElementById("sidebar-avatar-img");
    const notifBtn = document.getElementById("btn-sidebar-notif");
    const profileBtn = document.getElementById("btn-sidebar-profile");

    if (!user) {
      icon?.classList.remove("hidden");
      text?.classList.add("hidden");
      img?.classList.add("hidden");
      notifBtn?.classList.add("hidden");
      if (profileBtn) { profileBtn.style.background = ""; profileBtn.style.border = ""; }
      return;
    }

    notifBtn?.classList.remove("hidden");
    icon?.classList.add("hidden");

    if (user.photoURL) {
      if (img) { img.src = user.photoURL; img.classList.remove("hidden"); }
      text?.classList.add("hidden");
    } else {
      const initials = (user.displayName || user.email || "U").charAt(0).toUpperCase();
      if (text) { text.textContent = initials; text.classList.remove("hidden"); }
      img?.classList.add("hidden");
    }

    if (profileBtn) {
      profileBtn.style.background = "var(--gradient-primary)";
      profileBtn.style.border = "none";
    }
  },

  init() {
    const tryListen = async () => {
      if (!window._fbAuth || !window._fbFns) return;
      
      // Check for passwordless email link sign-in
      if (window._fbFns.isSignInWithEmailLink(window._fbAuth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Por favor, informe seu e-mail para confirmar o acesso:');
        }
        if (email) {
          try {
            await window._fbFns.signInWithEmailLink(window._fbAuth, email, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            // Clean url
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast("Login realizado com sucesso!", "success");
          } catch (err) {
            showToast("Erro ao realizar login sem senha: " + err.message, "error");
          }
        }
      }

      window._fbFns.onAuthStateChanged(window._fbAuth, async (user) => {
        this.currentUser = user;
        this.updateSidebarUI(user);
        if (typeof updateCloudSyncStatus === "function") updateCloudSyncStatus();
        
        if (fbAuth.profileUnsubscribe) {
          fbAuth.profileUnsubscribe();
          fbAuth.profileUnsubscribe = null;
        }

        if (user) {
          this.closeAuthModal();
          await this.ensureUserProfile(user);
          await fbFirestore.loadData(user.uid);
          
          // Setup real-time listener for user profile doc
          const { doc, onSnapshot } = window._fbFns;
          fbAuth.profileUnsubscribe = onSnapshot(doc(window._fbDb, "users", user.uid), (docSnap) => {
            if (docSnap.exists()) {
              state.userProfile = docSnap.data();
              fbProfile.refresh();
              fbTeam.refresh();
              renderMacrosList(); // Keep cards updated with shared badges
            }
          });

          // Show the Share button
          const shareBtn = document.getElementById("btn-share-macros-modal");
          if (shareBtn) shareBtn.style.display = "inline-flex";
        } else {
          // Hide Share button when logged out
          const shareBtn = document.getElementById("btn-share-macros-modal");
          if (shareBtn) shareBtn.style.display = "none";
        }
      });
    };
    if (window._fbAuth) { tryListen(); }
    else { document.addEventListener("firebase-ready", tryListen); }
  },
};

// =============================================
// FIRESTORE DATA LAYER
// =============================================
const fbFirestore = {
  async loadData(uid) {
    if (!window._fbDb || !window._fbFns) return;
    const { collection, getDocs } = window._fbFns;
    const db = window._fbDb;
    try {
      const [macroDocs, varDocs, catDocs] = await Promise.all([
        getDocs(collection(db, "users", uid, "macros")),
        getDocs(collection(db, "users", uid, "variables")),
        getDocs(collection(db, "users", uid, "categories")),
      ]);
      if (!macroDocs.empty) state.macros = macroDocs.docs.map(d => d.data());
      if (!varDocs.empty) {
        state.variables = varDocs.docs
          .map(d => d.data())
          .filter(v => v && v.name && v.name !== "Layout");
      }
      if (!catDocs.empty) state.categories = catDocs.docs.map(d => d.data());

      _origSaveData("quickmacros_data", state.macros);
      _origSaveData("quickmacros_variables", state.variables);
      _origSaveData("quickmacros_categories", state.categories);

      renderMacrosList(); renderConfigVariables(); renderConfigCategories();
      renderCategoriesSelectors(); renderMacrosCategoryFilterOptions();
      checkMacrosExistState(); lucide.createIcons(); initCustomSelects();
    } catch (e) { console.warn("Firestore offline:", e.message); }
  },

  async saveMacro(macro) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const { doc, setDoc } = window._fbFns;
    await setDoc(doc(window._fbDb, "users", fbAuth.currentUser.uid, "macros", macro.id), macro);
  },

  async deleteMacro(macroId) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const { doc, deleteDoc } = window._fbFns;
    await deleteDoc(doc(window._fbDb, "users", fbAuth.currentUser.uid, "macros", macroId));
  },

  async saveCategories() {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const uid = fbAuth.currentUser.uid;
    const { doc, setDoc, deleteDoc, collection, getDocs } = window._fbFns;
    const db = window._fbDb;
    try {
      const existingSnap = await getDocs(collection(db, "users", uid, "categories"));
      const activeIds = state.categories.map(c => c.id);
      const promises = [];

      state.categories.forEach(c => {
        promises.push(setDoc(doc(db, "users", uid, "categories", c.id), c));
      });

      existingSnap.docs.forEach(d => {
        if (!activeIds.includes(d.id)) {
          promises.push(deleteDoc(doc(db, "users", uid, "categories", d.id)));
        }
      });

      await Promise.all(promises);
    } catch(e) { console.warn("Error syncing categories:", e); }
  },

  async deleteCategory(catId) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const { doc, deleteDoc } = window._fbFns;
    await deleteDoc(doc(window._fbDb, "users", fbAuth.currentUser.uid, "categories", catId));
    await this.saveCategories();
  },

  async saveVariables() {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const uid = fbAuth.currentUser.uid;
    const { doc, setDoc, deleteDoc, collection, getDocs } = window._fbFns;
    const db = window._fbDb;
    try {
      const existingSnap = await getDocs(collection(db, "users", uid, "variables"));
      const makeVarId = (name) => encodeURIComponent(name.trim().toLowerCase());
      const activeVarIds = state.variables.map(v => makeVarId(v.name));
      const promises = [];

      state.variables.forEach(v => {
        const varId = makeVarId(v.name);
        promises.push(setDoc(doc(db, "users", uid, "variables", varId), v));
      });

      existingSnap.docs.forEach(d => {
        if (!activeVarIds.includes(d.id)) {
          promises.push(deleteDoc(doc(db, "users", uid, "variables", d.id)));
        }
      });

      await Promise.all(promises);
    } catch(e) { console.warn("Error syncing variables:", e); }
  },

  async deleteVariable(varName) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const { doc, deleteDoc } = window._fbFns;
    const varId = encodeURIComponent(varName.trim().toLowerCase());
    await deleteDoc(doc(window._fbDb, "users", fbAuth.currentUser.uid, "variables", varId));
    await this.saveVariables();
  },

  async saveAllData() {
    await Promise.all([
      ...state.macros.map(m => this.saveMacro(m)),
      this.saveCategories(),
      this.saveVariables(),
    ]);
  },
};

// Patch saveData to sync Firestore
const _origSaveData = saveData;
saveData = function(key, data) {
  _origSaveData(key, data);
  if (!fbAuth.currentUser) return;
  if (key === "quickmacros_data") state.macros.forEach(m => fbFirestore.saveMacro(m));
  else if (key === "quickmacros_categories") fbFirestore.saveCategories();
  else if (key === "quickmacros_variables") fbFirestore.saveVariables();
  else fbFirestore.saveAllData();
};

// =============================================
// PROFILE MODULE
// =============================================
const fbProfile = {
  refresh() {
    const user = fbAuth.currentUser;
    const profile = state.userProfile;
    if (!user || !profile) return;

    const nameEl = document.getElementById("profile-display-name");
    const emailEl = document.getElementById("profile-email");
    const codeEl = document.getElementById("profile-team-code");
    const img = document.getElementById("profile-avatar-img");
    const initials = document.getElementById("profile-avatar-initials");

    if (nameEl) nameEl.textContent = user.displayName || profile.name || "Usuário";
    if (emailEl) emailEl.textContent = user.email || "";
    if (codeEl) codeEl.textContent = profile.teamCode || "----";

    if (user.photoURL) {
      if (img) { img.src = user.photoURL; img.classList.remove("hidden"); }
      if (initials) initials.textContent = "";
    } else {
      img?.classList.add("hidden");
      if (initials) initials.textContent = (user.displayName || user.email || "U").charAt(0).toUpperCase();
    }
    this.renderShareList();
    lucide.createIcons();
  },

  renderShareList() {
    const container = document.getElementById("profile-share-macros-list");
    if (!container) return;
    const shared = (state.userProfile?.sharedMacros || []);
    container.innerHTML = "";
    if (state.macros.length === 0) {
      container.innerHTML = `<p style="font-size:13px;color:var(--text-muted);">Nenhuma macro criada ainda.</p>`;
      return;
    }
    state.macros.forEach(macro => {
      const isShared = shared.includes(macro.id);
      const row = document.createElement("div");
      row.className = "profile-share-row";
      row.innerHTML = `
        <span>${escapeHTML(macro.title)}</span>
        <label class="toggle-switch">
          <input type="checkbox" data-id="${macro.id}" ${isShared ? "checked" : ""}>
          <span class="toggle-slider"></span>
        </label>
      `;
      row.querySelector("input").addEventListener("change", async (e) => {
        let arr = (state.userProfile?.sharedMacros || []).slice();
        if (e.target.checked) { if (!arr.includes(macro.id)) arr.push(macro.id); }
        else { arr = arr.filter(x => x !== macro.id); }
        state.userProfile.sharedMacros = arr;
        await fbAuth.setUserDoc(fbAuth.currentUser.uid, { sharedMacros: arr });
      });
      container.appendChild(row);
    });
  },

  openShareModal() {
    const list = el.shareModalList;
    if (!list) return;
    list.innerHTML = "";
    
    const shared = (state.userProfile?.sharedMacros || []);
    if (state.macros.length === 0) {
      list.innerHTML = `<p style="font-size:13px; color:var(--text-muted); padding:10px;">Nenhuma macro criada ainda.</p>`;
      el.modalShareMacros?.classList.add("active");
      return;
    }
    
    state.macros.forEach(macro => {
      const isShared = shared.includes(macro.id);
      const row = document.createElement("div");
      row.className = "profile-share-row";
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "10px 14px";
      row.style.border = "1px solid var(--glass-border)";
      row.style.borderRadius = "var(--radius-md)";
      row.style.background = "var(--glass-bg-low)";
      row.style.marginBottom = "8px";
      
      row.innerHTML = `
        <div style="text-align:left; flex:1; padding-right:12px;">
          <div style="font-weight:600; font-size:14px; color:var(--text-primary);">${escapeHTML(macro.title)}</div>
          <div style="font-size:12px; color:var(--text-muted);">${escapeHTML(macro.description || "Sem descrição")}</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" data-id="${macro.id}" ${isShared ? "checked" : ""}>
          <span class="toggle-slider"></span>
        </label>
      `;
      list.appendChild(row);
    });
    el.modalShareMacros?.classList.add("active");
  },

  async saveShares() {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const checkboxes = el.shareModalList.querySelectorAll("input[type='checkbox']");
    const arr = [];
    checkboxes.forEach(cb => {
      if (cb.checked) arr.push(cb.getAttribute("data-id"));
    });
    
    try {
      state.userProfile.sharedMacros = arr;
      await fbAuth.setUserDoc(fbAuth.currentUser.uid, { sharedMacros: arr });
      el.modalShareMacros?.classList.remove("active");
      showToast("Compartilhamento atualizado com sucesso!", "success");
      renderMacrosList();
    } catch (e) {
      showToast("Erro ao salvar compartilhamento.", "error");
      console.error(e);
    }
  }
};

// =============================================
// TEAM MODULE
// =============================================
const fbTeam = {
  refresh() {
    const profile = state.userProfile || {};
    const members = profile.teamMembers || [];
    const invites = profile.pendingInvites || [];

    // Update Sidebar badge for pending invites
    const badge = document.getElementById("badge-team-invites");
    if (badge) {
      if (invites.length > 0) {
        badge.textContent = invites.length;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
    
    // Render Pending Invites
    const invitesContainer = document.getElementById("team-invites-container");
    const invitesList = document.getElementById("team-invites-list");
    if (invitesContainer && invitesList) {
      invitesList.innerHTML = "";
      if (invites.length > 0) {
        invitesContainer.classList.remove("hidden");
        invites.forEach(inv => {
          const row = document.createElement("div");
          row.className = "team-member-card";
          row.style.display = "flex";
          row.style.flexDirection = "row";
          row.style.justifyContent = "space-between";
          row.style.alignItems = "center";
          row.style.padding = "16px 20px";
          row.style.width = "100%";
          
          const initials = (inv.name || "?").charAt(0).toUpperCase();
          const photoHtml = inv.photoURL ? `<img src="${escapeHTML(inv.photoURL)}" alt="" style="width:36px;height:36px;border-radius:50%;">` : initials;
          
          row.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="team-member-avatar" style="width:36px;height:36px;margin:0;display:flex;align-items:center;justify-content:center;">${photoHtml}</div>
              <div style="text-align:left;">
                <div class="team-member-name" style="margin:0; font-weight:600;">${escapeHTML(inv.name)}</div>
                <div style="font-size:12px; color:var(--text-muted);">Código: #${escapeHTML(inv.teamCode)}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-primary btn-small btn-approve" style="padding: 6px 12px; font-size:12px; border-radius:10px;">Aceitar</button>
              <button class="btn btn-secondary btn-small btn-reject" style="padding: 6px 12px; font-size:12px; border-radius:10px;">Recusar</button>
            </div>
          `;
          
          row.querySelector(".btn-approve").addEventListener("click", async () => {
            await this.approveInvite(inv);
          });
          row.querySelector(".btn-reject").addEventListener("click", async () => {
            await this.rejectInvite(inv);
          });
          
          invitesList.appendChild(row);
        });
      } else {
        invitesContainer.classList.add("hidden");
      }
    }

    const list = document.getElementById("team-members-list");
    const empty = document.getElementById("team-empty-state");
    if (!list) return;
    list.innerHTML = "";
    if (members.length === 0) { empty?.classList.remove("hidden"); return; }
    empty?.classList.add("hidden");

    members.forEach(member => {
      const card = document.createElement("div");
      card.className = "team-member-card";
      const initials = (member.name || "?").charAt(0).toUpperCase();
      const photoHtml = member.photoURL ? `<img src="${escapeHTML(member.photoURL)}" alt="">` : initials;
      card.innerHTML = `
        <div class="team-member-avatar">${photoHtml}</div>
        <div class="team-member-name">${escapeHTML(member.name)}</div>
        <div class="team-member-code" style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Código: #${escapeHTML(member.teamCode)}</div>
        <div class="team-member-hint">Clique para ver macros</div>
        <button class="team-member-remove" data-uid="${escapeHTML(member.uid)}">
          <i data-lucide="user-minus"></i> Remover
        </button>
      `;
      card.addEventListener("click", (e) => {
        if (e.target.closest(".team-member-remove")) return;
        this.openMemberLibrary(member);
      });
      card.querySelector(".team-member-remove").addEventListener("click", async (e) => {
        e.stopPropagation();
        await this.removeMember(member.uid);
      });
      list.appendChild(card);
    });
    lucide.createIcons();
  },

  async openMemberLibrary(member) {
    this.activeMember = member;
    document.getElementById("team-members-view")?.classList.add("hidden");
    const libView = document.getElementById("team-library-view");
    libView?.classList.remove("hidden");
    const libList = document.getElementById("team-lib-macro-list");
    const libEmpty = document.getElementById("team-lib-empty");
    const libTitle = document.getElementById("team-lib-member-name");
    if (libTitle) libTitle.textContent = `Macros de ${member.name}`;
    if (libList) libList.innerHTML = `<li style="padding:20px;color:var(--text-muted);">Carregando...</li>`;

    let macros = [];
    try {
      const memberProfile = await fbAuth.getUserDoc(member.uid);
      const sharedIds = memberProfile?.sharedMacros || [];
      if (sharedIds.length > 0 && window._fbFns) {
        const { collection, getDocs } = window._fbFns;
        const snap = await getDocs(collection(window._fbDb, "users", member.uid, "macros"));
        macros = snap.docs.map(d => d.data()).filter(m => sharedIds.includes(m.id));
      }
    } catch(e) { console.warn(e); }

    this.memberMacros = macros;
    const renderFiltered = (filterText = "") => {
      if (!libList) return;
      libList.innerHTML = "";
      const q = filterText.toLowerCase().trim();
      const filtered = (this.memberMacros || []).filter(m =>
        m.title.toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q) ||
        m.body.toLowerCase().includes(q)
      );

      if (filtered.length === 0) {
        libEmpty?.classList.remove("hidden");
        return;
      }
      libEmpty?.classList.add("hidden");

      filtered.forEach(macro => {
        const item = document.createElement("div");
        item.className = "team-lib-macro-item";
        item.style.cursor = "pointer";
        item.innerHTML = `
          <div class="team-lib-macro-info">
            <div class="team-lib-macro-title">${escapeHTML(macro.title)}</div>
            <div class="team-lib-macro-desc">${escapeHTML(macro.description || "")}</div>
          </div>
          <div style="display:flex; gap:8px; margin-top: auto; padding-top: 10px;">
            <button class="btn btn-secondary btn-small btn-icon-text btn-preview-macro" style="flex: 1; justify-content: center; padding: 10px; border-radius: 10px;">
              <i data-lucide="eye"></i> Visualizar
            </button>
            <button class="btn btn-primary btn-small btn-icon-text btn-copy-macro" style="flex: 1; justify-content: center; padding: 10px; border-radius: 10px;">
              <i data-lucide="copy"></i> Copiar
            </button>
          </div>
        `;

        const handlePreview = (e) => {
          if (e.target.closest(".btn-copy-macro")) return;
          openPrefillPage(macro, "team");
        };

        item.addEventListener("click", handlePreview);

        item.querySelector(".btn-copy-macro").addEventListener("click", async (e) => {
          e.stopPropagation();
          const copy = { ...macro, id: `copy_${Date.now()}`, copied_count: 0 };
          state.macros.unshift(copy);
          saveData("quickmacros_data", state.macros);
          await fbFirestore.saveMacro(copy);
          showToast(`"${macro.title}" copiada para suas macros!`, "success");
          lucide.createIcons();
        });

        if (libList) libList.appendChild(item);
      });
      lucide.createIcons();
    };

    const searchInput = document.getElementById("team-lib-search-input");
    if (searchInput) {
      searchInput.value = "";
      searchInput.oninput = () => renderFiltered(searchInput.value);
    }
    renderFiltered("");
  },

  async addMemberByCode(code) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    const upperCode = code.trim().toUpperCase();
    if (upperCode.length !== 4) { showToast("Código inválido. Use 4 caracteres.", "error"); return; }
    if (upperCode === (state.userProfile?.teamCode || "")) { showToast("Você não pode adicionar a si mesmo.", "error"); return; }
    
    // Check if they are already in the team
    if ((state.userProfile?.teamMembers || []).find(m => m.teamCode === upperCode)) {
      showToast("Este membro já está na sua equipe.", "error"); return;
    }

    try {
      const { collection, getDocs, query, where } = window._fbFns;
      const q = query(collection(window._fbDb, "users"), where("teamCode", "==", upperCode));
      const snap = await getDocs(q);
      if (snap.empty) { showToast("Nenhum usuário encontrado com esse código.", "error"); return; }
      
      const targetUser = snap.docs[0].data();
      const targetUid = targetUser.uid;

      // Check if invite was already sent
      const targetInvites = targetUser.pendingInvites || [];
      if (targetInvites.find(inv => inv.uid === fbAuth.currentUser.uid)) {
        showToast("Você já enviou um convite para este usuário.", "warning");
        return;
      }

      // Prepare invite structure
      const invite = {
        uid: fbAuth.currentUser.uid,
        name: fbAuth.currentUser.displayName || state.userProfile?.name || "Usuário",
        photoURL: fbAuth.currentUser.photoURL || state.userProfile?.photoURL || "",
        teamCode: state.userProfile?.teamCode || ""
      };
      
      targetInvites.push(invite);
      await fbAuth.setUserDoc(targetUid, { pendingInvites: targetInvites });
      
      showToast("Solicitação de equipe enviada! Aguardando aprovação.", "success");
      const inpProfile = document.getElementById("input-member-code");
      const inpTeam = document.getElementById("input-member-code-team");
      if (inpProfile) inpProfile.value = "";
      if (inpTeam) inpTeam.value = "";
    } catch(e) {
      showToast("Erro ao enviar solicitação.", "error");
      console.error(e);
    }
  },

  async approveInvite(inv) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    try {
      // 1. Add sender (inv) to current user's teamMembers
      const currentUserProfile = state.userProfile || {};
      const currentMembers = currentUserProfile.teamMembers || [];
      const newMemberForCurrent = {
        uid: inv.uid,
        name: inv.name,
        photoURL: inv.photoURL,
        teamCode: inv.teamCode
      };
      if (!currentMembers.find(m => m.uid === inv.uid)) {
        currentMembers.push(newMemberForCurrent);
      }

      // 2. Remove invite from current user's pendingInvites
      const currentInvites = (currentUserProfile.pendingInvites || []).filter(i => i.uid !== inv.uid);

      // Save current user profile
      await fbAuth.setUserDoc(fbAuth.currentUser.uid, {
        teamMembers: currentMembers,
        pendingInvites: currentInvites
      });

      // 3. Add current user to sender's (inv) teamMembers
      const senderProfile = await fbAuth.getUserDoc(inv.uid);
      if (senderProfile) {
        const senderMembers = senderProfile.teamMembers || [];
        const newMemberForSender = {
          uid: fbAuth.currentUser.uid,
          name: fbAuth.currentUser.displayName || currentUserProfile.name || "Usuário",
          photoURL: fbAuth.currentUser.photoURL || currentUserProfile.photoURL || "",
          teamCode: currentUserProfile.teamCode || ""
        };
        if (!senderMembers.find(m => m.uid === fbAuth.currentUser.uid)) {
          senderMembers.push(newMemberForSender);
        }
        await fbAuth.setUserDoc(inv.uid, { teamMembers: senderMembers });
      }

      showToast("Solicitação aceita! Membros conectados.", "success");
    } catch (e) {
      showToast("Erro ao aceitar solicitação.", "error");
      console.error(e);
    }
  },

  async rejectInvite(inv) {
    if (!fbAuth.currentUser || !window._fbFns) return;
    try {
      const currentUserProfile = state.userProfile || {};
      const currentInvites = (currentUserProfile.pendingInvites || []).filter(i => i.uid !== inv.uid);
      await fbAuth.setUserDoc(fbAuth.currentUser.uid, { pendingInvites: currentInvites });
      showToast("Solicitação recusada.", "info");
    } catch (e) {
      showToast("Erro ao recusar solicitação.", "error");
      console.error(e);
    }
  },

  async removeMember(uid) {
    // Remove from current user's teamMembers
    const currentMembers = (state.userProfile?.teamMembers || []).filter(m => m.uid !== uid);
    state.userProfile.teamMembers = currentMembers;
    await fbAuth.setUserDoc(fbAuth.currentUser.uid, { teamMembers: currentMembers });

    // Remove from target user's teamMembers as well (symmetrical)
    try {
      const targetProfile = await fbAuth.getUserDoc(uid);
      if (targetProfile) {
        const targetMembers = (targetProfile.teamMembers || []).filter(m => m.uid !== fbAuth.currentUser.uid);
        await fbAuth.setUserDoc(uid, { teamMembers: targetMembers });
      }
    } catch(e) { console.warn(e); }

    this.refresh();
    showToast("Membro removido da equipe.", "success");
  },

  async checkAddMemberRequests(silent = false) {
    if (!fbAuth.currentUser || !window._fbDb || !window._fbFns) return;
    try {
      const profile = await fbAuth.getUserDoc(fbAuth.currentUser.uid);
      if (profile) {
        const oldInvitesCount = (state.userProfile?.pendingInvites || []).length;
        const newInvitesCount = (profile.pendingInvites || []).length;
        
        state.userProfile = profile;
        if (typeof fbProfile !== "undefined") fbProfile.refresh();
        this.refresh();
        renderMacrosList();
        
        if (!silent) {
          showToast("Solicitações atualizadas!", "success");
        } else if (newInvitesCount > oldInvitesCount) {
          showToast("Você tem uma nova solicitação de membro pendente!", "info");
        }
      }
    } catch (e) {
      console.error("Erro ao verificar solicitações de add membro:", e);
      if (!silent) showToast("Erro ao verificar solicitações.", "error");
    }
  }
};

// =============================================
// HELP ACCORDION
// =============================================
function initHelpAccordion() {
  document.querySelectorAll(".help-accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const body = btn.nextElementSibling;
      const isOpen = btn.classList.contains("active");
      document.querySelectorAll(".help-accordion-btn").forEach(b => {
        b.classList.remove("active");
        b.nextElementSibling?.classList.add("hidden");
      });
      if (!isOpen) { btn.classList.add("active"); body?.classList.remove("hidden"); }
    });
  });
}

// =============================================
// AUTH MODAL EVENTS (second DOMContentLoaded)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  fbAuth.init();
  initHelpAccordion();

  if (sessionStorage.getItem("logout_success_toast") === "true") {
    sessionStorage.removeItem("logout_success_toast");
    showToast("Sessão encerrada.", "success");
  }

  // Periodic check for new member requests (every 15 seconds)
  setInterval(() => {
    if (fbAuth.currentUser && typeof fbTeam !== "undefined") {
      fbTeam.checkAddMemberRequests(true);
    }
  }, 15000);

  // Manual check button
  document.getElementById("btn-refresh-team")?.addEventListener("click", async () => {
    const btn = document.getElementById("btn-refresh-team");
    if (btn) btn.disabled = true;
    if (typeof fbTeam !== "undefined") {
      await fbTeam.checkAddMemberRequests(false);
    }
    if (btn) btn.disabled = false;
  });

  // Auth tab switching
  document.getElementById("auth-tab-login")?.addEventListener("click", () => {
    document.getElementById("auth-tab-login").classList.add("active");
    document.getElementById("auth-tab-register").classList.remove("active");
    document.getElementById("auth-login-form").classList.remove("hidden");
    document.getElementById("auth-register-form").classList.add("hidden");
  });
  document.getElementById("auth-tab-register")?.addEventListener("click", () => {
    document.getElementById("auth-tab-register").classList.add("active");
    document.getElementById("auth-tab-login").classList.remove("active");
    document.getElementById("auth-register-form").classList.remove("hidden");
    document.getElementById("auth-login-form").classList.add("hidden");
  });

  // Login
  document.getElementById("auth-login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = document.getElementById("auth-login-error");
    errEl.classList.add("hidden");
    const result = await fbAuth.login(
      document.getElementById("auth-login-email").value.trim(),
      document.getElementById("auth-login-password").value
    );
    if (!result.ok && result.error) { errEl.textContent = result.error; errEl.classList.remove("hidden"); }
  });

  // Register
  document.getElementById("auth-register-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = document.getElementById("auth-reg-error");
    errEl.classList.add("hidden");
    const pass = document.getElementById("auth-reg-password").value;
    const confirm = document.getElementById("auth-reg-confirm").value;
    if (pass !== confirm) { errEl.textContent = "As senhas não coincidem."; errEl.classList.remove("hidden"); return; }
    const result = await fbAuth.register(
      document.getElementById("auth-reg-name").value.trim(),
      document.getElementById("auth-reg-email").value.trim(),
      pass
    );
    if (!result.ok && result.error) { errEl.textContent = result.error; errEl.classList.remove("hidden"); }
  });

  // Google
  const googleLogin = async () => {
    const result = await fbAuth.loginWithGoogle();
    if (!result.ok && result.error) showToast(result.error, "error");
  };
  document.getElementById("btn-google-login")?.addEventListener("click", googleLogin);
  document.getElementById("btn-google-register")?.addEventListener("click", googleLogin);

  // Forgot password form navigation
  document.getElementById("link-forgot-password")?.addEventListener("click", (e) => {
    e.preventDefault();
    const tabs = document.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = "none";
    document.getElementById("auth-login-form").classList.add("hidden");
    document.getElementById("auth-recovery-form").classList.remove("hidden");
    document.getElementById("auth-recovery-error").classList.add("hidden");
    document.getElementById("auth-recovery-success").classList.add("hidden");
  });

  // Email link login form navigation
  document.getElementById("link-email-code")?.addEventListener("click", (e) => {
    e.preventDefault();
    const tabs = document.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = "none";
    document.getElementById("auth-login-form").classList.add("hidden");
    document.getElementById("auth-email-link-form").classList.remove("hidden");
    document.getElementById("auth-email-link-error").classList.add("hidden");
    document.getElementById("auth-email-link-success").classList.add("hidden");
  });

  // Back to login from recovery
  document.getElementById("btn-back-to-login-1")?.addEventListener("click", () => {
    const tabs = document.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = "flex";
    document.getElementById("auth-recovery-form").classList.add("hidden");
    document.getElementById("auth-login-form").classList.remove("hidden");
  });

  // Back to login from email link
  document.getElementById("btn-back-to-login-2")?.addEventListener("click", () => {
    const tabs = document.querySelector(".auth-tabs");
    if (tabs) tabs.style.display = "flex";
    document.getElementById("auth-email-link-form").classList.add("hidden");
    document.getElementById("auth-login-form").classList.remove("hidden");
  });

  // Password recovery form submit
  document.getElementById("auth-recovery-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = document.getElementById("auth-recovery-error");
    const succEl = document.getElementById("auth-recovery-success");
    errEl.classList.add("hidden");
    succEl.classList.add("hidden");
    const email = document.getElementById("auth-recovery-email").value.trim();
    try {
      await window._fbFns.sendPasswordResetEmail(window._fbAuth, email);
      succEl.textContent = "E-mail de recuperação enviado com sucesso!";
      succEl.classList.remove("hidden");
    } catch (err) {
      errEl.textContent = fbAuth.translateError(err.code) || "Erro ao enviar e-mail.";
      errEl.classList.remove("hidden");
    }
  });

  // Email link sign-in request submit
  document.getElementById("auth-email-link-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const errEl = document.getElementById("auth-email-link-error");
    const succEl = document.getElementById("auth-email-link-success");
    errEl.classList.add("hidden");
    succEl.classList.add("hidden");
    const email = document.getElementById("auth-email-link-input").value.trim();
    const actionCodeSettings = {
      url: window.location.href.split('?')[0],
      handleCodeInApp: true,
    };
    try {
      await window._fbFns.sendSignInLinkToEmail(window._fbAuth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      succEl.textContent = "Link de login enviado! Verifique seu e-mail.";
      succEl.classList.remove("hidden");
    } catch (err) {
      errEl.textContent = fbAuth.translateError(err.code) || "Erro ao enviar link.";
      errEl.classList.remove("hidden");
    }
  });

  // Close Auth Modal (Cancel / Desistir)
  document.getElementById("btn-close-auth-modal")?.addEventListener("click", () => {
    fbAuth.closeAuthModal();
    switchTab("dashboard");
  });

  // Logout
  document.getElementById("btn-logout")?.addEventListener("click", async () => {
    if (fbAuth.profileUnsubscribe) {
      fbAuth.profileUnsubscribe();
      fbAuth.profileUnsubscribe = null;
    }
    await fbAuth.logout();
    fbAuth.currentUser = null;
    state.userProfile = null;
    
    // Clear LocalStorage data to reset the app completely to defaults
    localStorage.removeItem("quickmacros_data");
    localStorage.removeItem("quickmacros_categories");
    localStorage.removeItem("quickmacros_variables");
    
    // Reinitialize local state with defaults
    initDatabase();
    
    // Set reload toast and refresh page
    sessionStorage.setItem("logout_success_toast", "true");
    window.location.reload();
  });

  // Copy team code
  document.getElementById("btn-copy-team-code")?.addEventListener("click", () => {
    const code = document.getElementById("profile-team-code")?.textContent;
    if (code && code !== "----") navigator.clipboard.writeText(code).then(() => showToast("Código copiado!", "success"));
  });

  // Add member
  document.getElementById("btn-add-member")?.addEventListener("click", async () => {
    if (!fbAuth.requireAuth()) return;
    await fbTeam.addMemberByCode(document.getElementById("input-member-code")?.value || "");
  });

  document.getElementById("btn-add-member-team")?.addEventListener("click", async () => {
    if (!fbAuth.requireAuth()) return;
    await fbTeam.addMemberByCode(document.getElementById("input-member-code-team")?.value || "");
  });

  // Team library back
  document.getElementById("btn-team-lib-back")?.addEventListener("click", () => {
    if (typeof fbTeam !== "undefined") fbTeam.activeMember = null;
    document.getElementById("team-members-view")?.classList.remove("hidden");
    document.getElementById("team-library-view")?.classList.add("hidden");
  });

  // Prefill Page Copy to Library button
  if (el.btnPrefillCopyToLibrary) {
    el.btnPrefillCopyToLibrary.addEventListener("click", async () => {
      if (!_prefillMacro) return;
      const copy = { ..._prefillMacro, id: `copy_${Date.now()}`, copied_count: 0 };
      state.macros.unshift(copy);
      saveData("quickmacros_data", state.macros);
      if (typeof fbFirestore !== "undefined" && fbFirestore.saveMacro) {
        await fbFirestore.saveMacro(copy);
      }
      showToast(`"${_prefillMacro.title}" copiada para suas macros!`, "success");
      lucide.createIcons();
      el.btnPrefillCopyToLibrary.classList.add("hidden");
    });
  }

  // Share Macros Modal
  document.getElementById("btn-share-macros-modal")?.addEventListener("click", () => {
    if (!fbAuth.requireAuth()) return;
    fbProfile.openShareModal();
  });
  document.getElementById("btn-close-share-modal")?.addEventListener("click", () => {
    el.modalShareMacros?.classList.remove("active");
  });
  document.getElementById("btn-cancel-shares")?.addEventListener("click", () => {
    el.modalShareMacros?.classList.remove("active");
  });
  document.getElementById("btn-save-shares")?.addEventListener("click", async () => {
    await fbProfile.saveShares();
  });

  // Profile photo upload
  document.getElementById("profile-photo-upload")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      const img = document.getElementById("profile-avatar-img");
      const sImg = document.getElementById("sidebar-avatar-img");
      if (img) { img.src = url; img.classList.remove("hidden"); }
      if (sImg) { sImg.src = url; sImg.classList.remove("hidden"); }
      document.getElementById("profile-avatar-initials").textContent = "";
      document.getElementById("sidebar-avatar-text")?.classList.add("hidden");
      document.getElementById("sidebar-avatar-icon")?.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // Initial sync status update & URL invite code check
  updateCloudSyncStatus();
  checkUrlTeamInvite();
});

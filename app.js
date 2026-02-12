/**
 * ThreadThis — threadthis.day
 * Post Formatter for LinkedIn & Threads
 */

// ============================================
// DOM Elements
// ============================================
const editor = document.getElementById('editor');
const charCount = document.getElementById('charCount');
const charLimit = document.getElementById('charLimit');
const charCounter = document.querySelector('.char-counter');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const listBtn = document.getElementById('listBtn');
const strikethroughBtn = document.getElementById('strikethroughBtn');
const underlineBtn = document.getElementById('underlineBtn');
const numberedListBtn = document.getElementById('numberedListBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const linkedinTab = document.getElementById('linkedinTab');
const threadsTab = document.getElementById('threadsTab');
const linkedinPreview = document.getElementById('linkedinPreview');
const threadsPreview = document.getElementById('threadsPreview');
const linkedinText = document.getElementById('linkedinText');
const threadsChain = document.getElementById('threadsChain');
const copyLinkedinBtn = document.getElementById('copyLinkedin');
// ============================================
// DRAFTS FUNCTIONALITY - COMMENTED OUT
// ============================================
// const draftsBtn = document.getElementById('draftsBtn');
// const draftsSidebar = document.getElementById('draftsSidebar');
// const sidebarOverlay = document.getElementById('sidebarOverlay');
// const closeSidebarBtn = document.getElementById('closeSidebar');
// const draftsList = document.getElementById('draftsList');
// const saveDraftBtn = document.getElementById('saveDraftBtn');
// const newDraftBtn = document.getElementById('newDraftBtn');
const linkedinAuthor = document.getElementById('linkedinAuthor');
const linkedinMeta = document.getElementById('linkedinMeta');

// ============================================
// Constants
// ============================================
const THREAD_LIMIT = 500;
const LINKEDIN_LIMIT = 3000;

// ============================================
// Internationalization (i18n)
// ============================================
const i18n = {
    en: {
        cta_title: "Get your post ready to publish",
        cta_subtitle: "Use this tool to write, format, split, and preview your posts.",
        placeholder: "Start writing your post...",
        copy: "Copy",
        copied: "Copied!",
        howto_title: "How to Use",
        howto_format_title: "Formatting",
        howto_format_desc: "Bold and Italic work only with Latin characters (a-z, A-Z). Strikethrough and underline work with any characters, including Cyrillic. Undo (Ctrl+Z) and redo (Ctrl+Shift+Z) available via buttons or keyboard.",
        howto_split_title: "Auto-Split",
        howto_split_desc: "For Threads, text is automatically split into parts of 500 characters with numbering 1/n, 2/n, etc.",
        howto_manual_title: "Manual Split",
        howto_manual_desc: "Insert <code>///</code> in text to specify thread break point. Takes priority over auto-split.",
        howto_copy_title: "Copying",
        howto_copy_desc: "LinkedIn — one button copies the entire post. Threads — separate button for each thread segment.",
        footer_copy: "© 2026 ThreadThis. All rights reserved.",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Service",
        footer_contact: "Contact",
        preview_placeholder: "Your post will appear here...",
        thread_placeholder: "Your thread will appear here...",
        tooltip_bold: "Bold (Latin only)",
        tooltip_italic: "Italic (Latin only)",
        tooltip_strike: "Strikethrough",
        tooltip_underline: "Underline",
        tooltip_list: "Bullet list",
        tooltip_numbered: "Numbered list",
        tooltip_undo: "Undo (Ctrl+Z)",
        tooltip_redo: "Redo (Ctrl+Shift+Z)"
    },
    ru: {
        cta_title: "Подготовь свой пост к публикации",
        cta_subtitle: "Используй этот инструмент для написания, форматирования, разбивки и предпросмотра твоих постов.",
        placeholder: "Начните писать свой пост...",
        copy: "Копировать",
        copied: "Скопировано!",
        howto_title: "Как пользоваться",
        howto_format_title: "Форматирование",
        howto_format_desc: "Bold и Italic работают только с латиницей (a-z, A-Z). Зачёркивание и подчёркивание работают с любыми символами, включая кириллицу. Отмена (Ctrl+Z) и повтор (Ctrl+Shift+Z) доступны через кнопки или клавиатуру.",
        howto_split_title: "Авто-разбивка",
        howto_split_desc: "Для Threads текст автоматически разбивается на части по 500 символов с нумерацией 1/n, 2/n и т.д.",
        howto_manual_title: "Ручная разбивка",
        howto_manual_desc: "Вставь <code>///</code> в текст, чтобы указать место разрыва треда. Имеет приоритет над авто-разбивкой.",
        howto_copy_title: "Копирование",
        howto_copy_desc: "LinkedIn — одна кнопка копирует весь пост. Threads — отдельная кнопка для каждого блока треда.",
        footer_copy: "© 2026 ThreadThis. Все права защищены.",
        footer_privacy: "Политика конфиденциальности",
        footer_terms: "Условия использования",
        footer_contact: "Контакты",
        preview_placeholder: "Ваш пост появится здесь...",
        thread_placeholder: "Ваш тред появится здесь...",
        tooltip_bold: "Жирный (латиница)",
        tooltip_italic: "Курсив (латиница)",
        tooltip_strike: "Зачёркнутый",
        tooltip_underline: "Подчёркнутый",
        tooltip_list: "Маркированный список",
        tooltip_numbered: "Нумерованный список",
        tooltip_undo: "Отменить (Ctrl+Z)",
        tooltip_redo: "Повторить (Ctrl+Shift+Z)"
    }
};

let currentLang = 'en';

/**
 * Get translated string
 */
function t(key) {
    return i18n[currentLang][key] || i18n['en'][key] || key;
}

/**
 * Detect user's preferred language
 */
function detectLanguage() {
    const saved = localStorage.getItem('lang');
    if (saved && (saved === 'en' || saved === 'ru')) {
        return saved;
    }
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    return browserLang.startsWith('ru') ? 'ru' : 'en';
}

/**
 * Apply translations to all elements with data-i18n attributes
 */
function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });

    // HTML content (for elements with code tags, etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        el.innerHTML = t(key);
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = t(key);
    });

    // Update tooltips
    document.getElementById('boldBtn').title = t('tooltip_bold');
    document.getElementById('italicBtn').title = t('tooltip_italic');
    document.getElementById('strikethroughBtn').title = t('tooltip_strike');
    document.getElementById('underlineBtn').title = t('tooltip_underline');
    document.getElementById('listBtn').title = t('tooltip_list');
    document.getElementById('numberedListBtn').title = t('tooltip_numbered');
    document.getElementById('undoBtn').title = t('tooltip_undo');
    document.getElementById('redoBtn').title = t('tooltip_redo');

    // Update html lang attribute
    document.documentElement.lang = currentLang;
}

/**
 * Set language and save preference
 */
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updatePreview();

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ============================================
// Undo/Redo History
// ============================================
const editorHistory = {
    stack: [''],
    index: 0,
    maxSize: 50,
    isRestoring: false
};

let historyDebounceTimer = null;

function historySave(state) {
    if (editorHistory.isRestoring) return;

    if (editorHistory.index < editorHistory.stack.length - 1) {
        editorHistory.stack = editorHistory.stack.slice(0, editorHistory.index + 1);
    }

    if (editorHistory.stack[editorHistory.index] === state) return;

    editorHistory.stack.push(state);

    if (editorHistory.stack.length > editorHistory.maxSize) {
        editorHistory.stack.shift();
    }

    editorHistory.index = editorHistory.stack.length - 1;
    updateUndoRedoButtons();
}

function historyUndo() {
    if (editorHistory.index <= 0) return;

    editorHistory.index--;
    editorHistory.isRestoring = true;
    editor.value = editorHistory.stack[editorHistory.index];
    editorHistory.isRestoring = false;

    updatePreview();
    updateCharCount();
    autoResize();
    updateUndoRedoButtons();
}

function historyRedo() {
    if (editorHistory.index >= editorHistory.stack.length - 1) return;

    editorHistory.index++;
    editorHistory.isRestoring = true;
    editor.value = editorHistory.stack[editorHistory.index];
    editorHistory.isRestoring = false;

    updatePreview();
    updateCharCount();
    autoResize();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    undoBtn.disabled = editorHistory.index <= 0;
    redoBtn.disabled = editorHistory.index >= editorHistory.stack.length - 1;
}

function debouncedHistorySave() {
    clearTimeout(historyDebounceTimer);
    historyDebounceTimer = setTimeout(() => {
        historySave(editor.value);
    }, 500);
}

// Avatar images for preview (separated by gender for correct matching)
const MALE_AVATARS = [
    'images/avatars/avatar-02.jpg',
    'images/avatars/avatar-04.jpg',
    'images/avatars/avatar-06.jpg',
    'images/avatars/avatar-08.jpg',
    'images/avatars/avatar-10.jpg',
    'images/avatars/avatar-11.jpg',
    'images/avatars/avatar-13.jpg',
    'images/avatars/avatar-15.jpg',
    'images/avatars/avatar-17.jpg',
    'images/avatars/avatar-19.jpg'
];
const FEMALE_AVATARS = [
    'images/avatars/avatar-01.jpg',
    'images/avatars/avatar-03.jpg',
    'images/avatars/avatar-05.jpg',
    'images/avatars/avatar-07.jpg',
    'images/avatars/avatar-09.jpg',
    'images/avatars/avatar-12.jpg',
    'images/avatars/avatar-14.jpg',
    'images/avatars/avatar-16.jpg',
    'images/avatars/avatar-18.jpg',
    'images/avatars/avatar-20.jpg'
];

// Random profiles for LinkedIn and Threads preview
const PROFILES = [
    { name: "Sergey Brin", title: "CEO", gender: "m" },
    { name: "Ivan Petrov", title: "Salesforce Developer", gender: "m" },
    { name: "Anna Kozlova", title: "Product Manager", gender: "f" },
    { name: "Michael Chen", title: "Software Engineer", gender: "m" },
    { name: "Elena Smirnova", title: "UX Designer", gender: "f" },
    { name: "Alex Johnson", title: "Data Scientist", gender: "m" },
    { name: "Maria Garcia", title: "Marketing Director", gender: "f" },
    { name: "David Kim", title: "Tech Lead", gender: "m" },
    { name: "Olga Novikova", title: "HR Manager", gender: "f" },
    { name: "James Wilson", title: "Founder", gender: "m" },
    { name: "Natalia Volkova", title: "Business Analyst", gender: "f" },
    { name: "Robert Taylor", title: "CTO", gender: "m" },
    { name: "Svetlana Orlova", title: "Project Manager", gender: "f" },
    { name: "Chris Anderson", title: "DevOps Engineer", gender: "m" },
    { name: "Dmitry Sokolov", title: "Frontend Developer", gender: "m" },
    { name: "Sarah Miller", title: "Content Strategist", gender: "f" },
    { name: "Pavel Morozov", title: "Backend Developer", gender: "m" },
    { name: "Emma Thompson", title: "Growth Hacker", gender: "f" },
    { name: "Andrei Volkov", title: "Solutions Architect", gender: "m" },
    { name: "Lisa Brown", title: "VP of Engineering", gender: "f" }
];

// Current random profile and avatar (selected on page load)
let currentProfile = null;
let currentAvatar = null;

// ============================================
// Unicode Character Maps (Latin only!)
// ============================================
const BOLD_MAP = {
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇',
    'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏',
    'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗',
    'Y': '𝐘', 'Z': '𝐙',
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
    'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩',
    'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱',
    'y': '𝐲', 'z': '𝐳',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕',
    '8': '𝟖', '9': '𝟗'
};

const ITALIC_MAP = {
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
    'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗',
    'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
    'Y': '𝘠', 'Z': '𝘡',
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
    'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
    'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
    'y': '𝘺', 'z': '𝘻'
};

// Reverse maps for toggle (bold/italic → regular)
const BOLD_REVERSE = Object.fromEntries(
    Object.entries(BOLD_MAP).map(([k, v]) => [v, k])
);
const ITALIC_REVERSE = Object.fromEntries(
    Object.entries(ITALIC_MAP).map(([k, v]) => [v, k])
);

// ============================================
// Text Formatting Functions
// ============================================

/**
 * Toggle Unicode Bold (Latin only). Detects already-bold text and reverts.
 */
function toBold(text) {
    const chars = [...text];
    if (chars.some(c => BOLD_REVERSE[c])) {
        return chars.map(c => BOLD_REVERSE[c] || c).join('');
    }
    return chars.map(c => BOLD_MAP[c] || c).join('');
}

/**
 * Toggle Unicode Italic (Latin only). Detects already-italic text and reverts.
 */
function toItalic(text) {
    const chars = [...text];
    if (chars.some(c => ITALIC_REVERSE[c])) {
        return chars.map(c => ITALIC_REVERSE[c] || c).join('');
    }
    return chars.map(c => ITALIC_MAP[c] || c).join('');
}

/**
 * Toggle bullet list. Removes bullets if already present.
 * Replaces numbered list if detected.
 */
function toList(text) {
    const lines = text.split('\n');
    const hasBullets = lines.every(l => !l.trim() || l.trim().startsWith('•'));
    if (hasBullets && lines.some(l => l.trim().startsWith('•'))) {
        return lines.map(l => l.replace(/^\s*•\s?/, '')).join('\n');
    }
    // Strip numbering first, then add bullets
    return lines.map(line => {
        const stripped = line.replace(/^\s*\d+\.\s/, '').trim();
        return stripped ? '• ' + stripped : line;
    }).join('\n');
}

/**
 * Toggle Unicode strikethrough (U+0336). Works with ALL characters.
 */
function toStrikethrough(text) {
    if (text.includes('\u0336')) {
        return text.replace(/\u0336/g, '');
    }
    return [...text].map(char => char + '\u0336').join('');
}

/**
 * Toggle Unicode underline (U+0332). Works with ALL characters.
 */
function toUnderline(text) {
    if (text.includes('\u0332')) {
        return text.replace(/\u0332/g, '');
    }
    return [...text].map(char => char + '\u0332').join('');
}

/**
 * Toggle numbered list. Removes numbering if already present.
 * Replaces bullet list if detected.
 */
function toNumberedList(text) {
    const lines = text.split('\n');
    const hasNumbers = lines.every(l => !l.trim() || /^\d+\.\s/.test(l.trim()));
    if (hasNumbers && lines.some(l => /^\d+\.\s/.test(l.trim()))) {
        return lines.map(l => l.replace(/^\s*\d+\.\s?/, '')).join('\n');
    }
    // Strip bullets first, then add numbers
    let num = 0;
    return lines.map(line => {
        const stripped = line.replace(/^\s*•\s?/, '').trim();
        if (stripped) {
            num++;
            return `${num}. ${stripped}`;
        }
        return line;
    }).join('\n');
}

/**
 * Apply formatting to selected text in editor
 */
function applyFormatting(formatFn) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    if (start === end) return; // No selection

    historySave(editor.value);

    const selectedText = editor.value.substring(start, end);
    const formattedText = formatFn(selectedText);

    editor.value = editor.value.substring(0, start) + formattedText + editor.value.substring(end);

    // Restore cursor position
    editor.selectionStart = start;
    editor.selectionEnd = start + formattedText.length;
    editor.focus();

    historySave(editor.value);

    // Trigger update
    updatePreview();
    updateCharCount();
}

// ============================================
// Thread Splitting Algorithm
// ============================================

/**
 * Auto-split a single block of text respecting word boundaries
 * @param {string} text - Text block to split
 * @param {number} limit - Character limit per chunk
 * @returns {string[]} Array of chunks
 */
function autoSplitBlock(text, limit) {
    const chunks = [];
    let remaining = text.trim();

    while (remaining.length > limit) {
        let splitIndex = remaining.lastIndexOf(' ', limit);
        const newlineIndex = remaining.lastIndexOf('\n', limit);
        if (newlineIndex > splitIndex) splitIndex = newlineIndex;
        if (splitIndex === -1 || splitIndex === 0) splitIndex = limit;
        chunks.push(remaining.substring(0, splitIndex).trim());
        remaining = remaining.substring(splitIndex).trim();
    }

    if (remaining.length > 0) chunks.push(remaining);
    return chunks;
}

/**
 * Split text into threads. Manual breaks (///) take priority over auto-splitting.
 * @param {string} text - Text to split
 * @param {number} limit - Character limit per thread (default 500)
 * @returns {string[]} Array of thread chunks
 */
function splitIntoThreads(text, limit = THREAD_LIMIT) {
    const manualBlocks = text.split('///').map(s => s.trim()).filter(Boolean);
    const result = [];
    for (const block of manualBlocks) {
        if (block.length <= limit) {
            result.push(block);
        } else {
            result.push(...autoSplitBlock(block, limit));
        }
    }
    return result;
}

// ============================================
// Preview Rendering
// ============================================

/**
 * Update all previews based on editor content
 */
function updatePreview() {
    const text = editor.value;

    // Update LinkedIn preview
    linkedinText.textContent = text || t('preview_placeholder');

    // Update Threads preview
    renderThreadsPreview(text);
}

/**
 * Render Threads chain preview (Threads-style UI)
 */
function renderThreadsPreview(text) {
    const username = currentProfile ? currentProfile.name.split(' ')[0].toLowerCase() : 'username';

    const avatarImg = currentAvatar ? `<img src="${currentAvatar}" alt="Avatar">` : '';

    if (!text.trim()) {
        threadsChain.innerHTML = `
            <div class="thread-item">
                <div class="thread-avatar">${avatarImg}</div>
                <div class="thread-body">
                    <div class="thread-header">
                        <div class="thread-name">${username}</div>
                    </div>
                    <div class="thread-text">${t('thread_placeholder')}</div>
                    <div class="thread-actions">
                        <button class="thread-action-btn"><i class="far fa-heart"></i></button>
                        <button class="thread-action-btn"><i class="far fa-comment"></i></button>
                        <button class="thread-action-btn"><i class="fas fa-retweet"></i></button>
                        <button class="thread-action-btn"><i class="far fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    const chunks = splitIntoThreads(text);

    threadsChain.innerHTML = chunks.map((chunk, index) => `
        <div class="thread-item">
            <div class="thread-avatar">${avatarImg}</div>
            ${index < chunks.length - 1 ? '<div class="thread-line"></div>' : ''}
            <div class="thread-body">
                <div class="thread-header">
                    <div class="thread-name">${username}</div>
                    <div class="thread-counter">${index + 1}/${chunks.length}</div>
                </div>
                <div class="thread-text">${escapeHtml(chunk)}</div>
                <div class="thread-actions">
                    <button class="thread-action-btn"><i class="far fa-heart"></i></button>
                    <button class="thread-action-btn"><i class="far fa-comment"></i></button>
                    <button class="thread-action-btn"><i class="fas fa-retweet"></i></button>
                    <button class="thread-action-btn"><i class="far fa-paper-plane"></i></button>
                    <button class="copy-mini" data-index="${index}">${t('copy')}</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers for copy buttons
    threadsChain.querySelectorAll('.copy-mini').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            copyToClipboard(chunks[index], btn);
        });
    });
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Copy to Clipboard
// ============================================

/**
 * Copy text to clipboard with visual feedback
 */
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalText = button.textContent;
        button.textContent = t('copied');
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}

// ============================================
// Character Counter with LinkedIn Limit Validation
// ============================================

/**
 * Count visible characters (grapheme clusters).
 * Ignores combining marks (strikethrough/underline) and counts
 * surrogate pairs (bold/italic Unicode) as single characters.
 */
function countVisibleChars(text) {
    if (Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return [...segmenter.segment(text)].length;
    }
    // Fallback: strip combining marks, count code points
    return [...text.replace(/[\u0300-\u036f]/g, '')].length;
}

function updateCharCount() {
    const currentLength = countVisibleChars(editor.value);
    charCount.textContent = currentLength;

    // Check if LinkedIn tab is active
    const isLinkedInActive = linkedinTab.classList.contains('active');

    if (isLinkedInActive) {
        // Show limit for LinkedIn
        charLimit.style.display = 'inline';

        // Calculate percentage
        const percentage = (currentLength / LINKEDIN_LIMIT) * 100;

        // Remove all state classes
        charCounter.classList.remove('warning', 'error');

        // Apply appropriate class based on percentage
        if (percentage >= 100) {
            charCounter.classList.add('error');
        } else if (percentage >= 90) {
            charCounter.classList.add('warning');
        }
    } else {
        // Hide limit for Threads (auto-split handled separately)
        charLimit.style.display = 'none';
        charCounter.classList.remove('warning', 'error');
    }
}

// ============================================
// Auto-resize Textarea
// ============================================

function autoResize() {
    editor.style.height = 'auto';
    editor.style.height = Math.max(200, editor.scrollHeight) + 'px';
}

// ============================================
// Tab Switching
// ============================================

function switchTab(platform) {
    if (platform === 'linkedin') {
        linkedinTab.classList.add('active');
        threadsTab.classList.remove('active');
        linkedinPreview.classList.remove('hidden');
        threadsPreview.classList.add('hidden');
    } else {
        threadsTab.classList.add('active');
        linkedinTab.classList.remove('active');
        threadsPreview.classList.remove('hidden');
        linkedinPreview.classList.add('hidden');
    }
    // Switch theme
    document.body.className = platform === 'linkedin' ? 'theme-linkedin' : 'theme-threads';
    // Update character counter to show/hide limit based on platform
    updateCharCount();
}

// ============================================
// Sidebar Functions - COMMENTED OUT
// ============================================

// function openSidebar() {
//     draftsSidebar.classList.remove('hidden');
//     sidebarOverlay.classList.remove('hidden');
//     // Trigger reflow for animation
//     void draftsSidebar.offsetWidth;
//     draftsSidebar.classList.add('visible');
//     sidebarOverlay.classList.add('visible');
//     document.body.style.overflow = 'hidden';
// }

// function closeSidebar() {
//     draftsSidebar.classList.remove('visible');
//     sidebarOverlay.classList.remove('visible');
//     document.body.style.overflow = '';
//     setTimeout(() => {
//         draftsSidebar.classList.add('hidden');
//         sidebarOverlay.classList.add('hidden');
//     }, 250);
// }

// function createNewDraft() {
//     editor.value = '';
//     updateCharCount();
//     updatePreview();
//     autoResize();
//     closeSidebar();
//     editor.focus();
// }

// ============================================
// Profile Functions
// ============================================

function selectRandomProfile() {
    const randomIndex = Math.floor(Math.random() * PROFILES.length);
    currentProfile = PROFILES[randomIndex];
    const pool = currentProfile.gender === 'f' ? FEMALE_AVATARS : MALE_AVATARS;
    currentAvatar = pool[Math.floor(Math.random() * pool.length)];
    return currentProfile;
}

function updateProfileDisplay() {
    if (currentProfile) {
        linkedinAuthor.textContent = currentProfile.name;
        linkedinMeta.textContent = currentProfile.title;
    }
    if (currentAvatar) {
        const avatarEl = document.querySelector('.linkedin-post .avatar');
        if (avatarEl) {
            avatarEl.innerHTML = `<img src="${currentAvatar}" alt="Avatar">`;
        }
    }
}

// ============================================
// Event Listeners
// ============================================

// Editor events
editor.addEventListener('input', () => {
    updateCharCount();
    updatePreview();
    autoResize();
    debouncedHistorySave();
});

// Prevent toolbar buttons from stealing focus/selection from editor
document.querySelectorAll('.format-buttons .tool-btn').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.preventDefault());
});

// Format buttons
boldBtn.addEventListener('click', () => applyFormatting(toBold));
italicBtn.addEventListener('click', () => applyFormatting(toItalic));
strikethroughBtn.addEventListener('click', () => applyFormatting(toStrikethrough));
underlineBtn.addEventListener('click', () => applyFormatting(toUnderline));
listBtn.addEventListener('click', () => applyFormatting(toList));
numberedListBtn.addEventListener('click', () => applyFormatting(toNumberedList));

// Undo/Redo buttons
undoBtn.addEventListener('click', historyUndo);
redoBtn.addEventListener('click', historyRedo);

// Keyboard shortcuts for Undo/Redo
editor.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        historyUndo();
        return;
    }
    if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        historyRedo();
        return;
    }
});

// Tab switching
linkedinTab.addEventListener('click', () => switchTab('linkedin'));
threadsTab.addEventListener('click', () => switchTab('threads'));

// Copy LinkedIn button
copyLinkedinBtn.addEventListener('click', () => {
    copyToClipboard(editor.value, copyLinkedinBtn);
});

// ============================================
// DRAFTS SIDEBAR EVENTS - COMMENTED OUT
// ============================================
// draftsBtn.addEventListener('click', openSidebar);
// closeSidebarBtn.addEventListener('click', closeSidebar);
// sidebarOverlay.addEventListener('click', closeSidebar);
// newDraftBtn.addEventListener('click', createNewDraft);

// Escape key closes sidebar
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && !draftsSidebar.classList.contains('hidden')) {
//         closeSidebar();
//     }
// });

// ============================================
// How-to Card Scroll Animation
// ============================================

const howToCards = document.querySelectorAll('.how-to-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const index = [...howToCards].indexOf(card);
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
            cardObserver.unobserve(card);
        }
    });
}, { threshold: 0.1 });

howToCards.forEach(card => cardObserver.observe(card));

// ============================================
// Modal Functions
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Footer link clicks → open modals
document.querySelectorAll('.footer-link[data-modal]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.dataset.modal + 'Modal';
        openModal(modalId);
    });
});

// Close modal: X button
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal);
    });
});

// Close modal: overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
});

// Close modal: Escape key + focus trap
document.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (!activeModal) return;

    if (e.key === 'Escape') {
        closeModal(activeModal);
        return;
    }

    // Focus trap: Tab cycles within modal
    if (e.key === 'Tab') {
        const focusable = activeModal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

// ============================================
// Language Toggle Event Listeners
// ============================================

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// ============================================
// Initialization
// ============================================

function init() {
    // Initialize language (detect or use saved)
    currentLang = detectLanguage();
    setLanguage(currentLang);

    // Select random profile on page load
    selectRandomProfile();
    updateProfileDisplay();

    updateCharCount();
    updatePreview();
    autoResize();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);

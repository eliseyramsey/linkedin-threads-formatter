/**
 * Post Formatter for LinkedIn & Threads
 * Main Application Logic
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

// Random profiles for LinkedIn and Threads preview
const PROFILES = [
    { name: "Sergey Brin", title: "CEO" },
    { name: "Ivan Petrov", title: "Salesforce Developer" },
    { name: "Anna Kozlova", title: "Product Manager" },
    { name: "Michael Chen", title: "Software Engineer" },
    { name: "Elena Smirnova", title: "UX Designer" },
    { name: "Alex Johnson", title: "Data Scientist" },
    { name: "Maria Garcia", title: "Marketing Director" },
    { name: "David Kim", title: "Tech Lead" },
    { name: "Olga Novikova", title: "HR Manager" },
    { name: "James Wilson", title: "Founder" },
    { name: "Natalia Volkova", title: "Business Analyst" },
    { name: "Robert Taylor", title: "CTO" },
    { name: "Svetlana Orlova", title: "Project Manager" },
    { name: "Chris Anderson", title: "DevOps Engineer" },
    { name: "Dmitry Sokolov", title: "Frontend Developer" },
    { name: "Sarah Miller", title: "Content Strategist" },
    { name: "Pavel Morozov", title: "Backend Developer" },
    { name: "Emma Thompson", title: "Growth Hacker" },
    { name: "Andrei Volkov", title: "Solutions Architect" },
    { name: "Lisa Brown", title: "VP of Engineering" }
];

// Current random profile (selected on page load)
let currentProfile = null;

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

// ============================================
// Text Formatting Functions
// ============================================

/**
 * Convert text to Unicode Bold (Latin characters only)
 * Cyrillic and other characters remain unchanged
 */
function toBold(text) {
    return [...text].map(char => BOLD_MAP[char] || char).join('');
}

/**
 * Convert text to Unicode Italic (Latin characters only)
 * Cyrillic and other characters remain unchanged
 */
function toItalic(text) {
    return [...text].map(char => ITALIC_MAP[char] || char).join('');
}

/**
 * Add bullet point to selected lines
 */
function toList(text) {
    return text.split('\n').map(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('•')) {
            return '• ' + trimmed;
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

    const selectedText = editor.value.substring(start, end);
    const formattedText = formatFn(selectedText);

    editor.value = editor.value.substring(0, start) + formattedText + editor.value.substring(end);

    // Restore cursor position
    editor.selectionStart = start;
    editor.selectionEnd = start + formattedText.length;
    editor.focus();

    // Trigger update
    updatePreview();
    updateCharCount();
}

// ============================================
// Thread Splitting Algorithm
// ============================================

/**
 * Split text into threads respecting word boundaries
 * @param {string} text - Text to split
 * @param {number} limit - Character limit per thread (default 500)
 * @returns {string[]} Array of thread chunks
 */
function splitIntoThreads(text, limit = THREAD_LIMIT) {
    const chunks = [];
    let remaining = text.trim();

    while (remaining.length > limit) {
        // Find the last space within the limit
        let splitIndex = remaining.lastIndexOf(' ', limit);

        // Also check for newline
        const newlineIndex = remaining.lastIndexOf('\n', limit);
        if (newlineIndex > splitIndex) {
            splitIndex = newlineIndex;
        }

        // If no space/newline found, hard cut at limit
        if (splitIndex === -1 || splitIndex === 0) {
            splitIndex = limit;
        }

        chunks.push(remaining.substring(0, splitIndex).trim());
        remaining = remaining.substring(splitIndex).trim();
    }

    // Add remaining text if any
    if (remaining.length > 0) {
        chunks.push(remaining);
    }

    return chunks;
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
    linkedinText.textContent = text || 'Ваш пост появится здесь...';

    // Update Threads preview
    renderThreadsPreview(text);
}

/**
 * Render Threads chain preview (Threads-style UI)
 */
function renderThreadsPreview(text) {
    const username = currentProfile ? currentProfile.name.split(' ')[0].toLowerCase() : 'username';

    if (!text.trim()) {
        threadsChain.innerHTML = `
            <div class="thread-item">
                <div class="thread-avatar"></div>
                <div class="thread-body">
                    <div class="thread-header">
                        <div class="thread-name">${username}</div>
                    </div>
                    <div class="thread-text">Ваш тред появится здесь...</div>
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
            <div class="thread-avatar"></div>
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
                    <button class="copy-mini" data-index="${index}">Копировать</button>
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
        const originalHtml = button.innerHTML;
        button.innerHTML = 'Скопировано!';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalHtml;
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Не удалось скопировать текст');
    }
}

// ============================================
// Character Counter with LinkedIn Limit Validation
// ============================================

function updateCharCount() {
    const currentLength = editor.value.length;
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
        linkedinTab.classList.add('active', 'linkedin-active');
        linkedinTab.classList.remove('threads-active');
        threadsTab.classList.remove('active', 'threads-active', 'linkedin-active');
        linkedinPreview.classList.remove('hidden');
        threadsPreview.classList.add('hidden');
    } else {
        threadsTab.classList.add('active', 'threads-active');
        threadsTab.classList.remove('linkedin-active');
        linkedinTab.classList.remove('active', 'linkedin-active', 'threads-active');
        threadsPreview.classList.remove('hidden');
        linkedinPreview.classList.add('hidden');
    }
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
    return currentProfile;
}

function updateProfileDisplay() {
    if (currentProfile) {
        linkedinAuthor.textContent = currentProfile.name;
        linkedinMeta.innerHTML = `${currentProfile.title} • 2h • <i class="fas fa-globe"></i>`;
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
});

// Format buttons
boldBtn.addEventListener('click', () => applyFormatting(toBold));
italicBtn.addEventListener('click', () => applyFormatting(toItalic));
listBtn.addEventListener('click', () => applyFormatting(toList));

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
// Initialization
// ============================================

function init() {
    // Select random profile on page load
    selectRandomProfile();
    updateProfileDisplay();

    updateCharCount();
    updatePreview();
    autoResize();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);

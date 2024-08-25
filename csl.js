/**
 * Waits until the given `ms` have not passed.
 */
function waitUntil(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns the saved settings from Chrome's storage.
 *
 * @returns {Promise<{sleepTimer: number, shortcutsPerLine: number}>}
 */
async function getSettings() {
    const {
        sleepTimer = 10,
        shortcutsPerLine = 5
    } = await chrome.storage.sync.get(['sleepTimer', 'shortcutsPerLine']);

    return {sleepTimer, shortcutsPerLine};
}

/**
 * Applies legacy styles to the shortcuts container.
 */
function applyStyles(container, shortcutsPerLine) {
    const totalShortcuts = 10; // max supported by Chrome.
    const rowCount = Math.ceil(totalShortcuts / shortcutsPerLine);

    container.style.setProperty('--row-count', `${rowCount}`);
    container.style.setProperty('--column-count', shortcutsPerLine);
}

/**
 * Note: We could also use `MutationObserver` probably,
 * instead of waiting via the `sleep` method but meh, I am lazy & this also works (almost).
 */
async function applyStylesToShortcuts() {
    const {
        sleepTimer,
        shortcutsPerLine
    } = await getSettings();

    await waitUntil(sleepTimer);

    const ntpApp = document.querySelector('ntp-app');
    if (!ntpApp || !ntpApp.shadowRoot) return;

    await waitUntil(sleepTimer);

    const mostVisited = ntpApp.shadowRoot.querySelector('#mostVisited');
    if (!mostVisited || !mostVisited.shadowRoot) return;

    await waitUntil(sleepTimer);

    const container = mostVisited.shadowRoot.querySelector('#container');
    if (!container) return;

    applyStyles(container, shortcutsPerLine);
}

// noinspection JSIgnoredPromiseFromCall
applyStylesToShortcuts();

// not sure if this would work but anyway.
window.addEventListener('resize', applyStylesToShortcuts);
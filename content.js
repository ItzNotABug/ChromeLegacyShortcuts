/**
 * Waits until the given `ms` have not passed.
 */
function waitUntil(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns the saved settings on chrome's storage.
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
 * Center the last row, if one exists.
 */
function fixLastRowCentering(container, shortcutsPerLine) {
    const items = container.querySelectorAll('.tile');

    const totalItems = items.length;
    const lastRowItems = totalItems % shortcutsPerLine;

    if (lastRowItems > 0) {
        const emptyColumns = Math.floor((shortcutsPerLine - lastRowItems) / 2);

        const firstItemInLastRow = items[totalItems - lastRowItems];
        firstItemInLastRow.style.gridColumnStart = `${emptyColumns + 1}`;
    }

    for (let i = 0; i < totalItems - lastRowItems; i++) {
        items[i].style.gridColumnStart = 'auto';
    }
}

/**
 * Fix the mess by making the `flex` to `grid` with some other styles.
 */
function applyStyles(container, shortcutsPerLine) {
    container.style.display = 'grid';
    container.style.marginTop = '1rem';
    container.style.marginBottom = '1rem';
    container.style.removeProperty('--row-count');
    container.style.setProperty('row-gap', '1.5rem');
    container.style.removeProperty('--column-count');
    container.style.gridTemplateColumns = `repeat(${shortcutsPerLine}, 1fr)`;
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

    fixLastRowCentering(container, shortcutsPerLine);
}

// noinspection JSIgnoredPromiseFromCall
applyStylesToShortcuts();

// not sure if this would work but anyway.
window.addEventListener('resize', applyStylesToShortcuts);
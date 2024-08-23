function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSettings() {
    const {
        sleepTimer = 10,
        shortcutsPerLine = 5
    } = await chrome.storage.sync.get(['sleepTimer', 'shortcutsPerLine']);

    return { sleepTimer, shortcutsPerLine };
}

function fixLastRowCentering(container, shortcutsPerLine) {
    const items = container.querySelectorAll('.tile');

    const totalItems = items.length;
    const lastRowItems = totalItems % shortcutsPerLine;

    if (lastRowItems > 0) {
        const emptyColumns = Math.floor((shortcutsPerLine - lastRowItems) / 2);

        const firstItemInLastRow = items[totalItems - lastRowItems];
        firstItemInLastRow.style.gridColumnStart = emptyColumns + 1;
    }

    for (let i = 0; i < totalItems - lastRowItems; i++) {
        items[i].style.gridColumnStart = 'auto';
    }
}

function applyStyles(container, shortcutsPerLine) {
    container.style.display = 'grid';
    container.style.marginTop = '1rem';
    container.style.marginBottom = '1rem';
    container.style.removeProperty('--row-count');
    container.style.setProperty('row-gap', '1.5rem');
    container.style.removeProperty('--column-count');
    container.style.gridTemplateColumns = `repeat(${shortcutsPerLine}, 1fr)`;
}

async function applyStylesToShortcuts() {
    const {
        sleepTimer,
        shortcutsPerLine
    } = await getSettings();

    await sleep(sleepTimer);
    const ntpApp = document.querySelector('ntp-app');
    if (!ntpApp || !ntpApp.shadowRoot) return;

    await sleep(sleepTimer);
    const mostVisited = ntpApp.shadowRoot.querySelector('#mostVisited');
    if (!mostVisited || !mostVisited.shadowRoot) return;

    await sleep(sleepTimer);
    const container = mostVisited.shadowRoot.querySelector('#container');
    if (!container) return;

    applyStyles(container, shortcutsPerLine);

    fixLastRowCentering(container, shortcutsPerLine);
}

applyStylesToShortcuts();

window.addEventListener('resize', applyStylesToShortcuts);
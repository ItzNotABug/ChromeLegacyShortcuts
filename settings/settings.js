// Load settings from storage when the options page is opened
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['sleepTimer', 'shortcutsPerLine'], (result) => {
        document.getElementById('sleepTimer').value = result.sleepTimer || 10;
        document.getElementById('shortcutsPerLine').value = result.shortcutsPerLine || 5;
    });
});

// Save settings when the save button is clicked
document.getElementById('saveButton').addEventListener('click', () => {
    const sleepTimer = document.getElementById('sleepTimer').value;
    const shortcutsPerLine = document.getElementById('shortcutsPerLine').value;
    const statusMessage = document.getElementById('statusMessage');

    chrome.storage.sync.set(
        {
            sleepTimer: parseInt(sleepTimer, 10),
            shortcutsPerLine: parseInt(shortcutsPerLine, 10),
        }, () => {
            statusMessage.style.display = 'block';
            setTimeout(() => statusMessage.style.display = 'none', 1500);
        });
});

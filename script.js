

const progressForm = document.getElementById('progress-form');
const progressLog = document.getElementById('progress-log');
const addProgressButton = document.getElementById('add-progress-btn');
const streakSymbol = document.getElementById('streak-symbol');
const streakCounter = document.getElementById('streak-counter');

let progressLogData = [];
let currentStreak = 0;

// Load progress log data from local storage
if (localStorage.getItem('progressLogData')) {
    progressLogData = JSON.parse(localStorage.getItem('progressLogData'));
    renderProgressLog();
    updateStreak();
}

// Add event listener to add progress button
addProgressButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activity = document.getElementById('activity').value;
    const duration = document.getElementById('duration').value;
    if (activity && duration) {
        const progressLogItem = {
            activity: activity,
            duration: duration,
            date: new Date().toLocaleDateString()
        };
        progressLogData.push(progressLogItem);
        renderProgressLog();
        updateStreak();
        saveProgressLogDataToLocalStorage();
        document.getElementById('activity').value = '';
        document.getElementById('duration').value = '';
    }
});

// Render progress log
function renderProgressLog() {
    progressLog.innerHTML = '';
    progressLogData.forEach((progressLogItem, index) => {
        const progressLogElement = document.createElement('li');
        progressLogElement.innerHTML = `
            <span>${progressLogItem.activity} - ${progressLogItem.duration} hours</span>
            <span>${progressLogItem.date}</span>
        `;
        progressLog.appendChild(progressLogElement);
    });
}

// Update streak
function updateStreak() {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    const yesterdayLog = progressLogData.find((log) => log.date === yesterday);
    if (yesterdayLog) {
        currentStreak++;
    } else {
        currentStreak = 1;
    }
    streakSymbol.textContent = '';
    streakCounter.textContent = `Streak: ${currentStreak} days`;
}

// Save progress log data to local storage
function saveProgressLogDataToLocalStorage() {
    localStorage.setItem('progressLogData', JSON.stringify(progressLogData));
}

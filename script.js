// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initWelcomeScreen();
    initMusic();
    initTimer();
    renderGallery();
    renderTimeline();
    renderMessages();
});

// Theme Setup
function initTheme() {
    if (config.themeColor) {
        document.documentElement.style.setProperty('--primary-color', config.themeColor);
    }
    document.getElementById('couple-names').textContent = config.meandyou;
}

// Welcome Screen Logic
function initWelcomeScreen() {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    enterBtn.addEventListener('click', () => {
        // Play Music
        if (config.musicUrl) {
            bgMusic.src = config.musicUrl;
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            document.getElementById('music-btn').classList.add('playing');
        }

        // Hide Welcome / Show Main
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
        }, 1000);
    });
}

// Music Control
function initMusic() {
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = true;

    // Set initial volume
    bgMusic.volume = config.musicVolume || 0.5;
    volumeSlider.value = bgMusic.volume;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });
}

// Timer Logic
function initTimer() {
    const startDate = new Date(config.anniversaryDate);

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

// Render Gallery
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryImages.forEach(url => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${url}" alt="Memory">`;
        galleryGrid.appendChild(item);
    });
}

// Render Timeline
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    timelineEvents.forEach((event, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

        item.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${event.date}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Render Messages
function renderMessages() {
    const container = document.getElementById('cards-container');
    messages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `
            <div class="card-front">
                <i class="fas fa-heart"></i>
            </div>
            <div class="card-back">
                <p>${msg}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        container.appendChild(card);
    });
}

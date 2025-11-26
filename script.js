document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initWelcomeScreen();
    initMusic();
    initTimer();
    renderGallery();
    renderTimeline();
    renderMessages();
});

function initTheme() {
    if (config.themeColor) {
        document.documentElement.style.setProperty('--primary-color', config.themeColor);
    }
    document.getElementById('couple-names').textContent = config.meandyou;
}

function initWelcomeScreen() {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    enterBtn.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        document.getElementById('music-btn').classList.add('playing');

        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('fade-in');
        }, 1000);
    });
}

function initMusic() {
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    
    const wrapper = document.querySelector('.custom-select-wrapper');
    const trigger = document.getElementById('music-trigger');
    const triggerText = document.getElementById('current-song-name');
    const optionsContainer = document.getElementById('music-options');
    
    let isPlaying = false;

    if (config.musicList && config.musicList.length > 0) {
        bgMusic.src = config.musicList[0].url;
        triggerText.textContent = config.musicList[0].title;

        config.musicList.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = 'option-item';
            if (index === 0) item.classList.add('selected');
            item.textContent = song.title;
            item.dataset.url = song.url;

            item.addEventListener('click', () => {
                bgMusic.src = song.url;
                triggerText.textContent = song.title;
                
                document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');

                wrapper.classList.remove('open');

                if (isPlaying || musicBtn.classList.contains('playing')) {
                    bgMusic.play();
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                } else {
                    musicBtn.classList.remove('playing');
                    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            optionsContainer.appendChild(item);
        });
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });

    bgMusic.volume = config.musicVolume || 0.5;
    volumeSlider.value = bgMusic.volume;

    musicBtn.addEventListener('click', () => {
        if (!bgMusic.paused) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            isPlaying = true;
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });
}

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

function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryImages.forEach(url => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${url}" alt="Memory">`;
        galleryGrid.appendChild(item);
    });
}

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
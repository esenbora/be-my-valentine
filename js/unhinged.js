// UNHINGED VALENTINE - Chaos Logic

(function() {
    'use strict';

    // State
    let stage = 0;
    let yesButtonCount = 1;
    let noEscapeCount = 0;

    // DOM Elements
    const body = document.body;
    const chaosContainer = document.getElementById('chaosContainer');
    const mainContent = document.getElementById('mainContent');
    const question = document.getElementById('question');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    const shareBtn = document.getElementById('shareBtn');

    // Meme texts by stage
    const memeTexts = {
        1: ['bro...', 'really?', 'come on...', 'think about it'],
        2: ['PLEASE', 'I\'m begging', 'don\'t do this', 'WHY'],
        3: ['I\'M LITERALLY CRYING', 'YOU MONSTER', 'JUST SAY YES', 'THIS IS NOT A GAME'],
        4: ['FINE', 'I GUESS I\'LL DIE', 'DARKNESS CONSUMES ME', 'EMOTIONAL DAMAGE', 'BE MY VALENTINE ALREADY']
    };

    // Emojis to spawn
    const chaosEmojis = ['😭', '💔', '🥺', '😿', '💀', '🔥', '⚠️', '🚨', '😤', '🙏'];

    // Initialize
    function init() {
        setupEventListeners();
    }

    function setupEventListeners() {
        // YES button - instant win
        yesBtn.addEventListener('click', handleYesClick);

        // NO button - chaos begins
        noBtn.addEventListener('click', handleNoClick);
        noBtn.addEventListener('mouseenter', handleNoApproach);
        noBtn.addEventListener('touchstart', handleNoApproach, { passive: true });

        // Track cursor for proximity
        document.addEventListener('mousemove', checkProximity);

        // Share button
        shareBtn.addEventListener('click', handleShare);
    }

    // Check cursor proximity to No button
    function checkProximity(e) {
        if (stage >= 1) {
            const rect = noBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

            // Escape radius increases with stage
            const escapeRadius = 100 + (stage * 50);

            if (distance < escapeRadius) {
                escapeNoButton();
            }
        }
    }

    // No button hover/approach
    function handleNoApproach(e) {
        if (stage === 0) {
            advanceStage();
        } else if (stage >= 1) {
            escapeNoButton();
        }
    }

    // No button click (if they somehow manage)
    function handleNoClick(e) {
        e.preventDefault();
        noEscapeCount++;

        // They're persistent, escalate faster
        advanceStage();
        spawnYesButtons(Math.pow(2, stage));
        addMemeText(getMemeText());
        spawnEmojis(5);
    }

    // Advance chaos stage
    function advanceStage() {
        stage++;

        switch(stage) {
            case 1:
                // First approach - light chaos
                screenShake('light');
                addMemeText('bro...');
                spawnEmojis(2);
                break;

            case 2:
                // Getting serious
                screenShake('medium');
                spawnYesButtons(5);
                shrinkNoButton(1);
                addMemeText('PLEASE');
                spawnEmojis(3);
                break;

            case 3:
                // Full meltdown incoming
                screenShake('heavy');
                spawnYesButtons(15);
                shrinkNoButton(2);
                invertColors();
                addMemeText('I\'M LITERALLY CRYING');
                spawnEmojis(5);
                break;

            case 4:
                // Nuclear option
                screenShake('violent');
                spawnYesButtons(50);
                shrinkNoButton(3);
                addMemeText('MY MOM ALREADY KNOWS');
                startMemeTextSpam();
                startEmojiSpam();
                break;

            default:
                // Beyond stage 4 - continuous chaos
                spawnYesButtons(30);
                shrinkNoButton(4);
                addMemeText(getMemeText());
        }
    }

    // Escape No button to random position
    function escapeNoButton() {
        const padding = 100;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const newX = Math.random() * maxX + padding / 2;
        const newY = Math.random() * maxY + padding / 2;

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '100';

        noEscapeCount++;

        // Occasionally spawn stuff when it escapes
        if (noEscapeCount % 3 === 0) {
            spawnEmojis(2);
            addMemeText(getMemeText());
        }
    }

    // Spawn YES buttons
    function spawnYesButtons(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-yes spawned-yes';
                btn.textContent = 'YES';
                btn.style.setProperty('--rotation', (Math.random() * 30 - 15) + 'deg');

                // Random position
                const x = Math.random() * (window.innerWidth - 150);
                const y = Math.random() * (window.innerHeight - 80);
                btn.style.left = x + 'px';
                btn.style.top = y + 'px';

                // Random size variation
                const scale = 0.5 + Math.random() * 1;
                btn.style.transform = `scale(${scale}) rotate(${Math.random() * 20 - 10}deg)`;

                btn.addEventListener('click', handleYesClick);

                chaosContainer.appendChild(btn);
                yesButtonCount++;
            }, i * 50);
        }
    }

    // Shrink No button
    function shrinkNoButton(level) {
        noBtn.className = `btn btn-no shrink-${level}`;
    }

    // Screen shake
    function screenShake(intensity) {
        body.classList.remove('shake-light', 'shake-medium', 'shake-heavy', 'shake-violent');
        void body.offsetWidth; // Trigger reflow
        body.classList.add(`shake-${intensity}`);

        if (intensity !== 'violent') {
            setTimeout(() => {
                body.classList.remove(`shake-${intensity}`);
            }, 500);
        }
    }

    // Invert colors briefly
    function invertColors() {
        body.classList.add('inverted');
        setTimeout(() => {
            body.classList.remove('inverted');
        }, 200);

        // Flash invert a few times
        for (let i = 1; i < 4; i++) {
            setTimeout(() => {
                body.classList.add('inverted');
                setTimeout(() => body.classList.remove('inverted'), 100);
            }, i * 300);
        }
    }

    // Add floating meme text
    function addMemeText(text) {
        const elem = document.createElement('div');
        elem.className = 'meme-text';
        elem.textContent = text;

        // Random position
        elem.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        elem.style.top = Math.random() * (window.innerHeight - 100) + 'px';

        // Random color class
        const colors = ['bro', 'crying', 'please', 'why'];
        elem.classList.add(colors[Math.floor(Math.random() * colors.length)]);

        chaosContainer.appendChild(elem);

        // Remove after animation
        setTimeout(() => elem.remove(), 3000);
    }

    // Get random meme text for current stage
    function getMemeText() {
        const stageTexts = memeTexts[Math.min(stage, 4)] || memeTexts[4];
        return stageTexts[Math.floor(Math.random() * stageTexts.length)];
    }

    // Spawn floating emojis
    function spawnEmojis(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.className = 'floating-emoji';
                emoji.textContent = chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)];
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = Math.random() * window.innerHeight + 'px';

                chaosContainer.appendChild(emoji);
                setTimeout(() => emoji.remove(), 2000);
            }, i * 100);
        }
    }

    // Continuous meme text spam
    function startMemeTextSpam() {
        const interval = setInterval(() => {
            if (celebrationOverlay.classList.contains('hidden')) {
                addMemeText(getMemeText());
            } else {
                clearInterval(interval);
            }
        }, 500);
    }

    // Continuous emoji spam
    function startEmojiSpam() {
        const interval = setInterval(() => {
            if (celebrationOverlay.classList.contains('hidden')) {
                spawnEmojis(3);
            } else {
                clearInterval(interval);
            }
        }, 300);
    }

    // YES clicked - show celebration
    function handleYesClick() {
        // Stop all chaos
        body.classList.remove('shake-violent', 'shake-heavy', 'shake-medium', 'shake-light');

        // Clear chaos container
        chaosContainer.innerHTML = '';

        // Show celebration
        celebrationOverlay.classList.remove('hidden');

        // Reset body filter for clean view
        body.style.filter = 'none';
    }

    // Share on X
    function handleShare() {
        const text = `I tried to click No on this Valentine's website...\n\nI couldn't 💀`;
        const url = window.location.href;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(tweetUrl, '_blank');
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

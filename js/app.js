/**
 * Be My Valentine - Viral Website
 * The "No" button escapes your cursor!
 */

// DOM Elements
const questionCard = document.getElementById('questionCard');
const celebrationCard = document.getElementById('celebrationCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const memeContainer = document.getElementById('memeContainer');
const greeting = document.getElementById('greeting');
const celebrationMessage = document.getElementById('celebrationMessage');
const fromText = document.getElementById('fromText');
const shareBtn = document.getElementById('shareBtn');
const heartsContainer = document.getElementById('heartsContainer');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Config
const ESCAPE_THRESHOLD = 120; // Distance to trigger escape
const ESCAPE_THRESHOLD_MOBILE = 80;
const BUTTON_PADDING = 20; // Keep button this far from edges

// State
let isEscaping = false;
let escapeCount = 0;
let isMobile = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectMobile();
    parseUrlParams();
    createFloatingHearts();
    setupEventListeners();
    initializeNoButton();
    resizeCanvas();
});

// Detect mobile/touch device
function detectMobile() {
    isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Parse URL parameters for personalization
function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const from = params.get('from');
    const msg = params.get('msg');

    if (to) {
        greeting.textContent = `Hey ${to}! 💕`;
    }

    if (msg) {
        celebrationMessage.textContent = msg;
    } else if (to) {
        celebrationMessage.textContent = `I knew you'd say yes, ${to}! 💖`;
    }

    if (from) {
        fromText.textContent = `Love, ${from} 💝`;
    }
}

// Create floating hearts background
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💞', '❤️', '🌸', '✨'];
    const count = isMobile ? 10 : 20;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${8 + Math.random() * 8}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${16 + Math.random() * 20}px`;
        heartsContainer.appendChild(heart);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Yes button click
    yesBtn.addEventListener('click', handleYesClick);

    // No button - prevent click (it escapes!)
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        escapeButton();
    });

    // Mouse move for escape logic (desktop)
    if (!isMobile) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Touch events (mobile)
    if (isMobile) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchstart', handleTouchStart);
    }

    // Share button
    shareBtn.addEventListener('click', handleShare);

    // Window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        keepButtonInBounds();
    });
}

// Initialize No button position
function initializeNoButton() {
    // Start with static positioning
    noBtn.classList.add('static');
}

// Make No button fixed and escape
function activateEscapeMode() {
    if (noBtn.classList.contains('static')) {
        const rect = noBtn.getBoundingClientRect();
        noBtn.classList.remove('static');
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
    }
}

// Handle mouse movement (desktop)
function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    checkProximityAndEscape(mouseX, mouseY);
}

// Handle touch movement (mobile)
function handleTouchMove(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        checkProximityAndEscape(touch.clientX, touch.clientY);
    }
}

// Handle touch start (mobile)
function handleTouchStart(e) {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        checkProximityAndEscape(touch.clientX, touch.clientY);
    }
}

// Check cursor/finger proximity and escape if too close
function checkProximityAndEscape(x, y) {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(x - btnCenterX, 2) + Math.pow(y - btnCenterY, 2)
    );

    const threshold = isMobile ? ESCAPE_THRESHOLD_MOBILE : ESCAPE_THRESHOLD;

    if (distance < threshold) {
        activateEscapeMode();
        escapeButton(x, y);
        showSadMeme();
    }
}

// Escape button to random position
function escapeButton(cursorX, cursorY) {
    if (isEscaping) return;
    isEscaping = true;
    escapeCount++;

    const rect = noBtn.getBoundingClientRect();
    const btnWidth = rect.width;
    const btnHeight = rect.height;

    // Calculate safe bounds
    const maxX = window.innerWidth - btnWidth - BUTTON_PADDING;
    const maxY = window.innerHeight - btnHeight - BUTTON_PADDING;

    // Generate new position away from cursor
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
        newX = BUTTON_PADDING + Math.random() * (maxX - BUTTON_PADDING);
        newY = BUTTON_PADDING + Math.random() * (maxY - BUTTON_PADDING);
        attempts++;

        // Check if new position is far enough from cursor
        if (cursorX !== undefined && cursorY !== undefined) {
            const distFromCursor = Math.sqrt(
                Math.pow(newX + btnWidth / 2 - cursorX, 2) +
                Math.pow(newY + btnHeight / 2 - cursorY, 2)
            );
            if (distFromCursor > 200) break;
        } else {
            break;
        }
    } while (attempts < maxAttempts);

    // Apply escape animation
    noBtn.classList.add('escaping');
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    // Fun messages after many escapes
    if (escapeCount === 5) {
        noBtn.textContent = 'Nope! 🏃';
    } else if (escapeCount === 10) {
        noBtn.textContent = 'Nice try! 😜';
    } else if (escapeCount === 15) {
        noBtn.textContent = 'Never! 🚀';
    } else if (escapeCount >= 20) {
        noBtn.textContent = 'Just say yes! 💕';
    }

    // Grow the Yes button
    const scale = 1 + Math.min(escapeCount * 0.05, 0.5);
    yesBtn.style.transform = `scale(${scale})`;

    setTimeout(() => {
        isEscaping = false;
    }, 200);
}

// Keep button within viewport bounds
function keepButtonInBounds() {
    if (noBtn.classList.contains('static')) return;

    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - BUTTON_PADDING;
    const maxY = window.innerHeight - rect.height - BUTTON_PADDING;

    let newX = parseFloat(noBtn.style.left) || rect.left;
    let newY = parseFloat(noBtn.style.top) || rect.top;

    newX = Math.max(BUTTON_PADDING, Math.min(newX, maxX));
    newY = Math.max(BUTTON_PADDING, Math.min(newY, maxY));

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Show sad meme
function showSadMeme() {
    memeContainer.classList.add('sad');
    setTimeout(() => {
        memeContainer.classList.remove('sad');
    }, 2000);
}

// Handle Yes button click
function handleYesClick() {
    // Hide question, show celebration
    questionCard.classList.add('hidden');
    celebrationCard.classList.remove('hidden');

    // Hide the escaped No button
    noBtn.style.display = 'none';

    // Start confetti!
    startConfetti();

    // Vibrate on mobile (if supported)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
}

// Handle share button
function handleShare() {
    const params = new URLSearchParams(window.location.search);
    const customUrl = window.location.origin + window.location.pathname +
        (params.toString() ? '?' + params.toString() : '');

    const text = encodeURIComponent("Try to reject this Valentine 😏💕");
    const url = encodeURIComponent(customUrl);

    window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank',
        'width=550,height=420'
    );
}

// ============ CONFETTI ============

// Confetti configuration
const confetti = {
    particles: [],
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'],
    running: false
};

// Resize canvas
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

// Create confetti particle
function createConfettiParticle() {
    return {
        x: Math.random() * confettiCanvas.width,
        y: -20,
        size: Math.random() * 10 + 5,
        color: confetti.colors[Math.floor(Math.random() * confetti.colors.length)],
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 5 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
    };
}

// Start confetti animation
function startConfetti() {
    confetti.running = true;
    confetti.particles = [];

    // Create initial burst
    for (let i = 0; i < 150; i++) {
        const particle = createConfettiParticle();
        particle.y = Math.random() * confettiCanvas.height * 0.5;
        particle.speedY = Math.random() * 3 + 1;
        confetti.particles.push(particle);
    }

    // Add more particles over time
    const addInterval = setInterval(() => {
        if (confetti.particles.length < 300) {
            for (let i = 0; i < 5; i++) {
                confetti.particles.push(createConfettiParticle());
            }
        }
    }, 100);

    // Stop adding after 3 seconds
    setTimeout(() => {
        clearInterval(addInterval);
    }, 3000);

    // Stop animation after 6 seconds
    setTimeout(() => {
        confetti.running = false;
    }, 6000);

    animateConfetti();
}

// Animate confetti
function animateConfetti() {
    if (!confetti.running && confetti.particles.length === 0) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confetti.particles = confetti.particles.filter(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.1; // Gravity

        // Remove if off screen
        if (p.y > confettiCanvas.height + 20) return false;

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        return true;
    });

    if (confetti.running || confetti.particles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

class GameUI {
    constructor() {
        this.currentScreen = 'welcomeScreen';
        this.selectedDifficulty = 'easy';
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
    }
    
    initializeElements() {
        // Screens
        this.screens = {
            welcomeScreen: document.getElementById('welcomeScreen'),
            gameScreen: document.getElementById('gameScreen'),
            resultsScreen: document.getElementById('resultsScreen')
        };
        
        // Buttons
        this.startGameBtn = document.getElementById('startGameBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.quitBtn = document.getElementById('quitBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.menuBtn = document.getElementById('menuBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        
        // Difficulty buttons
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');
        
        // Modals
        this.modals = {
            settingsModal: document.getElementById('settingsModal')
        };
        
        // Settings elements
        this.soundToggle = document.getElementById('soundToggle');
        this.volumeSlider = document.getElementById('volumeSlider');
        
        // Close buttons
        this.closeBtns = document.querySelectorAll('.close-btn');
    }
    
    bindEvents() {
        // Navigation
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.quitBtn.addEventListener('click', () => this.quitGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.menuBtn.addEventListener('click', () => this.goToMenu());
        
        // Modal triggers
        this.settingsBtn.addEventListener('click', () => this.showSettings());
        
        // Difficulty selection
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectDifficulty(btn.dataset.difficulty));
        });
        
        // Settings
        this.soundToggle.addEventListener('change', () => this.toggleSound());
        this.volumeSlider.addEventListener('input', () => this.adjustVolume());
        
        // Modal close
        this.closeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.dataset.modal));
        });
        
        // Close modals on background click
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                window.soundManager.play('hover');
            });
        });
        
        // Resume audio context on first user interaction
        document.addEventListener('click', () => {
            window.soundManager.resume();
        }, { once: true });
    }
    
    handleKeyboardShortcuts(e) {
        // ESC to close modals or pause game
        if (e.key === 'Escape') {
            const activeModal = Object.values(this.modals).find(modal => 
                modal.classList.contains('active')
            );
            
            if (activeModal) {
                this.closeModal(activeModal.id);
            } else if (this.currentScreen === 'gameScreen' && window.typingGame.isGameActive) {
                this.pauseGame();
            }
        }
        
        // Space to pause/resume game
        if (e.code === 'Space' && this.currentScreen === 'gameScreen') {
            if (e.target !== document.getElementById('passageText')) {
                e.preventDefault();
                this.pauseGame();
            }
        }
        
        // Enter to start game or play again
        if (e.key === 'Enter') {
            if (this.currentScreen === 'welcomeScreen') {
                this.startGame();
            } else if (this.currentScreen === 'resultsScreen') {
                this.playAgain();
            }
        }
    }
    
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
        }
    }
    
    selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
        
        // Update visual selection
        this.difficultyBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('active');
            }
        });
        
        window.soundManager.play('hover');
    }
    
    startGame() {
        window.soundManager.play('correct');
        this.showScreen('gameScreen');
        window.typingGame.startGame(this.selectedDifficulty);
    }
    
    pauseGame() {
        window.typingGame.pauseGame();
    }
    
    quitGame() {
        if (confirm('Are you sure you want to quit the current game?')) {
            window.typingGame.quitGame();
        }
    }
    
    playAgain() {
        window.soundManager.play('correct');
        this.showScreen('gameScreen');
        window.typingGame.startGame(this.selectedDifficulty);
    }
    
    goToMenu() {
        this.showScreen('welcomeScreen');
        window.soundManager.play('hover');
    }
    
    showSettings() {
        this.showModal('settingsModal');
    }
    
    showModal(modalId) {
        this.modals[modalId].classList.add('active');
        window.soundManager.play('hover');
    }
    
    closeModal(modalId) {
        this.modals[modalId].classList.remove('active');
        window.soundManager.play('hover');
    }
    
    toggleSound() {
        const enabled = this.soundToggle.checked;
        window.soundManager.setEnabled(enabled);
        this.saveSettings();
    }
    
    adjustVolume() {
        const volume = this.volumeSlider.value / 100;
        window.soundManager.setVolume(volume);
        this.saveSettings();
    }
    
    saveSettings() {
        const settings = {
            soundEnabled: this.soundToggle.checked,
            volume: this.volumeSlider.value
        };
        
        try {
            localStorage.setItem('typingGameSettings', JSON.stringify(settings));
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    }
    
    loadSettings() {
        try {
            const settings = localStorage.getItem('typingGameSettings');
            if (settings) {
                const parsed = JSON.parse(settings);
                
                this.soundToggle.checked = parsed.soundEnabled !== false;
                this.volumeSlider.value = parsed.volume || 70;
                
                window.soundManager.setEnabled(this.soundToggle.checked);
                window.soundManager.setVolume(this.volumeSlider.value / 100);
            }
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
    
    // Update game statistics display in real-time
    updateGameStats() {
        if (this.currentScreen !== 'gameScreen') return;
        
        const gameState = window.typingGame.getGameState();
        
        // Update any real-time displays here
        // This could be called periodically to update stats
    }
    
    // Show notifications
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--primary-color);
            z-index: 10001;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.borderLeftColor = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.borderLeftColor = 'var(--error-color)';
        } else if (type === 'warning') {
            notification.style.borderLeftColor = 'var(--warning-color)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

// Add slide animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    window.gameUI = new GameUI();
    
    // Show welcome message
    setTimeout(() => {
        window.gameUI.showNotification('Welcome to TypeMaster! Choose your difficulty and start typing!', 'info', 4000);
    }, 1000);
    
    // Periodic stats update
    setInterval(() => {
        window.gameUI.updateGameStats();
    }, 1000);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.typingGame.isGameActive && !window.typingGame.isPaused) {
        window.typingGame.pauseGame();
        window.gameUI.showNotification('Game paused due to tab switch', 'warning');
    }
});

// Handle window beforeunload
window.addEventListener('beforeunload', (e) => {
    if (window.typingGame.isGameActive && !window.typingGame.isPaused) {
        e.preventDefault();
        e.returnValue = 'You have an active game. Are you sure you want to leave?';
        return e.returnValue;
    }
});
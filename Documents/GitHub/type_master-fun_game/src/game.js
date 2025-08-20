class TypingGame {
    constructor() {
        this.currentPassage = '';
        this.userInput = '';
        this.startTime = null;
        this.endTime = null;
        this.timerDuration = 30; // seconds
        this.timer = null;
        this.timeLeft = 0;
        this.score = 0;
        this.difficulty = 'easy';
        this.isGameActive = false;
        this.isPaused = false;
        
        // Statistics
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalCharsTyped = 0;
        
        // DOM elements
        this.passageElement = document.getElementById('passageText');
        this.scoreElement = document.getElementById('currentScore');
        this.timeElement = document.getElementById('timeLeft');
        this.progressElement = document.getElementById('progressPercent');
        this.timerProgressElement = document.getElementById('timerProgress');
        
        this.difficultySettings = {
            easy: { time: 30, pointMultiplier: 1 },
            medium: { time: 25, pointMultiplier: 1.5 },
            hard: { time: 20, pointMultiplier: 2 }
        };
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Make passage container focusable and handle keyboard input
        this.passageElement.setAttribute('tabindex', '0');
        this.passageElement.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.passageElement.addEventListener('keypress', (e) => this.handleKeypress(e));
        this.passageElement.addEventListener('paste', (e) => e.preventDefault());
        
        // Focus on passage when game starts
        this.passageElement.addEventListener('click', () => {
            if (this.isGameActive && !this.isPaused) {
                this.passageElement.focus();
            }
        });
    }
    
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.timerDuration = this.difficultySettings[difficulty].time;
    }
    
    startGame(difficulty = 'easy') {
        this.setDifficulty(difficulty);
        this.currentPassage = window.passageGenerator.getPassageByDifficulty(difficulty);
        
        // Reset game state
        this.userInput = '';
        this.score = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalCharsTyped = 0;
        this.timeLeft = this.timerDuration;
        this.isGameActive = true;
        this.isPaused = false;
        this.timerStarted = false;
        
        // Reset UI and focus on passage
        this.passageElement.focus();
        
        // Display passage
        this.renderPassage();
        this.updateScore();
        this.updateProgress();
        this.updateTimer();
        
        // Set start time but don't start timer yet
        this.startTime = Date.now();
        
        // Play start sound
        window.soundManager.play('hover');
    }
    
    startTimer() {
        if (this.timerStarted) return;
        
        this.timerStarted = true;
        this.startTime = Date.now(); // Reset start time when actually starting
        this.timer = setInterval(() => {
            if (this.isPaused) return;
            
            this.timeLeft--;
            this.updateTimer();
            
            // Warning sound at 10 seconds
            if (this.timeLeft === 10) {
                window.soundManager.play('warning');
            }
            
            if (this.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }
    
    updateTimer() {
        this.timeElement.textContent = this.timeLeft;
        
        const progressPercent = (this.timeLeft / this.timerDuration) * 100;
        this.timerProgressElement.style.width = progressPercent + '%';
        
        // Change color as time runs out
        if (progressPercent <= 25) {
            this.timerProgressElement.style.background = 'var(--error-color)';
        } else if (progressPercent <= 50) {
            this.timerProgressElement.style.background = 'var(--warning-color)';
        } else {
            this.timerProgressElement.style.background = 'linear-gradient(90deg, var(--success-color), var(--warning-color), var(--error-color))';
        }
    }
    
    handleKeypress(e) {
        if (!this.isGameActive || this.isPaused) return;
        
        // Start timer on first keystroke
        if (!this.timerStarted) {
            this.startTimer();
        }
        
        // Prevent default behavior for special keys
        if (e.key.length === 1) {
            e.preventDefault();
            this.userInput += e.key;
        }
        
        this.processInput();
        this.renderPassage();
        this.updateProgress();
        
        // Play typing sound
        window.soundManager.play('type');
        
        // Check if passage is complete
        if (this.userInput === this.currentPassage) {
            this.endGame(true);
        }
    }
    
    handleKeydown(e) {
        if (!this.isGameActive || this.isPaused) return;
        
        // Handle backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            
            // Start timer on first keystroke (including backspace)
            if (!this.timerStarted) {
                this.startTimer();
            }
            
            if (this.userInput.length > 0) {
                this.userInput = this.userInput.slice(0, -1);
                this.processInput();
                this.renderPassage();
                this.updateProgress();
            }
        }
        
        // Prevent certain shortcuts
        if (e.ctrlKey && (e.key === 'a' || e.key === 'v' || e.key === 'c')) {
            e.preventDefault();
        }
    }
    
    processInput() {
        let correct = 0;
        let incorrect = 0;
        
        for (let i = 0; i < this.userInput.length; i++) {
            if (i < this.currentPassage.length) {
                if (this.userInput[i] === this.currentPassage[i]) {
                    correct++;
                } else {
                    incorrect++;
                }
            }
        }
        
        // Calculate score
        const charProgress = correct - this.correctChars;
        if (charProgress > 0) {
            const multiplier = this.difficultySettings[this.difficulty].pointMultiplier;
            this.score += charProgress * 10 * multiplier;
            window.soundManager.play('correct');
        } else if (incorrect > this.incorrectChars) {
            // Penalty for incorrect chars
            this.score = Math.max(0, this.score - 5);
            window.soundManager.play('incorrect');
        }
        
        this.correctChars = correct;
        this.incorrectChars = incorrect;
        this.totalCharsTyped = this.userInput.length;
        
        this.updateScore();
    }
    
    renderPassage() {
        let html = '';
        const passageLength = this.currentPassage.length;
        const inputLength = this.userInput.length;
        
        for (let i = 0; i < passageLength; i++) {
            const passageChar = this.currentPassage[i];
            const inputChar = i < inputLength ? this.userInput[i] : null;
            
            let className = '';
            
            if (inputChar !== null) {
                // Character has been typed
                if (inputChar === passageChar) {
                    className = 'correct';
                } else {
                    className = 'incorrect';
                }
            } else if (i === inputLength) {
                // Current cursor position
                className = 'cursor';
            }
            
            if (passageChar === ' ') {
                html += `<span class="${className}">&nbsp;</span>`;
            } else {
                html += `<span class="${className}">${passageChar}</span>`;
            }
        }
        
        this.passageElement.innerHTML = html;
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    updateProgress() {
        const progress = (this.userInput.length / this.currentPassage.length) * 100;
        this.progressElement.textContent = Math.round(progress) + '%';
    }
    
    pauseGame() {
        if (!this.isGameActive) return;
        
        this.isPaused = !this.isPaused;
        
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.textContent = this.isPaused ? '▶️ Resume' : '⏸️ Pause';
        
        if (!this.isPaused) {
            this.passageElement.focus();
        }
    }
    
    quitGame() {
        this.endGame(false, true);
    }
    
    endGame(completed, quit = false) {
        this.isGameActive = false;
        this.endTime = Date.now();
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Calculate final statistics
        const timeElapsed = (this.endTime - this.startTime) / 1000;
        const accuracy = this.totalCharsTyped > 0 ? 
            Math.round((this.correctChars / this.totalCharsTyped) * 100) : 0;
        
        // Calculate WPM (Words Per Minute)
        const wordsTyped = this.correctChars / 5; // Standard: 5 chars = 1 word
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        
        // Bonus for completion
        if (completed && !quit) {
            const timeBonus = Math.round(this.timeLeft * 50 * this.difficultySettings[this.difficulty].pointMultiplier);
            this.score += timeBonus;
            
            // Perfect accuracy bonus
            if (accuracy === 100) {
                this.score += Math.round(1000 * this.difficultySettings[this.difficulty].pointMultiplier);
            }
        }
        
        const gameResult = {
            score: this.score,
            accuracy: accuracy,
            wpm: wpm,
            completed: completed && !quit,
            quit: quit,
            difficulty: this.difficulty,
            timeElapsed: timeElapsed,
            passage: this.currentPassage,
            userInput: this.userInput
        };
        
        // Play appropriate sound
        if (completed && !quit) {
            window.soundManager.play('success');
            // Trigger celebration effect
            setTimeout(() => {
                window.confettiSystem.burst();
            }, 500);
        } else {
            window.soundManager.play('gameOver');
        }
        
        // Show results after a brief delay
        setTimeout(() => {
            this.showResults(gameResult);
        }, quit ? 0 : 1000);
    }
    
    showResults(gameResult) {
        // Update results screen
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const finalScore = document.getElementById('finalScore');
        const accuracy = document.getElementById('accuracy');
        const wpm = document.getElementById('wpm');
        
        if (gameResult.completed) {
            resultsIcon.textContent = '🎉';
            resultsTitle.textContent = 'congratulations!';
            resultsTitle.style.color = 'var(--success-color)';
        } else if (gameResult.quit) {
            resultsIcon.textContent = '👋';
            resultsTitle.textContent = 'game ended';
            resultsTitle.style.color = 'var(--text-primary)';
        } else {
            resultsIcon.textContent = '⏰';
            resultsTitle.textContent = 'time is up!';
            resultsTitle.style.color = 'var(--warning-color)';
        }
        
        finalScore.textContent = gameResult.score;
        accuracy.textContent = gameResult.accuracy + '%';
        wpm.textContent = gameResult.wpm;
        
        // Show results screen
        window.gameUI.showScreen('resultsScreen');
    }
    
    getGameState() {
        return {
            isActive: this.isGameActive,
            isPaused: this.isPaused,
            score: this.score,
            timeLeft: this.timeLeft,
            progress: (this.userInput.length / this.currentPassage.length) * 100,
            accuracy: this.totalCharsTyped > 0 ? 
                Math.round((this.correctChars / this.totalCharsTyped) * 100) : 0
        };
    }
}

// Global game instance
window.typingGame = new TypingGame();
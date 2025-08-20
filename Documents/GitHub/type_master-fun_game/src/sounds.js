class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.7;
        
        // Initialize Web Audio API
        this.audioContext = null;
        this.initAudioContext();
        
        // Create sound effects
        this.createSounds();
    }
    
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    
    createSounds() {
        // Typing sound - short click
        this.sounds.type = this.createBeep(800, 0.1, 0.1);
        
        // Correct sound - pleasant ding
        this.sounds.correct = this.createBeep(1000, 0.2, 0.2);
        
        // Incorrect sound - short buzz
        this.sounds.incorrect = this.createBeep(300, 0.3, 0.15);
        
        // Success sound - triumphant chord
        this.sounds.success = this.createChord([523, 659, 784], 0.8, 0.3);
        
        // Game over sound - descending notes
        this.sounds.gameOver = this.createSequence([400, 350, 300, 250], 0.6, 0.2);
        
        // Button hover sound - subtle tick
        this.sounds.hover = this.createBeep(1200, 0.05, 0.05);
        
        // Timer warning sound - urgent beep
        this.sounds.warning = this.createBeep(800, 0.3, 0.1);
    }
    
    createBeep(frequency, duration, volume = 0.3) {
        return () => {
            if (!this.audioContext || !this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume * this.volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    createChord(frequencies, duration, volume = 0.3) {
        return () => {
            if (!this.audioContext || !this.enabled) return;
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(volume * this.volume / frequencies.length, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + duration);
                }, index * 100);
            });
        };
    }
    
    createSequence(frequencies, duration, noteLength) {
        return () => {
            if (!this.audioContext || !this.enabled) return;
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(duration * this.volume, this.audioContext.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + noteLength);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + noteLength);
                }, index * noteLength * 1000);
            });
        };
    }
    
    play(soundName) {
        if (this.sounds[soundName] && this.enabled) {
            try {
                this.sounds[soundName]();
            } catch (e) {
                console.warn('Error playing sound:', e);
            }
        }
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Global sound manager instance
window.soundManager = new SoundManager();
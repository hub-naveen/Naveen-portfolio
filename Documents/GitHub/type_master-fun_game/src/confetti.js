class ConfettiSystem {
    constructor() {
        this.container = document.getElementById('confetti-container');
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
            '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
        ];
        this.isActive = false;
    }
    
    createConfettiPiece() {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        
        // Random color
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        piece.style.backgroundColor = color;
        
        // Random position and size
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.width = (Math.random() * 6 + 4) + 'px';
        piece.style.height = piece.style.width;
        
        // Random animation duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        piece.style.animationDuration = duration + 's';
        piece.style.animationDelay = delay + 's';
        
        // Random rotation
        const rotation = Math.random() * 360;
        piece.style.transform = `rotate(${rotation}deg)`;
        
        return piece;
    }
    
    burst(duration = 3000) {
        if (this.isActive) return;
        
        this.isActive = true;
        this.container.style.display = 'block';
        
        const pieceCount = 150;
        const pieces = [];
        
        // Create confetti pieces
        for (let i = 0; i < pieceCount; i++) {
            const piece = this.createConfettiPiece();
            pieces.push(piece);
            this.container.appendChild(piece);
            
            // Add slight delay for more natural effect
            setTimeout(() => {
                piece.style.animation = `confettiFall ${2 + Math.random() * 1.5}s linear forwards`;
            }, Math.random() * 500);
        }
        
        // Clean up after animation
        setTimeout(() => {
            pieces.forEach(piece => {
                if (piece.parentNode) {
                    piece.parentNode.removeChild(piece);
                }
            });
            this.container.style.display = 'none';
            this.isActive = false;
        }, duration + 1000);
    }
    
    // Create a continuous celebration effect
    celebrate(duration = 5000) {
        const interval = setInterval(() => {
            if (!this.isActive) {
                this.burst(2000);
            }
        }, 1000);
        
        setTimeout(() => {
            clearInterval(interval);
        }, duration);
    }
    
    // Create firework-like burst from specific position
    firework(x = 50, y = 50) {
        const pieceCount = 30;
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = x + '%';
        container.style.top = y + '%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '10000';
        
        this.container.appendChild(container);
        
        for (let i = 0; i < pieceCount; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            piece.style.backgroundColor = color;
            piece.style.width = '6px';
            piece.style.height = '6px';
            piece.style.position = 'absolute';
            
            // Radial explosion effect
            const angle = (360 / pieceCount) * i;
            const velocity = Math.random() * 200 + 100;
            const lifetime = Math.random() * 1000 + 1500;
            
            const radians = angle * Math.PI / 180;
            const deltaX = Math.cos(radians) * velocity;
            const deltaY = Math.sin(radians) * velocity;
            
            piece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            piece.style.transition = `all ${lifetime}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            piece.style.opacity = '1';
            
            container.appendChild(piece);
            
            // Animate
            setTimeout(() => {
                piece.style.transform += ` translateY(200px)`;
                piece.style.opacity = '0';
            }, 50);
            
            // Clean up
            setTimeout(() => {
                if (piece.parentNode) {
                    piece.parentNode.removeChild(piece);
                }
            }, lifetime);
        }
        
        // Clean up container
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 2500);
    }
    
    // Rain effect
    rain(duration = 3000) {
        const interval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                const piece = this.createConfettiPiece();
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.animationDuration = (Math.random() * 2 + 1) + 's';
                this.container.appendChild(piece);
                
                setTimeout(() => {
                    if (piece.parentNode) {
                        piece.parentNode.removeChild(piece);
                    }
                }, 3000);
            }
        }, 200);
        
        setTimeout(() => {
            clearInterval(interval);
        }, duration);
    }
    
    stop() {
        this.container.innerHTML = '';
        this.container.style.display = 'none';
        this.isActive = false;
    }
}

// Global confetti system instance
window.confettiSystem = new ConfettiSystem();
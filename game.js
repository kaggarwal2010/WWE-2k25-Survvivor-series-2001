// Championship Wrestling - Main Game Logic

class ChampionshipWrestling {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize game components
        this.ring = new WrestlingRing(this.canvas, this.ctx);
        
        // Game state
        this.gameRunning = false;
        this.matchStarted = false;
        
        // Initialize the game
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Start the game loop
        this.gameLoop();
        
        // Update match status
        this.updateMatchStatus('Championship Wrestling Arena Ready!');
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Prevent default behavior for game keys
        document.addEventListener('keydown', (e) => {
            const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
                            'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'Enter', 
                            'KeyF', 'KeyG', 'KeyL', 'KeyK', 'KeyR'];
            if (gameKeys.includes(e.code)) {
                e.preventDefault();
            }
        });
    }
    
    handleKeyDown(e) {
        switch(e.code) {
            case 'KeyR':
                this.startMatch();
                break;
            case 'Escape':
                this.pauseGame();
                break;
        }
    }
    
    handleKeyUp(e) {
        // Handle key releases here
    }
    
    startMatch() {
        if (!this.matchStarted) {
            this.matchStarted = true;
            this.gameRunning = true;
            this.updateMatchStatus('Match Started! Fight!');
            
            // Reset ring elements
            this.ring.announceTable.broken = false;
            this.ring.steelSteps.moved = false;
        }
    }
    
    pauseGame() {
        this.gameRunning = !this.gameRunning;
        if (this.gameRunning) {
            this.updateMatchStatus('Match Resumed');
        } else {
            this.updateMatchStatus('Match Paused - Press ESC to Resume');
        }
    }
    
    updateMatchStatus(message) {
        const statusElement = document.getElementById('matchStatus');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }
    
    updateHealthBar(player, health) {
        const healthElement = document.getElementById(`player${player}Health`);
        if (healthElement) {
            healthElement.style.width = `${health}%`;
        }
    }
    
    updateStaminaBar(player, stamina) {
        const staminaElement = document.getElementById(`player${player}Stamina`);
        if (staminaElement) {
            staminaElement.style.width = `${stamina}%`;
        }
    }
    
    gameLoop() {
        // Clear and draw the ring
        this.ring.draw();
        
        // Draw game elements here (wrestlers, weapons, etc.)
        if (this.matchStarted) {
            this.updateGame();
        }
        
        // Continue the game loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updateGame() {
        // Game logic updates will go here
        // For now, just ensure the ring is drawn
    }
    
    // Utility method to check collisions
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    const game = new ChampionshipWrestling();
    
    // Make game globally accessible for debugging
    window.game = game;
    
    console.log('Championship Wrestling initialized!');
    console.log('Press R to start a match!');
});
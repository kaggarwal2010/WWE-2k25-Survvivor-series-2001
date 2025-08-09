// Championship Wrestling - Side-View Ring Environment

class WrestlingRing {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        
        // Ring dimensions (side-view)
        this.ringX = 150;
        this.ringY = 350;
        this.ringWidth = 500;
        this.ringHeight = 100; // Ring canvas thickness in side-view
        
        // Ring structure
        this.ringPostHeight = 200;
        this.ropeHeight = [50, 100, 150]; // Three rope levels
        this.turnbuckleWidth = 30;
        
        // Interactive elements
        this.announceTable = {
            x: 50,
            y: 400,
            width: 80,
            height: 50,
            broken: false
        };
        
        this.steelSteps = {
            x: 680,
            y: 420,
            width: 60,
            height: 30,
            moved: false
        };
        
        // Under ring weapon storage areas
        this.weaponAreas = [
            { x: 200, y: 450, width: 80, height: 20 }, // Under ring left
            { x: 520, y: 450, width: 80, height: 20 }  // Under ring right
        ];
        
        // Crowd and arena
        this.crowdArea = {
            left: { x: 0, y: 100, width: 100, height: 300 },
            right: { x: 700, y: 100, width: 100, height: 300 }
        };
    }
    
    draw() {
        // Clear canvas with arena background
        this.ctx.fillStyle = '#1a1a2e'; // Dark arena background
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw arena floor
        this.ctx.fillStyle = '#2d5a27';
        this.ctx.fillRect(0, 400, this.canvas.width, 200);
        
        // Draw crowd areas
        this.drawCrowd();
        
        // Draw ring structure
        this.drawRingBase();
        this.drawRingPosts();
        this.drawRingRopes();
        this.drawTurnbuckles();
        
        // Draw interactive elements
        this.drawAnnounceTable();
        this.drawSteelSteps();
        this.drawWeaponAreas();
        
        // Draw arena lighting effects
        this.drawLighting();
    }
    
    drawCrowd() {
        // Left crowd
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(
            this.crowdArea.left.x, 
            this.crowdArea.left.y, 
            this.crowdArea.left.width, 
            this.crowdArea.left.height
        );
        
        // Right crowd
        this.ctx.fillRect(
            this.crowdArea.right.x, 
            this.crowdArea.right.y, 
            this.crowdArea.right.width, 
            this.crowdArea.right.height
        );
        
        // Add crowd details (simple rectangles representing people)
        this.ctx.fillStyle = '#555555';
        for (let i = 0; i < 20; i++) {
            // Left crowd figures
            this.ctx.fillRect(
                10 + (i % 5) * 15, 
                120 + Math.floor(i / 5) * 20, 
                8, 15
            );
            
            // Right crowd figures
            this.ctx.fillRect(
                710 + (i % 5) * 15, 
                120 + Math.floor(i / 5) * 20, 
                8, 15
            );
        }
    }
    
    drawRingBase() {
        // Ring apron (black skirt around ring)
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(
            this.ringX - 20, 
            this.ringY - 10, 
            this.ringWidth + 40, 
            this.ringHeight + 70
        );
        
        // Main ring canvas (gray wrestling surface)
        this.ctx.fillStyle = '#4a4a4a';
        this.ctx.fillRect(
            this.ringX, 
            this.ringY, 
            this.ringWidth, 
            this.ringHeight
        );
        
        // Ring canvas details (lines)
        this.ctx.strokeStyle = '#666666';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.ringX, this.ringY + this.ringHeight / 2);
        this.ctx.lineTo(this.ringX + this.ringWidth, this.ringY + this.ringHeight / 2);
        this.ctx.stroke();
    }
    
    drawRingPosts() {
        this.ctx.fillStyle = '#888888'; // Steel gray posts
        this.ctx.strokeStyle = '#666666';
        this.ctx.lineWidth = 2;
        
        // Left ring post
        this.ctx.fillRect(
            this.ringX - 5, 
            this.ringY - this.ringPostHeight, 
            10, 
            this.ringPostHeight
        );
        this.ctx.strokeRect(
            this.ringX - 5, 
            this.ringY - this.ringPostHeight, 
            10, 
            this.ringPostHeight
        );
        
        // Right ring post
        this.ctx.fillRect(
            this.ringX + this.ringWidth - 5, 
            this.ringY - this.ringPostHeight, 
            10, 
            this.ringPostHeight
        );
        this.ctx.strokeRect(
            this.ringX + this.ringWidth - 5, 
            this.ringY - this.ringPostHeight, 
            10, 
            this.ringPostHeight
        );
    }
    
    drawRingRopes() {
        this.ctx.strokeStyle = '#ffffff'; // White ropes
        this.ctx.lineWidth = 4;
        
        // Draw three levels of ropes
        this.ropeHeight.forEach(height => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.ringX, this.ringY - height);
            this.ctx.lineTo(this.ringX + this.ringWidth, this.ringY - height);
            this.ctx.stroke();
        });
    }
    
    drawTurnbuckles() {
        this.ctx.fillStyle = '#ffff00'; // Yellow turnbuckle pads
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        
        // Left turnbuckle
        this.ctx.fillRect(
            this.ringX - 15, 
            this.ringY - 160, 
            this.turnbuckleWidth, 
            40
        );
        this.ctx.strokeRect(
            this.ringX - 15, 
            this.ringY - 160, 
            this.turnbuckleWidth, 
            40
        );
        
        // Right turnbuckle
        this.ctx.fillRect(
            this.ringX + this.ringWidth - 15, 
            this.ringY - 160, 
            this.turnbuckleWidth, 
            40
        );
        this.ctx.strokeRect(
            this.ringX + this.ringWidth - 15, 
            this.ringY - 160, 
            this.turnbuckleWidth, 
            40
        );
    }
    
    drawAnnounceTable() {
        if (!this.announceTable.broken) {
            // Table surface
            this.ctx.fillStyle = '#8B4513'; // Brown table
            this.ctx.fillRect(
                this.announceTable.x, 
                this.announceTable.y, 
                this.announceTable.width, 
                this.announceTable.height
            );
            
            // Table legs
            this.ctx.fillStyle = '#654321';
            this.ctx.fillRect(
                this.announceTable.x + 5, 
                this.announceTable.y + this.announceTable.height, 
                8, 20
            );
            this.ctx.fillRect(
                this.announceTable.x + this.announceTable.width - 13, 
                this.announceTable.y + this.announceTable.height, 
                8, 20
            );
            
            // Monitors on table
            this.ctx.fillStyle = '#333333';
            this.ctx.fillRect(
                this.announceTable.x + 10, 
                this.announceTable.y - 15, 
                25, 15
            );
            this.ctx.fillRect(
                this.announceTable.x + 45, 
                this.announceTable.y - 15, 
                25, 15
            );
        } else {
            // Draw broken table pieces
            this.ctx.fillStyle = '#654321';
            this.ctx.fillRect(this.announceTable.x, this.announceTable.y + 20, 30, 10);
            this.ctx.fillRect(this.announceTable.x + 40, this.announceTable.y + 25, 35, 8);
            
            // Broken monitor pieces
            this.ctx.fillStyle = '#222222';
            this.ctx.fillRect(this.announceTable.x + 15, this.announceTable.y + 15, 15, 8);
        }
    }
    
    drawSteelSteps() {
        this.ctx.fillStyle = '#C0C0C0'; // Silver steel
        this.ctx.strokeStyle = '#808080';
        this.ctx.lineWidth = 2;
        
        // Main step structure
        this.ctx.fillRect(
            this.steelSteps.x, 
            this.steelSteps.y, 
            this.steelSteps.width, 
            this.steelSteps.height
        );
        this.ctx.strokeRect(
            this.steelSteps.x, 
            this.steelSteps.y, 
            this.steelSteps.width, 
            this.steelSteps.height
        );
        
        // Step levels
        this.ctx.beginPath();
        this.ctx.moveTo(this.steelSteps.x, this.steelSteps.y + 10);
        this.ctx.lineTo(this.steelSteps.x + this.steelSteps.width, this.steelSteps.y + 10);
        this.ctx.moveTo(this.steelSteps.x, this.steelSteps.y + 20);
        this.ctx.lineTo(this.steelSteps.x + this.steelSteps.width, this.steelSteps.y + 20);
        this.ctx.stroke();
    }
    
    drawWeaponAreas() {
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.2)'; // Semi-transparent yellow
        this.ctx.strokeStyle = '#ffff00';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([3, 3]);
        
        this.weaponAreas.forEach(area => {
            this.ctx.fillRect(area.x, area.y, area.width, area.height);
            this.ctx.strokeRect(area.x, area.y, area.width, area.height);
        });
        
        this.ctx.setLineDash([]); // Reset line dash
        
        // Weapon indicators
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.weaponAreas.forEach(area => {
            this.ctx.fillText(
                'WEAPONS', 
                area.x + area.width / 2, 
                area.y + area.height / 2 + 3
            );
        });
    }
    
    drawLighting() {
        // Arena spotlight effect
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, 0, 0,
            this.canvas.width / 2, 0, 400
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Collision detection methods
    isInRing(x, y) {
        return x >= this.ringX && x <= this.ringX + this.ringWidth &&
               y >= this.ringY - this.ringPostHeight && y <= this.ringY;
    }
    
    isOnApron(x, y) {
        return x >= this.ringX - 20 && x <= this.ringX + this.ringWidth + 20 &&
               y >= this.ringY - 10 && y <= this.ringY + 60 &&
               !this.isInRing(x, y);
    }
    
    isNearWeapons(x, y) {
        return this.weaponAreas.some(area => {
            return x >= area.x - 10 && x <= area.x + area.width + 10 &&
                   y >= area.y - 10 && y <= area.y + area.height + 10;
        });
    }
    
    // Get ring floor Y position
    getRingFloorY() {
        return this.ringY;
    }
    
    // Get ground level Y position
    getGroundY() {
        return 450;
    }
    
    // Break announce table
    breakAnnounceTable() {
        this.announceTable.broken = true;
    }
}
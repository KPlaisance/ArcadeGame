

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Checks to see if boundary has been crossed
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    }

    else {
        this.x = this.resetPos;
    }
        
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = "images/char-boy.png";
        this.triumphant = false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update hero's x and y property according to input
     * 
     * @param {string} input - Direction to travel
     */
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

   
    update() {
         // Collision Checking
        for (let enemy of allEnemies) 
        {
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > 
                this.x && enemy.x < this.x + this.step/2))
            {
                this.reset();
            }
        }
            // Did the player make it to the last road (win)?
            if
            (this.y === 55)
            {
                this.triumphant = true;
            }

        }
    // Resets character        
    reset()
    {
        this.y = this.startY;
        this.x = this.startX;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// New Hero and Enemy objects
const player = new Hero();
const bug1 = new Enemy(-101, 0, 400);
const bug2 = new Enemy(-101, 83, 260);
const bug3 = new Enemy((-101*2.5), 83, 260);
const bug4 = new Enemy((-101*5), 166, 200);

// Collection of enemies
const allEnemies = [];

// Push enemy objects into collection
allEnemies.push(bug1,bug2,bug3,bug4);
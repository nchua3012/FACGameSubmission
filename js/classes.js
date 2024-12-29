//Sprite Class

class Sprite {
    constructor({position, imageSrc, scale = 1, framesMaxX = 1, framesMaxY = 1, row = 0, validFrames = [], offset = {x:0, y:0}}) { // default values
        this.position = position
        this.width = 50
        this.height = 200
        this.image = new Image()
        this.image.src = imageSrc

// load before accessing width and height
        this.image.onload = () => {
            this.width = this.image.width / framesMaxX;
            this.height = this.image.height / framesMaxY;
        };

        this.scale = scale
        this.framesMaxX = framesMaxX // Total frames in a row
        this.framesMaxY = framesMaxY // Total frames in a column
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = .075 // Adjust for speed of animation
        this.offset = offset
        this.row = row
        this.validFrames = validFrames
        this.facing = "right"
        this.dead = false

    }
        
    draw() {

// code addded to ensure the image is loaded before drawing 
        if (!this.image) return;

// Calculate the frame width and height based on sprite sheet dimensions and number of frames
        const frameWidth = this.image.width / this.framesMaxX;
        const frameHeight = this.image.height / this.framesMaxY;

        c.save();

// character direction based on left or right
if (this.facing === "left") {
    c.translate(this.position.x + frameWidth * this.scale, this.position.y);  // Translate position for flipping
    c.scale(-1, 1);  // Flip horizontally
    c.translate(-this.offset.x, -this.offset.y);  // Adjust for offset
} else {
    c.translate(this.position.x - this.offset.x, this.position.y - this.offset.y);  // Regular positioning
}

// Determine which row and column to use for the current frame
        const frameX = this.validFrames[this.framesCurrent] % this.framesMaxX; // vertical position (column)
        const frameY = this.row; // horizontal position (row)

        c.drawImage(
            this.image,
            frameX * frameWidth,       // X position on the sprite sheet (current frame in row)
            frameY * frameHeight,      // Y position on the sprite sheet (current frame in column)
            frameWidth,                // Width of the frame
            frameHeight,               // Height of the frame
            0,0,
            frameWidth * this.scale,   // Draw width with scale
            frameHeight * this.scale   // Draw height with scale
        )

// DEBUG - border around the sprite frame - commented out
//      c.strokeStyle = "pink";  // Set the color of the border
//       c.lineWidth = 1;  // Set the width of the border
//      c.strokeRect(0, 0, frameWidth * this.scale, frameHeight * this.scale);  // Draw the border around the sprite


        c.restore();
    }

    animateFrames(deltaTime) {
        // Scale the framesElapsed by deltaTime
        this.framesElapsed += deltaTime;

        if (this.framesElapsed >= this.framesHold) {
            this.framesCurrent++;
            this.framesElapsed = 0;

            // Loop back to the first frame if we reach the end
            if (this.framesCurrent >= this.validFrames.length) {
                this.framesCurrent = 0;
            }
        }
    }

    update(deltaTime) {
        this.draw();
        this.animateFrames(deltaTime); 
        
    }
}
        
//Fighter (player 1 & player 2)

    class Fighter extends Sprite {
        constructor({
            position, 
            velocity, 
            color = 'red',  
            imageSrc, 
            scale = 1, 
            framesMaxX = 1, 
            framesMaxY = 1, 
            validFrames = [],
            offset= { x: 0, y: 0 },
            sprites,
            attackBox = {offset: {}, width:undefined, height:undefined},
            characterBox = { offset: { x: 0, y: 0 }, width: undefined, height: undefined }
        }) {

//super calls sprite class constructers

            super ({
                imageSrc,
                scale,
                position,
                framesMaxX,
                framesMaxY,
                offset: { x: 0, y: 0 },
                validFrames,
                
            })

            this.velocity = velocity
            this.width = 50
            this.height = 75
            this.lastKey = null
            

// characterBox if provided, else use default size
this.characterBox = {
    position: {
        x: this.position.x + (characterBox.offset?.x || 0),
        y: this.position.y + (characterBox.offset?.y || 0),
    },
    offset: characterBox.offset || { x: 0, y: 0 },
    width: characterBox.width || this.width * this.scale, 
    height: characterBox.height || this.height * this.scale 
};

// debugging positions of characterBox
//console.log("CharacterBox Offsets:", this.characterBox.offset);
//console.log('Character Box X:', this.characterBox.position.x);
//console.log('Character Box Y:', this.characterBox.position.y);
//console.log('Character Box Width:', this.characterBox.width);
//console.log('Character Box Height:', this.characterBox.height);
//console.log('Position X:', this.position.x);
//console.log('Offset X:', this.characterBox.offset.x);

//start position.y is within the canvas bounds

            this.position.y = this.position.y || canvas.height - this.height;


//attack box
            this.attackBox = {
                position: {
                x: this.position.x,
                y: this.position.y
                },
                offset: attackBox.offset || { x: 0, y: 0 },
                width: attackBox.width || 100,
                height: attackBox.height || 50
                },
                
                
                this.color = color;
                this.isAttacking = false;
                this.health = 100;
                this.framesCurrent = 0;
                this.framesElapsed = 0;
                this.sprites = sprites;
                

                for (const sprite in this.sprites) { 
                    sprites[sprite].image = new Image()
                    sprites[sprite].image.src = sprites[sprite].imageSrc
                }
                console.log(this.sprites)
            }
                
  // Gravity updated with deltaTime
  applyGravity(deltaTime) {
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 190) {
        this.velocity.y = 0;
        this.position.y = canvas.height - this.height - 190; 
    } else {
        this.velocity.y += gravity * deltaTime;
    }
}
// jump strength
jump() {
    
    if (this.position.y === canvas.height - this.height - 190) {
        this.velocity.y = jumpStrength; 
    }
}
            update(deltaTime) {
                this.draw();
                if (!this.dead) this.animateFrames(deltaTime);
            
// Gravity
                this.applyGravity(deltaTime);

 // Update characterBox position with offsets
 this.characterBox.position.x = this.position.x + this.characterBox.offset.x;
 this.characterBox.position.y = this.position.y + this.characterBox.offset.y;


//character directions based on velocity            
                if (this.velocity.x > 0) {
                    this.facing = "right";
                } else if (this.velocity.x < 0) {
                    this.facing = "left";
                }

 //character movement horizontally                
                this.position.x += this.velocity.x;  // Horizontal movement
                this.position.y += this.velocity.y;  // Vertical movement


// Player attack setup
player.attackBox.position.x = player.position.x + player.attackBox.offset.x;
player.attackBox.position.y = player.position.y + player.attackBox.offset.y;

// Enemy attack setup
enemy.attackBox.position.x = enemy.position.x + enemy.attackBox.offset.x;
enemy.attackBox.position.y = enemy.position.y + enemy.attackBox.offset.y;

if (this.isAttacking) {
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy })) {
        console.log('Player hit enemy!');
    }
}

// Check enemy collision with player (if they are attacking)
if (enemy.isAttacking) {
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player })) {
        console.log('Enemy hit player!');
    }
}


// DEBUG - character box area  
//c.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Green for characterBox
//c.fillRect(
//   this.characterBox.position.x + this.characterBox.offset.x,
//    this.characterBox.position.y + this.characterBox.offset.y, 
//   this.characterBox.width,
//  this.characterBox.height
//);

// DEBUG - attack box area  
//c.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red for attackBox
//c.fillRect(
//   this.attackBox.position.x + this.attackBox.offset.x, 
//    this.attackBox.position.y + this.attackBox.offset.y, 
 //   this.attackBox.width,
 //  this.attackBox.height
//);


// attacking      
                if (this.isAttacking && this.framesCurrent === this.sprites.attack.framesMaxX - 200) {
                        this.isAttacking = false;
                            this.switchSprite('idle');  

                        }
            }
//take hit
takeHit(){
    this.health -= 20;
    if (this.health <= 0) {
        this.switchSprite ('death')
    } else this.switchSprite('takeHit')

}


// swapping sprites based on action

            switchSprite(sprite) {
                if(this.image === this.sprites.death.image) 
                    if (this.image === this.sprites.death.image) {
                        if (this.framesCurrent === this.sprites.death.validFrames.length - 1) {
                            this.dead = true; 
                        }
                        return
                    }
                if (
                    this.image === this.sprites.attack.image 
                    && this.framesCurrent < this.sprites.attack.validFrames.length - 1
                ) 
                return // Don't switch sprite if attack animation is still in progress
        
                if(
                    this.image === this.sprites.takeHit.image 
                    && this.framesCurrent < this.sprites.takeHit.validFrames.length - 1
                )
                return


                switch (sprite) {
                    case 'idle':
                        if (this.image !== this.sprites.idle.image) {
                            this.image = this.sprites.idle.image;
                            this.framesMaxX = this.sprites.idle.framesMaxX;
                            this.framesMaxY = this.sprites.idle.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.idle.row;
                            this.validFrames = this.sprites.idle.validFrames;
                        }
                    break

                    case 'run':
                        if (this.image !== this.sprites.run.image) {
                            this.image = this.sprites.run.image;
                            this.framesMaxX = this.sprites.run.framesMaxX;
                            this.framesMaxY = this.sprites.run.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.run.row;
                            this.validFrames = this.sprites.run.validFrames;
                        }
                    break

                    case 'jump':
                        if (this.image !== this.sprites.jump.image) {
                            this.image = this.sprites.jump.image;
                            this.framesMaxX = this.sprites.jump.framesMaxX;
                            this.framesMaxY = this.sprites.jump.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.jump.row;
                            this.validFrames = this.sprites.jump.validFrames;
                        }
                    break

                    case 'attack':
                        if (this.image !== this.sprites.attack.image) {
                            this.image = this.sprites.attack.image;
                            this.framesMaxX = this.sprites.attack.framesMaxX;
                            this.framesMaxY = this.sprites.attack.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.attack.row;
                            this.validFrames = this.sprites.attack.validFrames;
                        }
                    break

                    case 'fall':
                        if (this.image !== this.sprites.fall.image) {
                            this.image = this.sprites.fall.image;
                            this.framesMaxX = this.sprites.fall.framesMaxX;
                            this.framesMaxY = this.sprites.fall.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.fall.row;
                            this.validFrames = this.sprites.fall.validFrames;
                        }
                    break

                    case 'takeHit':
                        if (this.image !== this.sprites.takeHit.image) {
                            this.image = this.sprites.takeHit.image;
                            this.framesMaxX = this.sprites.takeHit.framesMaxX;
                            this.framesMaxY = this.sprites.takeHit.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.takeHit.row;
                            this.validFrames = this.sprites.takeHit.validFrames;
                        }
                    break

                    case 'death':
                        if (this.image !== this.sprites.death.image) {
                            this.image = this.sprites.death.image;
                            this.framesMaxX = this.sprites.death.framesMaxX;
                            this.framesMaxY = this.sprites.death.framesMaxY;
                            this.framesCurrent = 0;
                            this.row = this.sprites.death.row;
                            this.validFrames = this.sprites.death.validFrames;
                        }
                    break
                }
            }

//attacking 

            attack() {
                if (!this.isAttacking) {
                    this.switchSprite('attack');
                    this.isAttacking = true;
                    console.log(
                        'Collision detected:',
                        rectangularCollision({ rectangle1: player, rectangle2: enemy })
                    );
        
                }
            }

            
        }
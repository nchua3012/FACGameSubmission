class Sprite {
    constructor({position, imageSrc, scale = 1, framesMaxX = 1, framesMaxY = 1, offset = {x:0, y:0}}) {
        this.position = position
        this.width = 50 // adjust according to sprite
        this.height = 200 // adjust according to sprite
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
        this.framesHold = 25 // Adjust for speed of animation
        this.offset = offset
    }
        
    draw() {

        // Ensure the image is loaded before drawing
        if (!this.image) return;

        // Calculate the frame width and height based on sprite sheet dimensions and number of frames
        const frameWidth = this.image.width / this.framesMaxX;
        const frameHeight = this.image.height / this.framesMaxY;

        // Determine which row and column to use for the current frame
        const frameX = this.framesCurrent % this.framesMaxX; // Horizontal position (column)
        const frameY = Math.floor(this.framesCurrent / this.framesMaxX); // Vertical position (row)

        c.drawImage(
            this.image,
            frameX * frameWidth,       // X position on the sprite sheet (current frame in row)
            frameY * frameHeight,      // Y position on the sprite sheet (current frame in column)
            frameWidth,                // Width of the frame
            frameHeight,               // Height of the frame
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            frameWidth * this.scale,   // Draw width with scale
            frameHeight * this.scale   // Draw height with scale
        )
    }

animateFrames() {
    this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMaxX * this.framesMaxY - 1) {
                this.framesCurrent++
                } else {
                this.framesCurrent = 0
                }
            }
    }

    update() {
        this.draw()
        this.animateFrames()
        }
    }
        
    class Fighter extends Sprite {
        constructor({
            position, 
            velocity, 
            color = 'red',  
            imageSrc, 
            scale = 1, 
            framesMaxX = 1, 
            framesMaxY = 1, 
            offset= { x: 0, y: 0 },
            sprites,
            
            
        }) {

            super ({
                imageSrc,
                scale,
                position,
                framesMaxX,
                framesMaxY,
                offset: { x: 0, y: 0 },
            
            })

            this.velocity = velocity
            this.width = 50
            this.height = 200
            this.lastKey = null

            // Ensure that the initial position.y is within the canvas bounds
            this.position.y = this.position.y || canvas.height - this.height;

            this.attackBox = {
                position: {
                x: this.position.x,
                y: this.position.y
                },
                offset,
                    width: 100,
                    height: 50,
                };
                
                this.color = color;
                this.isAttacking = false;
                this.health = 100;
                this.framesCurrent = 0;
                this.framesElapsed = 0;
                this.framesHold = 19;
                this.sprites = sprites;

                for (const sprite in this.sprites) { 
                    sprites[sprite].image = new Image()
                    sprites[sprite].image.src = sprites[sprite].imageSrc
                }
                console.log(this.sprites)
            }
        
                
            update() {
                this.draw();
                this.animateFrames();

                //updates to attach box positioning
                this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
                this.attackBox.position.y = this.position.y;
        
                //updates to players position - velocity
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
        
                //gravity
                if (this.position.y + this.height + this.velocity.y >= canvas.height - 153) {
                    this.velocity.y = 0;
                    this.position.y = canvas.height - this.height - 153;
                    } else {
                        this.velocity.y += gravity}
            }

            switchSprite(sprite) {
                if ( 
                    this.image === this.sprites.attack.image 
                    && this.framesCurrent < this.sprites.attack.framesMaxX - 1
                ) 
                return

                switch (sprite) {
                    case 'idle':
                        if (this.image !== this.sprites.idle.image) {
                            this.image = this.sprites.idle.image;
                            this.framesMaxX = this.sprites.idle.framesMaxX;
                            this.framesMaxY = this.sprites.idle.framesMaxY;
                            this.framesCurrent = 0;
                        }
                    break

                    case 'run':
                        if (this.image !== this.sprites.run.image) {
                            this.image = this.sprites.run.image;
                            this.framesMaxX = this.sprites.run.framesMaxX;
                            this.framesMaxY = this.sprites.run.framesMaxY;
                            this.framesCurrent = 0;
                        }
                    break

                    case 'jump':
                        if (this.image !== this.sprites.jump.image) {
                            this.image = this.sprites.jump.image;
                            this.framesMaxX = this.sprites.jump.framesMaxX;
                            this.framesMaxY = this.sprites.jump.framesMaxY;
                            this.framesCurrent = 0;
                        }
                    break

                    case 'attack':
                        if (this.image !== this.sprites.attack.image) {
                            this.image = this.sprites.attack.image;
                            this.framesMaxX = this.sprites.attack.framesMaxX;
                            this.framesMaxY = this.sprites.attack.framesMaxY;
                            this.framesCurrent = 0;
                        }
                    break
                }
            }

            attack() {
            this.switchSprite('attack')
            this.isAttacking = true
            setTimeout(() => {
                this.isAttacking = false
            }, 100)
            }

        }
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMaxX = 1, framesMaxY = 1}) {
        this.position = position
        this.width = 50 // This can be adjusted as per your sprite's design
        this.height = 150 // This can be adjusted as per your sprite's design
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMaxX = framesMaxX // Total frames in a row
        this.framesMaxY = framesMaxY // Total frames in a column
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 19 // Adjust for speed of animation
    }
        
    draw() {
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
            this.position.x, 
            this.position.y, 
            frameWidth * this.scale,   // Draw width with scale
            frameHeight * this.scale   // Draw height with scale
        )
    }
    update() {
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMaxX * this.framesMaxY - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }

        }
        }
    }
        
    class Fighter extends Sprite {
        constructor({
            position, 
            velocity, 
            color = 'red', 
            offset, 
            imageSrc, 
            scale = 1, 
            framesMaxX = 1, 
            framesMaxY = 1 
        }) {

            super({
                imageSrc,
                scale,
                position,
                framesMaxX,
                framesMaxY,
            
            })

            this.velocity = velocity
            this.width = 50
            this.height = 125
            this.lastKey = null
            this.attackBox = {
                position: {
                x: this.position.x,
                y: this.position.y
                },
                offset,
                    width: 100,
                    height: 50,
                },
                
                this.color = color
                this.isAttacking = false
                this.health = 100
                this.framesCurrent = 0
                this.framesElapsed = 0
                this.framesHold = 19
            }
        
                
            update() {
                this.draw()
                this.attackBox.position.x = this.position.x + this.attackBox.offset.x
                this.attackBox.position.y = this.position.y
        
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
        
                if (this.position.y + this.height + this.velocity.y >= canvas.height - 57) {
                    this.velocity.y = 0
                    } else this.velocity.y += gravity
            }
        
            attack() {
            this.isAttacking = true
            setTimeout(() => {
                this.isAttacking = false
            }, 100)
            }
        }
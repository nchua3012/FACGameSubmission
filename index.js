const canvas = document.querySelector ('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.3

// Background Image

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
imageSrc: 'Image/Background/example.png',
})

// animated fire

const backgroundFire = new Sprite({
    position: {
        x:200,
        y:261
    },

imageSrc: 'Image/Background Sprites/Fire+Sparks-Sheet.png',
scale: .85,
framesMaxX: 4, // 4 frames per row
framesMaxY: 5  // 2 rows of frames
})
    


// Player 

const player = new Fighter({
    position: {
        x: 250,
        y: 0,
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: 0,
        y: 0
    },
    
imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
scale: 1.75,
framesMaxX: 30, // 1 frames per row
framesMaxY: 13,  // 6 rows of frames
offset: {
    x:0,
    y:0
},

sprites: {
    idle:{
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 8 frames per row
        framesMaxY: 13,  // 1 rows of frames
    },
    run: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 10 frames per row
        framesMaxY: 13,  // 1 rows of frames
    },
    jump: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 4 frames per row
        framesMaxY: 13,  // 1 rows of frames
    },
    fall: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 4 frames per row
        framesMaxY: 13,  // 1 rows of frames
    },
    attack: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 20 frames per row
        framesMaxY: 13,  // 1 rows of frames
    }

}

})

player.draw()

// Enemy

const enemy = new Fighter({
    position: {
        x:600,
        y:0
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: 0,
        y: 0
    },

imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
scale: 1.75,
framesMaxX: 25, // 1 frames per row
framesMaxY: 14,  // 6 rows of frames
offset: {
    x:0,
    y:0,
},

sprites: {
    idle:{
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
    },
    run: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
    },
    jump: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
    },
    fall: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
    },
    attack: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
    }
    }
})
    
enemy.draw()

// Player Movement

const keys = {
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    w: {
        pressed:false
    },

// Enemy Movement

    ArrowRight: {
        pressed:false
    },
    ArrowLeft: {
        pressed:false
    },
    ArrowUp: {
        pressed:false
    },

}

let lastKey


decreaseTimer()

function animate () {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    backgroundFire.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player Movement
    
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1.75
        player.switchSprite('run')
    } else if (keys.d.pressed&& player.lastKey === 'd'){
        player.velocity.x = 1.75
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // jumping

    if (player.velocity.y < 0) {
    player.switchSprite('jump')
    } 

    



    // Enemy Movement
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1.75
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 1.75
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

// jumping

if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
    } 


    // detect for collision.attacking

    if ( 
        rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector ('#enemyHealth').style.width = enemy.health + "%"
    
    }

    if ( 
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector ('#playerHealth').style.width = player.health + "%"
    }

    //End game based on health

    if (enemy.health <=0 || player.health <=0 ) {
    determineWinner ({player, enemy, timerId})
    }
}




animate()

window.addEventListener('keydown', (event) => {

// Player Movement 
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break  
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break


// Enemy Movement        
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.attack()
            break

    }
})

window.addEventListener('keyup', (event) => {

// Player Movement    
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break   

// Enemy Movement
        case 'ArrowRight':
                keys.ArrowRight.pressed = false
                break
        case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
                break  
        
    }
})
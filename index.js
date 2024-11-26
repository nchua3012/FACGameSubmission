const canvas = document.querySelector ('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.14

// Background Image

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
imageSrc: 'Image/Background/example.png',
validFrames: [0],
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
framesMaxY: 5,  // 2 rows of frames
validFrames: [0, 1, 2, 3, 4, 5],
})
    


// Player 

const player = new Fighter({
    position: {
        x: 50,
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
scale: 2,
framesMaxX: 30, // 30 frames per row
framesMaxY: 13,  // 13 rows of frames

sprites: {
    idle:{
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 8 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 0,
        validFrames: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    run: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 8 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 1,
        validFrames: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    jump: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 4 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 2,
        validFrames: [0, 1, 2],
    },
    fall: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 4 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 3,
        validFrames: [0, 1, 2],
    },
    attack: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 20 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 4,
        validFrames: [0, 1, 2, 3, 4, 5, 6],
    },
    takeHit: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 20 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 11,
        validFrames: [0, 1, 2, 3, 4, 5],
    },
    death: {
        imageSrc:'Image/Character 1/wind_SpriteSheet_288x128.png',
        framesMaxX: 30, // 20 frames per row
        framesMaxY: 13,  // 1 rows of frames
        row: 12,
        validFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    }

},
attackBox:{
    offset:{
        x:160,
        y:90
    },
    width: 75,
    height:75
},

characterBox: { 
    offset: { 
        x: 130, 
        y: 90
    }, 
    width: 50, // player 1 characterbox width
    height: 75, // player 1 characterbox height
},

});
console.log(`Player initial position - X: ${player.position.x}, Y: ${player.position.y}`); // Log player1 start position

player.draw()

// Enemy

const enemy = new Fighter({
    position: {
        x: 350,
        y: 0
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
scale: 2.2,
framesMaxX: 25, // 1 frames per row
framesMaxY: 14,  // 6 rows of frames

sprites: {
    idle:{
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
        validFrames: [0, 1, 2, 3, 4, 5],
        row: 0,
        
    },
    run: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
        validFrames: [0, 1, 2, 3, 4, 5, 6, 7],
        row: 1,
    },
    jump: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
        validFrames: [0, 1, 2],
        row: 2,
    },
    fall: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
        validFrames: [0, 1, 2],
        row: 3,
    },
    attack: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 8 frames per row
        framesMaxY: 14,  // 1 rows of frames
        validFrames: [0, 1, 2, 3, 4, 5, 6],
        row: 4,
        },
    takeHit: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 20 frames per row
        framesMaxY: 14,  // 1 rows of frames
        row: 12,
        validFrames: [0, 1, 2, 3, 4, 5],
        },
    death: {
        imageSrc:'Image/Character 2/ground_monk_FREE_v1.3-SpriteSheet_288x128.png',
        framesMaxX: 25, // 20 frames per row
        framesMaxY: 14,  // 1 rows of frames
        row: 13,
        validFrames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        }
    },
    attackBox:{
        offset:{
            x:100,
            y:90
        },
        width: 75,
        height: 75
    },
    characterBox: { 
        offset: { 
            x: 145, 
            y: 90 
        }, // Initial offset
        width: 50, // player 2 characterbox width
        height: 75, // player 2 characterbox height
    },
});
console.log(`Player initial position - X: ${player.position.x}, Y: ${player.position.y}`); // Log player2 start position

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
    c.fillStyle = 'red'
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
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
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
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
        } 


// detect for collision.attacking

    if ( 
        rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
        }) &&
        player.isAttacking && player.framesCurrent === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false
        document.querySelector ('#enemyHealth').style.width = enemy.health + "%"
    }

// if attack misses
   if (player.isAttacking && player.framesCurrent === 4 ) {
    player.isAttacking = false
   }


    if ( 
        rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        player.takeHit()
        enemy.isAttacking = false
        document.querySelector ('#playerHealth').style.width = player.health + "%"
    }

    //End game based on health

    if (enemy.health <=0 || player.health <=0 ) {
    determineWinner ({player, enemy, timerId})
    }
}




animate()






window.addEventListener('keydown', (event) => {

if (!player.dead){

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
    }
}
// Enemy Movement      
if (!enemy.dead){

    switch (event.key){
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
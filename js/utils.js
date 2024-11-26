
function rectangularCollision({ rectangle1, rectangle2 }) {

    // Horizontal collision: Check if the attackBox overlaps with the characterBox horizontally
    const horizontalCollision = 
        rectangle1.attackBox.position.x + rectangle1.attackBox.width > rectangle2.characterBox.position.x &&
        rectangle1.attackBox.position.x < rectangle2.characterBox.position.x + rectangle2.characterBox.width;

    // Vertical collision: Check if the attackBox overlaps with the characterBox vertically
    const verticalCollision = 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height > rectangle2.characterBox.position.y &&
        rectangle1.attackBox.position.y < rectangle2.characterBox.position.y + rectangle2.characterBox.height;

    // DEBUG - check if both horizontal and vertical collisions occur
    if (horizontalCollision && verticalCollision) {
        console.log('Collision detected between attackBox and characterBox');
        return true; // Collision detected
    }

    return false; // No collision
}



function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.querySelector ('#gameEndTie').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector ('#gameEndTie').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector ('#gameEndTie').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health)
        document.querySelector ('#gameEndTie').innerHTML = 'Player 2 Wins'    
    }


let timer = 30
let timerId
function decreaseTimer() {
    
    if (timer > 0) {
        timerId = setTimeout (decreaseTimer, 1000)
        timer--
    document.querySelector ('#timer').innerHTML = timer
    }

    if (timer === 0) {
        document.querySelector ('#gameEndTie').style.display = 'flex'
        determineWinner({player, enemy, timerId})
    }
}
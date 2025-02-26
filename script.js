document.addEventListener('DOMContentLoaded', function() {
    // Heart Animation
    const heartCanvas = document.createElement('canvas');
    heartCanvas.id = 'heartCanvas';
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;
    heartCanvas.style.position = 'fixed';
    heartCanvas.style.top = '0';
    heartCanvas.style.left = '0';
    heartCanvas.style.zIndex = '0';
    heartCanvas.style.pointerEvents = 'none';
    document.body.insertBefore(heartCanvas, document.body.firstChild);

    const heartCtx = heartCanvas.getContext('2d');

    class Heart {
        constructor() {
            this.x = Math.random() * heartCanvas.width;
            this.y = Math.random() * heartCanvas.height;
            this.size = Math.random() * 20 + 10;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        draw() {
            heartCtx.font = `${this.size}px Arial`;
            heartCtx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
            heartCtx.textAlign = 'center';
            heartCtx.textBaseline = 'middle';
            heartCtx.fillText('❤️', this.x, this.y);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > heartCanvas.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > heartCanvas.height) {
                this.speedY *= -1;
            }
        }
    }

    let hearts = [];

    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }

    function animateHearts() {
        heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
        
        hearts.forEach(heart => {
            heart.draw();
            heart.update();
        });

        requestAnimationFrame(animateHearts);
    }

    animateHearts();

    // Penguin and Chick Animation
    const penguin = document.getElementById('penguin');
    const chick = document.getElementById('chick');
    const heartEmoji = document.getElementById('heart');

    let penguinPos = { x: 0, y: 0 };
    let chickPos = { x: 0, y: 0 };
    let penguinTarget = { x: 0, y: 0 };
    let chickTarget = { x: 0, y: 0 };

    function setRandomPosition(character) {
        const x = Math.random() * (window.innerWidth - 50);
        const y = Math.random() * (window.innerHeight - 50);
        character.style.left = `${x}px`;
        character.style.top = `${y}px`;
        return { x, y };
    }

    function moveTowards(current, target, speed) {
        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > speed) {
            const ratio = speed / distance;
            return {
                x: current.x + dx * ratio,
                y: current.y + dy * ratio
            };
        } else {
            return target;
        }
    }

    function updatePositions() {
        penguinPos = moveTowards(penguinPos, penguinTarget, 1);
        chickPos = moveTowards(chickPos, chickTarget, 1);

        penguin.style.left = `${penguinPos.x}px`;
        penguin.style.top = `${penguinPos.y}px`;
        chick.style.left = `${chickPos.x}px`;
        chick.style.top = `${chickPos.y}px`;
    }

    function checkMeeting() {
        const distance = Math.sqrt(
            Math.pow(penguinPos.x - chickPos.x, 2) +
            Math.pow(penguinPos.y - chickPos.y, 2)
        );

        if (distance < 50) {
            // Display the heart emoji
            heartEmoji.style.left = `${(penguinPos.x + chickPos.x) / 2}px`;
            heartEmoji.style.top = `${Math.min(penguinPos.y, chickPos.y) - 30}px`;
            heartEmoji.style.opacity = '1';
            heartEmoji.style.animation = 'bounce 0.5s ease';

            setTimeout(() => {
                heartEmoji.style.opacity = '0';
                heartEmoji.style.animation = 'none';
                
                // Respawn in separate locations
                penguinPos = setRandomPosition(penguin);
                chickPos = setRandomPosition(chick);
                
                // Set new targets (each other's position)
                penguinTarget = { ...chickPos };
                chickTarget = { ...penguinPos };
            }, 1000);
        }
    }

    function init() {
        penguinPos = setRandomPosition(penguin);
        chickPos = setRandomPosition(chick);
        penguinTarget = { ...chickPos };
        chickTarget = { ...penguinPos };
    }

    init();
    setInterval(updatePositions, 50); // Update positions every 50ms for smooth movement
    setInterval(checkMeeting, 100); // Check for meeting every 100ms

    // Birthday Countdown
const countdownDate = new Date("February 27, 2025 00:00:00").getTime();
const countdownElement = document.getElementById("countdown-timer");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        showBirthdayMessage();
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div><span id="days">${days.toString().padStart(2, '0')}</span><p>Days</p></div>
            <div><span id="hours">${hours.toString().padStart(2, '0')}</span><p>Hours</p></div>
            <div><span id="minutes">${minutes.toString().padStart(2, '0')}</span><p>Minutes</p></div>
            <div><span id="seconds">${seconds.toString().padStart(2, '0')}</span><p>Seconds</p></div>
        `;
    }
}

function showBirthdayMessage() {
    countdownElement.innerHTML = `<h1 class="birthday-message">Happy Birthday!</h1>`;
    triggerMassiveConfetti();
}

function triggerMassiveConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}

// Check if it's already past the birthday
if (new Date().getTime() > countdownDate) {
    showBirthdayMessage();
} else {
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to avoid delay
}


// Wish Jar
const wishForm = document.getElementById('wishForm');
const wishJar = document.getElementById('wishJar');

wishForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const wish = document.getElementById('wish').value;
    addWish(name, wish);
    wishForm.reset();
});

function addWish(name, wish) {
    fetch('add_wish.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, wish }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Wish added successfully');
        displayWish(name, wish);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayWish(name, wish) {
    const wishElement = document.createElement('div');
    wishElement.className = 'wish';
    wishElement.innerHTML = `<strong>${name}:</strong> ${wish}`;
    wishJar.appendChild(wishElement);
    
    // Animate the wish
    wishElement.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
    wishElement.style.left = `${Math.random() * 80}%`;
}

// Load wishes when the page opens
function loadWishes() {
    fetch('get_wishes.php')
    .then(response => response.json())
    .then(wishes => {
        wishes.forEach(wish => displayWish(wish.name, wish.wish));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

loadWishes();

    // Game
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let score = 0;
    let confettiTriggered = false;
    let gameActive = true;

    class GameHeart {
        constructor() {
            this.x = Math.random() * (canvas.width - 50);
            this.y = 0;
            this.size = 40; // Increased size
            this.speed = 1; // Reduced speed
            this.popping = false;
            this.popSize = this.size;
        }

        draw() {
            if (this.popping) {
                ctx.font = `${this.popSize}px Arial`;
                ctx.fillStyle = `rgba(255, 105, 180, ${1 - (this.size - this.popSize) / this.size})`;
            } else {
                ctx.font = `${this.size}px Arial`;
                ctx.fillStyle = '#FF69B4';
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('❤️', this.x, this.y);
        }

        update() {
            if (this.popping) {
                this.popSize += 2;
                if (this.popSize > this.size * 1.5) {
                    return true; // Remove this heart
                }
            } else {
                this.y += this.speed;
            }
            return false;
        }

        pop() {
            this.popping = true;
        }
    }

    let gameHearts = [];
    let lastSpawnTime = 0;
    const spawnInterval = 1000; // Spawn a new heart every 1000ms (1 second)

    function gameLoop(timestamp) {
        if (!gameActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (timestamp - lastSpawnTime > spawnInterval) {
            gameHearts.push(new GameHeart());
            lastSpawnTime = timestamp;
        }

        gameHearts = gameHearts.filter(heart => {
            heart.draw();
            const remove = heart.update();
            if (heart.y > canvas.height) {
                return false;
            }
            return !remove;
        });

        requestAnimationFrame(gameLoop);
    }

    canvas.addEventListener('click', function(event) {
        if (!gameActive) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gameHearts.forEach((heart, index) => {
            if (Math.abs(x - heart.x) < heart.size/2 && Math.abs(y - heart.y) < heart.size/2) {
                heart.pop();
                score++;
                document.getElementById('score').textContent = score;
                
                if (score === 10 && !confettiTriggered) {
                    triggerConfetti();
                    showCuteMessage();
                    confettiTriggered = true;
                    gameActive = false;
                    setTimeout(showPlayAgainMessage, 2000);
                }
            }
        });
    });

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function showCuteMessage() {
        const message = document.createElement('div');
        message.textContent = "OMG babe, you are good at this!";
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '24px';
        message.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
        message.style.color = '#FF69B4';
        message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        message.style.zIndex = '1000';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    function showPlayAgainMessage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '20px "Comic Sans MS", cursive, sans-serif';
        ctx.fillStyle = '#FF69B4';
        ctx.textAlign = 'center';
        ctx.fillText('Do you want to play again?', canvas.width / 2, canvas.height / 2 - 20);

        // Create Yes button
        const yesButton = createButton('Yes', canvas.width / 2 - 60, canvas.height / 2 + 20);
        yesButton.onclick = restartGame;

        // Create No button
        const noButton = createButton('No', canvas.width / 2 + 60, canvas.height / 2 + 20);
        noButton.onclick = endGame;
    }

    function createButton(text, x, y) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.position = 'absolute';
        button.style.left = `${canvas.offsetLeft + x - 40}px`;
        button.style.top = `${canvas.offsetTop + y - 15}px`;
        button.style.width = '80px';
        button.style.height = '30px';
        button.style.fontSize = '16px';
        button.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
        button.style.backgroundColor = '#FFC0CB';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '1000'; // Ensure buttons are on top
        canvas.parentNode.appendChild(button); // Append to canvas parent instead of body
        return button;
    }

    function restartGame() {
        score = 0;
        document.getElementById('score').textContent = score;
        confettiTriggered = false;
        gameActive = true;
        gameHearts = [];
        // Remove the buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.remove());
        gameLoop();
    }

    function endGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '24px "Comic Sans MS", cursive, sans-serif';
        ctx.fillStyle = '#FF69B4';
        ctx.textAlign = 'center';
        ctx.fillText('Thanks for playing!', canvas.width / 2, canvas.height / 2);
        // Remove the buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.remove());
        gameActive = false;
    }

    gameLoop();

    // Love Button
    const loveButton = document.getElementById('loveButton');

    loveButton.addEventListener('click', function() {
        const loveMessage = document.createElement('div');
        loveMessage.textContent = "I love you Swap";
        loveMessage.classList.add('love-message');
        
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 50;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        loveMessage.style.left = `${randomX}px`;
        loveMessage.style.top = `${randomY}px`;
        
        document.body.appendChild(loveMessage);
        
        setTimeout(() => {
            loveMessage.remove();
        }, 2000);
    });

    // Resize event listener for heart canvas
    window.addEventListener('resize', function() {
        heartCanvas.width = window.innerWidth;
        heartCanvas.height = window.innerHeight;
    });
});

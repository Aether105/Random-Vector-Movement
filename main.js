// Array to store information about each ball (position, velocity).
const balls = [
    { id: "ball1", x: 100, y: 100, vx: 0, vy: 0 },
    { id: "ball2", x: 200, y: 200, vx: 0, vy: 0 },
    { id: "ball3", x: 300, y: 300, vx: 0, vy: 0 },
];

// Constants for movement.
const acceleration = 0.005; // Acceleration towards the target
const friction = 0.9;       // Friction for smoother motion
const ballSize = 50;        // Ball diameter

// Reference to the target element.
const target = document.getElementById("target");

// Target's initial position.
let targetX = Math.random() * (window.innerWidth - 50);
let targetY = Math.random() * (window.innerHeight - 50);

// Updates the target's position every 2 seconds, in milliseconds.
setInterval(() => {
    targetX = Math.random() * (window.innerWidth - 50);
    targetY = Math.random() * (window.innerHeight - 50);
}, 2000);

// Function to update and animate the balls.
function animate() {
    for (let i = 0; i < balls.length; i++) { // Iterates through all the balls in the balls array.
        const ball = balls[i]; // Extracts the current ball from the balls array.
        const element = document.getElementById(ball.id);

        // Calculates the distance to the target.
        const dx = targetX - ball.x;
        const dy = targetY - ball.y;

        // Applies acceleration towards the target.
        ball.vx += dx * acceleration;
        ball.vy += dy * acceleration;

        // Applies friction to reduce velocity.
        ball.vx *= friction;
        ball.vy *= friction;

        // Updates ball position.
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Checks for collisions with other balls.
        for (let j = 0; j < balls.length; j++) { // Iterates through all balls in the balls array to compare their positions with the current ball (ball).
            if (i !== j) { // Ensures the current ball (i) is not compared to itself.
                const other = balls[j]; // Retrieves the ball being compared (other) from the balls array.
                const distX = ball.x - other.x;
                const distY = ball.y - other.y;
                const distance = Math.sqrt(distX * distX + distY * distY); // Calculates the actual distance between the two balls using the Pythagorean theorem.

                // Pushes away if too close.
                if (distance < ballSize) {
                    const angle = Math.atan2(distY, distX); // Calculates the angle of the line connecting the two balls.
                    const pushForce = 5; // The strength of the repulsion force between the balls.
                    ball.vx += Math.cos(angle) * pushForce;
                    ball.vy += Math.sin(angle) * pushForce;
                }
            }
        }

        // Keeps the ball within the screen boundaries.
        if (ball.x < 0) ball.x = 0, ball.vx = 0; //left
        if (ball.x + ballSize > window.innerWidth) ball.x = window.innerWidth - ballSize, ball.vx = 0; //right
        if (ball.y < 0) ball.y = 0, ball.vy = 0; //top
        if (ball.y + ballSize > window.innerHeight) ball.y = window.innerHeight - ballSize, ball.vy = 0; //bottom

        // Updates the ball's position on the screen.
        element.style.left = `${ball.x}px`;
        element.style.top = `${ball.y}px`;
    }

    // Updates the target's position on the screen.
    target.style.left = `${targetX}px`;
    target.style.top = `${targetY}px`;

    // Requests the next animation frame.
    requestAnimationFrame(animate);
}

// Initialises ball positions.
for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const element = document.getElementById(ball.id);
    element.style.left = `${ball.x}px`;
    element.style.top = `${ball.y}px`;
}

// Starts the animation.
animate();
// vscode trick: ctrl + D replace double click
// vscode trick: alt + arrow up and down to move the whole line up and down, so cool.
// vscode trick: ctrl + / make the whole line into comment.
// vscode trick: shift + tab can focus on the replace when ctrl + F.
// vscode trick: you can just type ctrl + F on the stuff you wanna

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

// when you const a new cube, it has Cube's properties and does initialize.
class Cube {
    // Set little properties for the class
    // Constructor is let declaring variables, and set values to them.
    constructor(anchorPoint, velocity, acc) {
        // this refers to this class, so this.initialize() refers to the function below.
        // this.anchorPoint is given whatever the argument passes.
        // this.anchorPoint, this.velocity, this.acc can all be accessed by the functions inside this class.
        // It's like we give the numbers the values to the new Cube (here), and those'll pass to this.anchorPoint,
        // this.velocity, and this.acc, and thus pass to all the function.
        // So basically its a method that 统一 all the parameters of the functions inside the class!!!!!
        // Without setting them in the () of the function(), just use them!!!
        this.anchorPoint = anchorPoint;
        // set initial velocity and acc.
        this.velocity = velocity;
        this.acc = acc;
        // Set initial width & height of the cube.
        this.height = 100;
        this.width = 100;
        // Set a physic value for the below calculation.
        this.displacement = this.anchorPoint.y - this.height;
    }
    // Actions of the class, actions can use the constructor properties above
    // Action one: generate a blue cube.
    initialize() {
        c.fillStyle = 'blue';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.height, this.width);
    }

    move() {
        // Read the code after if statement first.
        // If the cube touch the bottom of the background, do stuff below.
        if (this.anchorPoint.y + this.height >= canvas.height) {
            // This fixes the sinking under the edge, but don't know why, I code this!!! Pretty impressive, hahahahah!!
            this.anchorPoint.y = canvas.height - this.height;
            
            // While this solves the cube itself losing energy without telling it to do so, I was inspired by
            // the above solution of fixing the value, this time I fix the bouncing back speed with
            // physic equation that I've long-forgot, thx to chatGPT, I made him generate the codes below, by putting
            // the names in the right places of the physic formula~~~~~~
            

            const t = Math.sqrt((2 * this.displacement) / this.acc);
            const v = Math.sqrt(Math.pow(this.velocity, 2) + 2 * this.acc * this.displacement);
            this.velocity = v;
            // Set the velocity the opposite direction, and the bouncing back speed.
            // So - means the direction is backward, + means the direction is forward!!!!!
            // Both velocity and acc's direction!!!
            // The acc probably doesn't change in an ideal energy-don't-lost senario,
            // so we won't need to change acc, let's move on and hold that thought.
            this.velocity = -this.velocity;
        }
        // acceleration:
        this.velocity += this.acc;
        // speed: Move the blue cube downwards velocity pxs per fps.
        this.anchorPoint.y += this.velocity;
        // Set displacement into half due to the physic theory I've long forgot.        
        this.displacement = this.displacement / 2;
    }
}
// Set a cube with class Cube. Set it's anchorPoint, velocity, and acc.
const cube = new Cube({ x: 400, y: 100, }, 0, 9.8);
// Animation loop function.
function hangHang() {
    // A per fpx refresh purple background for the blue cubes.
    c.fillStyle = 'purple';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // cube who just born will execute initialize function in class Cube, each fps it move 1px downwards.
    cube.initialize();
    // cube who just born will execute move function in class Cube, for each fps it executes one time.
    cube.move();
    window.requestAnimationFrame(hangHang);
}
// execute hangHang.
hangHang();
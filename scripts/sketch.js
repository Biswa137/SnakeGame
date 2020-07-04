let snake;
let isPlaying = false;
let start, end, rez = 20, w, h, food;
function setup() {
    createCanvas(400, 400);
    frameRate(5);
    snake = new Snake();
    w = floor(width/rez);
    h = floor(height/rez);
    foodLocation();
}

function startPanel() {
    $('#highestScores').html(sessionStorage.getItem("highestScores"));
    if (isPlaying === false) {
        noLoop();
        start = createButton("START");
        start.position(180, height / 2);
        start.mousePressed(startBtn);
    } else {
        loop();
    }
}

function startBtn() {
    start.remove();
    isPlaying = true;
    loop();
}

function endPanel() {
    isPlaying === false;
    noLoop();
    end = createButton("RESTART");
    end.position(180, height / 2);
    end.mousePressed(endBtn);
}

function endBtn() {
    end.remove();
    isPlaying = true;
    $('#eaten').html(snake.eaten);
    loop();
}

function foodLocation() {
    food = createVector(floor(random(w)), floor(random(h)));
}

function keyPressed() {
    switch(keyCode) {
        case UP_ARROW: 
            snake.setDir(0, -1);
            break;
        case RIGHT_ARROW:
            snake.setDir(1, 0);
            break;
        case DOWN_ARROW:
            snake.setDir(0, 1);
            break;
        case LEFT_ARROW:
            snake.setDir(-1, 0);
            break;
        default:
    }
}

function draw() {
    scale(rez);
    background(51);
    startPanel();
    if(snake.eat(food)) { foodLocation(); }
    snake.update();
    snake.show();
    noStroke();
    fill(255, 0, 0); 
    rect(food.x, food.y, 1, 1);
    snake.endGame();
}
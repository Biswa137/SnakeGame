class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.dirX = 1;
        this.dirY = 0;
        this.eaten = 0;
    }

    setDir(x, y) {
        if (x !== this.dirX && y !== this.dirY) {
            this.dirX = x;
            this.dirY = y;
        }
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.dirX;
        head.y += this.dirY;
        this.body.push(head);
    }

    show() {
        noStroke();
        fill(255, 0, 0);
        for (let i = 0; i < this.body.length; i++) {
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    eat(pos) {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x === pos.x && y === pos.y) {
            this.grow(pos);
            this.eaten++;
            $('#eaten').html(this.eaten);
            return true;
        }
        return false;
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }

    endGame() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if ((x > w) || (x < 0) || (y > h) || (y < 0)) {
            this.resetGame();
            endPanel();
        }
        for(let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i];
            if((x === part.x) && (y === part.y)) {
                this.resetGame();
                endPanel();
            }
        }
        
    }

    resetGame() {
        this.scoresAdd();
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.dirX = 1;
        this.dirY = 0;
        this.eaten = 0;
    }

    scoresAdd() {
        let score = sessionStorage.getItem("highestScores");
        if (this.eaten > score) {
            sessionStorage.setItem("highestScores", this.eaten);
            $('#highestScores').html(this.eaten);
        }
    }
}
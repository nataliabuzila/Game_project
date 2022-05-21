
    const game = {
        frames: 0,
        ballFallSpeed: 1,
        start: function () {
            this.canvas = document.getElementById("canvas");
            this.ctx    = this.canvas.getContext("2d");
            
            const imageBackground = new Image();
            const imageGirl = new Image();
            this.imageDiscoBall = new Image ();
            this.imageDiscoHeart = new Image ();
            imageBackground.src = '/Images/background.png';
            imageGirl.src = '/Images/girl.png';
            this.imageDiscoBall.src = '/Images/ball.png';
            this.imageDiscoHeart.src = '/Images/heart.png';
            
            let music = new Audio();
            music.src = '/sounds/SilentCircleTouchInNight.mp3'

            

            imageBackground.onload = () => {
                
                this.background = new Background(imageBackground);
                imageGirl.onload = () => {
                    music.play();
                    this.dancer = new Dancer(imageGirl);
                    this.imageDiscoBall.onload = () => {
                        this.discoBall = new DiscoBall (this.imageDiscoBall);
                        this.imageDiscoHeart.onload = () => {
                            this.discoHeart = new DiscoHeart (this.imageDiscoHeart);
                            this.background.update();
                            this.dancer.update();
                            this.discoBall.update();
                            this.discoHeart.update();
                            updateGame();             
                    }
                }
            }
        }
    },
        clear: function () {
            this.ctx.clearRect (0, 0, this.canvas.width, this.canvas.height);
        },

        score: function () {
            this.points = Math.floor(this.frames / 5);
            this.ctx.fillStyle = 'DeepSkyBlue';
            this.ctx.font = '28px serif';
            this.ctx.fillText(`Score: ${this.points}`, 50, 50);
        },

        nrOfLives: 3,

        lives: function () {
            this.ctx.fillStyle = 'red';
            this.ctx.font = '28px serif';
            this.ctx.fillText(`Lives: ${game.nrOfLives}`, 50, 80);
        }
    }

window.onload = () => {
    startGame();
    document.getElementById('start-button').onclick = () => {
        //console.log('hey')
        startGame();
    }
}

function startGame() {
    //console.log('hello')
    game.start();
}

class Component {
    constructor (posX, posY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
    }

    update() {}

    move() {
        this.setX (this.getX()+this.getSpeedX());
        this.setY (this.getY()+this.getSpeedY());
        // this.posX +=this.speedX;
        // this.posY +=this.speedY;
    }

    getX () {
        return this.posX
    }

    getY () {
        return this.posY
    }

    getSpeedX () {
        return this.speedX
    }

    getSpeedY () {
        return this.speedY
    }

    setX (newX) {
        this.posX = newX
    }

    setY (newY) {
        this.posY = newY;
    }

    setSpeedX (newSpeedX) {
        this.speedX = newSpeedX;
    }

    setSpeedY (newSpeedY) {
        this.speedY = newSpeedY;
    }

    left() {
        return this.posX;
    }

    right() {
        return this.posX + this.width;
    }

    top() {
        return this.posY;
    }

    bottom() {
        return this.posY + this.height;
    }
     
    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }

}


class Background extends Component {
    constructor(image) {
        super(0, 0, game.canvas.width, game.canvas.height);
        this.image = image;
    }

    update () {
        game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}

class Dancer extends Component{
    constructor(image) {
        super(450, 550, 130, 150);
        this.image = image;
    }

    update () {
        this.move();
        document.onkeydown = (e) => {
                        switch(e.key){
                            case "ArrowLeft":
                                this.setSpeedX(this.getSpeedX()-2);
                                // Flips the dancer image on top of previous dancer Image
                                // game.ctx.scale(-1,1);
                                // game.ctx.drawImage(this.image, -this.posX-this.width, this.posY, this.width, this.height);
                                break;
                            case "ArrowRight":
                                this.setSpeedX(this.getSpeedX()+2);
                                break;
                            case "ArrowUp":
                                this.setSpeedY(this.getSpeedY()-2);
                                break;
                            case "ArrowDown":
                                this.setSpeedY(this.getSpeedY()+2);
                                break;
                            default:
                                break;
                        }
        }

        document.onkeyup = () => {
            this.speedX = 0;
            this.speedY = 0;
        }

        game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }

    setX (newX) {
        if(newX >= 0 && newX <= game.canvas.width-this.width)
            this.posX = newX;
    }

    setY (newY) {
        if(newY >=0 && newY <=game.canvas.height-this.height)
        this.posY = newY;
    }

}

class DiscoBall extends Component {
    constructor (image, speed) {
        const posX = Math.floor (Math.random() * game.canvas.width);
        const height = 80;
        const width = 80;
        const posY = -height;
        
        super(posX, posY, width, height);
        this.image = image;
        this.speedY = speed;
    }

        update () {
            this.move();
            game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
}

class DiscoHeart extends Component {
    constructor (image) {
        const posX = Math.floor (Math.random() * game.canvas.width);
        const height = 40;
        const width = 40;
        const posY = -height;
        
        super(posX, posY, width, height);
        this.image = image;
        this.speedY = 2;
    }

        update () {
            this.move();
            game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
}

const obstaclesBall =[];
const arrayHeart =[];

function updateGame () {
    game.clear();
    game.background.update();
    game.dancer.update();
    game.discoBall.update();
    game.discoHeart.update();



    if(game.frames%120 === 0) {
        obstaclesBall.push(new DiscoBall(game.imageDiscoBall, game.ballFallSpeed))
    }

    if(game.frames%500 === 0) {
        game.ballFallSpeed++;
    }

    if(game.frames%540 === 0) {
        arrayHeart.push(new DiscoHeart(game.imageDiscoHeart))
    }
    obstaclesBall.forEach((element) => {
        element.update();
    })
    arrayHeart.forEach((element) => {
        element.update();
    })
    game.frames += 1;
    
    let crashHeart = arrayHeart.some((element) => {
        let collision = game.dancer.crashWith(element);
        if(collision) {
            arrayHeart.splice(arrayHeart.indexOf(element), 1)
        }
        return collision;
    })

    let crashBall = obstaclesBall.some((element) => {
        let collision = game.dancer.crashWith(element);
        if(collision) {
            obstaclesBall.splice(obstaclesBall.indexOf(element), 1)
        }
        return collision;
    })


    if(crashHeart) {
        game.nrOfLives +=1;
    }

    if (crashBall) {
        game.nrOfLives -=1;
    }
    
    if(game.nrOfLives>0) requestAnimationFrame(updateGame);
    else alert(`Game over! You won ${game.points} points!`);

    game.lives();
    game.score();
      
}





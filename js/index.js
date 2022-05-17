
    const game = {
        frames: 0,
        score: 0,
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
            
            // const imageBoy = new Image();
            // imageBoy.src = '/Images/boy.png';
            imageBackground.onload = () => {
                this.background = new Background(imageBackground);
                imageGirl.onload = () => {
                    this.dancer = new Dancer(imageGirl);
                    this.imageDiscoBall.onload = () => {
                        this.discoBall = new DiscoBall (this.imageDiscoBall);
                        this.imageDiscoHeart.onload = () => {
                            this.discoHeart = new DiscoHeart (this.imageDiscoHeart);
                            this.background.update();
                            this.dancer.update();
                            this.discoBall.update();
                            this.discoHeart.update();
                            this.interval = setInterval(updateGame,20);                  
                    }
                }
                

            }
        }
    },
        clear: function () {
            this.ctx.clearRect (0, 0, this.canvas.width, this.canvas.height);
        },
    }

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    }

    function startGame() {
        game.start();
    }
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


    update() {}

    move() {
        this.setX (this.getX()+this.getSpeedX());
        this.setY (this.getY()+this.getSpeedY());
        // this.posX +=this.speedX;
        // this.posY +=this.speedY;
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
        super(450, 550, 150, 150);
        this.image = image;
    }

    update () {
        this.move();
        document.onkeydown = (e) => {
                        switch(e.key){
                            case "ArrowLeft":
                                this.setSpeedX(this.getSpeedX()-2);
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
    constructor (image) {
        const posX = Math.floor (Math.random() * game.canvas.width);
        const height = 80;
        const width = 80;
        const posY = -height;
        
        super(posX, posY, width, height);
        this.image = image;
        this.speedY = 1;
    }

        update () {
            this.move();
            game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
}

class DiscoHeart extends DiscoBall {
    constructor (image) {
        const posX = Math.floor (Math.random() * game.canvas.width);
        const height = 30;
        const width = 30;
        const posY = -height;
        
        super(posX, posY, width, height);
        this.image = image;
        this.speedY = 1;
    }

        update () {
            this.move();
            game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
}

const obstacles =[];

function updateGame () {
    game.clear();
    game.background.update();
    game.dancer.update();
    game.discoBall.update();
    game.discoHeart.update();
    if(game.frames%120 === 0) {
        obstacles.push(new DiscoBall(game.imageDiscoBall))
    }
    if(game.frames%540 === 0) {
        obstacles.push(new DiscoHeart(game.imageDiscoHeart))
    }
    obstacles.forEach((element) => {
        element.update();
    })
    game.frames += 1;
    game.ctx.fillText('Score: ${game.score}', 100, 100);
    game.score +=10;
}





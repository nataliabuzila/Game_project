
    const game = {
        start: function () {
            this.canvas = document.getElementById("canvas");
            this.ctx    = this.canvas.getContext("2d");
            
            const imageBackground = new Image();
            const imageGirl = new Image()
            imageBackground.src = '/Images/background.png';
            imageGirl.src = '/Images/girl.png'
            // const imageBoy = new Image();
            // imageBoy.src = '/Images/boy.png';
            imageBackground.onload = () => {
                this.background = new Background(imageBackground);
                imageGirl.onload = () => {
                    this.dancer = new Dancer(imageGirl);
                    this.background.update();
                    this.dancer.update();
                }
            }
        }
    }

window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();
    }

    function startGame() {
        game.start();
    }
}



class Component {
    constructor (posX, poxY, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;

        update() {}

        move() {
            this.posX += this.speedX;
            this.posY += this.speedY
        }
    }
}

class Background extends Component {
    constructor(image) {
        super(0, 0, image.width, image.height);
        this.image = image;
    }

    update () {
        game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}

class Dancer extends Component{
    constructor(image) {
        super(450, 580, 50, 100);
        this.image = image;
    }

    update () {
        this.move();
        game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}

class DiscoBall extends Component {
    constructor () {
        const xPos = Math.floor (Math.random() * game.canvas.width);
        const height = 50;
        const width = 50;
        const yPos = height;

        super(posX, posY, width, height);
        this.image = image;

        update () {
            this.move();
            game.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
    }
}




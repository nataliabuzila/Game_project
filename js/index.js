const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

const imageBackground = new Image();
imageBackground.src = '/Images/background.png';
const imageDancer = new Image();
imageDancer.src = '/Images/boy.png';
const imageDancer2 = new Image()
imageDancer2.src = '/Images/girl.png'
imageBackground.onload = () => {
    ctx.drawImage(imageBackground, 0, 0);
    imageDancer.onload = () => {
        ctx.drawImage(imageDancer, 450, 550)
        ctx.drawImage(imageDancer2, 350, 550)
    }
}

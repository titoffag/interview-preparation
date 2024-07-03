import { solution } from "./solution.js";

const audioContext = new AudioContext();

const analyser = audioContext.createAnalyser();
analyser.connect(audioContext.destination);

let player = {
    x: 150,
    y: 600,
    vx: 1,
    vy: 0,
    ax: 0,
    ay: -0.05,
}


const platforms = [
    { x: 200, y: 560, width: 50, height: 6, freq: 261.63 },
    { x: 120, y: 500, width: 50, height: 6, freq: 196 },
    { x: 200, y: 440, width: 50, height: 6, freq: 164.81 },
    { x: 120, y: 380, width: 50, height: 6, freq: 220 },

    { x: 200, y: 350, width: 50, height: 6, freq: 246.96 },
    { x: 120, y: 320, width: 50, height: 6, freq: 233.08 },
    { x: 200, y: 305, width: 50, height: 6, freq: 220 },

    { x: 120, y: 260, width: 50, height: 6, freq: 196 },
    { x: 200, y: 230, width: 50, height: 6, freq: 329.63 },
    { x: 120, y: 200, width: 50, height: 6, freq: 392 },

    { x: 200, y: 170, width: 50, height: 6, freq: 440 },

    { x: 120, y: 140, width: 50, height: 6, freq: 349.23 },
    { x: 200, y: 100, width: 50, height: 6, freq: 392 },
]


function loop() {
    setTimeout(() => {
        player = solution(player, platforms, audioContext, analyser);
        loop();
    }, 5);
}


function start() {
    audioContext.resume();
    loop();
}


const button = document.querySelector("button");
button.addEventListener(
    "click",
    () => start()
);


const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.clientWidth;
const CANVAS_HEIGHT = canvas.clientHeight;

function render(player, platforms) {
    canvasContext.reset();

    // background   
    canvasContext.beginPath();
    canvasContext.fillStyle = '#eee';
    canvasContext.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvasContext.fill();
    canvasContext.closePath();

    // ball
    canvasContext.beginPath();
    canvasContext.fillStyle = '#000';
    canvasContext.arc(player.x, CANVAS_HEIGHT - player.y, 10, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.closePath();

    // metals
    canvasContext.beginPath();
    canvasContext.fillStyle = '#900';
    platforms.forEach(({ x, y, width, height }) => {
        canvasContext.rect(x - width / 2, CANVAS_HEIGHT - (y - height / 2), width, height);
        canvasContext.fill();
    });
    canvasContext.closePath();
}


function renderLoop() {
    requestAnimationFrame(() => {
        render(player, platforms);
        renderLoop()
    });
}

renderLoop();



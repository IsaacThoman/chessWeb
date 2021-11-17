var joinBoxShown = false;
var joinBoxElement = document.getElementById("joinBox");
function showJoinBox(showHide){
    if(!showHide){
        joinBoxElement.classList.remove("is-hidden");
    }else{
        joinBoxElement.classList.add("is-hidden");
    }
}

function joinBtn(){
    showJoinBox(!joinBoxElement.classList.contains("is-hidden"));
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
var boardResolution = canvas.width;
ctx.beginPath();
ctx.rect(0, 0, 1000, 1000);
ctx.fillStyle = "#8ca2ad";

ctx.fill();
ctx.closePath();
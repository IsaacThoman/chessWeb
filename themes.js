var toggleTheme = true;
var tCanvas = document.getElementById('themeCanvas');
const tCtx = tCanvas.getContext("2d");
document.addEventListener("mouseup", mouseUpHandler2, false);
var relativeXT = 0;
var relativeYT = 0;
var piecePaths = ["grobchess","troll","alpha","california","cardinal","cburnett","chess7","chessnut","companion","dubrovny","fresca","gioco","governor","horsey","icpieces","kosal","leipzig","letter","libra","maestro","merida","pirouetti","pixel","staunty","shapes"]//,"riohacha","spatial","reillycraig","tatiana"
var pieceTypes = ["png","png","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","png","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg","svg",]
var fileNames = ["wP","wB","wN","wR","wQ","wK","bP","bB","bN","bR","bQ","bK"]
if(localStorage.getItem("pieceTheme")==null){
    localStorage.setItem("pieceTheme",0);
}
var themeUsed = localStorage.getItem("pieceTheme");

var pieces = new Array();
pieces[0] = new Image();
pieces[0].src = 'resources/troll.png';
function getPieces(){
    for (let i = 1; i <= 12; i++) {
        pieces[i] = new Image();

        pieces[i].src = 'resources/others/'+piecePaths[themeUsed]+'/'+fileNames[i-1]+'.'+pieceTypes[themeUsed];
    }
}
getPieces()




pieces[13] = new Image();
pieces[14] = new Image();
pieces[15] = new Image();
pieces[16] = new Image();

pieces[13].src = 'resources/legalMoveDot.png';
pieces[14].src = 'resources/redDot.png';
pieces[15].src = 'resources/sword.png';
pieces[16].src = 'resources/sword_b.png';

pieces[16].onload = function(){renderStills();}

function mouseUpHandler2(e){

    var rect = tCanvas.getBoundingClientRect();
    if('clientX' in e){
        relativeXT = e.clientX - rect.left;
        relativeYT = e.clientY - rect.top;
    }
    if('touches' in e){
        relativeXT = e.touches[0].clientX - rect.left;
        relativeYT = e.touches[0].clientY - rect.top;
    }
    if(relativeXT<0||relativeYT<0||relativeXT>320||relativeYT>380){
        return;
    }

    for(var i = 0; i<selBoxX.length; i++){
        if(relativeXT>selBoxX[i]&&relativeXT<selBoxX[i]+55&&relativeYT>selBoxY[i]&&relativeYT<selBoxY[i]+55){
        themeUsed = selBoxValue[i];
        getPieces()
        localStorage.setItem("pieceTheme",themeUsed);
        console.log("set theme to "+piecePaths[themeUsed])
        drawBackground()
            pieces[12].onload = function(){renderStills(); }
        }
    }

}
var tBoardResolution = tCanvas.width;

var previewImages = [];
piecePaths.forEach(element =>{
    tempImg = new Image();
    tempImg.src = "resources/others/"+element+"/wN."+pieceTypes[piecePaths.indexOf(element)]
    previewImages.push(tempImg);

})

var themeColorsLight = ["#dee3e6"];
var themeColorsDark = ["#8ca2ad"];
var themeColorsSelLight = ["#d5b3e6"];
var themeColorsSelDark = ["#7876b0"];

var selBoxX = [];
var selBoxY = [];
var selBoxValue = [];

function toggleThemeShow() {
    if (toggleTheme) {
        tCanvas.width = 320
        tCanvas.height = 380
    } else {
        tCanvas.width = 0
        tCanvas.height = 0
    }
    toggleTheme = !toggleTheme;

    tCtx.beginPath();
    tCtx.rect(0, 0, 320, 380);
    tCtx.fillStyle = "#8ca2ad";
    tCtx.fill();themeColorsDark[0];
    tCtx.closePath();
    var imgOn = 0;
    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
            var imgX = x * 60 + 10;
            var imgY = y * 60 + 10;
            var size = 55;
            tCtx.beginPath();
            tCtx.rect(imgX,imgY,size,size);
            tCtx.fillStyle = themeColorsLight[0];
            if(imgOn==themeUsed){
                tCtx.fillStyle = themeColorsSelLight[0];
            }
            tCtx.fill();
            tCtx.closePath();
            tCtx.drawImage(previewImages[imgOn],imgX,imgY,size,size)
            selBoxX.push(imgX);
            selBoxY.push(imgY);
            selBoxValue.push(imgOn)
            imgOn++;
        }
    }

    for (var x = 0; x < 5; x++) {
            var imgX = x * 60 + 10;
            var imgY = 5 * 60 + 10;
            var size = 55;
            tCtx.beginPath();
            tCtx.arc(imgX+size/2, imgY+size/2, size/2, 1.25*3.14,3*3.14);
            tCtx.fillStyle = themeColorsLight[x];
            tCtx.fill();
            tCtx.closePath();

        tCtx.beginPath();
        tCtx.arc(imgX+size/2, imgY+size/2, size/2, 0.25*3.14,1.25*3.14);
            tCtx.fillStyle = themeColorsDark[x];
        tCtx.fill();
        tCtx.closePath();

        tCtx.beginPath();
        tCtx.arc(imgX+size/2, imgY+size/2, size/2, 0.,3*3.14);
        tCtx.stroke();
        tCtx.closePath();
    }
}

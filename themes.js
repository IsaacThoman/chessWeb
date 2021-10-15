var toggleTheme = true;
var tCanvas = document.getElementById('themeCanvas');
const tCtx = tCanvas.getContext("2d");

var tBoardResolution = tCanvas.width;

var piecePaths = ["alpha","california","cardinal","cburnett","chess7","chessnut","companion","dubrovny","fantasy","fresca","gioco","governor","horsey","icpieces","kosal","leipzig","letter","libra","maestro","merida","pirouetti","pixel","staunty","shapes"]//,"riohacha","spatial","reillycraig","tatiana"
var previewImages = [pieces[3]];
piecePaths.forEach(element =>{
    tempImg = new Image();
    tempImg.src = "resources/others/"+element+"/wN.svg"
    previewImages.push(tempImg);

})

var themeColorsLight = ["#dee3e6"];
var themeColorsDark = ["#8ca2ad"];
var themeColorsSelLight = ["#d5b3e6"];
var themeColorsSelDark = ["#7876b0"];


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
    tCtx.fill();
    tCtx.closePath();
    var imgOn = 0;
    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
            var imgX = x * 60 + 10;
            var imgY = y * 60 + 10;
            var size = 55;
            tCtx.beginPath();
            tCtx.rect(imgX,imgY,size,size);
            tCtx.fillStyle = "#dee3e6";
            tCtx.fill();
            tCtx.closePath();
            tCtx.drawImage(previewImages[imgOn],imgX,imgY,size,size)
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

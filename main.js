
var framesInAnimation = 12 ;
// ---------Board Representation
var boardSquares = [];
for (var i=0;i<=64;i++) {
boardSquares[i]=0;
        var squareX=(i % 8);
        var squareY = Math.floor(i/8);
        if((squareY==6)){
            boardSquares[i]=1;
       }
       if((squareY==1)){
            boardSquares[i]=7;
       }
       switch(i) {
    case 0:case 7:
    boardSquares[i]=10;break;
    case 1:case 6:
    boardSquares[i]=9;break;
    case 2:case 5:
    boardSquares[i]=8;break;

    case 63:case 56:
    boardSquares[i]=4;break;
    case 62:case 57:
    boardSquares[i]=3;break;
    case 61:case 58:
    boardSquares[i]=2;break;

    case 59:
    boardSquares[i]=5;break;
    case 60:
    boardSquares[i]=6;break;
    case 3:
    boardSquares[i]=11;break;
    case 4:
    boardSquares[i]=12;break;

       }
    }
function resetBoard(){
    boardSquares=stringToBoard('w43256234111111110000000000000000000000000000000077777777a98bc89aSTOP');
    whitesMoveStored=true;
    drawBackground();
    renderStills();
    //if(document.getElementById('onlineRadio').checked){
    updateSidebar()
    if(false){
        var boardToUpload = 'w43256234111111110000000000000000000000000000000077777777a98bc89aSTOP';
        var url2 = "https://api.grobchess.com/api/chess?message=".concat(boardToUpload,'&channel=',channel);

        var xhr2 = new XMLHttpRequest();
        xhr2.open("POST", url2);

        xhr2.setRequestHeader("Content-Type", "application/json");
        //xhr2.setRequestHeader("Content-Length", "0");

        xhr2.send();
    }
}
    function boardSquaresReversed(){
        var reversed = [];
        for (var i=0;i<=63;i++) {
            switch(boardSquares[i]){
                case 0: reversed.unshift(0); break;
                case 1: reversed.unshift(7); break;
                case 2: reversed.unshift(8); break;
                case 3: reversed.unshift(9); break;
                case 4: reversed.unshift(10); break;
                case 5: reversed.unshift(11); break;
                case 6: reversed.unshift(12); break;
                case 7: reversed.unshift(1); break;
                case 8: reversed.unshift(2); break;
                case 9: reversed.unshift(3); break;
                case 10: reversed.unshift(4); break;
                case 11: reversed.unshift(5); break;
                case 12: reversed.unshift(6); break;
            }}

        return reversed;
    }


	const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    var boardResolution = canvas.width;


    var pieces = new Array();
    pieces[0] = new Image();
    for (let i = 1; i <= 12; i++) {
        pieces[i] = new Image();
    pieces[i].src = 'resources/'+i+'.png';
    }
    pieces[13] = new Image();
    pieces[14] = new Image();
    pieces[15] = new Image();
    pieces[16] = new Image();

    pieces[0].src = 'resources/troll.png';
    pieces[13].src = 'resources/legalMoveDot.png';
    pieces[14].src = 'resources/redDot.png';
    pieces[15].src = 'resources/sword.png';
    pieces[16].src = 'resources/sword_b.png';

    pieces[12].onload = function(){renderStills();}

    var link = document.querySelector("link[rel~='icon']");
    if (!link) {link = document.createElement('link');link.rel = 'icon';document.getElementsByTagName('head')[0].appendChild(link);}
    link.href = 'resources/favicon_1.ico';

   // ctx.drawImage(pieces[1],0, 0, boardResolution/8, boardResolution/8);





//function draw() {
//    ctx.drawImage(pieces[1],0, 0, boardResolution/8, boardResolution/8);
//}
//setInterval(draw, 1000);

var reverseBoard = false;
var relativeX = 0;
var relativeY = 0;
var mousedownBool = false;
function renderStills(){

    for(var i=0;i<=64-1;i++){
            var squareX=(i % 8);
            var squareY = Math.floor(i/8);
            if(reverseBoard){
              squareX = 7-squareX;
              squareY = 7-squareY;
            }
            var pieceBeingAnimatedReversed = pieceBeingAnimated;
            if(reverseBoard){pieceBeingAnimatedReversed=63-pieceBeingAnimatedReversed;}
            if((boardSquares[i]!=0)&& draggedPiece !=i &&pieceBeingAnimatedReversed!=i ){
                ctx.drawImage(pieces[boardSquares[i]],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
            }
            if(draggedPiece==i||(lastClickedPiece==i&&boardSquares[lastClickedPiece]!=0)){
                ctx.beginPath();
                ctx.rect(squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                                ctx.fillStyle = "#b1d0e3";
                                ctx.fill();
                           ctx.closePath();

                ctx.globalAlpha = 0.3;
                ctx.drawImage(pieces[boardSquares[i]],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                ctx.globalAlpha =1;
        //pout le ghost heeere
            }
        }


}



function touchTest(e){
  console.log("touched!!")
}

function getPiece(myx,myy,board){
return board[(((myy*8))+myx)];
}
function checkCheck(sourceMe,destinationMe){
    //FIX THIS!!
    return true;
    var internalBoard = Object.assign([], boardSquares);

    var fromValue = boardSquares[sourceMe];
    internalBoard[sourceMe]=0;
    internalBoard[destinationMe] = fromValue;



    for(var sourceI=0;sourceI<=63;sourceI++){
        for(var destI=0;destI<=63;destI++){
            internalBoard = Object.assign([], boardSquares);

    var fromValue = boardSquares[sourceMe];
    internalBoard[sourceMe]=0;
    internalBoard[destinationMe] = fromValue;
        if(rulebook(sourceI,destI,internalBoard,!whitesMoveStored)){
        if(destI==internalBoard.indexOf(6)){
        return false;
        }


        }
        }
    }
    return true;
}
var whitesMoveStored = true;
function rulebook(source,destination,board,whitesMove){

    var internalBoard = board;
    if(!whitesMove){internalBoard=boardSquaresReversed()}

if(!whitesMove){
    source=63-source;
   destination=63-destination;
}
    var sourceX=(source % 8);
    var sourceY = Math.floor(source/8);
    var destX=(destination % 8);
    var destY = Math.floor(destination/8);


if (internalBoard[source]==0){
    return false;
}
if(getPiece(destX,destY,internalBoard)<=6&&getPiece(destX,destY,internalBoard)!=0){return false;}//doesn't let you self-attack
if(sourceX<0||sourceY<0||sourceX>=8||sourceY>=8){return false;}
if(destX<0||destY<0||destX>=8||destY>=8){return false;}
if(sourceX==destX&&sourceY==destY){return false;}

    if(internalBoard[source]==1){//pawns
    if(sourceX==destX){
        if((sourceY==6&&destY==4) && (getPiece(sourceX,sourceY-2,internalBoard)==0)&& (getPiece(sourceX,sourceY-1,internalBoard)==0)){return true;}
        if((sourceY-1==destY) && (getPiece(sourceX,sourceY-1,internalBoard)==0)){return true;}//forward movement
    }
    if(((sourceX+1==destX && sourceY-1==destY )||(sourceX-1==destX && sourceY-1==destY))&& getPiece(destX,destY,internalBoard)>6){return true;} //attacks

    }//closing pawns

    if(internalBoard[source]==6){//king
        if(Math.abs(sourceX-destX)<=1&&Math.abs(sourceY-destY)<=1&&(getPiece(destX,destY,internalBoard)>6||getPiece(destX,destY,internalBoard)==0)){
return true;
        }
    }

    if(internalBoard[source]==2){//bishop

    if(Math.abs(sourceX-destX) != Math.abs(sourceY - destY)){return false;} //fails if not perfectly diagonal

    if(getPiece(destX,destY,internalBoard)==0 | getPiece(destX, destY,internalBoard) > 6){
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        else{scanDirX = 1;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        else{scanDirY = 1;}

        var distance = Math.abs(sourceX-destX);

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){return false;}
        }
        return true;
    }}

    if(internalBoard[source]==4){//rook
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        if(sourceX < destX){scanDirX = 1;}
        if(sourceX == destX){scanDirX = 0;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        if(sourceY < destY){scanDirY = 1;}
        if(sourceY == destY){scanDirY = 0;}
        if(scanDirX!=0 &&scanDirY!=0){return false;}

        var distance = 0;
        if(destY!=sourceY){
            distance=Math.abs(sourceY-destY);}
            else{
                distance=Math.abs(sourceX-destX);
            }

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){

             //   console.log('Returned false for '+sourceX+','+sourceY+' to '+destX+','+destY+' because of piece at '+posX+','+posY+'. i='+i+', distance='+distance)
                return false;}

        }
        return true;
    }

    if(internalBoard[source]==5){//queen

        var rookLegal = false;
        var rookLegalSet = false;
        var bishopLegal=false;
        var bishopLegalSet = false;
        //start rook code
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        if(sourceX < destX){scanDirX = 1;}
        if(sourceX == destX){scanDirX = 0;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        if(sourceY < destY){scanDirY = 1;}
        if(sourceY == destY){scanDirY = 0;}
        if(scanDirX!=0 &&scanDirY!=0){
            if(!rookLegalSet){rookLegal=false;rookLegalSet=true;}
        }

        var distance = 0;
        if(destY!=sourceY){
            distance=Math.abs(sourceY-destY);}
            else{
                distance=Math.abs(sourceX-destX);
            }

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){


                if(!rookLegalSet){rookLegal=false;rookLegalSet=true;}}

        }
        if(!rookLegalSet){rookLegal=true;rookLegalSet=true;}
        //bishop start
        if(Math.abs(sourceX-destX) != Math.abs(sourceY - destY)){if(!bishopLegalSet){bishopLegal=false;bishopLegalSet=true;}} //fails if not perfectly diagonal

        if(getPiece(destX,destY,internalBoard)==0 | getPiece(destX, destY,internalBoard) > 6){
             scanDirX=0;
             scanDirY=0;
            if (sourceX > destX){scanDirX = 0 - 1;}
            else{scanDirX = 1;}
            if (sourceY > destY){scanDirY = 0 - 1;}
            else{scanDirY = 1;}

             distance = Math.abs(sourceX-destX);

            for(var i=1;i<=distance-1;i+=1){
                var posX = sourceX + (i*scanDirX);
                var posY = sourceY + (i*scanDirY);
                if(getPiece(posX,posY,internalBoard)!=0){if(!bishopLegalSet){bishopLegal=false;bishopLegalSet=true;}}
            }
            if(!bishopLegalSet){bishopLegal=true;bishopLegalSet=true;}
        }

        return (bishopLegal||rookLegal);
    }

    if(internalBoard[source]==3){//knight
        if((Math.abs(sourceX-destX)==2&&Math.abs(sourceY-destY)==1)||(Math.abs(sourceX-destX)==1&&Math.abs(sourceY-destY)==2)){return true;}return false;
     }


return false;

}

debugMode = true;

function drawBackground(){
    var bgSquare = 0;

  while(bgSquare<=64){
        var squareX=(bgSquare % 8);
       var squareY = Math.floor(bgSquare/8);
        var reversedLastMoveSource = lastMoveSource;
        var reversedLastMoveDest = lastMoveDest;
        //if(reverseBoard){reversedLastMoveDest = 63-reversedLastMoveDest;  reversedLastMoveSource = 63-reversedLastMoveSource;}
if((squareX+squareY)%2){
    ctx.beginPath();
 ctx.rect(squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                 ctx.fillStyle = "#8ca2ad";
                 if(bgSquare == reversedLastMoveSource||bgSquare == reversedLastMoveDest){
                   ctx.fillStyle = "#7876b0";
                   //console.log("hey")
                 }
                 ctx.fill();
            ctx.closePath();
}else{
    ctx.beginPath();
 ctx.rect(squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                 ctx.fillStyle = "#dee3e6";
                 if(bgSquare == reversedLastMoveSource||bgSquare == reversedLastMoveDest){
                   ctx.fillStyle = "#d5b3e6";
                   //console.log("hey")
                 }
                 ctx.fill();
            ctx.closePath();

}
var visibleNotation = ['8','','','','','','','','7','','','','','','','','6','','','','','','','','5','','','','','','','','4','','','','','','','','3','','','','','','','','2','','','','','','','','1','','','','','','',''];
var visibleNotation2 = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','a','b','c','d','e','f','g','h'];
//ctx.strokeText(visibleNotation[bgSquare],squareX*boardResolution/8,(Math.floor(bgSquare/8)+1)*boardResolution/8,50000);
var bgSquareRev = bgSquare;
if(reverseBoard){bgSquareRev=63-bgSquare;}
ctx.font = '20px calibri';
ctx.fillStyle = "#8ca2ad";
if((squareX+squareY)%2){ctx.fillStyle = "#dee3e6";}
ctx.fillText(visibleNotation[bgSquareRev],(squareX*boardResolution/8)+8,((Math.floor(bgSquare/8)+1)*boardResolution/8)-boardResolution/8+20);
ctx.fillText(visibleNotation2[bgSquareRev],(squareX*boardResolution/8)+boardResolution/8-20,((Math.floor(bgSquare/8)+1)*boardResolution/8)-8);
     if(debugMode){ctx.strokeText(bgSquare,squareX*boardResolution/8,(Math.floor(bgSquare/8)+1)*boardResolution/8,5000);}
bgSquare +=1;

}
}

function stringToBoard(input){
    var boardSquaresInt = []
    for (var i=0;i<=64;i++) {
        switch(input[i]) {
            case '0': boardSquaresInt.unshift(0); break;
            case '1': boardSquaresInt.unshift(1); break;
            case '2': boardSquaresInt.unshift(2); break;
            case '3': boardSquaresInt.unshift(3); break;
            case '4': boardSquaresInt.unshift(4); break;
            case '5': boardSquaresInt.unshift(5); break;
            case '6': boardSquaresInt.unshift(6); break;
            case '7': boardSquaresInt.unshift(7); break;
            case '8': boardSquaresInt.unshift(8); break;
            case '9': boardSquaresInt.unshift(9); break;
            case 'a': boardSquaresInt.unshift(10); break;
            case 'b': boardSquaresInt.unshift(11); break;
            case 'c': boardSquaresInt.unshift(12); break;
        }}
    var boardSquaresInt2 = []
    for (var xS=0;xS<=7;xS++) {
        for (var yS=0;yS<=7;yS++) {
            boardSquaresInt2[(((yS*8))+xS)] = boardSquaresInt[(((yS*8))+7-xS)];
        }}
    return boardSquaresInt2;
}

function boardToString(input){
    var boardSquaresInt2 = []
    for (var xS=0;xS<=7;xS++) {
        for (var yS=0;yS<=7;yS++) {
            boardSquaresInt2[(((yS*8))+xS)] = input[((((7-yS)*8))+xS)];
        }}

    var outString1 = ''
    for (var i=0;i<=64;i++) {
    switch(boardSquaresInt2[i]) {
        case 0: outString1 = outString1.concat('0'); break;
        case 1: outString1 = outString1.concat('1'); break;
        case 2: outString1 = outString1.concat('2'); break;
        case 3: outString1 = outString1.concat('3'); break;
        case 4: outString1 = outString1.concat('4'); break;
        case 5: outString1 = outString1.concat('5'); break;
        case 6: outString1 = outString1.concat('6'); break;
        case 7: outString1 = outString1.concat('7'); break;
        case 8: outString1 = outString1.concat('8'); break;
        case 9: outString1 = outString1.concat('9'); break;
        case 10: outString1 = outString1.concat('a'); break;
        case 11: outString1 = outString1.concat('b'); break;
        case 12: outString1 = outString1.concat('c'); break;
    }}
    if(whitesMoveStored){
        outString1 = 'w'.concat(outString1)
    }else{
        outString1 = 'b'.concat(outString1)
    }
    return outString1.concat('STOP');

}
var letterPieceToNumber = ['0','1','2','3','4','5','6','7','8','9','a','b','c']
function findMovedPiece(firstInput, secondInput){
    var toPos = -1;
    var fromPos = -1;
    var movedPiece = 0;
    firstInputB = stringToBoard(firstInput);
    secondInputB = stringToBoard(secondInput);

    for (var i=1;i<=64;i++) {
    if(firstInputB[i]!=secondInputB[i]){
    if(firstInputB[i]==0){
        fromPos=i;
    }else{
        toPos=i;
        movedPiece= firstInputB[i];
    }}
}
    var fromX = (fromPos % 8)
    var fromY = Math.floor(fromPos/8)
    var toX = (toPos % 8)
    var toY = Math.floor(toPos/8)
    toX = 7-toX
    fromX = 7-fromX
    var firstReturn = (((fromY*8))+fromX);
    var secondReturn = (((toY*8))+toX);

    return [fromPos,toPos,movedPiece];

}

function onlineScanning(){
    if(document.getElementById('onlineRadio').checked) {
        var apiGetUrl = "https://api.grobchess.com/api/chess?channel=".concat(channel);
        var responseText = '';
        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiGetUrl);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               responseText = xhr.responseText;

                responseText = responseText.substring(1, responseText.length-1);
               if(responseText.substr(0,64)!=boardToString(boardSquares).substr(0,64)){
                //console.log(responseText);
                //console.log(boardToString(boardSquares));

                   var change = findMovedPiece(responseText,boardToString(boardSquares));
                   var landedOn = boardSquares[change[1]];
                   boardSquares = stringToBoard(responseText);
                    whitesMoveStored = (responseText[0]=='w');

                   var srcX = (charToNum(responseText.charAt(69))-1)
                   var srcY = 7-(charToNum(responseText.charAt(70))-1)
                   var destX = (charToNum(responseText.charAt(71))-1)
                   var destY = 7-(charToNum(responseText.charAt(72))-1)

                   var recSrc = ((srcY*8))+srcX
                   var recDest = ((destY*8))+destX

                  //  lastMoveSource = (((Y*8))+X)
                   //console.log(landedOn)


                  // draggedPiece=change[0];



                   frameNumber=0;
                    animPiece = pieces[change[0]]
                   updateSidebar();
                       animationTimer = window.setInterval(function(){


                           if(firstAnim){
                               showFrame(recSrc,recDest,boardSquares[recDest],0);

                           }else{
                               showFrame(change[0],change[1],change[2],landedOn);
                           }

                       }, 32);


               }
            }};
        xhr.send();
    }
    updateChat()
}
var firstAnim = true;
var lastMoveSource = -1;
var lastMoveDest = -1;
var frameNumber = 0;
var animationTimer = null;
var animPiece = 0;
var pieceBeingAnimated = -1;
    function showFrame(fromPos,toPos,movedPiece,landedOnPiece){
        if(reverseBoard){
            fromPos = 63-fromPos;
            toPos = 63-toPos;

        }
        frameNumber+=1;
        if(frameNumber>=framesInAnimation){
            clearInterval(animationTimer);
            drawBackground();
            renderStills();
            lastMoveSource = fromPos;
            lastMoveDest = toPos;
            firstAnim = false;
        }

        drawBackground()
        pieceBeingAnimated = toPos;
        renderStills()
        pieceBeingAnimated = -1;
        var myFromX = (fromPos % 8);
        var myFromY = Math.floor(fromPos/8);
        var myToX = (toPos % 8);
        var myToY = Math.floor(toPos/8);

        var animStartX = myFromX*boardResolution/8
        var animEndX = myToX*boardResolution/8
        var animStartY = myFromY*boardResolution/8
        var animEndY = myToY*boardResolution/8

        var thisFrameX = animStartX+((animEndX-animStartX)*frameNumber/framesInAnimation);
        var thisFrameY = animStartY+((animEndY-animStartY)*frameNumber/framesInAnimation);
        //console.log(thisFrameX)
        if(landedOnPiece>0&&landedOnPiece<13&&frameNumber<framesInAnimation){
            ctx.drawImage(pieces[landedOnPiece],(toPos % 8)*boardResolution/8,Math.floor(toPos/8)*boardResolution/8, boardResolution/8, boardResolution/8);
        }
        ctx.drawImage(pieces[movedPiece],thisFrameX,thisFrameY, boardResolution/8, boardResolution/8);
        //console.log([landedOnPiece,fromPos,toPos])



    }
    var pieceSymbols = ['♙','♗','♘','♖','♕','♔','♟','♝','♞','♜','♛','♚'];
    var selectedPieceSymbol = Math.floor(Math.random() * 6);
var username = "";
    function sendUsername(){
        var symbol = pieceSymbols[selectedPieceSymbol];
        if(reverseBoard){symbol=pieceSymbols[selectedPieceSymbol+6];}
        var url = "https://api.grobchess.com/api/ChessAcc?message=".concat(symbol).concat(username).concat("&channel=".concat(channel));

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

            }};

        xhr.send();
    }

    function getUsername(){
        var url = "https://api.grobchess.com/api/ChessAcc?channel=".concat(channel);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var responseText = xhr.responseText;
                responseText = responseText.substring(1, responseText.length-1);
                if(channel==1114){
                    document.getElementById('boardCodeH2').textContent='';
                }else{
                    document.getElementById('boardCodeH2').textContent='Players Connected: '.concat(responseText);
                }

            }};

        xhr.send();
    }
//the loop is over here
var loopCounter = 3;
var onlineScanningTimer = window.setInterval(function(){
    if(!document.getElementById('onlineRadio').checked){
        return;
    }
    loopCounter+=1;
    if(loopCounter>5){
        loopCounter=0;
        getRoomList();
    }

    username = localStorage.getItem("username");

    sendUsername();
    getUsername();

if(document.getElementById('usernameInput').value != localStorage.getItem("username")){
    localStorage.setItem("username", document.getElementById('usernameInput').value);
}


    if(lastUpload+2<=Math.floor((new Date()).getTime() / 1000)){
        onlineScanning();
    }



}, 1000);

if(localStorage.getItem("username")==null){

    localStorage.setItem("username","Henri".concat(Math.floor(getRandomArbitrary(1,99))));
}
document.getElementById('usernameInput').setAttribute('value', localStorage.getItem("username"));


    function showOnlineStuff(enabled){

    document.getElementById('usernameInput').hidden = !enabled;
        document.getElementById('usernameLabel').hidden = !enabled;
        document.getElementById('createBoardBtn').hidden = !enabled;
        document.getElementById('joinBoardBtn').hidden = !enabled;
        document.getElementById('channelInput').hidden = !enabled;
        document.getElementById('boardCodeH1').hidden = !enabled;
        document.getElementById('boardCodeH2').hidden = !enabled;

        document.getElementById('chatDiv').hidden = !enabled;

        document.getElementById('mySelect').hidden = !enabled;
        document.getElementById('joinBtn2').hidden = !enabled;
        document.getElementById('reloadBtn').hidden = !enabled;
        if(enabled){
            document.getElementById('reloadBtn').style.display = 'none'; //change this if you want it back
        }else{
            document.getElementById('reloadBtn').style.display = 'none';
        }

        document.getElementById('boardCodeH1').textContent = '';
        document.getElementById('boardCodeH2').textContent = '';


        if(enabled=true){
        channel=1114;
        }
 }

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

 function createBoard(){
     document.getElementById('channelInput').value = '';
        resetBoard();
        drawBackground();
        renderStills();
     channel=Math.floor(getRandomArbitrary(1000,9999));
     document.getElementById('boardCodeH1').hidden=false;
     document.getElementById('boardCodeH2').hidden =false;
     document.getElementById('boardCodeH1').textContent='Board Code: '.concat(channel);

 }
 function setChannel(newChannel){

    document.getElementById('channelInput').value = '';
    if(newChannel>1&&newChannel<9999){
        resetBoard();
        drawBackground();
        renderStills();
        channel=newChannel;
        document.getElementById('boardCodeH1').hidden=false;
        document.getElementById('boardCodeH2').hidden = false;
        document.getElementById('boardCodeH1').textContent='Board Code: '.concat(channel);
    }
 }

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const page_type = urlParams.get('code')

if(page_type!=null){
    //console.log(page_type);
    showOnlineStuff(true);
    document.getElementById('onlineRadio').checked=true;
    channel=page_type;
    document.getElementById('boardCodeH1').textContent='Board Code: '.concat(channel);
    window.history.replaceState('', '', '/');
}

var x = document.getElementById("mySelect");
var option = [];

var labels = ['No rooms found :/']
var labelsLink = [-1]


function updateListDisplayed(){
    x.innerHTML = '';
    for (var i=0;i<labels.length;i++) {
            option[i]=document.createElement("option");
            option[i].text = labels[i];
            x.add(option[i]);


    }
}
updateListDisplayed()

function joinFromSelection(){
    var select = document.getElementById('mySelect');
    var value = labelsLink[select.selectedIndex] ;
    setChannel(value)
}

function getRoomList(){
    var url = "https://api.grobchess.com/api/ChessMM";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            var responseText = xhr.responseText.substring(1, xhr.responseText.length-1);
            labels = (responseText.split('|')[1].split('> '))
            labelsLink = (responseText.split('|')[0].split('> '))
            updateListDisplayed()
        }};

    xhr.send();

}


drawBackground();

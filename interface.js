document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

document.addEventListener("touchmove", mouseMoveHandler, false);
document.addEventListener("touchstart", mouseDownHandler, false);
document.addEventListener("touchend", mouseUpHandler, false);

function mouseMoveHandler(e) {
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
      relativeX = e.touches[0].clientX - rect.left;
      relativeY = e.touches[0].clientY - rect.top;
    }
updateCursorIcon();
    if(mousedownBool&&mouseOnBoard(e)){

        drawBackground();

//Draws legal move dots
//updateLegalMoves(); //can probably stay commented?
        for(var i=0;i<=legalMovesToShow.length;i++){
            var squareX=(legalMovesToShow[i] % 8);
            var squareY = Math.floor(legalMovesToShow[i]/8);
            var drawSword = (getPiece(squareX,squareY,boardSquares)==0);
            if(reverseBoard){
              drawSword = (getPiece(7-squareX,7-squareY,boardSquares)==0);
            }
            if(drawSword){
                ctx.drawImage(pieces[13],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);

            }else{
                ctx.drawImage(pieces[14],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
            }

        }



        renderStills(); //draws still pieces

        for(var i=0;i<=legalMovesToShow.length;i++){  //this chunk draws the sword on attackable pieces
            var squareX=(legalMovesToShow[i] % 8);
            var squareY = Math.floor(legalMovesToShow[i]/8);
            var drawSword = (getPiece(squareX,squareY,boardSquares)==0);
            if(reverseBoard){
              drawSword = (getPiece(7-squareX,7-squareY,boardSquares)==0);
            }
            if(!drawSword){
              var useWhiteSword = (getPiece(squareX,squareY,boardSquares)>6);
              if(reverseBoard){useWhiteSword = (getPiece(7-squareX,7-squareY,boardSquares)>6);}
                if(useWhiteSword){
                ctx.drawImage(pieces[15],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                }else{
                    ctx.drawImage(pieces[16],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
                }
            }
        }


if(draggedPiece>=0){//draws grabbed piece
        ctx.drawImage(pieces[boardSquares[draggedPiece]],relativeX-boardResolution/16, relativeY-boardResolution/16, boardResolution/8, boardResolution/8);
    }


    }
}
function mouseOnBoard(e){
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
      relativeX = e.touches[0].clientX - rect.left;
      relativeY = e.touches[0].clientY - rect.top;
    }
     if(relativeX<=boardResolution&&relativeX>=0&&relativeY<=boardResolution&&relativeY>=0){
return true;
     }
     return false;
}
var draggedPiece=-1;

function mouseDownHandler(e){
mousedownBool=true;
boardResolution = canvas.width;
//console.log(e.clientX);
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
      relativeX = e.touches[0].clientX - rect.left;
      relativeY = e.touches[0].clientY - rect.top;
    }

     var selectionX = Math.ceil(relativeX/boardResolution*8)-1;
     var selectionY = Math.ceil(relativeY/boardResolution*8)-1;

    var selection = (((selectionY*8)-1)+selectionX)+1;
    if(reverseBoard){
      selection = 63-selection
    }
    if(boardSquares[selection]==0){
        draggedPiece=-1;
    }else{
        draggedPiece = selection;
        lastUpload = lastUpload=Math.floor((new Date()).getTime() / 1000);
        //might not show updates until pieces are released
    }
    updateLegalMoves(selection);
    updateCursorIcon();

    if('touches' in e) {
        mouseMoveHandler(e); //allows you to hold down to see legal moves, didn't really like it with a mouse
    }
}

var legalMovesToShow = [0,15,23,47];
function updateLegalMoves(){
legalMovesToShow = [];
for(var i=0;i<=64;i++){
    if(rulebook(draggedPiece,i,boardSquares,whitesMoveStored)){
      if(reverseBoard){
        legalMovesToShow.push(63-i);
      }else{
        legalMovesToShow.push(i);
      }

    }

}


}
var channel = 1114;
var lastUpload = 0;
function mouseUpHandler(e) {
mousedownBool=false;
updateCursorIcon();
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
    //  relativeX = e.touches[0].clientX - rect.left;
    //  relativeY = e.touches[0].clientY - rect.top;
    }

     var selectionX = Math.ceil(relativeX/boardResolution*8)-1;
     var selectionY = Math.ceil(relativeY/boardResolution*8)-1;
     var selection = (((selectionY*8)-1)+selectionX)+1;;
     if(reverseBoard){
       selection = 63-selection
     }
     if(draggedPiece>=0&&rulebook(draggedPiece,selection,boardSquares,whitesMoveStored)&&checkCheck(draggedPiece,selection)){
         var fromValue = boardSquares[draggedPiece];
         boardSquares[draggedPiece]=0;
         boardSquares[selection] = fromValue;//A MOVE HAS BEEN MADE HERE

         if(reverseBoard){
             if(boardSquares[selection]==1&&selectionY==7){boardSquares[selection]=5;}
             if(boardSquares[selection]==7&&selectionY==0){boardSquares[selection]=11;} //promotion
         }else{
             if(boardSquares[selection]==1&&selectionY==0){boardSquares[selection]=5;}
             if(boardSquares[selection]==7&&selectionY==7){boardSquares[selection]=11;} //promotion
         }



         whitesMoveStored=!whitesMoveStored;

         if(reverseBoard){
             lastMoveSource = 63-draggedPiece;
             lastMoveDest = 63-selection;
         }else {
             lastMoveSource = draggedPiece;
             lastMoveDest = selection;
         }


         var interfaceSrcX =1+(draggedPiece % 8);
         var interfaceSrcY = 8- Math.floor(draggedPiece/8);
         var interfaceDestX = 1+(selection % 8);
         var interfaceDestY = 8-Math.floor(selection/8);

         var outMsg = numToChar(interfaceSrcX)+interfaceSrcY+numToChar(interfaceDestX)+interfaceDestY;
        lastUpload=Math.floor((new Date()).getTime() / 1000);
         if(document.getElementById('onlineRadio').checked) {
            //var boardToUpload = boardToString(boardSquares);
             var url2 = "https://api.grobchess.com/api/chess?message=".concat(outMsg,'&channel=',channel);

             var xhr2 = new XMLHttpRequest();
             xhr2.open("POST", url2);

             xhr2.setRequestHeader("Content-Type", "application/json");
             //xhr2.setRequestHeader("Content-Length", "0");

             xhr2.send();


         }

 }
     draggedPiece=-1;
        if(relativeX<=boardResolution){
     drawBackground();
     for(var i=0;i<=64-1;i++){
            var squareX=(i % 8);
            var squareY = Math.floor(i/8);
            if(reverseBoard){
              squareX = 7-squareX;
              squareY = 7-squareY;
            }
            if((boardSquares[i]!=0)&& draggedPiece !=i){
                ctx.drawImage(pieces[boardSquares[i]],squareX*boardResolution/8, squareY*boardResolution/8, boardResolution/8, boardResolution/8);
            }}

        }
    updateSidebar();
}




function numToChar(num){
    switch(num) {
        case 1:
            return('a');
            break;
        case 2:
            return('b');
            break;
        case 3:
            return('c');
            break;
        case 4:
            return('d');
            break;
        case 5:
            return('e');
            break;
        case 6:
            return('f');
            break;
        case 7:
            return('g');
            break;
        case 8:
            return('h');
            break;
    }
}


function updateCursorIcon(){
    if(relativeX>=0 &&relativeX<=boardResolution&&relativeY>=0 &&relativeY<=boardResolution){
        var selectionX = Math.ceil(relativeX/boardResolution*8)-1;
        var selectionY = Math.ceil(relativeY/boardResolution*8)-1;
        var selection = (((selectionY*8)-1)+selectionX)+1;
        if(reverseBoard){
            selection = 63-selection
        }
        if(mousedownBool && draggedPiece>0){
            document.body.style.cursor = 'grabbing';
        }
        else if (boardSquares[selection]>0){
            document.body.style.cursor = 'grab';
        }else{
            document.body.style.cursor = 'default';
        }
    }else{document.body.style.cursor = 'default';}


}
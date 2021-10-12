const canvas2 = document.getElementById("myCanvas2");
const ctx2 = canvas2.getContext("2d");

function updateSidebar(){


  var missingPieces = [32, 8, 2, 2, 2, 1, 1, 8, 2, 2, 2, 1, 1];
    for(var i=0;i<=63;i++){
      missingPieces[boardSquares[i]]-=1;
      }
    var missingPiecesTotal = 0;

  for(var pieceTypeOn=1;pieceTypeOn<=12;pieceTypeOn++) {missingPiecesTotal+= missingPieces[pieceTypeOn]}
  //if(missingPiecesTotal<1){return;}

  ctx2.beginPath();
  ctx2.rect(0,0,96,768);
  ctx2.fillStyle = "#8ca2ad";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.rect(0,0,4,768);
  ctx2.fillStyle = "#FFFFFF";
  ctx2.fill();
  ctx2.closePath();
  if(channel==1114&&document.getElementById('onlineRadio').checked){return;}
  for(var i=1;i<=missingPiecesTotal;i++){
  var pieceToDraw = 0;
    for(var i2=1;i2<=12;i2++){
  if(missingPieces[i2]>0){pieceToDraw=i2}
  }
    missingPieces[pieceToDraw]-=1;
    //    ((resolution / (totalPiecesCaptured+1))*renderPiece)-((resolution / 16))
    var position = ((boardResolution / (missingPiecesTotal + 1))*i)-((boardResolution/16))
    ctx2.drawImage(pieces[pieceToDraw],0,position,boardResolution/8,boardResolution/8)
  }

    }

    updateSidebar()
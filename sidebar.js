function updateSidebar(){
  const canvas2 = document.getElementById("myCanvas2");
  const ctx2 = canvas2.getContext("2d");
  var sidebarResolution = canvas2.width;
  ctx2.drawImage(pieces[1],0, 0,96, 768);
  var foundPieces = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<=63;i++){
      foundPieces[boardSquares[i]]+=1;
      }
      console.log(foundPieces)


    }

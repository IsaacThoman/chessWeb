function findBestMove(){
        var highest1 = 0;
        for(var srcScanner = 0; srcScanner<=63; srcScanner++){
            for(var destScanner = 0; destScanner<=63; destScanner++){
                if(rulebook(srcScanner,destScanner,boardSquares,whitesMoveStored)){//for every move

                    var boardLvl1 = boardSquares.slice();
                    boardLvl1[destScanner] = boardLvl1[srcScanner];
                    boardLvl1[srcScanner] = 0;
                    var moveScore = getScore(boardLvl1)




                    var lvl2WorstBoard = [];
                    var lvl2WorstScore = moveScore;

                    for(var srcScanner2 = 0; srcScanner2<=63; srcScanner2++){
                        for(var destScanner2 = 0; destScanner2<=63; destScanner2++){
                            if(rulebook(srcScanner2,destScanner2,boardLvl1,!whitesMoveStored)){//for every move

                                var boardLvl2 = boardLvl1.slice();
                                boardLvl2[destScanner2] = boardLvl1[srcScanner2];
                                boardLvl2[srcScanner2] = 0;
                                var moveScore2 = getScore(boardLvl2)
                                if(moveScore2<=lvl2WorstScore){
                                    lvl2WorstScore = moveScore2;
                                    lvl2WorstBoard = boardLvl2;
                                  //  console.log(lvl2WorstScore)
                                }
                            }}}
                    console.log(numToChar(srcScanner%8+1)+(8-Math.floor(srcScanner/8))+numToChar(destScanner%8+1)+(8-Math.floor(destScanner/8))+" -> "+lvl2WorstScore)


                                }
                }
            }







}

function getScore(board){
    var output = 0;
    for(var i = 0; i<=63; i++){
        switch(board[i]){
            case 1:output+=1; break;
            case 2:output+=3; break;
            case 3:output+=3; break;
            case 4:output+=5; break;
            case 5:output+=9; break;
            case 6:output+=100; break;
            case 7:output-=1; break;
            case 8:output-=3; break;
            case 9:output-=3; break;
            case 10:output-=5; break;
            case 11:output-=9; break;
            case 12:output-=100; break;
        }
    }
    return output;
}
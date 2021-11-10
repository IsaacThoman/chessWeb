var everyN = 0;
function updateChat(){
    // everyN++;
    // if(everyN % 3 !=0){
    //     return;
    // }
    console.log("recieved chat");
    var url = "https://api.grobchess.com/api/Chat?channel="+channel;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var responseText = xhr.responseText.substring(1, xhr.responseText.length-1);
            var split = responseText.replaceAll("NEWLINE",'<br>');
            document.getElementById('messagesOut').innerHTML = split;

            var msgBoxDiv = document.getElementById("messagesOut");
            msgBoxDiv.scrollTop = msgBoxDiv.scrollHeight;

        }};

    xhr.send();
}


function sendMessage(messageIn){
    var symbol = pieceSymbols[selectedPieceSymbol];
    if(reverseBoard){symbol=pieceSymbols[selectedPieceSymbol+6];}

    messageIn = symbol+ username + ": "+ messageIn;
    var url = "https://api.grobchess.com/api/Chat?message="+messageIn + "&channel="+channel;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {


        }};

    xhr.send();
}


function sendMessageBtn(){
    var msgToSend = document.getElementById('msgInput').value;
    sendMessage(msgToSend);
    document.getElementById('msgInput').value = "";
}
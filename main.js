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
var joinBoxShown = false;
function toggleJoinBox(){
    var element = document.getElementById("joinBox");
    if(element.classList.contains("is-hidden")){
        element.classList.remove("is-hidden");
    }else{
        element.classList.add("is-hidden");
    }
}
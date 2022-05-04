let detected = false;
let previous = false;

async function updateDetection() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:6463");
    xhttp.send()
    setTimeout(function(){
        if(xhttp.readyState===4) {
            detected = (xhttp.status===404);
            return;
        }
        detected=false;
    },200)
    return;
}

function handleChange() {
    if(detected===previous) return;
    previous = detected;

    let status = document.getElementById("status");
    status.classList.add("changing");

    setTimeout(() => {
        
        if(detected) {
            status.innerHTML = "Detected";
        } else {
            status.innerHTML = "Not Detected";
        }
    
        status.classList.remove("changing");
    },500)
}

setInterval(updateDetection,2000);
setInterval(handleChange,500);
  
function dragElement(elem) {
    var newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    if (document.getElementById("draggable")) {
        document.getElementById("draggable").onmousedown = dragMouseDown;
    } else {
        elem.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
  
        // get the mouse cursor position on click
        startPosX = e.clientX;
        startPosY = e.clientY;
      
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
  
        // calculate the new cursor position
        newPosX = startPosX - e.clientX;
        newPosY = startPosY - e.clientY;
        startPosX = e.clientX;
        startPosY = e.clientY;
  
        elem.style.top = (elem.offsetTop - newPosY) + "px";
        elem.style.left = (elem.offsetLeft - newPosX) + "px";
    }
  
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}




function infoInit() {
    let button = document.getElementById("info");
    button.onmouseover = function() {this.style.backgroundColor="#60646b"}
    button.onmouseout  = function() {this.style.backgroundColor="#494c52"}

    button.onclick = function() {
        if(!infoshown) {infoShow()} else {infoHide()}
    }
}




let oncooldown = false;
let infoshown = false;
let idList = ["info_dropdown","icon","explanation","status"]; 

function infoShow() {
    if(oncooldown) return;

    for(let i=0;i<idList.length;i++) {
        let elem = document.getElementById(idList[i])
        elem.classList.add("shown")
    }
    infoshown=true;
    setCooldown()
}

function infoHide() {
    if(oncooldown) return;

    for(let i=0;i<idList.length;i++) {
        let elem = document.getElementById(idList[i])
        elem.classList.remove("shown")
    }
    infoshown=false;
    setCooldown()
}

function setCooldown() {
    oncooldown = true;
    setTimeout(() => {oncooldown=false},600)
}

window.onload = function() {
    dragElement(document.getElementById("container"));
    infoInit()
}

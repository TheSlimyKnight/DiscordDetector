async function updateDetection() {
    function updateStatus(state) {
        let status = document.getElementById("status");
        let previous = status.getAttribute("data-status")

        if (previous !== state.toString()) {
            status.classList.add("changing");

            setTimeout(() => {

                status.textContent = state ? "Detected" : "Not Detected"
                status.setAttribute("data-status", true)
                status.classList.remove("changing");

            }, 500)
        }
    }
    await fetch("http://127.0.0.1:6463", { method: "GET" })
        .then((response) => updateStatus(response.status === 404))
        .catch((error) => updateStatus(false))
}

setInterval(updateDetection, 2000);

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
    button.onmouseover = function () { this.style.backgroundColor = "#60646b" }
    button.onmouseout = function () { this.style.backgroundColor = "#494c52" }

    button.onclick = function () {
        if (!infoshown) { infoShow() } else { infoHide() }
    }
}




let oncooldown = false;
let infoshown = false;
let idList = ["info_dropdown", "icon", "explanation", "status"];

function infoShow() {
    if (oncooldown) return;

    for (let i = 0; i < idList.length; i++) {
        let elem = document.getElementById(idList[i])
        elem.classList.add("shown")
    }
    infoshown = true;
    setCooldown()
}

function infoHide() {
    if (oncooldown) return;

    for (let i = 0; i < idList.length; i++) {
        let elem = document.getElementById(idList[i])
        elem.classList.remove("shown")
    }
    infoshown = false;
    setCooldown()
}

function setCooldown() {
    oncooldown = true;
    setTimeout(() => { oncooldown = false }, 600)
}

window.onload = function () {
    dragElement(document.getElementById("container"));
    infoInit()
}

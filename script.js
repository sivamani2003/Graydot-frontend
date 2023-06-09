let leftLists = document.querySelectorAll("#left .list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
let selected = null;
let canDragLeft = true;
let successMessageTimeout;
for (let list of leftLists) {
    list.addEventListener("dragstart", function (e) {
        if (canDragLeft) {
            selected = e.target;
            selected.classList.add("dragging");
        }
    });

    list.addEventListener("dragend", function (e) {
        if (selected) {
            selected.classList.remove("dragging");
            selected = null;
        }
    });
}
rightBox.addEventListener("dragover", function (e) {
    e.preventDefault();
});

rightBox.addEventListener("dragenter", function (e) {
    rightBox.classList.add("highlight");
});

rightBox.addEventListener("dragleave", function (e) {
    rightBox.classList.remove("highlight");
});
rightBox.addEventListener("drop", function (e) {
    e.preventDefault();
    rightBox.classList.remove("highlight");
    if (selected && selected.parentNode.id !== "right") {
        const clone = selected.cloneNode(true);
        rightBox.appendChild(clone);
        selected = null;
        showMessage("Item moved added sucessfully");
    }
});

leftBox.addEventListener("dragover", function (e) {
    e.preventDefault();
});

leftBox.addEventListener("dragenter", function (e) {
    leftBox.classList.add("highlight");
});

leftBox.addEventListener("dragleave", function (e) {
    leftBox.classList.remove("highlight");
});

leftBox.addEventListener("drop", function (e) {
    e.preventDefault();
    leftBox.classList.remove("highlight");
    if (selected && selected.parentNode.id !== "left") {
        leftBox.appendChild(selected);
        selected = null;
    }
});
function resetContainers() {
    rightBox.innerHTML = '';
    let originalItems = leftBox.querySelectorAll(".list");
    for (let item of originalItems) {
        leftBox.appendChild(item);
    }
    canDragLeft = true;
}
function showMessage(message) {
    clearTimeout(successMessageTimeout);
    let messageElement = document.createElement("div");
    messageElement.classList.add("success-message");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    successMessageTimeout = setTimeout(function () {
        document.body.removeChild(messageElement);
    }, 2000);
}

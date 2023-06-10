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
        showMessage("Item moved added successfully");
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

function handleTouchStart(e) {
    if (canDragLeft) {
        selected = e.target;
        selected.classList.add("dragging");
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    }
}

function handleTouchMove(e) {
    if (!selected) {
        return;
    }
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const xOffset = currentX - initialX;
    const yOffset = currentY - initialY;
    selected.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;

    const rect = rightBox.getBoundingClientRect();
    const isInsideRightBox = currentX >= rect.left && currentX <= rect.right && currentY >= rect.top && currentY <= rect.bottom;
    rightBox.classList.toggle("highlight", isInsideRightBox);
}

function handleTouchEnd(e) {
    if (!selected) {
        return;
    }
    selected.classList.remove("dragging");
    selected.style.transform = "translate3d(0, 0, 0)";

    const rect = rightBox.getBoundingClientRect();
    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const isInsideRightBox = currentX >= rect.left && currentX <= rect.right && currentY >= rect.top && currentY <= rect.bottom;

    if (isInsideRightBox) {
        const clone = selected.cloneNode(true);
        rightBox.appendChild(clone);
        showMessage("Item added successfully");
    }

    selected = null;
}


function resetContainers() {
    rightBox.innerHTML = "";
    canDragLeft = true;
}
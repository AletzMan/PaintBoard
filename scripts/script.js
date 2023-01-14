const ruleXContainer = document.querySelector(".paintboard__rule_x");
const ruleYContainer = document.querySelector(".paintboard__rule_y");
const containerCanvas = document.querySelector(".container__canvas");
const buttonPencil = document.querySelector(".tools__button--pencil");
const buttonSquare = document.querySelector(".tools__button--square");
const buttonCircle = document.querySelector(".tools__button--circle");
const buttonEllipse = document.querySelector(".tools__button--ellipse");
const buttonTriangle = document.querySelector(".tools__button--triangle");
const buttonRoundRectangle = document.querySelector(".tools__button--roundrectangle");
const buttonLine = document.querySelector(".tools__button--line");
const buttonEraser = document.querySelector(".tools__button--eraser");
const buttonsTools = document.querySelectorAll(".buttons__tools");
const buttonsColors = document.querySelectorAll(".buttons__colors");
const colorPickerLine = document.querySelector(".button__colorpicker");
const paintBoardsTools = document.querySelector(".paintboard__tools");
const buttonLineColor = document.querySelector(".settings__button--line");
const buttonFillColor = document.querySelector(".settings__button--fill");
const buttonFillNull = document.querySelector(".settings__fillnull");
const buttonLineNull = document.querySelector(".settings__linenull");
const containerColor = document.querySelector(".container__colors_buttons");
const containerEraiserSize = document.querySelector(".eraser__linewidth");
const containerLineWidth = document.querySelector(".settings__linewidth");
const cursorRuleX = document.getElementById('rule_x__cursor');
const cursorRuleY = document.getElementById('rule_y__cursor');
const canvas = document.querySelector(".canvas");
const ctxCanvas = canvas.getContext("2d");


const cotainerColorLine = containerColor.cloneNode(true);
paintBoardsTools.appendChild(cotainerColorLine);
cotainerColorLine.style.left = "55px";
cotainerColorLine.style.top = "245px";
cotainerColorLine.style.display = "none";
let colorPickerFill = cotainerColorLine.children[9];
cotainerColorLine.style.zIndex = "10";
containerColor.style.left = "8px";
containerColor.style.top = "245px";
containerColor.style.display = "none";
buttonFillNull.checked = true;
buttonLineNull.checked = true;
const eraserSize = containerEraiserSize.children[1];
const eraserSizeText = containerEraiserSize.children[2];
const lineWidth = containerLineWidth.children[1];
const lineWidthText = containerLineWidth.children[2];

let initX;
let initY;
let drawingType = 1;
let drawingGuide;
let lineTickness = 1;
let lineColor = "whitesmoke";
let fillColor = "whitesmoke";
let colors = ['white', 'black', 'gray', 'red', 'green', 'blue', 'yellow', 'pink', 'orange']
buttonsTools[0].classList.add("selectedButtonTools");
buttonsColors[0].classList.add("selectedButtonColors");
buttonFillColor.children[0].style.backgroundColor = colors[0];
buttonLineColor.children[0].style.borderColor = colors[0];
canvas.style.cursor = "url('/icons/pencil2.png')0 32, auto";
eraserSize.disabled = true;
lineWidth.disabled = true;

CreateRuleX();
CreateRuleY();
CreateGrid();

window.addEventListener("resize", function () {
    while (ruleXContainer.children[1]) {
        ruleXContainer.removeChild(ruleXContainer.children[1])
    }
    CreateRuleX();
});


for (let index = 0; index < buttonsTools.length; index++) {
    buttonsTools.item(index).addEventListener("mousedown", function (e) {
        drawingType = index + 1;
        initX = null;
        initY = null;
        for (const button of buttonsTools) {
            button.classList.remove("selectedButtonTools");
        }
        e.target.classList.add("selectedButtonTools");
        if (index === 0) {
            canvas.style.cursor = "url('/icons/pencil2.png')0 32, auto";
            lineWidth.disabled = false;
        }
        if (index === 1) {
            canvas.style.cursor = "url('/icons/eraser.png')0 0, auto";
            eraserSize.disabled = false;
            lineWidth.disabled = true;
        } else {
            eraserSize.disabled = true;
        }
        if (index > 1) canvas.style.cursor = "crosshair";
        if (index > 2) lineWidth.disabled = false;
    })
}


for (let index = 0; index < buttonsColors.length; index++) {
    buttonsColors.item(index).addEventListener("mousedown", function (e) {
        fillColor = colors[index];
        buttonFillColor.children[0].style.backgroundColor = colors[index];
        for (const button of buttonsColors) {
            button.classList.remove("selectedButtonColors");
        }
        e.target.classList.add("selectedButtonColors");
        containerColor.style.display = "none";
    })
}
for (let index = 0; index < cotainerColorLine.childElementCount - 1; index++) {
    cotainerColorLine.children[index].addEventListener("mousedown", function (e) {
        lineColor = colors[index];
        buttonLineColor.children[0].style.borderColor = colors[index];
        for (let index = 0; index < cotainerColorLine.childElementCount - 1; index++) {
            cotainerColorLine.children[index].classList.remove("selectedButtonColors");
        }
        e.target.classList.add("selectedButtonColors");
        cotainerColorLine.style.display = "none";
    })
}


colorPickerLine.addEventListener("change", () => {
    fillColor = colorPickerLine.value;
    for (const button of buttonsColors) {
        button.classList.remove("selectedButtonColors");
    }
    buttonFillColor.children[0].style.backgroundColor = colorPickerLine.value;
    containerColor.style.display = "none";
})
colorPickerFill.addEventListener("change", () => {
    lineColor = colorPickerFill.value;
    for (let index = 0; index < cotainerColorLine.childElementCount - 1; index++) {
        cotainerColorLine.children[index].classList.remove("selectedButtonColors");
    }
    buttonLineColor.children[0].style.borderColor = colorPickerFill.value;
    cotainerColorLine.style.display = "none";
})


buttonFillColor.addEventListener("mousedown", () => {
    if (!buttonFillNull.checked) {
        buttonFillNull.checked = true;
        buttonFillColor.children[0].style.backgroundColor = colors[0];
        buttonFillColor.children[0].style.backgroundImage = "none";
    }
    if (containerColor.style.display == "none") {
        containerColor.style.display = "block";
        cotainerColorLine.style.display = "none";
    } else containerColor.style.display = "none";
})
buttonLineColor.addEventListener("mousedown", () => {
    if (!buttonLineNull.checked) {
        buttonLineNull.checked = true;
        buttonLineColor.children[0].style.borderColor = colors[0];
        buttonLineColor.children[0].style.backgroundImage = "none";
        buttonLineColor.children[0].style.border = "4px solid #FFFFFF";
    }
    if (cotainerColorLine.style.display == "none") {
        cotainerColorLine.style.display = "block";
        containerColor.style.display = "none";
    } else cotainerColorLine.style.display = "none";
})
buttonFillNull.addEventListener("change", (e) => {
    if (!e.target.checked) {
        containerColor.style.display = "none";
        buttonFillColor.children[0].style.backgroundImage = "url('./icons/fillnull.svg')";
        fillColor = "transparent";
    } else {
        buttonFillColor.children[0].style.backgroundColor = colors[0];
        buttonFillColor.children[0].style.backgroundImage = "none";
        for (const button of buttonsColors) {
            button.classList.remove("selectedButtonColors");
        }
        buttonsColors[0].classList.add("selectedButtonColors");
        fillColor = colors[0];
    }
})
buttonLineNull.addEventListener("change", (e) => {
    if (!e.target.checked) {
        cotainerColorLine.style.display = "none";
        buttonLineColor.children[0].style.backgroundImage = "url('./icons/linenull.svg')";
        buttonLineColor.children[0].style.border = "0px solid #8d8d8d88";
        lineColor = "transparent";
    } else {
        buttonLineColor.children[0].style.backgroundImage = "none";
        buttonLineColor.children[0].style.border = `4px solid ${colors[0]}`;
        for (let index = 0; index < cotainerColorLine.childElementCount - 1; index++) {
            cotainerColorLine.children[index].classList.remove("selectedButtonColors");
        }
        cotainerColorLine.children[0].classList.add("selectedButtonColors");
        lineColor = colors[0];
    }
})

eraserSize.addEventListener("input", () => {
    eraserSizeText.innerText = eraserSize.value;
})
lineWidth.addEventListener("input", () => {
    lineWidthText.innerText = lineWidth.value;
    lineTickness = lineWidth.value;
})

const FreeDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.moveTo(initX, initY);
    ctxCanvas.lineTo(cursorX, cursorY);
    ctxCanvas.stroke();
    initX = cursorX;
    initY = cursorY;
    ctxCanvas.closePath();
}
const SquareDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.rect(initX, initY, cursorX, cursorY);
    ctxCanvas.stroke();
    ctxCanvas.fill();
    ctxCanvas.closePath();
}
const CircleDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.arc(initX, initY, Math.abs(cursorY), 0, 2 * Math.PI);
    ctxCanvas.fill();
    ctxCanvas.stroke();
}
const EllipseDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.ellipse(initX + (cursorX / 2), initY + (cursorY / 2), Math.abs(cursorX / 2), Math.abs(cursorY / 2), 0, 0, 2 * Math.PI);
    ctxCanvas.fill();
    ctxCanvas.stroke();
}
const TriangleDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.moveTo(initX, cursorY);
    ctxCanvas.lineTo(cursorX, cursorY);
    ctxCanvas.lineTo(initX + ((cursorX - initX)) / 2, initY);
    ctxCanvas.lineTo(initX, cursorY);
    ctxCanvas.fill();
    ctxCanvas.stroke();
}
const RoundRectangleDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.roundRect(initX, initY, cursorX, cursorY, 10);
    ctxCanvas.fill();
    ctxCanvas.stroke();
}
const LineDrawing = (cursorX, cursorY) => {
    ctxCanvas.beginPath();
    ctxCanvas.moveTo(initX, initY);
    ctxCanvas.lineTo(cursorX, cursorY);
    ctxCanvas.stroke();
}
const EraseDrawingSelection = (cursorX, cursorY) => {
    ctxCanvas.clearRect(initX, initY, cursorX, cursorY);
}
const EraseDrawing = (cursorX, cursorY) => {
    ctxCanvas.clearRect(cursorX - eraserSize.value / 2, cursorY - eraserSize.value / 2, eraserSize.value, eraserSize.value);
    initX = cursorX;
    initY = cursorY;
}

const MouseDown = (e) => {
    initX = e.offsetX;
    initY = e.offsetY;
    ctxCanvas.lineWidth = lineTickness;
    ctxCanvas.strokeStyle = lineColor;
    ctxCanvas.fillStyle = fillColor;
    ctxCanvas.lineCap = "round";
    ctxCanvas.lineJoin = "round";
    switch (drawingType) {
        case 1:
            FreeDrawing(initX, initY);
            break;
        case 2:
            EraseDrawing(initX, initY);
            CreateDrawingGuide(false);
            drawingGuide.style.borderStyle = "none";
            drawingGuide.style.backgroundColor = "white";
            drawingGuide.style.width = eraserSize.value + "px";
            drawingGuide.style.height = eraserSize.value + "px";
            break;
        case 3:
            CreateDrawingGuide(true);
            break;
        case 4:
            CreateDrawingGuide(true);
            break;
        case 5:
            CreateDrawingGuide(true);
            drawingGuide.style.borderRadius = "50%";
            break;
        case 6:
            CreateDrawingGuide(true);
            drawingGuide.style.borderRadius = "50%";
            break;
        case 7:
            CreateDrawingGuide(true);
            break;
        case 8:
            CreateDrawingGuide(true);
            break;
        case 9:
            CreateDrawingGuide(true);
            drawingGuide.style.borderTop = "none";
            drawingGuide.style.borderLeft = "none";
            drawingGuide.style.borderRight = "none";
            drawingGuide.style.borderBottomWidth = `${lineTickness}px`;
            break;
        default:
            break;
    }

    if (drawingGuide) drawingGuide.style.borderColor = lineColor;
    canvas.addEventListener("mousemove", MouseMove);

}



function CreateDrawingGuide(positionMove) {
    drawingGuide = document.createElement('div');
    containerCanvas.appendChild(drawingGuide);
    if (positionMove) {
        drawingGuide.style.left = initX + "px";
        drawingGuide.style.top = initY + "px";
    } else {
        drawingGuide.style.left = (initX - eraserSize.value / 2) + "px";
        drawingGuide.style.top = (initY - eraserSize.value / 2) + "px";
    }
}



const MouseMove = (e) => {
    switch (drawingType) {
        case 1:
            FreeDrawing(e.offsetX, e.offsetY);
            break;
        case 2:
            drawingGuide.style.left = (initX - (drawingGuide.getBoundingClientRect().width / 2)) + "px";
            drawingGuide.style.top = (initY - (drawingGuide.getBoundingClientRect().width / 2)) + "px";
            EraseDrawing(e.offsetX, e.offsetY);
            break;
        case 3:
            PositionDrawingGuide(e);
            break;
        case 4:
            PositionDrawingGuide(e);
            break;
        case 5:
            drawingGuide.style.width = (e.offsetY - initY) * 2 + "px";
            drawingGuide.style.height = (e.offsetY - initY) * 2 + "px";
            drawingGuide.style.left = (initX - (drawingGuide.getBoundingClientRect().width / 2)) + "px";
            drawingGuide.style.top = (initY - (drawingGuide.getBoundingClientRect().width / 2)) + "px";
            break;
        case 6:
            PositionDrawingGuide(e);
            break;
        case 7:
            PositionDrawingGuide(e);
            break;
        case 8:
            PositionDrawingGuide(e);
            break;
        case 9:
            if (e.offsetX - initX < 0) {
                drawingGuide.style.width = CalculateSidesOfTriangle(Math.abs(e.offsetX - initX), Math.abs(e.offsetY - initY)) + "px";
                drawingGuide.style.height = 1 + "px";
                drawingGuide.style.transform = "rotate(" + (180 + CalculateAnglesOfTriangle(e.offsetX - initX, e.offsetY - initY)) + "deg)";
            } else {
                drawingGuide.style.width = CalculateSidesOfTriangle(Math.abs(e.offsetX - initX), Math.abs(e.offsetY - initY)) + "px";
                drawingGuide.style.height = 1 + "px";
                drawingGuide.style.transform = "rotate(" + CalculateAnglesOfTriangle(e.offsetX - initX, e.offsetY - initY) + "deg)";
            }
            break;
        default:
            break;
    }
}

function PositionDrawingGuide(e) {
    if (e.offsetX - initX < 0) {
        drawingGuide.style.left = e.offsetX + "px";
        drawingGuide.style.width = initX - e.offsetX + "px";
        drawingGuide.style.height = e.offsetY - initY + "px";
    } if (e.offsetY - initY < 0) {
        drawingGuide.style.top = e.offsetY + "px";
        drawingGuide.style.width = e.offsetX - initX + "px";
        drawingGuide.style.height = initY - e.offsetY + "px";
    } else {
        drawingGuide.style.width = e.offsetX - initX + "px";
        drawingGuide.style.height = e.offsetY - initY + "px";
    }
}

const MouseUp = (e) => {
    switch (drawingType) {
        case 1:
            canvas.removeEventListener("mousemove", MouseMove);
            break;
        case 2:
            canvas.removeEventListener("mousemove", MouseMove);
            break;
        case 3:
            EraseDrawingSelection(e.offsetX - initX, e.offsetY - initY);
            initX = undefined;
            initY = undefined;
            break;
        case 4:
            SquareDrawing(e.offsetX - initX, e.offsetY - initY);
            break;
        case 5:
            CircleDrawing(e.offsetX - initX, e.offsetY - initY);
            break;
        case 6:
            EllipseDrawing(e.offsetX - initX, e.offsetY - initY);
            break;
        case 7:
            TriangleDrawing(e.offsetX, e.offsetY);
            break;
        case 8:
            RoundRectangleDrawing(e.offsetX - initX, e.offsetY - initY);
            break;
        case 9:
            LineDrawing(e.offsetX, e.offsetY);
            break;
        default:
            break;
    }
    RemoveGuideElement();
}

const FollowCursor = (e) => {
    cursorRuleX.style.left = e.offsetX + 10 + "px";
    cursorRuleY.style.top = e.offsetY + 10 + "px";
}
const MouseOut = (e) => {
    //RemoveGuideElement();     
}

function RemoveGuideElement() {
    if (drawingGuide && containerCanvas.children[1]) {
        while (containerCanvas.children[1]) {
            containerCanvas.removeChild(containerCanvas.children[1]);
        }
    }
}

canvas.addEventListener("mousedown", MouseDown);
canvas.addEventListener("mouseup", MouseUp);
canvas.addEventListener("mouseout", MouseOut);
canvas.addEventListener("mousemove", FollowCursor);


function CreateRuleX() {
    let numberOfPixels = ruleXContainer.getBoundingClientRect().width / 5;
    let coorXRule = 0;
    for (let index = 0; index < numberOfPixels / 2; index++) {
        const drawingGuide = document.createElement('div');
        ruleXContainer.appendChild(drawingGuide);

        if (index == 0) {
            drawingGuide.style.width = "11px";
        }
        if (index % 10 == 0) {
            drawingGuide.style.height = "10px";
            const newChildMeasX = document.createElement('p');
            drawingGuide.appendChild(newChildMeasX);
            const newChildTextX = document.createTextNode(coorXRule);
            newChildMeasX.appendChild(newChildTextX);
            coorXRule += 100;
        }
    }
    sizeCanvas = ruleXContainer.getBoundingClientRect().width + "px";
}

function CreateRuleY() {
    let numberOfPixels = ruleYContainer.getBoundingClientRect().height / 5;
    let coorYRule = 0;
    for (let index = 0; index < numberOfPixels / 2; index++) {
        const newChildY = document.createElement('div');
        ruleYContainer.appendChild(newChildY);
        if (index == 0) {
            newChildY.style.height = "11px";
        }
        if (index % 10 == 0) {
            newChildY.style.width = "10px";
            const newChildMeasY = document.createElement('p');
            newChildY.appendChild(newChildMeasY);
            const newChildTextY = document.createTextNode(coorYRule);
            newChildMeasY.appendChild(newChildTextY);
            coorYRule += 100;
        }
    }
}

function CreateGrid() {
    const newChildGrid = document.createElement('div');
    canvas.appendChild(newChildGrid);
    newChildGrid.style.width = "20px";
    newChildGrid.style.height = "20px";
    newChildGrid.style.top = "0px";
    newChildGrid.style.left = "0px";
    newChildGrid.style.border = "1px solid white";
    newChildGrid.style.backgroundColor = "white";
    newChildGrid.style.position = "absolute";
}


function CalculateAnglesOfTriangle(sideA, sideB) {
    let angle = (Math.atan(sideB / sideA)) * (180 / Math.PI);
    return angle;
}

function CalculateSidesOfTriangle(sideA, sideB) {
    let sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    return sideC;
}
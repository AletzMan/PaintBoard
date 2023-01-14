"use strict";

var ruleXContainer = document.querySelector(".paintboard__rule_x");
var ruleYContainer = document.querySelector(".paintboard__rule_y");
var containerCanvas = document.querySelector(".container__canvas");
var buttonPencil = document.querySelector(".tools__button--pencil");
var buttonSquare = document.querySelector(".tools__button--square");
var buttonCircle = document.querySelector(".tools__button--circle");
var buttonEllipse = document.querySelector(".tools__button--ellipse");
var buttonTriangle = document.querySelector(".tools__button--triangle");
var buttonRoundRectangle = document.querySelector(".tools__button--roundrectangle");
var buttonLine = document.querySelector(".tools__button--line");
var buttonEraser = document.querySelector(".tools__button--eraser");
var buttonsTools = document.querySelectorAll(".buttons__tools");
var buttonsColors = document.querySelectorAll(".buttons__colors");
var colorPickerLine = document.querySelector(".button__colorpicker");
var paintBoardsTools = document.querySelector(".paintboard__tools");
var buttonLineColor = document.querySelector(".settings__button--line");
var buttonFillColor = document.querySelector(".settings__button--fill");
var buttonFillNull = document.querySelector(".settings__fillnull");
var buttonLineNull = document.querySelector(".settings__linenull");
var containerColor = document.querySelector(".container__colors_buttons");
var containerEraiserSize = document.querySelector(".eraser__linewidth");
var containerLineWidth = document.querySelector(".settings__linewidth");
var cursorRuleX = document.getElementById('rule_x__cursor');
var cursorRuleY = document.getElementById('rule_y__cursor');
var canvas = document.querySelector(".canvas");
var ctxCanvas = canvas.getContext("2d");
var cotainerColorLine = containerColor.cloneNode(true);
paintBoardsTools.appendChild(cotainerColorLine);
cotainerColorLine.style.left = "55px";
cotainerColorLine.style.top = "245px";
cotainerColorLine.style.display = "none";
var colorPickerFill = cotainerColorLine.children[9];
cotainerColorLine.style.zIndex = "10";
containerColor.style.left = "8px";
containerColor.style.top = "245px";
containerColor.style.display = "none";
buttonFillNull.checked = true;
buttonLineNull.checked = true;
var eraserSize = containerEraiserSize.children[1];
var eraserSizeText = containerEraiserSize.children[2];
var lineWidth = containerLineWidth.children[1];
var lineWidthText = containerLineWidth.children[2];
var initX;
var initY;
var drawingType = 1;
var drawingGuide;
var lineTickness = 1;
var lineColor = "whitesmoke";
var fillColor = "whitesmoke";
var colors = ['white', 'black', 'gray', 'red', 'green', 'blue', 'yellow', 'pink', 'orange'];
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
    ruleXContainer.removeChild(ruleXContainer.children[1]);
  }

  CreateRuleX();
});

var _loop = function _loop(index) {
  buttonsTools.item(index).addEventListener("mousedown", function (e) {
    drawingType = index + 1;
    initX = null;
    initY = null;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = buttonsTools[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var button = _step3.value;
        button.classList.remove("selectedButtonTools");
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
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
  });
};

for (var index = 0; index < buttonsTools.length; index++) {
  _loop(index);
}

var _loop2 = function _loop2(_index) {
  buttonsColors.item(_index).addEventListener("mousedown", function (e) {
    fillColor = colors[_index];
    buttonFillColor.children[0].style.backgroundColor = colors[_index];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = buttonsColors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var button = _step4.value;
        button.classList.remove("selectedButtonColors");
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    e.target.classList.add("selectedButtonColors");
    containerColor.style.display = "none";
  });
};

for (var _index = 0; _index < buttonsColors.length; _index++) {
  _loop2(_index);
}

var _loop3 = function _loop3(_index2) {
  cotainerColorLine.children[_index2].addEventListener("mousedown", function (e) {
    lineColor = colors[_index2];
    buttonLineColor.children[0].style.borderColor = colors[_index2];

    for (var _index7 = 0; _index7 < cotainerColorLine.childElementCount - 1; _index7++) {
      cotainerColorLine.children[_index7].classList.remove("selectedButtonColors");
    }

    e.target.classList.add("selectedButtonColors");
    cotainerColorLine.style.display = "none";
  });
};

for (var _index2 = 0; _index2 < cotainerColorLine.childElementCount - 1; _index2++) {
  _loop3(_index2);
}

colorPickerLine.addEventListener("change", function () {
  fillColor = colorPickerLine.value;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = buttonsColors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var button = _step.value;
      button.classList.remove("selectedButtonColors");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  buttonFillColor.children[0].style.backgroundColor = colorPickerLine.value;
  containerColor.style.display = "none";
});
colorPickerFill.addEventListener("change", function () {
  lineColor = colorPickerFill.value;

  for (var _index3 = 0; _index3 < cotainerColorLine.childElementCount - 1; _index3++) {
    cotainerColorLine.children[_index3].classList.remove("selectedButtonColors");
  }

  buttonLineColor.children[0].style.borderColor = colorPickerFill.value;
  cotainerColorLine.style.display = "none";
});
buttonFillColor.addEventListener("mousedown", function () {
  if (!buttonFillNull.checked) {
    buttonFillNull.checked = true;
    buttonFillColor.children[0].style.backgroundColor = colors[0];
    buttonFillColor.children[0].style.backgroundImage = "none";
  }

  if (containerColor.style.display == "none") {
    containerColor.style.display = "block";
    cotainerColorLine.style.display = "none";
  } else containerColor.style.display = "none";
});
buttonLineColor.addEventListener("mousedown", function () {
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
});
buttonFillNull.addEventListener("change", function (e) {
  if (!e.target.checked) {
    containerColor.style.display = "none";
    buttonFillColor.children[0].style.backgroundImage = "url('./icons/fillnull.svg')";
    fillColor = "transparent";
  } else {
    buttonFillColor.children[0].style.backgroundColor = colors[0];
    buttonFillColor.children[0].style.backgroundImage = "none";
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = buttonsColors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var button = _step2.value;
        button.classList.remove("selectedButtonColors");
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    buttonsColors[0].classList.add("selectedButtonColors");
    fillColor = colors[0];
  }
});
buttonLineNull.addEventListener("change", function (e) {
  if (!e.target.checked) {
    cotainerColorLine.style.display = "none";
    buttonLineColor.children[0].style.backgroundImage = "url('./icons/linenull.svg')";
    buttonLineColor.children[0].style.border = "0px solid #8d8d8d88";
    lineColor = "transparent";
  } else {
    buttonLineColor.children[0].style.backgroundImage = "none";
    buttonLineColor.children[0].style.border = "4px solid ".concat(colors[0]);

    for (var _index4 = 0; _index4 < cotainerColorLine.childElementCount - 1; _index4++) {
      cotainerColorLine.children[_index4].classList.remove("selectedButtonColors");
    }

    cotainerColorLine.children[0].classList.add("selectedButtonColors");
    lineColor = colors[0];
  }
});
eraserSize.addEventListener("input", function () {
  eraserSizeText.innerText = eraserSize.value;
});
lineWidth.addEventListener("input", function () {
  lineWidthText.innerText = lineWidth.value;
  lineTickness = lineWidth.value;
});

var FreeDrawing = function FreeDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.moveTo(initX, initY);
  ctxCanvas.lineTo(cursorX, cursorY);
  ctxCanvas.stroke();
  initX = cursorX;
  initY = cursorY;
  ctxCanvas.closePath();
};

var SquareDrawing = function SquareDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.rect(initX, initY, cursorX, cursorY);
  ctxCanvas.stroke();
  ctxCanvas.fill();
  ctxCanvas.closePath();
};

var CircleDrawing = function CircleDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.arc(initX, initY, Math.abs(cursorY), 0, 2 * Math.PI);
  ctxCanvas.fill();
  ctxCanvas.stroke();
};

var EllipseDrawing = function EllipseDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.ellipse(initX + cursorX / 2, initY + cursorY / 2, Math.abs(cursorX / 2), Math.abs(cursorY / 2), 0, 0, 2 * Math.PI);
  ctxCanvas.fill();
  ctxCanvas.stroke();
};

var TriangleDrawing = function TriangleDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.moveTo(initX, cursorY);
  ctxCanvas.lineTo(cursorX, cursorY);
  ctxCanvas.lineTo(initX + (cursorX - initX) / 2, initY);
  ctxCanvas.lineTo(initX, cursorY);
  ctxCanvas.fill();
  ctxCanvas.stroke();
};

var RoundRectangleDrawing = function RoundRectangleDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.roundRect(initX, initY, cursorX, cursorY, 10);
  ctxCanvas.fill();
  ctxCanvas.stroke();
};

var LineDrawing = function LineDrawing(cursorX, cursorY) {
  ctxCanvas.beginPath();
  ctxCanvas.moveTo(initX, initY);
  ctxCanvas.lineTo(cursorX, cursorY);
  ctxCanvas.stroke();
};

var EraseDrawingSelection = function EraseDrawingSelection(cursorX, cursorY) {
  ctxCanvas.clearRect(initX, initY, cursorX, cursorY);
};

var EraseDrawing = function EraseDrawing(cursorX, cursorY) {
  ctxCanvas.clearRect(cursorX - eraserSize.value / 2, cursorY - eraserSize.value / 2, eraserSize.value, eraserSize.value);
  initX = cursorX;
  initY = cursorY;
};

var MouseDown = function MouseDown(e) {
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
      drawingGuide.style.borderBottomWidth = "".concat(lineTickness, "px");
      break;

    default:
      break;
  }

  if (drawingGuide) drawingGuide.style.borderColor = lineColor;
  canvas.addEventListener("mousemove", MouseMove);
};

function CreateDrawingGuide(positionMove) {
  drawingGuide = document.createElement('div');
  containerCanvas.appendChild(drawingGuide);

  if (positionMove) {
    drawingGuide.style.left = initX + "px";
    drawingGuide.style.top = initY + "px";
  } else {
    drawingGuide.style.left = initX - eraserSize.value / 2 + "px";
    drawingGuide.style.top = initY - eraserSize.value / 2 + "px";
  }
}

var MouseMove = function MouseMove(e) {
  switch (drawingType) {
    case 1:
      FreeDrawing(e.offsetX, e.offsetY);
      break;

    case 2:
      drawingGuide.style.left = initX - drawingGuide.getBoundingClientRect().width / 2 + "px";
      drawingGuide.style.top = initY - drawingGuide.getBoundingClientRect().width / 2 + "px";
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
      drawingGuide.style.left = initX - drawingGuide.getBoundingClientRect().width / 2 + "px";
      drawingGuide.style.top = initY - drawingGuide.getBoundingClientRect().width / 2 + "px";
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
};

function PositionDrawingGuide(e) {
  if (e.offsetX - initX < 0) {
    drawingGuide.style.left = e.offsetX + "px";
    drawingGuide.style.width = initX - e.offsetX + "px";
    drawingGuide.style.height = e.offsetY - initY + "px";
  }

  if (e.offsetY - initY < 0) {
    drawingGuide.style.top = e.offsetY + "px";
    drawingGuide.style.width = e.offsetX - initX + "px";
    drawingGuide.style.height = initY - e.offsetY + "px";
  } else {
    drawingGuide.style.width = e.offsetX - initX + "px";
    drawingGuide.style.height = e.offsetY - initY + "px";
  }
}

var MouseUp = function MouseUp(e) {
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
};

var FollowCursor = function FollowCursor(e) {
  cursorRuleX.style.left = e.offsetX + 10 + "px";
  cursorRuleY.style.top = e.offsetY + 10 + "px";
};

var MouseOut = function MouseOut(e) {//RemoveGuideElement();     
};

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
  var numberOfPixels = ruleXContainer.getBoundingClientRect().width / 5;
  var coorXRule = 0;

  for (var _index5 = 0; _index5 < numberOfPixels / 2; _index5++) {
    var _drawingGuide = document.createElement('div');

    ruleXContainer.appendChild(_drawingGuide);

    if (_index5 == 0) {
      _drawingGuide.style.width = "11px";
    }

    if (_index5 % 10 == 0) {
      _drawingGuide.style.height = "10px";
      var newChildMeasX = document.createElement('p');

      _drawingGuide.appendChild(newChildMeasX);

      var newChildTextX = document.createTextNode(coorXRule);
      newChildMeasX.appendChild(newChildTextX);
      coorXRule += 100;
    }
  }

  sizeCanvas = ruleXContainer.getBoundingClientRect().width + "px";
}

function CreateRuleY() {
  var numberOfPixels = ruleYContainer.getBoundingClientRect().height / 5;
  var coorYRule = 0;

  for (var _index6 = 0; _index6 < numberOfPixels / 2; _index6++) {
    var newChildY = document.createElement('div');
    ruleYContainer.appendChild(newChildY);

    if (_index6 == 0) {
      newChildY.style.height = "11px";
    }

    if (_index6 % 10 == 0) {
      newChildY.style.width = "10px";
      var newChildMeasY = document.createElement('p');
      newChildY.appendChild(newChildMeasY);
      var newChildTextY = document.createTextNode(coorYRule);
      newChildMeasY.appendChild(newChildTextY);
      coorYRule += 100;
    }
  }
}

function CreateGrid() {
  var newChildGrid = document.createElement('div');
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
  var angle = Math.atan(sideB / sideA) * (180 / Math.PI);
  return angle;
}

function CalculateSidesOfTriangle(sideA, sideB) {
  var sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
  return sideC;
}
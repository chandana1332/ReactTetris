/**
 * Created by chanprak on 2/27/17.
 */

function start() {
    myGame.start();
}


var myGame = {
    width: 500,
    height: 700,
    columns: 10,
    score: 0,
    start: function () {
        this.canvas = new Canvas(this.width, this.height, this.columns);
        this.context = this.canvas.getContext();
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 5;
        this.canvas.renderBoard();
        this.canvas.createCanvasMatrix();
        this.canvas.createTopMatrix();
        // first check if you can render with this i and j. if not make it i+1
        myComponent.renderRandomComponent(6, 0);
        this.interval = setInterval(periodicUpdateComponent, 1000);

    },
    saveCurrentState: function (currentComponent, i, j) {
        clearInterval(this.interval)
        this.canvas.updateTop(currentComponent, i, j);
        this.canvas.updateCanvas(currentComponent, i, j);
        var score = this.canvas.strikeBlocks();
        this.score += score;
        // if (score > 0)
        //     alert("New score:" + this.score);
        console.log("SCORE:" + this.score);
        this.interval = setInterval(periodicUpdateComponent, 1000);
    }

};


// L shaped component
var component1 = {
    render: function (i, j, angle) {
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.beginPath();
        switch (angle) {
            case 0:
                ctx.moveTo(i * w, j * w);
                ctx.lineTo(i * w, (3 + j) * w);
                ctx.lineTo((2 + i) * w, (3 + j) * w);
                ctx.lineTo((2 + i) * w, (2 + j) * w);
                ctx.lineTo((1 + i) * w, (2 + j) * w);
                ctx.lineTo((i + 1) * w, j * w);
                this.componentMatrix = [[1, 1, 1], [0, 0, 1]];
                break;
            case 90:
                ctx.moveTo(i * w, j * w);
                ctx.lineTo(i * w, (2 + j) * w);
                ctx.lineTo((1 + i) * w, (2 + j) * w);
                ctx.lineTo((1 + i) * w, (1 + j) * w);
                ctx.lineTo((3 + i) * w, (1 + j) * w);
                ctx.lineTo((i + 3) * w, j * w);
                this.componentMatrix = [[1, 1], [1, 0], [1, 0]];
                break;
            case 180:
                ctx.moveTo(i * w, j * w);
                ctx.lineTo(i * w, (1 + j) * w);
                ctx.lineTo((1 + i) * w, (1 + j) * w);
                ctx.lineTo((1 + i) * w, (3 + j) * w);
                ctx.lineTo((2 + i) * w, (3 + j) * w);
                ctx.lineTo((i + 2) * w, j * w);
                this.componentMatrix = [[1, 0, 0], [1, 1, 1]];
                break;
            case 270:
                ctx.moveTo(i * w, (j + 1) * w);
                ctx.lineTo(i * w, (2 + j) * w);
                ctx.lineTo((3 + i) * w, (2 + j) * w);
                ctx.lineTo((3 + i) * w, j * w);
                ctx.lineTo((2 + i) * w, j * w);
                ctx.lineTo((i + 2) * w, (j + 1) * w);
                this.componentMatrix = [[0, 1], [0, 1], [1, 1]];
                break;

        }

        this.setDimensions(this.componentMatrix);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
    },
    componentMatrix: [[1, 1, 1], [0, 0, 1]]

};

// I shaped component
var component2 = {
    render: function (i, j, angle) {
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.fillStyle = "blue";

        switch (angle) {
            case 0:
            case 180:
                ctx.strokeRect(i * w, j * w, w, 4 * w);
                ctx.fillRect(i * w, j * w, w, 4 * w);
                this.componentMatrix = [[1, 1, 1, 1]];

                break;
            case 90:
            case 270:
                ctx.strokeRect(i * w, j * w, 4 * w, w);
                ctx.fillRect(i * w, j * w, 4 * w, w);
                this.componentMatrix = [[1], [1], [1], [1]];
                break;
        }
        this.setDimensions(this.componentMatrix);
    },
    componentMatrix: [[1, 1, 1, 1]]
};

// Square component
var component3 = {
    render: function (i, j, angle) {
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.strokeRect(i * w, j * w, 2 * w, 2 * w);
        ctx.fillStyle = "green";
        ctx.fillRect(i * w, j * w, 2 * w, 2 * w);
    },
    componentMatrix: [[1, 1], [1, 1]]
};

// T shaped component
var component4 = {
    render: function (i, j, angle) {
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.beginPath();

        // draw based on the angle
        switch (angle) {
            case 0:
                ctx.moveTo(i * w, j * w);
                ctx.lineTo(i * w, (3 + j) * w);
                ctx.lineTo((1 + i) * w, (3 + j) * w);
                ctx.lineTo((1 + i) * w, (2 + j) * w);
                ctx.lineTo((2 + i) * w, (2 + j) * w);
                ctx.lineTo((i + 2) * w, (j + 1) * w);
                ctx.lineTo((1 + i) * w, (1 + j) * w);
                ctx.lineTo((i + 1) * w, j * w);
                this.componentMatrix = [[1, 1, 1], [0, 1, 0]];

                break;
            case 90:
                ctx.moveTo(i * w, j * w);
                ctx.lineTo(i * w, (1 + j) * w);
                ctx.lineTo((1 + i) * w, (1 + j) * w);
                ctx.lineTo((1 + i) * w, (2 + j) * w);
                ctx.lineTo((2 + i) * w, (2 + j) * w);
                ctx.lineTo((i + 2) * w, (j + 1) * w);
                ctx.lineTo((3 + i) * w, (1 + j) * w);
                ctx.lineTo((i + 3) * w, j * w);
                this.componentMatrix = [[1, 0], [1, 1], [1, 0]];
                break;
            case 180:
                ctx.moveTo(i * w, (j + 1) * w);
                ctx.lineTo(i * w, (j + 2) * w);
                ctx.lineTo((1 + i) * w, (2 + j) * w);
                ctx.lineTo((1 + i) * w, (3 + j) * w);
                ctx.lineTo((2 + i) * w, (3 + j) * w);
                ctx.lineTo((i + 2) * w, j * w);
                ctx.lineTo((1 + i) * w, j * w);
                ctx.lineTo((i + 1) * w, (j + 1) * w);
                this.componentMatrix = [[0, 1, 0], [1, 1, 1]];
                break;
            case 270:
                ctx.moveTo(i * w, (j + 1) * w);
                ctx.lineTo(i * w, (j + 2) * w);
                ctx.lineTo((3 + i) * w, (2 + j) * w);
                ctx.lineTo((3 + i) * w, (1 + j) * w);
                ctx.lineTo((2 + i) * w, (1 + j) * w);
                ctx.lineTo((i + 2) * w, j * w);
                ctx.lineTo((1 + i) * w, j * w);
                ctx.lineTo((i + 1) * w, (j + 1) * w);
                this.componentMatrix = [[0, 1], [1, 1], [0, 1]];
                break;

        }
        this.setDimensions(this.componentMatrix);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "purple";
        ctx.fill();
    },
    componentMatrix: [[1, 1, 1], [0, 1, 0]]
};

var myComponent = {
    i: 0,
    j: 0,
    angle: 0,
    generateRandom: function () {
        return Math.floor((Math.random() * 5) + 1);
    },
    renderRandomComponent: function (i, j) {
        this.componentNumber = this.generateRandom();
        this.i = i;
        this.j = j;
        this.renderComponent(this.componentNumber);
    },
    renderComponent: function (componentNumber) {
        var component;
        switch (componentNumber) {
            case 1:
                component = new Component(component1.componentMatrix, component1.render);
                break;
            case 2:
                component = new Component(component2.componentMatrix, component2.render);
                break;
            case 3:
                component = new Component(component3.componentMatrix, component3.render);
                break;
            case 4:
                component = new Component(component4.componentMatrix, component4.render, component4.rotate);
                break;
            default:
                component = new Component(component1.componentMatrix, component1.render);
        }
        component.render(this.i, this.j, this.angle);
        this.currentComponent = component;
    },
    updateComponent: function (i, j) {
        if (this.canRender(i, j)) {
            myGame.canvas.clearCanvas();
            this.i = i;
            this.j = j;
            this.currentComponent.render(this.i, this.j, this.angle);
            return true;
        }
        return false;

    },
    canRender: function (i, j) {
        var componentMatrix = this.currentComponent.componentMatrix;
        var canvasMatrix = myGame.canvas.canvasMatrix;
        var componentRows = this.currentComponent.rows;
        var componentColumns = this.currentComponent.columns;
        var canvasRows = myGame.canvas.rows;
        var canvasColumns = myGame.canvas.columns;

        if (i + componentColumns > canvasColumns || j + componentRows > canvasRows || i < 0)
            return false;
        for (var x = 0; x < componentColumns; x++) {
            for (var y = 0; y < componentRows; y++) {
                if (componentMatrix[x][y] == 1 && canvasMatrix[i + x][j + y] > 0)
                    return false;
            }
        }
        return true;
    },
    rotateComponent: function () {

        if (this.angle < 270)
            this.angle = this.angle + 90;
        else
            this.angle = 0;
        this.updateComponent(this.i, this.j);
        //if you cant render the component then do i=i-1 if it's the last and i=i+1 if it's the first
    }
};

function Component(componentMatrix, renderFunction, rotateFunction) {
    this.componentMatrix = componentMatrix;
    this.render = renderFunction;
    this.rotate = rotateFunction;
    this.setDimensions(componentMatrix);
    //Remember to  verify the component matrix. make sure it has the same number of rows in all columns.
}

Component.prototype.setDimensions = function (componentMatrix) {
    this.rows = componentMatrix[0].length;
    this.columns = componentMatrix.length;
}
function Canvas(width, height, columns) {
    this.width = width;
    this.height = height;
    this.columns = columns;
    this.columnWidth = this.width / this.columns;
    this.rows = this.height / this.columnWidth;
    this.canvasDOMElement.width = this.width;
    this.canvasDOMElement.height = this.height;
    this.context = this.canvasDOMElement.getContext("2d");
}
Canvas.prototype.canvasDOMElement = document.getElementById("tetrisCanvas");

Canvas.prototype.createCanvasMatrix = function () {
    this.canvasMatrix = new Array(this.columns);
    for (var i = 0; i < this.columns; i++)
        this.canvasMatrix[i] = new Array(this.rows).fill(0);
};
Canvas.prototype.createTopMatrix = function () {
    this.topMatrix = new Array(10);
    for (var i = 0; i < this.rows; i++)
        this.topMatrix.fill(this.rows);
};
Canvas.prototype.clearColumn = function (columnNumber) {
    this.context.clearRect(columnNumber * this.columnWidth, 0, this.columnWidth, this.topMatrix[columnNumber] * this.columnWidth);
}
Canvas.prototype.clearCanvas = function () {
    for (var i = 0; i <= this.columns; i++) {
        this.clearColumn(i);
    }
};
Canvas.prototype.renderBoard = function () {
    var ctx = this.context;
    ctx.rect(0, 0, this.width, this.height);

};
Canvas.prototype.getContext = function () {
    return this.context;
};

Canvas.prototype.updateTop = function (currentComponent, i, j) {
    for (var x = 0; x < currentComponent.columns; x++) {
        for (var y = 0; y < currentComponent.rows; y++) {
            if (currentComponent.componentMatrix[x][y] == 1) {
                if (this.topMatrix[i + x] > y + j) {
                    this.topMatrix[i + x] = j + y;
                    break;
                }
            }
        }
    }
};

Canvas.prototype.updateCanvas = function (currentComponent, i, j) {
    var componentRows = currentComponent.rows;
    var componentColumns = currentComponent.columns;
    var componentMatrix = currentComponent.componentMatrix;
    var canvasMatrix = this.canvasMatrix;
    for (var x = 0; x < componentColumns; x++) {
        for (var y = 0; y < componentRows; y++) {
            if (componentMatrix[x][y] == 1) {
                if (canvasMatrix[i + x][j + y] > 0)
                    throw "You are trying to save an invalid state. There is a collision.";
                else
                    canvasMatrix[i + x][j + y] = myComponent.componentNumber;
            }
        }
    }
};

Canvas.prototype.strikeBlocks = function () {
    var colors = ["red", "blue", "green", "purple"];
    var canvasMatrix = this.canvasMatrix;
    var columns = this.columns;
    var rows = this.rows;
    var flag = true;
    var score = 0;
    for (var x = 0; x < rows; x++) {
        flag = true;
        for (var y = 0; y < columns; y++) {
            if (canvasMatrix[y][x] <= 0) {
                flag = false;
                break;
            }

        }
        if (flag) {
            // 1. move canvas matrix one row down 2. re draw
            for (var z = 0; z < columns; z++) {
                this.topMatrix[z] = this.topMatrix[z] + 1;
                for (var w = x; w >= 0; w--) {
                    if (w == 0) {
                        canvasMatrix[z][w] = 0;
                    }
                    else {
                        canvasMatrix[z][w] = canvasMatrix[z][w - 1];
                        // if(canvasMatrix[z][w]!=0)
                        // {
                        this.clearColumn(z);
                        this.context.fillStyle = colors[canvasMatrix[z][w] - 1];
                        this.context.fillRect(z, w, this.columnWidth, this.columnWidth);
                        //}
                    }


                }
            }
            score = score + 10;
        }

    }
    return score;
};
var periodicUpdateComponent = function () {

    if (!myComponent.updateComponent(myComponent.i, myComponent.j + 1)) {
        myGame.saveCurrentState(myComponent.currentComponent, myComponent.i, myComponent.j);
        myComponent.renderRandomComponent(6, 0);
    }
};

var moveComponent = function (event) {
    switch (event.keyCode) {
        case 37:
            myComponent.updateComponent(myComponent.i - 1, myComponent.j);
            break;
        case 39:
            myComponent.updateComponent(myComponent.i + 1, myComponent.j);
            break;
        case 40:
            myComponent.updateComponent(myComponent.i, myComponent.j + 1);
            break;
        case 38:
            myComponent.rotateComponent();
    }
};

document.onkeydown = moveComponent;

// **************** This week ******************
// Fix the rxc or cxr
// Fix the bug with rotation and render
// Make myComponent a part of myGame and nothing should access myComponent directly outside the context of myGame and make myGame also oo
// Verify that components don't access anything wihtout an object.
// Finish React course.
// Build the side div

// make periodicUpdate a part of myGame
// Logs to record moves so that you can replay. Preferrably give the option to save it to file.


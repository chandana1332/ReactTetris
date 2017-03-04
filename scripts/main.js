/**
 * Created by chanprak on 2/27/17.
 */

function start()
{
    myGame.start();
}


var myGame={
    width:500,
    height: 700,
    columns:10,
    start:function()
    {
        this.canvas = new Canvas(this.width, this.height, this.columns);
        this.context = this.canvas.getContext();
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 5;
        this.canvas.renderBoard();
        this.canvas.createCanvasMatrix();
        this.canvas.createTopMatrix();
        component.renderRandomComponent(1,0);
        this.interval = setInterval(periodicUpdateComponent, 1000);

    },
    saveCurrentState:function(currentComponent, i, j)
    {
        this.canvas.updateTop(currentComponent,i,j);
        this.canvas.updateCanvas(currentComponent, i, j);
    }

};


// L shaped component
var component1 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.beginPath();
        ctx.moveTo(i*w,j*w);
        ctx.lineTo(i*w,(3+j)*w);
        ctx.lineTo((2+i)*w, (3+j)*w);
        ctx.lineTo((2+i)*w, (2+j)*w);
        ctx.lineTo((1+i)*w, (2+j)*w);
        ctx.lineTo((i+1)*w, j*w);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle="red";
        ctx.fill();
    },
    componentMatrix:[[1,1,1],[0,0,1]],
    columns:2,
    rows:3
};

// I shaped component
var component2 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.strokeRect(i*w, j*w, w, 4*w);
        ctx.fillStyle="blue";
        ctx.fillRect(i*w, j*w, w, 4*w);
    },
    componentMatrix:[[1,1,1,1]],
    columns:1,
    rows:4
};

// Square component
var component3= {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.strokeRect(i*w, j*w, 2*w, 2*w);
        ctx.fillStyle="green";
        ctx.fillRect(i*w, j*w, 2*w, 2*w);
    },
    componentMatrix:[[1,1],[1,1]],
    columns:2,
    rows:2
};

// T shaped component
var component4 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.canvas.columnWidth;
        ctx.beginPath();
        ctx.moveTo(i*w, j*w);
        ctx.lineTo(i*w, (3+j)*w);
        ctx.lineTo((1+i)*w, (3+j)*w);
        ctx.lineTo((1+i)*w, (2+j)*w);
        ctx.lineTo((2+i)*w, (2+j)*w);
        ctx.lineTo((i+2)*w, (j+1)*w);
        ctx.lineTo((1+i)*w, (1+j)*w);
        ctx.lineTo((i+1)*w, j*w);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle="purple";
        ctx.fill();
    },
    componentMatrix:[[1,1,1],[0,1,0]],
    columns:2,
    rows:3
};

var component = {
    generateRandom: function(){
        return Math.floor((Math.random() * 4) + 0);
    },
    components:[component1, component2, component3, component4],
    renderRandomComponent:function(i,j){
        this.componentNumber = this.generateRandom();
        this.currentComponent=this.components[this.componentNumber];
        this.i = i;
        this.j = j;
        this.renderComponent();
    },
    renderComponent:function(){
        this.currentComponent.render(this.i, this.j);
    },
    updateComponent:function(i,j)
    {
        myGame.canvas.clearCanvas();
        this.i=i;
        this.j=j;
        this.renderComponent();
    },
    canRender:function(i,j){
        var componentMatrix = this.currentComponent.componentMatrix;
        var canvasMatrix = myGame.canvas.canvasMatrix;
        var componentRows=this.currentComponent.rows;
        var componentColumns=this.currentComponent.columns;
        var canvasRows=myGame.canvas.rows;
        var canvasColumns=myGame.canvas.columns;
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(componentRows);
        console.log("i="+i+"j="+j);

        if(i+componentColumns>canvasColumns || j+componentRows>canvasRows)
            return false;
        for(var x=0;x<componentColumns;x++)
        {
            for(var y=0;y<componentRows;y++)
            {
                console.log("x="+x+"y="+y);
                if(componentMatrix[x][y]==1 && canvasMatrix[i+x][j+y]==1)
                    return false;
            }
        }
        return true;
    },
    rotateComponent:function(){
        var ctx = myGame.context;
        
    }
};

function Canvas(width,height,columns){
    this.width=width;
    this.height=height;
    this.columns=columns;
    this.columnWidth = this.width/this.columns;
    this.rows = this.height/this.columnWidth;
    this.canvasDOMElement.width = this.width;
    this.canvasDOMElement.height = this.height;
    this.context = this.canvasDOMElement.getContext("2d");
}
Canvas.prototype.canvasDOMElement=document.getElementById("tetrisCanvas");

Canvas.prototype.createCanvasMatrix=function(){
    this.canvasMatrix=new Array(this.columns);
    for(var i=0;i<this.columns;i++)
        this.canvasMatrix[i]=new Array(this.rows).fill(0);
};
Canvas.prototype.createTopMatrix=function(){
    this.topMatrix=new Array(10);
    for(var i=0;i<this.rows;i++)
        this.topMatrix.fill(this.rows);
};
Canvas.prototype.clearCanvas=function(){
    for(var i=-1;i<=component.currentComponent.columns;i++)
    {
        this.context.clearRect((component.i+i)*this.columnWidth,0,this.columnWidth,this.topMatrix[component.i+i]*this.columnWidth);
    }
};
Canvas.prototype.renderBoard=function(){
    var ctx = this.context;
    ctx.rect(0, 0, this.width, this.height);
    // ctx.beginPath();
    // for(var i=1;i<=this.columns;i++)
    // {
    //     ctx.moveTo(i*this.columnWidth,0);
    //     ctx.lineTo(i*this.columnWidth,this.height);
    // }
    // ctx.stroke();
};
Canvas.prototype.getContext=function(){
    return this.context;
};

Canvas.prototype.updateTop=function(currentComponent,i,j){
    for(var x=0;x<currentComponent.columns;x++)
    {
        for(var y=0;y<currentComponent.rows;y++)
        {
            if(currentComponent.componentMatrix[x][y]==1)
            {
                if(this.topMatrix[i+x]>y+j) {
                    this.topMatrix[i+x] = j+y;
                    break;
                }
            }
        }
    }
};

Canvas.prototype.updateCanvas=function(currentComponent,i,j){
    var componentRows=currentComponent.rows;
    var componentColumns=currentComponent.columns;
    var componentMatrix = currentComponent.componentMatrix;
    var canvasMatrix = this.canvasMatrix;
    console.log("Before:"+myGame.canvas.canvasMatrix);

    for(var x=0;x<componentColumns;x++)
    {
        for(var y=0;y<componentRows;y++)
        {
            console.log("x="+x+" y="+y);
            if(componentMatrix[x][y]==1 ) {
                if(canvasMatrix[i+x][j+y]==1)
                    //throw "You are trying to save an invalid state. There is a collision.";
                    console.log("D");
                else
                    canvasMatrix[i+x][j+y]=1;
            }
        }
    }
    console.log("After:"+canvasMatrix);
}

var updateComponent=function(i,j)
{
    if(component.canRender(i,j)) {
        component.updateComponent(i,j);
        return true;
    }
    return false;
};
var periodicUpdateComponent = function(){

    if(!updateComponent(component.i,component.j+1))
    {
        myGame.saveCurrentState(component.currentComponent,component.i,component.j);
        component.renderRandomComponent(0,0);
        console.log("Top::"+myGame.canvas.topMatrix);
    }
};

var moveComponent=function(event){
    switch(event.keyCode)
    {
        case 37:
            updateComponent(component.i-1,component.j);
            break;
        case 39:
            updateComponent(component.i+1,component.j);
            break;
        case 40:
            updateComponent(component.i,component.j+1);
            break;
        case 38:
            component.rotateComponent();
    }
};

document.onkeydown = moveComponent;

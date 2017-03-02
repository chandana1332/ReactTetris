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
        this.myCanvas = new Canvas(this.width, this.height, this.columns);
        this.context = this.myCanvas.canvasDOMElement.getContext("2d");
        this.strokeStyle = '#000';
        this.myCanvas.renderBoard();
        this.myCanvas.createCanvasMatrix();
        component.renderRandomComponent(0,0);
        this.interval = setInterval(updateComponent, 500);
    }
};

function Canvas(width,height,columns){
        this.width=width;
        this.height=height;
        this.columns=columns;
        this.columnWidth = this.width/this.columns;
        this.canvasDOMElement.width = this.width;
        this.canvasDOMElement.height = this.height;
    }
Canvas.prototype.canvasDOMElement=document.getElementById("tetrisCanvas");
Canvas.prototype.createCanvasMatrix=function(){
        this.canvasMatrix=new Array(10);
        var rows = this.height/this.columnWidth;
        for(var i=0;i<rows;i++)
            this.canvasMatrix.fill(new Array(this.columns).fill(0));
        console.log(this.canvasMatrix);
    };
Canvas.prototype.clearCanvas=function(){
        for(var i=0;i<this.currentColumns.length;i++)
        {
            this.context.clearRect(0,this.currentColumns[i]*this.columnWidth,this.columnWidth,this.top[i]*this.columnWidth);
        }
    };
Canvas.prototype.renderBoard=function(){
        var ctx = myGame.context;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        for(var i=1;i<=this.columns;i++)
        {
            ctx.moveTo(i*this.columnWidth,0);
            ctx.lineTo(i*this.columnWidth,this.height);
        }
        ctx.stroke();
    };

var component = {
    generateRandom: function(){
        return Math.floor((Math.random() * 4) + 0);
    },
    components:[component1, component2, component3, component4],
    renderRandomComponent:function(i,j){
        this.componentNumber = this.generateRandom();
        console.log(this.componentNumber);
        this.i = i;
        this.j = j;
        this.renderComponent();
    },
    renderComponent:function(){
        switch(this.componentNumber){
            case 1:
                component1.render(this.i, this.j);
                break;
            case 2:
                component2.render(this.i, this.j);
                break;
            case 3:
                component3.render(this.i, this.j);
                break;
            case 4:
                component4.render(this.i, this.j);
                break;
            default:
                component1.render(this.i, this.j);
        }
    },
    updateComponent:function(){
        this.j=++this.j;
        this.renderComponent();
    },
    canRender:function(){

    }
};

// L shaped component
var component1 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.columnWidth;
        ctx.beginPath();
        ctx.moveTo(i*w,j*w);
        ctx.lineTo(i*w,(3+j)*w);
        ctx.lineTo((2+i)*w, (3+j)*w);
        ctx.lineTo((2+i)*w, (2+j)*w);
        ctx.lineTo((1+i)*w, (2+j)*w);
        ctx.lineTo((i+1)*w, j*w);
        ctx.closePath();
        ctx.fillStyle="red";
        ctx.fill();
    },
    componentMatrix:[[1,0],[1,0],[1,1]],

};

// I shaped component
var component2 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.columnWidth;
        ctx.fillStyle="blue";
        ctx.fillRect(i*w, j*w, w, 4*w);
    },
    componentMatrix:[[1],[1],[1],[1]],
    canRender:function(){

    }
};

// Square component
var component3= {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.columnWidth;
        ctx.fillStyle="black";
        ctx.fillRect(i*w, j*w, 2*w, 2*w);
    },
    componentMatrix:[[1,1],[1,1]],
    canRender:function(){

    }
};

// T shaped component
var component4 = {
    render:function(i,j){
        var ctx = myGame.context;
        var w = myGame.columnWidth;
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
        ctx.fillStyle="purple";
        ctx.fill();
    },
    componentMatrix:[[1,0],[1,1],[1,0]],
    canRender:function(){

    }
};


var updateComponent = function()
{
    if(component.canRender()) {
        canvas.clear();
        component.updateComponent();
    }
    else
    {
        component.renderRandomComponent(0,0);
    }
};
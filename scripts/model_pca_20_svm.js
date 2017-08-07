var app = new PIXI.Application({
    'width' : 840,
    'height' : 1120
});
document.body.appendChild(app.view);

var ratio = 8;
var line = new PIXI.Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
for(var i in pModel.path.normal) {
    console.log('line ' + i);

    for(var j in pModel.path.normal[i]) {
        var n = pModel.path.normal[i][j];
        console.log(n);
        var p = pModel.shapeModel.meanShape[n];
        console.log(p);

        line.lineTo(p[0]*ratio, p[1]*ratio);
    }
}
app.stage.addChild(line);
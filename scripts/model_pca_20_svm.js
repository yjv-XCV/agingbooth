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

        line.lineTo(p[0]*ratio-25, p[1]*ratio+220);
    }
}

var overlay_vertices = new Float32Array(150);
var overlay_uvs = new Float32Array(150);
var overlay_indices = new Uint16Array([71,72,74,73,71]);
index = 0;


for(var i in pModel.path.normal) {
    console.log('line ' + i);

    for(var j in pModel.path.normal[i]) {
        var n = pModel.path.normal[i][j];
        console.log(n);
        var p = pModel.shapeModel.meanShape[n];
        console.log(p);
        line.beginFill(0xff0022);
        line.drawCircle(p[0]*ratio-25, p[1]*ratio+220,10);
        line.endFill();
    }
}

    for(var i in pModel.shapeModel.meanShape){
        p = pModel.shapeModel.meanShape[i];
        overlay_uvs[index] = ((p[1]*ratio+220)/1120);
        overlay_vertices[index++] = p[1]*ratio+220;
        overlay_uvs[index] = ((p[0]*ratio-25)/840);
        overlay_vertices[index++] = p[0]*ratio-25;
    }

//to render all image

overlay_uvs[index] = 0;
overlay_vertices[index++] = 0;
overlay_uvs[index] = 0;
overlay_vertices[index++] = 0;
overlay_uvs[index] = 0;
overlay_vertices[index++] = 840;
overlay_uvs[index] = 1;
overlay_vertices[index++] = 0;
overlay_uvs[index] = 1;
overlay_vertices[index++] = 0;
overlay_uvs[index] = 0;
overlay_vertices[index++] = 1120;
overlay_uvs[index] = 1;
overlay_vertices[index++] = 840;
overlay_uvs[index] = 1;
overlay_vertices[index++] = 1120;


var overlay = new PIXI.mesh.Mesh(PIXI.Texture.fromImage('imgs/old2.png'), overlay_vertices, overlay_uvs, overlay_indices);


// console.log(overlay.vertices);
overlay.x = 0;
overlay.y = 0;
app.stage.addChild(overlay);

        

app.stage.addChild(line);
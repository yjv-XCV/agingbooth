var app = new PIXI.Application({
    'width' : 840,
    'height' : 1120
});
document.body.appendChild(app.view);

var count = 0;
var vrtcs = new Float32Array(72);
var uvs = new Float32Array(72);

var index = 0;
// 840 /5
// 1120 /5
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        uvs[index] = j * 0.2;
        vrtcs[index++] = j * 168;
        uvs[index] = i * 0.2;
        vrtcs[index++] = i * 224;
    }
}
console.log(vrtcs);

var plane001 = new PIXI.mesh.Mesh(PIXI.Texture.fromImage('samples/002.png'), vrtcs , uvs, new Uint16Array([0,5,35,30,0]));

plane001.x = 0;
plane001.y = 0;

app.stage.addChild(plane001);

var g = new PIXI.Graphics();
g.x = plane001.x;
g.y = plane001.y;
app.stage.addChild(g);

// start animating
// app.ticker.add(function() {

//     count += 0.1;

// });
function renderPoints () {

    g.clear();

    pv = plane001.vertices;
    for(var i in pv) {
        if (i%2) {
            g.beginFill(0xff0022);
            g.drawCircle(pv[i-1], pv[i], 10);
            g.endFill();
        }
    }
}

$(function() {

    $(window).click(function(){
        renderPoints();
    })

});

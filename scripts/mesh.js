var app = new PIXI.Application({
    'width' : 840,
    'height' : 1120
});
document.body.appendChild(app.view);

var plane001 = new PIXI.mesh.Plane(PIXI.Texture.fromImage('samples/002.png'), 6, 6);

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

function renderIndices () {

    var i = 0;
    pi = plane001.indices;
    pv = plane001.vertices;

    var fps = 10;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;

    function drawLoop() {
        if (i < 149) {

            now = Date.now();
            delta = now - then;
             
            if (delta > interval) {
                // update time stuffs
                 
                // Just `then = now` is not enough.
                // Lets say we set fps at 10 which means
                // each frame must take 100ms
                // Now frame executes in 16ms (60fps) so
                // the loop iterates 7 times (16*7 = 112ms) until
                // delta > interval === true
                // Eventually this lowers down the FPS as
                // 112*10 = 1120ms (NOT 1000ms).
                // So we have to get rid of that extra 12ms
                // by subtracting delta (112) % interval (100).
                // Hope that makes sense.
                 
                then = now - (delta % interval);
                 
                // ... Code for Drawing the Frame ...
                i++;
                console.log(pi[i]);
                console.log(pv[pi[i]*2]);
                var line = new PIXI.Graphics();
                line.lineStyle(4, 0xFFFFFF, 1);
                line.moveTo(pv[pi[i]*2], pv[pi[i]*2+1]);
                line.lineTo(pv[pi[i+1]*2], pv[pi[i+1]*2+1]);
                app.stage.addChild(line);

            }
            requestAnimFrame(drawLoop);
        }
    }


    requestAnimFrame(drawLoop);

    // for(var i in pi) {
    //     console.log(pi[i]);
    //     line.lineTo(pv[pi[i]*2], pv[pi[i]*2+1]);
    // }
}

$(function() {

    $(window).click(function(){
        renderIndices();
    })

});

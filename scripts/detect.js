var ctracker;
var tracked_coord;
$(function(){
  var image_cc = $('#image')[0].getContext('2d');
  var overlay_cc = $('#overlay')[0].getContext('2d');
  var drawRequest;

  /**
   * load image into canvas
   */
  var image_img = new Image();
  $(image_img).load(function() {
    image_cc.drawImage(image_img, 0, 0, 840, 1120);
  });
  image_img.src = 'samples/001.jpeg';

  /**
   * ctrack
   */
  ctracker = new clm.tracker({stopOnConvergence : true});
  ctracker.init();

  function drawLoop(t)
  {
    // console.log(t);
    requestAnimFrame(drawLoop);
    overlay_cc.clearRect(0,0,840, 1120);
    ctracker.draw($('#overlay')[0]);

  }


  $(window).click(function(){

    // TRACK IMAGE
    // ctracker.start($('#image')[0]);

    // DRAW RECT
    // var box = [240, 270, 550-240, 545-270];
    var box = [200, 100, 400, 500];

    overlay_cc.rect(box[0], box[1], box[2], box[3]);
    // overlay_cc.stroke();

    // TRACK RECT
    ctracker.start($('#image')[0], box);


    // DRAW LOOP
    // requestAnimFrame(drawLoop);
  });
  $('#overlay').click(function(e) {
    zz.cs.getCursorPosition($('#image')[0], e);
  });


  // detect if tracker fails to find a face
  // document.addEventListener("clmtrackrNotFound", function(event) {
  //   ctracker.stop();
  //   alert("The tracking had problems with finding a face in this image. Try selecting the face in the image manually.")
  // }, false);

  // detect if tracker loses tracking of face
  // document.addEventListener("clmtrackrLost", function(event) {
  //   ctracker.stop();
  //   alert("The tracking had problems converging on a face in this image. Try selecting the face in the image manually.")
  // }, false);

  // detect if tracker has converged
  document.addEventListener("clmtrackrConverged", function(event) {
    // alert('Converged!');
    console.log('ctracker.getCurrentPosition()');
    console.log(tracked_coord = ctracker.getCurrentPosition());
    console.log('ctracker.getCurrentParameters()');
    console.log(ctracker.getCurrentParameters());
    console.log('ctracker.getScore()');
    console.log(ctracker.getScore());

    // stop drawloop
    // cancelRequestAnimFrame(drawRequest);
  }, false);

  // update stats on iteration
  document.addEventListener("clmtrackrIteration", function(event) {
    // stats.update();
    console.log(tracked_coord = ctracker.getCurrentPosition());
    
  }, false);



});


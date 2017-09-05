var zz = function(){};

zz.cs = function(){};
zz.cs.getCursorPosition = function(canvas, event){
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  // console.log("x: " + x + " y: " + y);
  return [x, y];
};
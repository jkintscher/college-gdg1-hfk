var Hole = function(x_left, x_right) {
  var left  = x_left,
      right = x_right;

  this.getDimensions = function() {
    return {
      left:  left,
      right: right
    };
  };
};

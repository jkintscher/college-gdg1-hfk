var Player = function(staircase, width, left_key, right_key) {
  // Constants
  var BASE_SPEED = 12,
      FALL_SPEED =  8,
      WIDTH  = 14,
      HEIGHT = 33;

  // Runtime variables
  var speed = 0,
      direction = 'left',
      step      = true,
      floor = staircase.getStartFloor(),
      x = width / 2,
      y;

  $(document.body).keydown(function(evt) {
    if(evt.which == left_key) {
      direction = 'left';
      move();
    } else if(evt.which == right_key) {
      direction = 'right';
      move();
    }
    speed += 0.75;
    step = !step;
  });

  $(document.body).keyup(function(evt) {
    speed = 0;
  });

  var move = function() {
    var new_x = x;
    if(direction === 'left') {
      new_x -= BASE_SPEED + speed;
    } else {
      new_x += BASE_SPEED + speed;
    }
    if(new_x > 0 && new_x < width) {
      x = new_x;
    }
    if(floor.hasHoleAt(x, x + WIDTH)) {
      floor = staircase.getNextFloor(floor);
    }
  };

  this.render = function(ctx) {
    var offset = HEIGHT + 2 / 2;
    if((floor.getY() - offset) > y) {
      y += FALL_SPEED;
    } else {
      y = floor.getY() - offset;
    }

    ctx.drawImage(IMAGES.character[direction][+step], x, y, WIDTH, HEIGHT);
  };

  this.getPosition = function() {
    return {
      x: x,
      y: y
    };
  };

  return this;
};

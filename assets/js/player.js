var Player = function(staircase, width, left_key, right_key) {
  var BASE_SPEED = 12,
      FALL_SPEED =  8,
      DIRECTION  = 'left',
      WIDTH  = 14,
      HEIGHT = 33,
      speed = 0,
      floor = staircase.getStartFloor(),
      x = width / 2,
      y;

  $(document.body).keydown(function(evt) {
    if(evt.which == left_key) {
      DIRECTION = 'left';
      move();
    } else if(evt.which == right_key) {
      DIRECTION = 'right';
      move();
    }
    speed += 0.75;
  });

  $(document.body).keyup(function(evt) {
    speed = 0;
  });

  var move = function() {
    var new_x = x;
    if(DIRECTION === 'left') {
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

    ctx.drawImage(IMAGES.character[DIRECTION][0], x, y, WIDTH, HEIGHT);
  };

  this.getPosition = function() {
    return {
      x: x,
      y: y
    };
  };

  return this;
};

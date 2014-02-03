var Staircase = function(width, height) {
  // Constants
  var speed = 1,
      FLOOR_COUNT  = 5,
      FLOOR_HEIGHT = height / FLOOR_COUNT;

  // Runtime variables
  var floors = [],
      offset = 0,
      floor,
      prev_floor;

  for(var i = 0; i < (FLOOR_COUNT + 1); ++i) {
    floor = new Floor(width, prev_floor);
    floors.push(floor);
    prev_floor = floor;
  }

  this.getStartFloor = function() {
    return floors[Math.ceil(floors.length / 2 - 1)];
  };

  this.getNextFloor = function(subject_floor) {
    for(var i = 0; i < floors.length; ++i) {
      if(floors[i] === subject_floor) {
        return floors[i + 1] || null;
      }
    }
    return null;
  };

  this.setSpeed = function(new_speed) {
    speed = new_speed;
  };

  this.appendFloor = function() {
    delete floors.shift();
    floors.push(new Floor(width, floors[floors.length - 1]));
  };

  this.render = function(ctx) {
    offset -= speed;
    if(-offset > FLOOR_HEIGHT) {
      offset = 0;
      this.appendFloor();
    }

    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);

    for(var i = 0; i < floors.length; ++i) {
      floors[i].render(ctx, offset + FLOOR_HEIGHT * (i + 1));
    }
  };
};

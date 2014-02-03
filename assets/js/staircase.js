var Staircase = function(width, height) {
  var FLOOR_COUNT  = 10,
      FLOOR_HEIGHT = height / FLOOR_COUNT,
      floors = [],
      offset = 0;

  for(var i = 0; i < FLOOR_COUNT; ++i) {
    floors.push(new Floor(width));
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

  this.appendFloor = function() {
    delete floors.shift();
    floors.push(new Floor(width));
  };

  this.render = function(ctx) {
    offset--;
    if((offset % FLOOR_HEIGHT) == 0) {
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

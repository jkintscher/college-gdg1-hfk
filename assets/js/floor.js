var Floor = function(width, prev_floor) {
  // Constants
  var TILE_COUNT = 9,
      TILE_WIDTH = width / TILE_COUNT,
      MAX_HOLES_PER_FLOOR = 2;

  // Runtime variables
  var tiles = [],
      holes = [],
      y = 0;

  for(var i = 0; i < TILE_COUNT; ++i) {
    if((holes.length == 0 && i + 1 == TILE_COUNT) || (holes.length < MAX_HOLES_PER_FLOOR && Math.random() > 0.8)) {
      // TODO: Figure out if the above floor has stairs and use a new image
      tiles[i] = IMAGES.stairs[0];
      holes.push(new Hole(i * TILE_WIDTH, (i + 1) * TILE_WIDTH));
    } else if(prev_floor && prev_floor.hasHoleAt(i * TILE_WIDTH + 5, i * TILE_WIDTH + TILE_WIDTH - 5)) {
      tiles[i] = IMAGES.stairs[1];
    } else {
      tiles[i] = IMAGES.backgrounds[Math.round(Math.random())];
    }
  }

  this.render = function(ctx, offset) {
    var tile_offset = 0;
    y = offset;
    for(var i = 0; i < tiles.length; ++i) {
      ctx.drawImage(tiles[i], tile_offset, y - TILE_WIDTH * (420 / 640), TILE_WIDTH, TILE_WIDTH * (420 / 640));
      tile_offset += TILE_WIDTH;
    }
  };

  this.hasHoleAt = function(left, right) {
    for(var i = 0; i < holes.length; ++i) {
      if(holes[i].getDimensions().left < left && holes[i].getDimensions().right > right) {
        return true;
      }
    }
    return false;
  }

  this.getY = function() {
    return y;
  };

  return this;
};

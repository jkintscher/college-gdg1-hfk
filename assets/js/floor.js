var Floor = function(width) {
  // Constants
  var TILE_COUNT = 15,
      TILE_WIDTH = width / TILE_COUNT,
      MAX_HOLES_PER_FLOOR = 2;

  // Runtime variables
  var tiles = [],
      holes = [],
      y = 0;

  for(var i = 0; i < TILE_COUNT; ++i) {
    if((holes.length == 0 && i + 1 == TILE_COUNT) || (holes.length < MAX_HOLES_PER_FLOOR && Math.random() > 0.8)) {
      tiles[i] = false;
      holes.push(new Hole(i * TILE_WIDTH, (i + 1) * TILE_WIDTH));
    } else {
      tiles[i] = true;
    }
  }

  this.render = function(ctx, offset) {
    var tile_offset = 0,
        image;
    y = offset;
    for(var i = 0; i < tiles.length; ++i) {
      if(tiles[i]) {
        image = IMAGES.backgrounds[1];
      } else {
        image = IMAGES.stairs[0];
      }
      ctx.drawImage(image, tile_offset, y - TILE_WIDTH * (420 / 640), TILE_WIDTH, TILE_WIDTH * (420 / 640));
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

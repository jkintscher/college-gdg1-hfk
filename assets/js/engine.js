$(function() {

  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      floors = [],
      GLOBAL_OFFSET = 0,
      FLOOR_COUNT = 10,
      TILE_COUNT = 20,
      TILE_WIDTH = width / TILE_COUNT,
      FLOOR_HEIGHT = height / FLOOR_COUNT;

  var Floor = function() {
    var tiles = [];

    var generateFloor = function() {
      var holes = 0;
      for(var i = 0; i < TILE_COUNT; ++i) {
        tiles[i] = !(holes < 2 && Math.random() > 0.8);
        if(!tiles[i]) {
          holes++;
        }
      }
    };

    generateFloor();

    this.render = function(offset) {
      var tile_offset  = 0;
      ctx.beginPath();
      for(var i = 0; i < tiles.length; ++i) {
        ctx.moveTo(tile_offset, offset);
        tile_offset += TILE_WIDTH;
        if(tiles[i]) {
          ctx.lineTo(tile_offset, offset);
        }
      }
      ctx.stroke();
    }

    return this;
  };

  var render = function() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 6;

    for(var i = 0; i < floors.length; ++i) {
      floors[i].render(GLOBAL_OFFSET + FLOOR_HEIGHT * (i + 1));
    }
  };

  var init = function() {
    for(var i = 0; i < FLOOR_COUNT; ++i) {
      floors.push(new Floor());
    }

    setInterval(function() {
      GLOBAL_OFFSET--;
      if((GLOBAL_OFFSET % FLOOR_HEIGHT) == 0) {
        floors.push(new Floor());
      }
      render();
    }, 24);
  };

  init();
});

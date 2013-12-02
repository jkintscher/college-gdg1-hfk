$(function() {

  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      floors = [],
      FLOOR_COUNT = 10,
      TILE_COUNT = 20,
      TILE_WIDTH = width / TILE_COUNT,
      FLOOR_HEIGHT = height / FLOOR_COUNT;

  var generateFloor = function() {
    var floor = [],
        holes = 0;
    for(var i = 0; i < TILE_COUNT; ++i) {
      floor[i] = !(holes < 2 && Math.random() > 0.8);
      if(!floor[i]) {
        holes++;
      }
    }
    return floor;
  };

  var render = function() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 6;

    for(var i = 0; i < floors.length; ++i) {
      renderFloor(i, floors[i]);
    }
  };

  var renderFloor = function(floor, tiles) {
    var floor_offset = FLOOR_HEIGHT * floor,
        tile_offset  = 0;
    ctx.beginPath();

    for(var i = 0; i < tiles.length; ++i) {
      ctx.moveTo(tile_offset, floor_offset);
      tile_offset += TILE_WIDTH;

      if(tiles[i]) {
        ctx.lineTo(tile_offset, floor_offset);
      }

    }
    ctx.stroke();
  }

  var init = function() {
    for(var i = 0; i < FLOOR_COUNT; ++i) {
      floors.push(generateFloor());
    }

    setInterval(render, 24);
  };

  init();
});

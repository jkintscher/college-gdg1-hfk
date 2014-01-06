$(function() {
  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      floors = [],
      player_1,
      GLOBAL_OFFSET = 0,
      FLOOR_COUNT = 10,
      TILE_COUNT = 20,
      TILE_WIDTH = width / TILE_COUNT,
      FLOOR_HEIGHT = height / FLOOR_COUNT,
      PLAYER_SPEED = 12;

  var Floor = function() {
    var tiles = [],
        holes = 0,
        y = 0;

    for(var i = 0; i < TILE_COUNT; ++i) {
      tiles[i] = !(holes < 2 && Math.random() > 0.8);
      if(!tiles[i]) {
        holes++;
      }
    }

    this.render = function(offset) {
      y = offset;
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

    this.getY = function() {
      return y;
    };

    return this;
  };

  var Player = function(start_floor, left_key, right_key, color) {
    var floor = start_floor,
        x = width / 2,
        y = 100;

    $(document.body).keydown(function(evt) {
      if(evt.which == left_key) {
        x -= PLAYER_SPEED;
      } else if(evt.which == right_key) {
        x += PLAYER_SPEED;
      }
    });

    this.render = function() {
      y = floor.getY();
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
    }

    this.getPosition = function() {
      return {
        x: x,
        y: y
      };
    }

    return this;
  };

  var render = function() {
    GLOBAL_OFFSET--;
    if((GLOBAL_OFFSET % FLOOR_HEIGHT) == 0) {
      GLOBAL_OFFSET = 0;
      delete floors.shift();
      floors.push(new Floor());
    }

    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 6;

    for(var i = 0; i < floors.length; ++i) {
      floors[i].render(GLOBAL_OFFSET + FLOOR_HEIGHT * (i + 1));
    }

    player_1.render();

    requestAnimationFrame(render);
  };

  var init = function() {
    for(var i = 0; i < FLOOR_COUNT; ++i) {
      floors.push(new Floor());
    }

    player_1 = new Player(floors[6], 37, 39, 'green');

    render();
  };

  init();
});

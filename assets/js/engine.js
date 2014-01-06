$(function() {
  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      staircase,
      player;

  var Staircase = function(width, height) {
    var FLOOR_COUNT  = 10,
        FLOOR_HEIGHT = height / FLOOR_COUNT,
        floors = [],
        offset = 0;

    for(var i = 0; i < FLOOR_COUNT; ++i) {
      floors.push(new Floor());
    }

    this.getStartFloor = function() {
      return floors[floors.length / 2 - 1];
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
      floors.push(new Floor());
    };

    this.render = function() {
      offset--;
      if((offset % FLOOR_HEIGHT) == 0) {
        offset = 0;
        this.appendFloor();
      }

      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = 6;

      for(var i = 0; i < floors.length; ++i) {
        floors[i].render(offset + FLOOR_HEIGHT * (i + 1));
      }

    };
  };

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

  var Floor = function() {
    var TILE_COUNT = 15,
        TILE_WIDTH = width / TILE_COUNT,
        MAX_HOLES_PER_FLOOR = 2,
        tiles = [],
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

    this.render = function(offset) {
      y = offset;
      var tile_offset = 0;
      ctx.beginPath();
      for(var i = 0; i < tiles.length; ++i) {
        ctx.moveTo(tile_offset, offset);
        tile_offset += TILE_WIDTH;
        if(tiles[i]) {
          ctx.lineTo(tile_offset, offset);
        }
      }
      ctx.stroke();
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

  var Player = function(start_floor, left_key, right_key, color) {
    var BASE_SPEED = 12,
        FALL_SPEED =  8,
        WIDTH  = 20,
        HEIGHT = 20,
        speed = 0,
        floor = start_floor,
        x = width / 2,
        y;

    $(document.body).keydown(function(evt) {
      if(evt.which == left_key) {
        move(-1);
      } else if(evt.which == right_key) {
        move(1);
      }
      speed += 0.75;
    });

    $(document.body).keyup(function(evt) {
      speed = 0;
    });

    var move = function(direction) {
      var new_x = x + (BASE_SPEED + speed) * direction;
      if(new_x > 0 && new_x < width) {
        x = new_x;
      }
      if(floor.hasHoleAt(x, x + WIDTH)) {
        floor = staircase.getNextFloor(floor);
      }
    };

    this.render = function() {
      var offset = HEIGHT + ctx.lineWidth / 2;
      if((floor.getY() - offset) > y) {
        y += FALL_SPEED;
      } else {
        y = floor.getY() - offset;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, WIDTH, HEIGHT);
    };

    this.getPosition = function() {
      return {
        x: x,
        y: y
      };
    };

    return this;
  };

  var render = function() {
    staircase.render();
    player.render();

    if(player.getPosition().y > 1) {
      requestAnimationFrame(render);
    } else {
      if(confirm("You lose! Play again?")) {
        window.location.reload();
      }
    }
  };

  var init = function() {
    staircase = new Staircase(width, height);
    player = new Player(staircase.getStartFloor(), 37, 39, 'green');
    render();
  };

  init();
});

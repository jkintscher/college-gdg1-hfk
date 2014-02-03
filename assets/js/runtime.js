var Runtime = (function() {
  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      level,
      floors,
      frame,
      staircase,
      player;

  $(document.body).on('game:change-floor', function() {
    floors++;
    if(floors % 10 === 0) {
      $(document.body).trigger('game:change-level');
    }
  });

  $(document.body).on('game:change-level', function() {
    level++;
    staircase.setSpeed(1.5 * level);
  });

  return {
    render: function() {
      staircase.render(ctx);
      player.render(ctx);

      if(player.getPosition().y > 1) {
        frame = requestAnimationFrame(Runtime.render);
      } else {
        alert('You lose!');
      }
    },

    init: function() {
      level  = 1;
      floors = 0;
      staircase = new Staircase(width, height);
      player    = new Player(staircase, width, 37, 39);
      Runtime.render();
    },

    stop: function() {
      window.cancelAnimationFrame(frame);
    },

    getFloors: function() {
      return floors;
    },
    getLevel: function() {
      return level;
    }
  };

})();

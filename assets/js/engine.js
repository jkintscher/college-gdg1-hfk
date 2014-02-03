var IMAGES_PATH = './assets/images/',
    get_image = function(path) {
      var img = new Image();
      img.src = IMAGES_PATH + path + '.png';
      return img;
    },
    IMAGES = {
      backgrounds: [
        get_image('background-1'),
        get_image('background-2')
      ],
      stairs: [
        get_image('stairs-top'),
        get_image('stairs-bottom')
      ],
      character: {
        left:  [
          get_image('character-left-1'),
          get_image('character-left-2')
        ],
        right: [
          get_image('character-right-1'),
          get_image('character-right-2')
        ]
      }
    };

$(function() {
  var canvas = $('#canvas'),
      ctx    = canvas[0].getContext('2d'),
      width  = canvas.width(),
      height = canvas.height(),
      level,
      floors,
      frame,
      staircase,
      player;

  var render = function() {
    staircase.render(ctx);
    player.render(ctx);

    if(player.getPosition().y > 1) {
      frame = requestAnimationFrame(render);
    } else {
      alert('You lose!');
    }
  };

  var update_counters = function() {
    $('.counters .floors').text(floors);
    $('.counters .level' ).text(level);
  };

  var init = function() {
    level  = 1;
    floors = 0;
    update_counters();
    staircase = new Staircase(width, height);
    player    = new Player(staircase, width, 37, 39);
    render();
  };

  $(document.body).on('game:change-floor', function() {
    floors++;
    update_counters();
    if(floors % 10 === 0) {
      $(document.body).trigger('game:change-level');
    }
  });

  $(document.body).on('game:change-level', function() {
    level++;
    staircase.setSpeed(1.5 * level);
    update_counters();
  });

  $('#start-game').click(function() {
    window.cancelAnimationFrame(frame);
    init();
  });

  $('#pause-game').click(function() {
    window.cancelAnimationFrame(frame);
  });

  $('#resume-game').click(function() {
    render();
  });

});

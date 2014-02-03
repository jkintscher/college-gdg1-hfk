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
      staircase,
      player;

  var render = function() {
    staircase.render(ctx);
    player.render(ctx);

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
    player = new Player(staircase, width, 37, 39, 'green');
    render();
  };

  init();
});

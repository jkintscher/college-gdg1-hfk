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
  var update_counters = function() {
    $('.counters .floors').text(Runtime.getFloors());
    $('.counters .level' ).text(Runtime.getLevel());
  };

  $(document.body).on('game:change-floor', update_counters);
  $(document.body).on('game:change-level', update_counters);

  $('#start-game').click(function() {
    Runtime.stop();
    Runtime.init();
  });

  $('#pause-game').click(function() {
    Runtime.stop();
  });

  $('#resume-game').click(function() {
    Runtime.render();
  });

});

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

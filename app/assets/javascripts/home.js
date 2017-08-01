(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    var parallax = document.querySelectorAll(".parallax");
    var viewheight = window.innerHeight;
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
        elBackgrounPos = "50% " + (100 + (windowYOffset / viewheight * speed * 100)) + "%";

      console.log(elBackgrounPos);
      el.style.backgroundPosition = elBackgrounPos;

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        var newOpacity = 1.0 - (windowYOffset / viewheight * 2);
        el.style.opacity = newOpacity
      });

    });
  };

})();

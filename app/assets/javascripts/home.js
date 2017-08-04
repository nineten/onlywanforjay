(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    var parallax = document.querySelectorAll(".parallax");
    var viewheight = window.innerHeight;
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
        elBackgrounPos = "50% " + (100 + (windowYOffset / viewheight * speed * 100)) + "%";

      el.style.backgroundPosition = elBackgrounPos;

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        var newOpacity = 1.0 - (windowYOffset / viewheight * 2);
        el.style.opacity = newOpacity
      });

    });
  };

})();

$(document).ready(function() {
  $('.labelholder').labelholder();

  $('#rsvp_no_of_guests').change(function(e) {
    var value = $(this).val();

    if (value > 1) {
      $("#additional-guests").show();
      $("#additional-guests-names").html("");

      for (i = 1; i < value; i++) {
        var input_field = "<div class='form-group labelholder' data-label='ADDITIONAL GUEST NAME " + i + "'><input placeholder='Additional guest name " + i + "' class='form-control input-lg' type='text' name='rsvp[names_of_additional_guests][]' id='rsvp_names_of_additional_guests[" + i + "]'></div>";
        $("#additional-guests-names").append(input_field);
      }

      $("#additional-guests-names > .labelholder").labelholder();
      $("#rsvp_no_of_baby_chairs_needed").attr({max: value - 1});
    } else {
      $("#additional-guests").hide();
      $("#additional-guests-names").html("");
    }
  });
});

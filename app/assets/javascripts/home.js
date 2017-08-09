(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    // parallax 1
    var parallax = document.querySelectorAll(".parallax");
    var viewheight = window.innerHeight;
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
        elBackgrounPos = "50% " + (100 + (windowYOffset / viewheight * speed * 100)) + "%";

      el.style.backgroundPosition = elBackgrounPos;

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        var newOpacity = 1.0 - (windowYOffset / viewheight * 2);
        el.style.opacity = newOpacity;
      });

    });

    // parallax 2
    var parallax2 = document.querySelectorAll(".parallax2");
    [].slice.call(parallax2).forEach(function(el,i){

      var elBoundingRect = el.getBoundingClientRect();
      var divPos = Math.max(0, (elBoundingRect.height - elBoundingRect.top - viewheight * 0.2));
      var elBackgrounPos = "50% " + (50 + (divPos/ (viewheight*1.2) * speed * 100)) + "%";

      el.style.backgroundPosition = elBackgrounPos;

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        var newOpacity = 0.0 + (divPos / (viewheight*1.2) * 2);
        el.style.opacity = newOpacity;
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

  // GOOGLE MAPS
  var mapStyle = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#81d8d0"
        },
        {
          "weight": "1.00"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "saturation": "-100"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#fcfcfc"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#fcfcfc"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#dddddd"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#dddddd"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#81d8d0"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#81d8d0"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dddddd"
        },
        {
          "visibility": "simplified"
        }
      ]
    }
  ]
  var handler = Gmaps.build('Google');
  handler.buildMap({ 
    provider: {
      scrollwheel: false,
      styles: mapStyle
    }, 
    internal: {
      id: 'map'
    }
  }, function(){
    markers = handler.addMarkers([
      {
        lat: 1.252107, 
        lng: 103.817504,
        infowindow: 'Jayden & Wanli Wedding'
      }
    ]);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
    handler.getMap().setZoom(16);
  });

});

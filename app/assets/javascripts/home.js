(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;

  window.onscroll = function(){
    var viewheight = window.innerHeight;
    var viewwidth= window.innerWidth;
    var windowYOffset = window.pageYOffset;
    var moveRatio = windowYOffset / viewheight;

    // parallax 1
    var backgroundOffset1 = windowYOffset * speed;
    var backgrounPos1 = "50% calc(100% - " + (backgroundOffset1) + "px)";
    var newOpacity1 = Math.max((1.0 - moveRatio * 2), 0.0);
    var parallax = document.querySelectorAll(".parallax");
    [].slice.call(parallax).forEach(function(el,i){

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        if (el.className == "background") {
          el.style.backgroundPosition = backgrounPos1;
          if (moveRatio > 1.1) {
            el.style.display = 'none';
          } else {
            el.style.display = 'block';
          }
        } else {
          el.style.opacity = newOpacity1;
        }
      });

    });

    // parallax 2
    var bgViewOffset2 = 0;
    var backgroundHeight2 = viewheight;
    if (viewwidth > 991) {
      bgViewOffset2 = viewheight * 0.2;
      backgroundHeight2 = viewheight * 1.2;
    }
    var parallax2 = document.querySelectorAll(".parallax2");
    [].slice.call(parallax2).forEach(function(el,i){
      var elBoundingRect = el.getBoundingClientRect();
      var divPos = Math.max(0, (elBoundingRect.height - elBoundingRect.top - bgViewOffset2));
      var backgroundOffset2 = (backgroundHeight2 - divPos) * speed;
      var backgroundPos2 = "50% calc(100% + " + (backgroundOffset2) + "px)";
      var newOpacity2 = 0.0 + (divPos / (viewheight*1.2) * 2);

      var elc = el.children;
      Array.from(elc).forEach(function(el, i) {
        if (el.className == "background") {
          el.style.backgroundPosition = backgroundPos2;
        } else {
          el.style.opacity = newOpacity2;
        }
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
        var input_field = "<div class='form-group labelholder' data-label='ADDITIONAL GUEST NAME " + i + "'><input placeholder='Additional guest name " + i + "' class='form-control input-lg' type='text' name='rsvp[names_of_additional_guests_list][]' id='rsvp_names_of_additional_guests_list[" + i + "]'></div>";
        $("#additional-guests-names").append(input_field);
      }

      $("#additional-guests-names > .labelholder").labelholder();
      $("#rsvp_no_of_baby_chairs_needed").attr({max: value - 1});
    } else {
      $("#additional-guests").hide();
      $("#additional-guests-names").html("");
    }
  });

  // FORM SUBMISSION
  var transitionToRsvpSuccess = function() {
    $('html, body').animate({
        scrollTop: $("#middle-section").offset().top
    }, 100);
    $("#rsvp-form").animate({ 'opacity': '0' }, 500,function() {
      $(this).hide();
      $("#rsvp-form-success").toggleClass("hidden", false);
      $("#rsvp-form-success").toggleClass("fadeIn", true);
      var e = document.createEvent("UIEvents");
      e.initUIEvent("scroll", true, true, window, 1);
      window.dispatchEvent(e);
    });
  }

  $("#new_rsvp").submit(function(e){
    e.preventDefault();
    transitionToRsvpSuccess();
    return false;
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
        },
        {
          "lightness": "-30"
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

function initMap() {
  let styledMapType = new google.maps.StyledMapType(
    [
      {
        'featureType': 'transit',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'hue': '#cc3300',
            'saturation': 0,
          },
        ],
      },
      {
        elementType: 'geometry',
        stylers: [
          {
            'saturation': -100,
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'labels.icon',
        stylers: [
          {
            saturation: -100,
          },
        ],
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'saturation': -100,
          },
        ],
      },
      {
        'featureType': 'road',
        'elementType': 'labels.icon',
        stylers: [
          {
            'saturation': -100,
          },
        ],
      },
      {
        'featureType': 'poi.business',
        'elementType': 'labels.icon',
        'stylers': [
          {
            visibility: 'off',
          },
        ],
      },
      {
        'elementType': 'labels.text.fill',
        stylers: [
          {
            'saturation': -100,
          },
        ],
      },
    ]
);

  let myLatLng = { lat: 35.713757, lng: 139.778793 };

  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng,
    mapTypeControl: false,
    scrollwheel: false,
  });

  let image = '/asset/img/marker.png';
  let marker = new google.maps.Marker({
    position: myLatLng,
    map,
    icon: image,
  });
  map.mapTypes.set('styled map', styledMapType);
  map.setMapTypeId('styled map');
}


$(() => {
  var images_slider = $(".slider_with_button img");
  var images_detail = $(".img-ul li")
  var output = '<ul id="dots">';

  for (var i = 0; i < images_slider.length; i++) {
    if (i === 0) {
      $(".slider_with_button img").eq(i).addClass('current 1');
      $(".img-ul li").eq(i).addClass('current 1');
      output += '<li class="selected 1">';

    } else {
      $(".slider_with_button img").eq(i).addClass(i);
      $(".img-ul li").eq(i).addClass(i);
      output += '<li class="' + [i + 1] + '">';
    }

    output += '</li>';
  }

  output += '</ul>';

  $("#prev").after(output);

  $('#next').click(newImage);
  $('#prev').click(newImage);
  $('#dots li').click(selectImg);

  setInterval(function () { moveImg() }, 8000);

});

function checkIsCurrent() {
  if ($('#img-ul li').not('current')) {
    $('.img-ul li').css({ opacity: 0 });
  }
}


function selectImg() {

  $('#dots li.selected').removeClass('selected');
  let q = this.className;
  q--;

  let curPhoto = $('.slider_with_button img.current');
  let nextPhoto = $('.slider_with_button img').eq(q);

  let curDetail = $('.img-ul li.current');
  let nextDetail = $('.img-ul li').eq(q);

  $(this).addClass('selected');

  curPhoto.removeClass('current').addClass('previous');
  nextPhoto.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 }, 1000,
    () => {
      curPhoto.removeClass('previous');
    });

  curDetail.removeClass('current').addClass('previous');
  nextDetail.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 },
    () => {
      curDetail.removeClass('previous');
    });
  checkIsCurrent();
}

function newImage() {
  let changePhoto = this.id;

  let curDot = $('#dots li.selected').removeClass('selected');
  let curPhoto = $('.slider_with_button img.current');
  let curDetail = $('.img-ul li.current');

  if (changePhoto == 'next') {
    var nextPhoto = curPhoto.next();
    var nextDot = curDot.next();
    var nextDetail = curDetail.next();


    if (nextPhoto.length == 0) {
      nextPhoto = $('.slider_with_button img:first');
      nextDot = $('#dots li:first');
      nextDetail = $('.img-ul li:first');
    }

  } else if (changePhoto == 'prev') {
    var nextPhoto = curPhoto.prev();
    var nextDot = curDot.prev();
    var nextDetail = curDetail.prev();

    if (nextPhoto.length == 0) {
      nextPhoto = $('.slider_with_button img:last');
      nextDot = $('#dots li:last');
      nextDetail = $('.img-ul li:last');
    }
  }

  nextDot.addClass('selected');

  curPhoto.removeClass('current').addClass('previous');
  nextPhoto.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 }, 1000,
    () => {
      curPhoto.removeClass('previous');
    });

  curDetail.removeClass('current').addClass('previous');
  nextDetail.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 },
    () => {
      curDetail.removeClass('previous');
    });
  checkIsCurrent();
}

function moveImg() {
  let curDot = $('#dots li.selected').removeClass('selected');
  let curPhoto = $('.slider_with_button img.current');
  let nextPhoto = curPhoto.next();
  let nextDot = curDot.next();
  let curDetail = $('.img-ul li.current');
  let nextDetail = curDetail.next();
  if (nextPhoto.length == 0) {
    nextPhoto = $('.slider_with_button img:first');
    nextDot = $('#dots li:first');
    nextDetail = $('.img-ul li:first');
  }
  nextDot.addClass('selected');
  curPhoto.removeClass('current').addClass('previous');
  nextPhoto.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 }, 1000,
    () => {
      curPhoto.removeClass('previous');
    });

  curDetail.removeClass('current').addClass('previous');
  nextDetail.css({ opacity: 0.0 }).addClass('current').animate({ opacity: 1.0 },
    () => {
      curDetail.removeClass('previous');
    });
  checkIsCurrent();
}

$(() => {
  var imageHeight = $('.slider_with_button').children('img').height();
  $('.slider_with_button').css('height',imageHeight);
  var fullScreenHeight = $('.contentPage').height();
  $('.concept').css('height',fullScreenHeight);
});

$(window).resize(() => {
  var imageHeight = $('.slider_with_button').children('img').height();
  $('.slider_with_button').css('height',imageHeight);
  var fullScreenHeight = $('.contentPage').height();
  $('.concept').css('height',fullScreenHeight);
});

// Add/Remove Class open for nav-icon.
$(document).ready(() => {
  $('.nav-button').click(function(){
    $(this).toggleClass('open');
  });
});

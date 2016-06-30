
'use strict';

// if image is landscape, tag it
function addLandscape(imgElement) {
  if (imgElement.height < imgElement.width)
    imgElement.classList.add('landscape');
}

// attach landscape class on image load event
function landscapify(imgSelector) {
  $(imgSelector).on('load', function() {
    addLandscape(this);
  }).each(function() {
    if (this.complete)
      $(this).load();
  });
}

// square images
function square() {
  $('.square').each(function() {
    $(this).css('height', $(this)[0].getBoundingClientRect().width + 'px');
  });
}

function imageFadeIn(imgSelector) {
  $(imgSelector).on('load', function() {
    $(this).addClass('loaded');
  }).each(function() {
    if (this.complete)
      $(this).load();
  });
}

/**
 * scroll animation to element on page
 * @param  {$element}  Jquery element
 * @return {void}
 */
function scrollToElement(element) {
  $('html, body').animate({
    scrollTop: element.offset().top
  }, 300);
}

/**
 * Returns the current page
 * @return {String} the current page: test, train or use
 */
function currentPage() {
  var href = $(window.location).attr('href');
  return href.substr(href.lastIndexOf('/'));
}

/**
 * Returns the next hour as Date
 * @return {Date} the next hour
 */
function nextHour() {
  var oneHour = new Date();
  oneHour.setHours(oneHour.getHours() + 1);
  return oneHour;
}

/**
 * Resizes an image
 * @param  {String} image   The base64 image
 * @param  {int} maxSize maximum size
 * @return {String}         The base64 resized image
 */
function resize(image, maxSize) {
  var c = window.document.createElement('canvas'),
    ctx = c.getContext('2d'),
    ratio = image.width / image.height;

  c.width = (ratio > 1 ? maxSize : maxSize * ratio);
  c.height = (ratio > 1 ? maxSize / ratio : maxSize);

  ctx.drawImage(image, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg');
}

$(document).ready(function () {

  // tagging which images are landscape
  landscapify('.use--example-image');
  landscapify('.use--output-image');
  landscapify('.train--bundle-thumb');
  landscapify('.test--example-image');
  landscapify('.test--output-image');

  square();
  imageFadeIn('.square img');

  $(window).resize(square);

  //tab listener
  $('.tab-panels--tab').click(function(e){
    e.preventDefault();
    if (!$(this).hasClass('disabled')) {
      var self = $(this);
      var newPanel = self.attr('href');
      if (newPanel !== currentPage())
        window.location = newPanel;
    }
  });

  $.ajaxSetup({
    headers: {
      'csrf-token': $('meta[name="ct"]').attr('content')
    }
  });
});

$(document).ready(function(){
 $('.main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.carousel'
  });
  $('.carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.main',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });
});
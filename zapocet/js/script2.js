var slideNum = 8;

$(document).ready(function(){
    $('.carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 3
      });

      //button  add to carousel
      $('#add').on('click', function() {
        slideNum++;
        $('.carousel').slick('slickAdd','<div><h2>' + slideNum + '</h2></div>');
      });
      
      //button remove from carousel
      $('#remove').on('click', function() {
        $('.carousel').slick('slickRemove',slideNum - 1);
        if (slideNum !== 0){
          slideNum--;
        }
      });

      //button play carousel
      $('#turnOn').on('click', function() {      
        $('.carousel').slick('slickSetOption', 'autoplaySpeed', 1000);
        $('.carousel').slick('slickPlay');

      });

      //button pause carousel
      $('#turnOff').on('click', function() {
        $('.carousel').slick('slickPause');
      });
});
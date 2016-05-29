    
//scrollTO

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}





    /*-------------------------------------------------*/
    /* =  browser detect
    /*-------------------------------------------------*/
    try {
        $.browserSelector();
        // Adds window smooth scroll on chrome.
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    }















/*PRELOADER*/

jQuery(document).ready(function() {  
// site preloader -- also uncomment the div in the header and the css style for #preloader
$(window).load(function(){
  $('#preloader').delay(2000).fadeOut('slow',function(){$(this).remove();});
});

});





/*VIEWPORT*/

jQuery(document).ready(function() {
    jQuery('.viewport').addClass("view_hidden").viewportChecker({

        classToAdd: 'visible animated  fadeIn  ',
        offset: 120
       });
   
});







jQuery(document).ready(function() { 

var winheight = $("html").height();
var rwinheight = $(window).height();
var navheight= $("nav").height();

$(".maintitle").css("margin-top",rwinheight /2);

//##### parallax init
$('#scene').parallax();




//### ICONS ACTIONS
$(".iconcluster").click(function(){


//scroll to where it needs to be
$('body').scrollTo(".iconcluster");


$(".mainspan").css("display", "none");
    
$(this).addClass("center ");
$(".iconmain").addClass(" animated zoomIn").css("cursor","default").css("z-index",1);
$(" .innericon").addClass(" animated zoomIn").css("opacity",1);
$(".iconmain").css("z-index",2);

$(".iconsholder").children().not(".center").addClass("dissapear").delay(400).queue(function(next){
    $(this).css("display", "none");
    $(".mainspan").css("display", "none");

    next();
    $(".iconcluster").addClass("center2");
      $(".linkspecial").css("display","block");
      $(".iconmain").css("z-index",1);
});

});

   


//initialize carousel
//IQ carousel

$('.carousel').carousel({
    pause: true,
    interval: false
});


//general questions timer
$('.generalclock').ClassyCountdown({
    theme: "flat-colors-very-wide",
    end: $.now() + 300
});
    



});//#################end dready




//modal video is clicked
var action=function(){







};






//smooth scroll
jQuery(document).ready(function() {

 $(".scroll").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height();
         }else{
              dest=$(this.hash).offset().top + 300; 
         }
         //go to destination
         $('html,body').animate({scrollTop:dest}, 1000,'swing');
     });


});
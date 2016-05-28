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
var navheight= $("nav").height();



//##### parallax init
$('#scene').parallax();




//### ICONS ACTIONS
$(".iconcluster").click(function(){
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



$('.countdown').ClassyCountdown({
    theme: "flat-colors-very-wide",
    end: $.now() + 60,
    onEndCallback: function(){
        //alert("asdsadasd");
    }
});
         


});//end dready
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

        classToAdd: 'visible animated  slideInUp  ',
        offset: 120
       });
   
});







jQuery(document).ready(function() { 


//##### parallax init
$('#scene').parallax();




});//end dready
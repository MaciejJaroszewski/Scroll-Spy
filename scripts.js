var itemsArray = [];
// ------------
// functions
// ------------
function adjustPosition () {
  var windowHeight = $(window).height();
  if(windowHeight>($('ul.scroll-spy').height())){
    $('ul.scroll-spy').css("top", windowHeight/2+"px");
// problem with resize scrollspy to bigger size when resized    
  } else {
    $('li.scroll-item').css("marginTop", "5px");
    $('li.scroll-item:last-child').css("marginBottom", "5px");
  }

  
}
//------------------------



// -- initialize scrollSpy
$('.section-item').each(function(index){
  itemsArray[index] = index;
  $(this).data("data-index", "section-"+index);
});

$(".container").prepend('<ul class="scroll-spy"></ul>');

for(i=0;i<itemsArray.length; i++){
  $('ul.scroll-spy').append('<li class="scroll-item"></li>');
}
$('li.scroll-item').each(function(index){
  $(this).data("data-destination", "section-"+index);
});

adjustPosition();




// during resize window
$(window).resize(function(){
  adjustPosition();
});

// click action
$('li.scroll-item').click(function(){
  var destination = $(this).data("data-destination");
  $('li.scroll-item').each(function(){
    $(this).removeClass("active");
  });
  $(this).addClass("active");
  $('.section-item').each(function(){
    if(($(this).data("data-index"))==destination){
      var position = $(this).offset().top;
      $("html, body").animate({
        scrollTop: position}, 800);
    }
  });
});

// during scrolling

$(window).scroll()


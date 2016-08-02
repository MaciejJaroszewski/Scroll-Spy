var itemsArray = [];
var windowPosition;
var windowHeight;
var sectionsScopes = [];
var actualSection;
// ------------
// functions
// ------------
function adjustPosition(){
  windowHeight = $(window).height();
  if(windowHeight>($('ul.scroll-spy').height())){
    $('ul.scroll-spy').css("top", windowHeight/2+"px");
// problem with resize scrollspy to bigger size when resized    
  } else {
    $('li.scroll-item').css("marginTop", "5px");
    $('li.scroll-item:last-child').css("marginBottom", "5px");
  }  
}
function getCurrentWindowPosition(){
  windowPosition = $(window).scrollTop();
  return windowPosition;
}
function checkSectionScope(){
  $('.section-item').each(function(){
    var itemTop = $(this).offset().top;
    // adding offset to sections
    console.log(itemTop);
    sectionsScopes.push($(this).offset().top-100);
  });
  sectionsScopes.shift();
  sectionsScopes.push($(document).height());
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
checkSectionScope();



// during resize window
$(window).resize(function(){
  adjustPosition();
  checkSectionScope();
});

// click action
$('li.scroll-item').click(function(){
  var destination = $(this).data("data-destination");
  // $('li.scroll-item').each(function(){
  //   $(this).removeClass("active");
  // });
  // $(this).addClass("active");
  $('.section-item').each(function(){
    if(($(this).data("data-index"))==destination){
      var position = $(this).offset().top;
      $("html, body").animate({
        scrollTop: position}, 800);
    }
  });
});

// during scrolling

$(window).scroll(function(){
  getCurrentWindowPosition();
  $('li.scroll-item').each(function(){
    $(this).removeClass('active');
  });
  for(i=0;i<sectionsScopes.length;i++){
    if(windowPosition<sectionsScopes[i]){
      actualSection = i;
      $("li.scroll-item").each(function(){
        var destination = "section-"+actualSection;
        if($(this).data("data-destination")==destination){
          $(this).addClass("active");
        }
      })
      return;
    }
  }  
});


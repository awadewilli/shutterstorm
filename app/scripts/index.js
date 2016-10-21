console.log("Hello World!");

var $ = require('jquery');

$("#menu-icon").click(function(){
  $(".main-nav").slideToggle("fast");
});
$(window).resize(function(){
  if (window.matchMedia("(min-width: 767px)").matches){
    document.getElementById('main-nav').style.display='block';
  }
  else{
    document.getElementById('main-nav').style.display='none';
  }
});


$("document").ready(function(){
  setTimeout(dropIn,1200);
});

function dropIn(){
  $(".headline").animate({
        opacity: 1,
        top:"150px",
    },1000,function(){
      $(".headline-left").animate({
            opacity: 1,
            top:"300px",
            left:"5%"
        },1000,function(){
          $(".headline-right").animate({
                opacity: 1,
                top:"300px",
                right:"7%"
            },1000
            );
        }
        );
      }
    );
}

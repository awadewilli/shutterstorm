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

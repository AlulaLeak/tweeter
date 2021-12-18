$(document).ready(function() {
  
  $(".tweet-article").hover((e) => {
    $(".tweet-article").css("box-shadow", "5px 10px #888888");
  }, (e) => {
    $(".tweet-article").css("box-shadow", "");
  });

});

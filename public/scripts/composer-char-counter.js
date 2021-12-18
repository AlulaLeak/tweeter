$(document).ready(function() {
  
  $(".text-divider").keyup((e) => {

    let tweetLength = e.target.value.length;
    
    $(".counter").text(140 - tweetLength);

    if (tweetLength > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'white');
    }
  });
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function renderTweets(tweets) {
    let tweetArray = [];
    for (const tweet of tweets) {
      tweetArray.push(createTweetElement(tweet));
    }
    tweetArray = tweetArray.reverse();
    tweetArray = tweetArray.join('');
    $('.article-display').empty().append(tweetArray);
  }

  function createTweetElement(tweetObj) {

    return `
   <div class="full-tweet-border">
   <span class="tweet-article">
   <header class="tweet-head">
     <div>
     <img src="${tweetObj["user"]["avatars"]}" alt="avatar pic">
     ${tweetObj["user"]["name"]}
     </div>
     <div>
     ${tweetObj["user"]["handle"]}
     </div>
   </header>
   <p class="actual-tweet">
   ${tweetObj["content"]["text"]}
   </p>
   <footer class="tweet-foot">
     <span>
     ${timeago.format(tweetObj["created_at"])}
     </span>
     <span>
       <i class="fas fa-flag fl"></i>
       <i class="fas fa-retweet rt"></i>
       <i class="fas fa-heart hrt"></i>
     </span>
   </footer>
   </span>
   </div>`;
  }

  function loadTweets() {

    $.getJSON("http://localhost:8081/tweets", function(data) {
      renderTweets(data);
    });
  }

  loadTweets();

  $("#tweetform").validate({
    rules: {
      text: {
        required: true,
        minlength: 1,
        maxlength: 140
      }
    },
    messages: {
      tweet: {
        required: "Please provide a tweet",
        minlength: "Your tweet must be at least 1 characters long",
        maxlength: "Your tweet must be under 140 characters!"
      },
    },
    errorPlacement: function(error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.parents('#tweetform'));
      } else { // This is the default behavior
        error.insertAfter(element);
      }
    },
    submitHandler: function(form) {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(form).serialize(),
        success: function(result) {
          $('#tweetform').each(function() {
            this.reset();
          });
          loadTweets();
          console.log("The post was done successfully");
        },
        error: function(err) {
          console.log("There was an error posting to the Database", err);
        }
      });
      
      return false;
    }
  });
});
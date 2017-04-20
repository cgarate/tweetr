/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



/*var clickHandler= $("#carousel").data("events")['click'];

('#carousel').bind('mouseenter', function(){

    $("#carousel").data("events")['click']=null;

}).bind('mouseleave', function(){

    $("#carousel").data("events")['click']=clickHandler;

});*/




// Document Ready JQuery
$( document ).ready(function() {

  // Submit the form using jquery AJAX
  var $form = $('#new-tweet-form');

  $form.on('submit', function (event) {
    event.preventDefault();

    if ($(this).children("textarea").val().length === 0) {

      $("#flash-empty").show();

    } else if ($(this).children("textarea").val().length > 140)  {

      $("#flash-longer").show();

    } else {

      $("#flash-longer").hide();
      $("#flash-empty").hide();

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function (data, status, obj) {
          loadTweets();
        },
        error: function (obj1, e, obj2) {
          console.log(obj1);
          console.log(obj2);
          console.log(e);
        }
      });
    }

  });

  function renderTweets(tweets) {
    $articles = $("<div>");
    for (tweet in tweets) {
      $articles.append(createTweetElement(tweets[tweet]));
    }
    return $articles;
  };

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data, status, obj) {
        // Pass the data retrieved to the renderTweets function.
        $('#tweets-container').html("");
        $('#tweets-container').append(renderTweets(data));
      },
    });
  }

  function createTweetElement(tweetData) {
    $image = $('<img>').attr("src", tweetData.user.avatars.small);
    $avatar = $('<div>').addClass("user-avatar").append($image);
    $userName = $('<h2>').text(tweetData.user.name);
    $userHandle = $('<h5>').text(tweetData.user.handle);

    // Main Component
    $header = $('<header>').addClass("header").append($avatar, $userName, $userHandle);

    // Main Components
    $tweetContent = $('<p>').addClass("old-tweet-content").text(tweetData.content.text);

    $line = $('<hr>');
    $fontAwesomeFlag = $('<i>').addClass("fa fa-flag").attr("aria-hidden", "true");
    $fontAwesomeRetweet = $('<i>').addClass("fa fa-retweet").attr("aria-hidden", "true");
    $fontAwesomeHeart = $('<i>').addClass("fa fa-heart").attr("aria-hidden", "true");

    $iconFlag = $('<span>').append($fontAwesomeFlag);
    $iconRetweet = $('<span>').append($fontAwesomeRetweet);
    $iconHeart = $('<span>').append($fontAwesomeHeart);

    $created = $('<span>').text(tweetData.created_at);
    $divIcons = $('<div>').addClass("icon-container action-icons").append($iconFlag, $iconRetweet, $iconHeart);

    // Main Component
    $footer = $('<footer>').addClass("footer").append($line, $created, $divIcons);

    $article = $('<article>').addClass("old-tweet").append($header, $tweetContent, $footer);

    return $article;
  }

  // Load the tweets from the in memory DB.
  loadTweets();

  // Hide the tweeter form.
  $( "#new-tweet-container" ).slideUp("fast");

  $(".btn").on("click", function() {
    $( "#new-tweet-container" ).slideToggle("slow", function() {
      $( "#tweet-text" ).focus();
    })
  })

//Document ready ends
})
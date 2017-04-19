/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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
    $footer = $('<footer>').addClass("footer").append($created, $divIcons);

    $article = $('<article>').addClass("old-tweet").append($header, $tweetContent, $line, $footer);

    return $article;
  }


// Document Ready JQuery
$( function () {

  function renderTweets(tweets) {
    $articles = $("<div>");
    for (tweet in tweets) {
      $articles.append(createTweetElement(tweets[tweet]));
    }
    return $articles;
  };


  let $tweets = renderTweets(tweetData);
  console.log($tweets);
  // Test / driver code (temporary)
  $('#tweets-container').append($tweets); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  $( ".old-tweet" )
  .on( "mouseenter", function() {
    $( ".action-icons" ).css("display", "inline-block");
    $( ".old-tweet" ).css("opacity", 1);
  })
  .on( "mouseleave", function() {
    $( ".action-icons" ).css("display", "none");
    $( ".old-tweet" ).css("opacity", 0.7);
  });
});


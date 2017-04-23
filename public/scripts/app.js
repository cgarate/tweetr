/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Document Ready JQuery
$( document ).ready(function() {

  // Submit the form using jquery AJAX
  let $form = $('#new-tweet-form'); // Grab the form

  // Add event listener
  $form.on('submit', function (event) {
    event.preventDefault();

    // Validate an empty tweet, including empty spaces.
    if ($(this).children("textarea").val().trim().length === 0) {

      // Show flash message. Reset textarea to empty, set the cursor back in and reset the counter to 140.
      $("#flash-empty").show(400, () => { $("#flash-empty").fadeOut(3000, "linear"); });
      $( "#tweet-text" ).val("");
      $( "#tweet-text" ).focus();
      $( "#new-tweet-form .counter").text("140");

      // Validate for a longer than 140 chars tweet.
    } else if ($(this).children("textarea").val().length > 140)  {

      $("#flash-longer").show(400, () => { $("#flash-longer").fadeOut(3000, "linear"); });

      // All good apparently, post the tweet via ajax.
    } else {

      // In case flash messages are not hidden.
      $("#flash-longer").hide();
      $("#flash-empty").hide();

      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function (data, status, obj) {
          // reload tweets to include the new one and reset the new tweeter form.
          loadTweets();
          $( "#tweet-text" ).val("");
          $( "#tweet-text" ).focus();
          $( "#new-tweet-form .counter").text("140");
        },
        error: function (obj1, e, obj2) {
          //console.log(obj1);
          //console.log(obj2);
          console.log(e);
        }
      });
    }

  });

  // Receives an object with the data of one tweet and integrates with the DOM elements needed to display it on the browser.
  function createTweetElement(tweetData) {
    $image = $('<img>').attr("src", tweetData.user.avatars.small);
    $avatar = $('<div>').addClass("user-avatar").append($image);
    $userName = $('<h2>').text(tweetData.user.name);
    $userHandle = $('<h5>').text(tweetData.user.handle);

    // Main Component to be added to <article> below.
    $header = $('<header>').addClass("header").append($avatar, $userName, $userHandle);

    // Main Component to be added to <article> below.
    $tweetContent = $('<p>').addClass("old-tweet-content").text(tweetData.content.text);

    $line = $('<hr>');
    $fontAwesomeFlag = $('<i>').addClass("fa fa-flag").attr("aria-hidden", "true");
    $fontAwesomeRetweet = $('<i>').addClass("fa fa-retweet").attr("aria-hidden", "true");
    $fontAwesomeHeart = $('<i>').addClass("fa fa-heart").attr("aria-hidden", "true");
    $likeLink = $('<a>').attr("data-tweetID", tweetData.myID).append($fontAwesomeHeart);

    $icons = $('<span>').append($fontAwesomeFlag).append($fontAwesomeRetweet).append($likeLink).attr("data-tweetID", tweetData.myID);
    //$iconRetweet = $('<span>').append($fontAwesomeRetweet);
    //$iconHeart = $('<span>').append($fontAwesomeHeart);

    // Do some massaging to the dates so we can convert the created_at to days ago format.
    let dateNow = new Date();
    let dateNowMs = dateNow.setMilliseconds(0);
    let diffMs = dateNowMs - tweetData.created_at; // Get the range of milliseconds between the current date and the created_at datapoint.
    let daysPassed = Math.round(diffMs / (60*60*24*1000)); // Convert to days, it's ok to show 0, I won't go to hours at this point.
    daysPassed += " day(s) ago." // Create a string to save to the markup.

    $created = $('<span>').text(daysPassed);
    $likes = $('<span>').attr("data-tweetID", tweetData.myID).text(tweetData.likes);
    $divIcons = $('<div>').addClass("icon-container action-icons").append($icons, $likes);

    // Main Component to be added to <article> below.
    $footer = $('<footer>').addClass("footer").append($line, $created, $divIcons);

    $article = $('<article>').addClass("old-tweet").append($header, $tweetContent, $footer);

    return $article;
  }

  // This receives an array with all the tweets, loops over them and creates <articles> to be displayed in the page.
  function renderTweets(tweets) {
    $articles = $("<div>");
    const sortNewestFirst = (a, b) => b.created_at - a.created_at;
    tweets.sort(sortNewestFirst);
    for (tweet in tweets) {
      $articles.append(createTweetElement(tweets[tweet]));
    }
    return $articles;
  };

  // Gets the tweets from the DB, cleans the element that contains them and adds the articles created by renderTweets.
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
  };

  // Load the tweets from the DB.
  loadTweets();

  // Hide the tweeter form.
  $( "#new-tweet-container" ).hide(5);

  $(".btn").on("click", function() {
    $( "#new-tweet-container" ).slideToggle("slow", function() {
      $( "#tweet-text" ).focus();
    })
  })

  // Add or substract a like to the database
  $( "#tweets-container" ).on("click", 'a', (event) => {
    $.ajax({
        url: '/tweets/likes/',
        method: 'POST',
        data: {myID: event.currentTarget.attributes["0"].nodeValue},
        success: function (data, status, obj) {
          loadTweets();
        },
        error: function (obj1, e, obj2) {
          console.log(obj1);
          console.log(obj2);
          console.log(e);
        }
      });
  });

//Document ready ends
})
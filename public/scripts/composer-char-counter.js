
// document ready.
$(function () {
  $( ".new-tweet textarea" ).on("keyup", function(event) {
    var theTextArea = $( this );
    var theCounter = $( this ).parent()[0].lastElementChild;
    theCounter.innerText = 140 - theTextArea[0].textLength;
    if (theCounter.innerText < 0) {
      $(theCounter).css("color", "#ff0000");
    } else {
      $(theCounter).css("color", "#000000");
    }
  });

})


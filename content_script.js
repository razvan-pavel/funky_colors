function rand_string() {
  var text = '';
  var possible = 'ABCDEF0123456789';

  for(var i=0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function get_funky() {
  $("*").each(function() {
    if($(this).attr("data-funkyclear") == undefined) {
      if($(this).attr("style") != undefined) {
        if($(this).attr("data-funkybg") == undefined && $(this).css("background").length > 0)
          $(this).attr("data-funkybg", $(this).css("background"));

        if($(this).attr("data-funkycl") == undefined && $(this).css("color").length > 0)
          $(this).attr("data-funkycl", $(this).css("color"));
      } else
        $(this).attr("data-funkyclear", "DO IT");
    }

    $(this).css("background", "#"+rand_string()).css("color", "#"+rand_string());
  });
}

function stop_funky() {
  $("*").each(function() {
    if($(this).attr("data-funkyclear") != undefined)
      $(this).css("color", "").css("background", "");

    if($(this).attr("data-funkybg") != undefined)
      $(this).css("background", $(this).attr("data-funkybg"));

    if($(this).attr("data-funkycl") != undefined)
      $(this).css("color", $(this).attr("data-funkycl"));
  });
}

$(":input").on("keyup", function() {
  if($(this).val().toLowerCase() == "funky")
    setInterval(get_funky, 100);
});

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  if(message.state == "on") {
    get_funky();
    $(document).on("mousemove.funky", get_funky);
  } else {
    stop_funky();
    $(document).off("mousemove.funky");
  }
});
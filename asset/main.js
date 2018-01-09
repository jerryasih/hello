$(function() {
  var title = $("title");
  var heading = $("#hello-user");
  var msgs = $("#hello-messages");
  var form = $("#hello-form");
  var btn = $("#hello-submit");
  var input = $("#hello-email");

  form.submit(function(e) {
    e.preventDefault();
    e.stopPropagation();
    btn.prop("disabled", true);

    var form_data = new FormData(this);

    $.ajax({
      url: "main.php",
      type: "post",
      dataType: "json",
      data: form_data,
      cache: false,
      processData: false,
      contentType: false,
      success: function(data) {
        btn.prop("disabled", false);
        var text = data['text'];
        var code = data['status'];
        var log = data['log'];
        if (code == "success") {
          if (text == "true") {
            form.fadeOut().remove();
            title.html("hello omooba.");
            heading.html("hello omooba. welcome back.");
            msgs.html("while you were away, " + log + " person(s) came knocking");
          }
          else if (text == "false") {
            if (log < 3) {
              msgs.html("i could not verify your identity. please try again");
            }
            else if (log >= 3) {
              msgs.html("you have been here too many times today.");
            }
            else if (log > 15) {
              msgs.html("you seem to be one of these 'hackers.' you will find that i am a very secure system.");
            }
            else if (log > 50) {
              msgs.html("alright. time is up. i will no longer allow you access to this identity verification form.");
              form.fadeOut().remove();
            }
          }
        }
        else if (code == "error") {
          msgs.html(text);
        }
      }
    })
  })
});

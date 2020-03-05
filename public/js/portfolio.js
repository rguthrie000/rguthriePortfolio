// rguthrie portfolio client-side JS.

// Wait for DOM load.
$(function() {

  // Service the 'submit' button on the 'Send a Note' dropdown form
  $("#note").on("click", (event) => {
    event.preventDefault();
    let subject = $("#note-name").val();
    let email = $("#note-email").val();
    let bodyObj = {
      subject : subject,
      message : `${email} sends: ${$("#note-message").val()}`
    }
    // close the dropdown
    $("#dropdown-submit").click();

    // and ask our Server to send the message
    $.post('/api/send-email',bodyObj).then( (err) => {
      if (err) {
        console.log(err);
        alert(`Oops, sorry, email send error. Please e-mail rguthrie at rguthrie000@gmail.com.`);
       } else {
        alert(`Message sent, thanks ${subject} at ${email}!`);
       }
    });
  });

  // Service the 'Have another cookie' button
  $("#new-cookie").on("click", (event) => {
    event.preventDefault();
    cookieService();
  });

  const cookieSeconds = 180;
  let tHandle;

  // Ask our Server for another fortune cookie,
  // then set a timeout before getting a new cookie.
  function cookieService() {
    $.getJSON('/api/fcookie', (fcookie) => {
      $("#cookieTag").text(fcookie.fortuneCookie);
      if (tHandle) {
        clearTimeout(tHandle);
      }
      tHandle = setTimeout(cookieService,cookieSeconds*1000);
    });
  }

  // Start-Up
  main(); function main() {
    // Get the first cookie
    cookieService();
  }

})

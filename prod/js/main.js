$(document).ready(function() {

// Global ----------------------------------------------------------------------
ajaxForm();


// Active Nav
var active = $('section').attr('class')

$('nav li').hasClass(active)

// if ($('section').hasClass('contact')) {
//   alert('contact')
// }





// Form Validation
function ajaxForm(){
  var form = $('#contact-form');
  var formMessages = $('#form-messages');

  $(form).submit(function  (e) {
    e.preventDefault();

    var formData = $(form).serialize();

    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    //when form is succcesfully sent, give success indicator and clear form
    .done(function(response){
      $(formMessages).removeClass('alert alert-danger');
      $(formMessages).addClass('alert alert-success').prepend('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');

      $(formMessages).text(response);

      //clear form values
      $('#name').val('');
      $('#address').val('');
      $('#phone').val('');
      $('#email').val('');
    })
    //if form fails, show error msg and ask to submit again
    .fail(function(data){
      $(formMessages).removeClass('alert alert-success');
      $(formMessages).addClass('alert alert-danger').prepend('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');

      if(data.responseText !== ''){
        $(formMessages).text(data.responseText);
      } else {
        //error has occurred message
        $(formMessages).text('Oops! An error has occured and your message coud not be sent. Please try again.').prepend('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
      }
    })
  })
}

})

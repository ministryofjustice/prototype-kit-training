/* Sandbox specific scripts $ */


// Open and close the filters panel

jQuery(document).ready(function($) {

  $('.search-bar__results').hide();

  $('#search').keyup(function() {
    var sv = $('#search').val();

    if (sv === "") {
      //alert ('worked');
      $('.search-bar__results').hide();
    } else {
      $('.search-bar__results').show();
    }
  });

});

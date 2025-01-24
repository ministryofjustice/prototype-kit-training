

/* Workflow prototype specific styles $ */

new MOJFrontend.SortableTable({
  table: $('table.sortable')[0]
});

// Hide stuff

$('#edit-panel').hide();
$( "#confirm-changes" ).hide();
$('#edit-task').hide();
$('.moj-banner--success').hide();
$('.assigned-team').hide();
$('.moj-banner--success-1').delay(5000).fadeOut(1000);

// Show and hide the filters column

$('#toggle-filters').on('click', function() {
  if ($(this).attr('data-click-state') == 1) {
    $(this).attr('data-click-state', 0);
    $(this).html("Hide filters");
    $('#filters-column').show();
    $('#table-column').removeClass('govuk-grid-column-full');
    $('#table-column').addClass('govuk-grid-column-three-quarters');
  } else {
    $(this).attr('data-click-state', 1);
    $(this).html("Open filters");
    $('#filters-column').hide();
    $('#table-column').removeClass('govuk-grid-column-three-quarters');
    $('#table-column').addClass('govuk-grid-column-full');
  }
});


// Open and close the edit panel

  $(".sirius-select-task").change(function() {
    if (this.checked) {
      $('#edit-task').show();
      $(this).closest( "tr" ).addClass('selected')
    } else {
      $(this).closest( "tr" ).removeClass('selected')
      $(this).closest( "tbody tr" ).removeClass('selected')
      $('#selectAll').prop('checked', false); // Unchecks it
    }
  });

  $( "#edit-task" ).click(function() {
    $( "#edit-panel" ).show();
    $('#edit-date-panel').hide();
  });


  // Count how many checkboxes are selected
  var $checkboxes = $('#pa-clients td input[type="checkbox"]');
  $checkboxes.change(function(){
      var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
      $('.count-checked-checkboxes').text(countCheckedCheckboxes);
      if (countCheckedCheckboxes <= 0) {
        $('#edit-task').hide();
      }
  });


   var $checkboxes = $('#pa-clients td input[type="checkbox"]');
  $checkboxes.change(function(){
      var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
      $('.count-checked-checkboxes').text(countCheckedCheckboxes);
      if (countCheckedCheckboxes <= 0) {
        $('#edit-due-date').hide();
      }
  });

     // Count how many checkboxes are selected
  var $checkboxes = $('#pa-clients-3 td input[type="checkbox"]');
  $checkboxes.change(function(){
      var countCheckedCheckboxes = $checkboxes.filter(':checked').length;
      $('.count-checked-checkboxes').text(countCheckedCheckboxes);
      if (countCheckedCheckboxes <= 0) {
        $('#edit-task').hide();
      }
  });

  // Select all checkboxes in table

  $('#selectAll').click(function(event) {
    if(this.checked) {
        // Iterate each checkbox
        $('table#pa-clients :checkbox').each(function() {
            this.checked = true;
            $(this).closest( "tbody tr" ).addClass('selected')
            $('#edit-task').show();
        });
    } else {
        $('table#pa-clients :checkbox').each(function() {
            this.checked = false;
            $(this).closest( "tbody tr" ).removeClass('selected')
            $('#edit-task').hide();
        });
    }
});

    $('#selectAll').click(function(event) {
    if(this.checked) {
        // Iterate each checkbox
        $('table#pa-clients :checkbox').each(function() {
            this.checked = true;
            $(this).closest( "tbody tr" ).addClass('selected')
            $('#edit-due-date').show();
        });
    } else {
        $('table#pa-clients :checkbox').each(function() {
            this.checked = false;
            $(this).closest( "tbody tr" ).removeClass('selected')
            $('#edit-due-date').hide();
        });
    }
});

     // Select all checkboxes in table for the pa-clients-3

  $('#selectAll').click(function(event) {
    if(this.checked) {
        // Iterate each checkbox
        $('table#pa-clients-3 :checkbox').each(function() {
            this.checked = true;
            $(this).closest( "tbody tr" ).addClass('selected')
            $('#edit-task').show();
        });
    } else {
        $('table#pa-clients-3 :checkbox').each(function() {
            this.checked = false;
            $(this).closest( "tbody tr" ).removeClass('selected')
            $('#edit-task').hide();
        });
    }
});




  // Close the edit panel

  $( "#edit-cancel" ).click(function() {
    $( "#edit-panel" ).hide();
    return false;
  });


    // Make the changes

  $( "#save-tasks" ).click(function() {
    var countCheckedCheckboxes = $('#workflow td input[type="checkbox"]:checked').length;
    $( "#edit-panel" ).hide();
    $('.moj-banner--success').show();
    $('.moj-banner--success').delay(5000).fadeOut(1000);

      $( "tr.selected td.task_type" ).append('<span class="urgent secondary">Priority</span>');
      $('input.sirius-select-task:checked').each(function(index){
        // alert("this is a priority");
        $(this).closest('tr').addClass("urgent")
        $(this).closest('tr').prependTo("#workflow tbody");
      });

    $( "tr.selected" ).removeClass('selected')
    $('#workflow td input[type="checkbox"]').prop( "checked", false );


  })



// Set up the date conversion

const today = moment.locale('en-GB');

$('#date').val(new Date().toJSON().slice(0,10));

$('table#pa-clients-3 td.visit_type p.date').each(function() {
  var visitDate = parseInt($(this).html());
  $(this).html( moment().add(visitDate, 'days').format('L')  );
})

$('table#pa-clients-3 td.reports').each(function() {
  var reportDate = parseInt($(this).html());

  if (reportDate <= -365) {
   $(this).addClass('overdue');
   $(this).html( '<span class="date">' + moment().add(reportDate, 'days').format('L') +'</span> <span class="status secondary">Non-compliant</span>' );
  // $(this).closest('td').prev().text('Non-compliant')
  } else if (reportDate <= -90) {
   $(this).addClass('overdue');
   $(this).html( '<span class="date">' + moment().add(reportDate, 'days').format('L') +'</span><span class="status secondary">Overdue</span>' );
  // $(this).closest('td').prev().text('Non-compliant')
} else if (reportDate <= 0) {
 $(this).addClass('due');
 $(this).html( '<span class="date">' + moment().add(reportDate, 'days').format('L') +'</span> <span class="status secondary">Received</span>' );
// $(this).closest('td').prev().text('Non-compliant')
}  else if (reportDate <= 7) {
 $(this).addClass('due');
 $(this).html( '<span class="date">' + moment().add(reportDate, 'days').format('L') +'</span> <span class="status secondary">Pending</span>' );
// $(this).closest('td').prev().text('Non-compliant')
} else if (reportDate <= 365) {
 $(this).addClass('due');
 $(this).html( '<span class="date">' + moment().add(reportDate, 'days').format('L') +'</span> <span class="status secondary">Due</span>' );
// $(this).closest('td').prev().text('Non-compliant')
}


})



// Sort this out


$('table#pa-clients td.next_report').each(function() {
  var nextReport = parseInt($(this).html());
   $(this).html( '<span class="date">' + moment().add(nextReport, 'days').format('L') +'</span>' );
   $(this).closest('td').prev().html( '<span>' + moment().add(nextReport-365, 'days').format('L') + '</span>' );
   $(this).closest('td').prev().append('<span class="secondary due">Received</span>');
   $(this).closest('td').prev().addClass("received");
   // console.log(nextReport);

   if (nextReport >= 10) {
     $(this).append('<span class="secondary">Due</span>');
     $(this).addClass('due');
   } else if (nextReport <= 9) {
     $(this).append('<span class="secondary">Received</span>');
     $(this).addClass('received');
     //$(this).closest('td').prev().text('Received')
   } else if (nextReport <= -20) {
     $(this).append('<span class="secondary">Pending</span>');
     $(this).addClass('due');
     //$(this).closest('td').prev().text('Pending')
   } else if (nextReport <= -30) {
     $(this).append('<span class="secondary">Incomplete</span>');
     $(this).addClass('due');
     //$(this).closest('td').prev().text('Incomplete')
   } else if (nextReport <= -45) {
     $(this).append('<span class="secondary">Overdue</span>');
     $(this).addClass('overdue');
    // $(this).closest('td').prev().text('Overdue')
  } else if (nextReport <= -200) {
     $(this).append('<span class="secondary">Non-compliant</span>');
     $(this).addClass('overdue');
    // $(this).closest('td').prev().text('Non-compliant')
  }
})

$('table#pa-clients tr:nth-child(2) td.last_report').addClass('overdue');
$('table#pa-clients tr:nth-child(2) td.last_report').removeClass('received');
$('table#pa-clients tr:nth-child(2) td.last_report span.secondary').addClass('overdue');
$('table#pa-clients tr:nth-child(2) td.last_report span.secondary').text('Overdue');

$('table#pa-clients tr:nth-child(5) td.last_report').addClass('overdue');
$('table#pa-clients tr:nth-child(5) td.last_report').removeClass('received');
$('table#pa-clients tr:nth-child(5) td.last_report span.secondary').addClass('overdue');
$('table#pa-clients tr:nth-child(5) td.last_report span.secondary').text('Overdue');



$('table td.date p.date').each(function() {
  var convertDate = parseInt($(this).html());
   $(this).text(moment().add(convertDate, 'days').format('L'));
   // console.log(nextReport);
})

// v 1-2 javascript


$(".filters-accordion__button").click(function(){
  if ($(this).attr('aria-expanded') === "false") {
    $(this).attr('aria-expanded', 'true');
    $(this).closest(".filters-accordion").toggleClass("js-closed");
  } else {
    // alert ("it's closed");
    $(this).attr('aria-expanded', 'false');
    $(this).closest(".filters-accordion").toggleClass("js-closed");
  }
})


$('table#pa-clients-1-2 td.report_date').each(function() {

  var dateString = parseInt($(this).html());
  //var niceDate = Date.today();
  if (dateString >= 10) {
    $(this).closest('td').prev().text('Due')
  }
  if (dateString <= 9) {
    $(this).closest('td').prev().text('Received')
  }
  if (dateString <= -20) {
    $(this).closest('td').prev().text('Pending')
  }
  if (dateString <= -30) {
    $(this).closest('td').prev().text('Incomplete')
  }
  if (dateString <= -45) {
    $(this).closest('td').prev().text('Overdue')
  }
  if (dateString <= -200) {
    $(this).closest('td').prev().text('Non-compliant')
  }
  $(this).text(Date.today().addDays(dateString).toString("dd/MM/yyyy"));
})


$('table#pa-clients-1-2 td.visit_date').each(function() {
  var dateString = parseInt($(this).html());
  //var niceDate = Date.today();

  if (dateString >= 1) {
    $(this).text(Date.today().addDays(-dateString).toString("dd/MM/yyyy"));
  } else {
    $(this).text("n/a");
  }
})



// $('#pa-filters-column-1-2').hide();

// $('.sirius-deputyhub .moj-filter__selected').hide();

// $('#pa-toggle-filters-1-2').on('click', function() {
//  if ($(this).attr('data-click-state') == 1) {
  //  $(this).attr('data-click-state', 0);
   // $('#pa-filters-column-1-2').hide();
    //$('#pa-table-column-1-2').removeClass('govuk-grid-column-three-quarters');
    //$('#pa-table-column-1-2').addClass('govuk-grid-column-full');
  //} else {
    //$(this).attr('data-click-state', 1);
    //$('#pa-filters-column-1-2').show();
    //$('#pa-table-column-1-2').removeClass('govuk-grid-column-full');
    //$('#pa-table-column-1-2').addClass('govuk-grid-column-three-quarters');
  //}
//});


// filter the checkboxes by the input

  $(".filterCheckboxes").keyup(function () {
      var re = new RegExp($(this).val(), "i")
      $(this).closest(".filters-accordion").find('.filter__checkbox .govuk-checkboxes__label').each(function () {
          var text = $(this).text(),
              matches = !! text.match(re);
          $(this).parent().toggle(matches)
      })
  })

  


// GCM issues - Look up case
$('#case-number-error-summary, #case_number-error').hide();

$('#find-client').on('click', function() {
  if( !$('#case_number').val() ) {
    $(this).closest('.govuk-form-group').addClass('govuk-form-group--error');
    $(this).prev('input').addClass('govuk-input--error');
    $('#case-number-error-summary, #case_number-error').show();
  } else {
    $(this).closest('.govuk-form-group').removeClass('govuk-form-group--error');
    $(this).prev('input').removeClass('govuk-input--error');
    $(this).prev('input').before( '' );
    $('#case-number-error-summary, #case_number-error').hide();
    $('#client_name').val("Beatrice Fisher");
    $("#client_name").text("Beatrice Fisher");

  }

})

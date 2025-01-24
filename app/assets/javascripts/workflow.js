/* Workflow prototype specific styles $ */

// Warn about using the kit in production

new MOJFrontend.SortableTable({
  table: $('table')[0]
});

// Open and close the filters panel

jQuery(document).ready(function($) {

  // Open / close the accordions.

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




  // Convert the numbers in due date column to dates.
  // This trick means that the dates on the prototype will always be relative to today

  $('td.due_date span.date').each(function () {

    var due = $(this).html();

    // If it's due between 1 and 7 days from now (today is 0, so tomorrow is 1)
    if (due >= 2 && due <= 6) {
      $(this).addClass('govuk-!-font-weight-bold');
      $(this).after('<span><strong class="govuk-tag govuk-tag--orange">Due this week</span>');
      // If it's due tomorrow
    } else if (due == 1) {
      $(this).addClass('govuk-!-font-weight-bold');
      $(this).after('<span><strong class="govuk-tag govuk-tag--orange">Due tomorrow</span>');
      // If it's due today
    } else  if (due == 0) {
      $(this).addClass('govuk-!-font-weight-bold');
      $(this).after('<span><strong class="govuk-tag govuk-tag--red">Due today</span>');
      // If it's due before today
    } else if (due <= -1) {
      $(this).addClass('govuk-!-font-weight-bold');
      $(this).after('<span><strong class="govuk-tag govuk-tag--red">Overdue</strong></span>');
    }

    var dateString = parseInt($(this).html());
    //var niceDate = Date.today();

    $(this).text(Date.today().addDays(+dateString).toString("dd/MM/yyyy")  );

  })

 // Convert the numbers in assurance dates into tags.
  // This trick means that the dates on the prototype will always be relative to today

  $('td.assurance span.assurance_visits_tag').each(function () {
    var assurance_visits_tag = $(this).html(); 
 

    // If it's due between 1 and 7 days from now (today is 0, so tomorrow is 1)
    if (assurance_visits_tag == 'Low risk' ) {
      $(this).after('<span><strong class="govuk-tag govuk-tag--green">Low risk</span>');
      // If it's due tomorrow
    } else if (assurance_visits_tag == 'Medium risk') {
      $(this).after('<span><strong class="govuk-tag govuk-tag--orange">Medium risk</span>');
      // If it's due before today
    } else if (assurance_visits_tag == 'High risk') {
      $(this).after('<span><strong class="govuk-tag govuk-tag--red">High risk</strong></span>');
    }
  $(this).remove();
  });


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


  // Hide stuff

  $('#edit-panel').hide();
  $( "#confirm-changes" ).hide();
  $('#edit-task').hide();
  $('.moj-banner--success').hide();
  $('.assigned-team').hide();

  // Setting the number of unassigned tasks in the overview panel

  var t3UnassignedTasks = 10
  $("#team3-unassigned .data-item-number").html(t3UnassignedTasks);

  var allUnassignedTasks = 25
  $("#all-unassigned .data-item-number").html(allUnassignedTasks);


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

  $( "#edit-task" ).click(function(e) {
    $( "#edit-panel" ).show();
    e.preventDefault();
  });


  // Count how many checkboxes are selected
  var $checkboxes = $('#workflow td input[type="checkbox"]');
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
        $('table#workflow :checkbox').each(function() {
            this.checked = true;
            $(this).closest( "tbody tr" ).addClass('selected')
            $('#edit-task').show();
        });
    } else {
        $('table#workflow :checkbox').each(function() {
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

  // Apply the changes

  // Get the value of the team selection
  $('#assignTeam').on('change',function(){
    var assignTeam = $(this).find(":selected").val();
  });

  // Get the value of the case worker selection
  $('#assignCM').on('change',function(){
    var assignCM = $(this).find(":selected").val();
    // alert(assignCM);
  });

  // Get the value of the priority selection
  $('#assignPriority').on('change',function(){
    var assignPriority = $(this).find(":selected").val();
  });

  // Make the changes

  $( "#save-tasks" ).click(function() {
    var countCheckedCheckboxes = $('#workflow td input[type="checkbox"]:checked').length;
    $( "tr.selected span.name" ).text(assignCM.value);
    $( "tr.selected span.team" ).text(assignTeam.value);

    $( "#edit-panel" ).hide();
    $( "span#case-manager-name" ).text(assignCM.value);
    $( "span#task-priority" ).text(assignPriority.value);
    $('.moj-banner--success').show();
    $('.moj-banner--success').delay(5000).fadeOut(1000);

    if( $('#assignPriority').val() === 'Urgent' ) {
      $( "tr.selected td.task_type" ).append('<span class="urgent secondary">Priority</span>');
      $('input.sirius-select-task:checked').each(function(index){
        // alert("this is a priority");
        $(this).closest('tr').addClass("urgent")
        $(this).closest('tr').prependTo("#workflow tbody");
      });

    }

  
    $( "tr.selected" ).removeClass('selected')
    $('#workflow td input[type="checkbox"]').prop( "checked", false );
 

  })

  $( "#save-clients" ).click(function() {
    // set the team and case worker to assign to
    var assignClientsTeam = $('select#assignTeam').children("option:selected").val();
    var assignClientsCM = $('select#assignCM').children("option:selected").val();

    // if it's assigned to just a team
    if((assignClientsCM) === ('Assign to team')) {
      $( "span.reassigned" ).text(assignClientsTeam);

    // if it's assigned to just a person
    } else {
      $( "span.reassigned" ).text(assignClientsCM);
      $( "span.reassign-team" ).text(assignClientsTeam);
      $('#assigned-team').show();
    }

    // show and hide stuff
    $( "#edit-panel" ).hide();
    $( "#edit-task" ).hide();
    $( "#confirm-changes" ).show();
  })


  $( "#confirm-reassign" ).click(function() {
    var assignClientsTeam = $('select#assignTeam').children("option:selected").val();

    if((assignClientsTeam) === ('Team 3')) {
      // if they move within team 3 keep the tasks in the table
    } else {
      // if they move to another team remove from the table
      $('input.sirius-select-task:checked').each(function(index) {
        $(this).closest('tr').remove();
      })
    }

    // close the edit panel, hide the notification banner whatever they pick
    $( "#confirm-changes" ).hide();
    $( "tr.selected" ).removeClass('selected')
    $('#workflow td input[type="checkbox"]').prop( "checked", false );
    $('.moj-banner--success').show();
    $('.moj-banner--success').delay(5000).fadeOut(1000);
  });

  $( "#cancel-reassign" ).click(function() {
    // show and hide stuff
    $( "#edit-panel" ).show();
    $( "#edit-task" ).show();
    $( "#confirm-changes" ).hide();

  })



// open and close the accordion panels

$(".app-c-option-select__button").click(function(){
  if ($(this).attr('aria-expanded') === "false") {
    $(this).attr('aria-expanded', 'true');
    $(this).closest(".app-c-option-select").toggleClass("js-closed");
  } else {
    // alert ("it's closed");
    $(this).attr('aria-expanded', 'false');
    $(this).closest(".app-c-option-select").toggleClass("js-closed");
  }
})

  // filter the checkboxes by the input

    $(".filterCheckboxes").keyup(function () {
        var re = new RegExp($(this).val(), "i")
        $(this).closest(".app-c-option-select").find('.filter__checkbox .govuk-checkboxes__label').each(function () {
            var text = $(this).text(),
                matches = !! text.match(re);
            $(this).parent().toggle(matches)
        })
    })



  // Create the tags

  $("#task-type-tags-section, #assigned-tags-section, #case-owner-tags-section, #date-range-tags-section").hide()


  // When you click the green filter button

  $("button#actionFilter").click(function(){

    // Reset any hidden rows
    var filterSelected = "";
    $("tbody tr").show()

    // Set the variables
    var $tasksChecked = $("input[name='taskType']");
    var countTasksChecked = $tasksChecked.filter(':checked').length;

    var $assignedChecked = $("input[name='assigedTo']");
    var countAssignedChecked = $assignedChecked.filter(':checked').length;

    var $caseOwnerChecked = $("input[name='caseOwner']");
    var countcaseOwnerChecked = $caseOwnerChecked.filter(':checked').length;

    $('ul.task-type-filter-tags, ul.assigned-filter-tags, ul.case-owner-filter-tags').html("");

    // Check if any of the filters are selected
    if (countTasksChecked <= 0) {
      $('#task-type-tags-section').hide();
    } else {
      $('#task-type-tags-section').show();
      $("#none-selected").hide();
    }
    if (countAssignedChecked <= 0) {
      $('#assigned-tags-section').hide();
    } else {
      $('#assigned-tags-section').show();
      $("#none-selected").hide();
    }
    if (countcaseOwnerChecked <= 0) {
      $('#case-owner-tags-section').hide();
    } else {
      $('#case-owner-tags-section').show();
      $("#none-selected").hide();
    }
    if ($('#dateRangeFrom').val() != '' || ($('#dateRangeTo').val() != '')) {
      $('#date-range-tags-section').show();
      $("#none-selected").hide();
    };

    // Add the task type tags to the list
    $('input.task-type:checkbox:checked').each(function () {
      var task = $(this).val();
      $('ul.task-type-filter-tags').append('<li><a class="moj-filter__tag" href="#"><span class="govuk-visually-hidden">Remove this filter</span>'+task+'</a></li>');
    });

    // Add the assigned to tags to the list
    $("input.assigned:checkbox:checked").each(function(){
      var assigned = $(this).val();
        $('ul.assigned-filter-tags').append('<li><a class="moj-filter__tag" href="#"><span class="govuk-visually-hidden">Remove this filter</span>'+assigned+'</a></li>')
    });

    // Add the case owner tags to the list
    $("input.case-owner:checkbox:checked").each(function(){
      var caseOwner = $(this).val();
        $('ul.case-owner-filter-tags').append('<li><a class="moj-filter__tag" href="#"><span class="govuk-visually-hidden">Remove this filter</span>'+caseOwner+'</a></li>')
    });

    // Add the date range tags to the list
    if ($('#dateRangeFrom').val() != '') {
        $('ul.date-range-filter-tags').append('<li><a class="moj-filter__tag" href="#"><span class="govuk-visually-hidden">Remove this filter</span>From:'+ $('#dateRangeFrom').val() +'</a></li>')
    };
    if ($('#dateRangeTo').val() != '') {
        $('ul.date-range-filter-tags').append('<li><a class="moj-filter__tag" href="#"><span class="govuk-visually-hidden">Remove this filter</span>To:'+ $('#dateRangeTo').val() +'</a></li>')
    };

    // Hide the table rows
    $("input.govuk-checkboxes__input:checkbox:checked").each(function(){
      $("tbody tr").hide()
      var filterSelected = $(this).val();
      $("tbody td:contains("+filterSelected+")").closest('tr').show();

      if (filterSelected == "Not assigned") {
        $("tbody td:contains(–)").closest('tr').show();
        //alert ('working');
      }


    });

  });


  // Clear all the task filters
  $("#clear-filters").click(function (){
    // delete the tags
    $('ul.task-type-filter-tags, ul.assigned-filter-tags, ul.case-owner-filter-tags, ul.date-range-filter-tags').html("");
    // deselect all the checboxes
    $('.moj-filter__options input:checkbox').each(function() {
        this.checked = false;
    })
    $('#dateRangeFrom').val(null);
    $('#dateRangeTo').val(null);
    // hide the tags sections
    $("#task-type-tags-section, #assigned-tags-section, #case-owner-tags-section").hide()
    // Display the no filters selected message
    $("#none-selected").show();
    // Show all the table rows
    $("tbody tr").show()
    return false;
  })
});

// Delete an individual filter when you click a tag

$(document).on("click", "a.moj-filter__tag",function() {
  $(this).closest('li').remove()
  var deleteThisTag = $(this).text();
  var deleteThisCorrect = deleteThisTag.replace('Remove this filter', '');
  $('.moj-filter__options input[value="' + deleteThisCorrect +'"]:checkbox').each(function() {
      this.checked = false;
  })

  if ($('.moj-filter__options input:checkbox:checked').length === 0){
    $("tbody tr").show();
    // Display the no filters selected message
    $("#none-selected").show();
    $("#task-type-tags-section, #assigned-tags-section, #case-owner-tags-section").hide()
  }


  return false;
  // alert (deleteThisCorrect);
});

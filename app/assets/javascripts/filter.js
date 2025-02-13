/* Workflow prototype specific styles $ */



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

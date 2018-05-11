/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function multi_select_for_dropdown(searchbar_id, dropdown_id, buttonId) {
  var id_button = buttonId;
  var id_searchbar = searchbar_id;
  var id_dropdownul = dropdown_id;
  var storeTarget;
  var down = [];
  var scrolltop = 0;

  $('#' + id_button).on('click', function() {
    if ($(this).parent('.dropdown').find('.dropdown-menu').is(":hidden")) {
      setTimeout(function() {
        $('#' + id_searchbar).focus();
        $('#' + id_dropdownul).each(function() {
          var a, i, b;
          div = document.getElementById(id_dropdownul);
          a = div.getElementsByTagName("span");
          b = div.getElementsByTagName("li");
          for (i = 0; i < a.length; i++) {
            b[i].style.display = "";
          }
          $(this).find('li').each(function() {
            $(this).removeClass("active-li");
          });
        });
        $('#' + id_dropdownul).find("li:first").focus().addClass("active-li");
        if ($('#' + id_dropdownul).find(".active-li").nextAll("li:visible").length > 1) {
          scrollTable();
        }
      }, 10);
    }
    count_selected_items();
    $('#' + id_searchbar).focus();
  });

  $("#" + id_searchbar).focusout(function(e) {
    $(this).val("");
  });

  $("#" + id_searchbar).on('keydown', function(e) {
    if (e.which === 38 || e.which === 40 || e.which === 16) {
      e.preventDefault();
    }
    down[e.keyCode] = true;
  }).keyup(function(e) {
    var $thisOne = $('#' + id_dropdownul + ' li.active-li').keyup();
    if (down[16] && (down[40] || down[38])) {
      $thisOne.find("input[type=checkbox]").attr("checked", !$thisOne.find("input[type=checkbox]").attr("checked"));
      if ($thisOne.find("input[type=checkbox]").attr("checked")) {
        $thisOne.addClass("selected");
      } else {
        $thisOne.removeClass("selected");
      }
    }
    var input, filter, a, i, b, div, count = 0;
    input = document.getElementById(id_searchbar);
    filter = input.value.toUpperCase();
    div = document.getElementById(id_dropdownul);
    a = div.getElementsByTagName("span");
    b = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        b[i].style.display = "";
      } else {
        b[i].style.display = "none";
      }
    }
    if (e.which !== 38 || e.which !== 40 || e.which === 16) {}
    if ((e.which === 40 || e.keyCode === 40) && ($('#' + id_dropdownul + ' li.active-li').nextAll("li:visible").length > 0)) {
      storeTarget = $('#' + id_dropdownul).find("li.active-li");
      if (storeTarget.nextAll("li:visible").length !== 0) {
        $("#" + id_dropdownul + " li.active-li").removeClass("active-li");
        storeTarget.nextAll("li:visible").first().focus().addClass("active-li");
      }
    } else if ((e.which === 38 || e.keyCode === 38) && ($('#' + id_dropdownul + ' li.active-li').prevAll("li:visible").length > 0)) {
      storeTarget = $('#' + id_dropdownul).find("li.active-li");
      if (storeTarget.prevAll("li:visible").length !== 0) {
        $("#" + id_dropdownul + " li.active-li").removeClass("active-li");
        storeTarget.prevAll("li:visible").first().focus().addClass("active-li");
      }
    } else if (e.which === 16) {} else if ((e.which >= 65 && e.which <= 90) || (e.which >= 48 && e.which <= 57) || (e.which >= 97 && e.which <= 122) || (e.which === 8)) {
      $("#" + id_dropdownul + " li.active-li").removeClass("active-li");
      $('#' + id_dropdownul + " li:visible").first().focus().addClass("active-li");
      $('#' + id_dropdownul).scrollTop(scrolltop);
    }
    var $thisOne = $('#' + id_dropdownul + ' li.active-li').keyup();

    if (e.which === 13) {
      $thisOne.find("input[type=checkbox]").attr("checked", !$thisOne.find("input[type=checkbox]").attr("checked"));
      if ($thisOne.find("input[type=checkbox]").attr("checked")) {
        $thisOne.addClass("selected");
      } else {
        $thisOne.removeClass("selected");
      }
    }
    count_selected_items();
    if ($('#' + id_dropdownul + ' li.active-li').nextAll("li:visible").length > 1) {
      scrollTable();
    }
    down[e.keyCode] = false;
  });
  $('#' + id_dropdownul).off('click', function(e) {
    e.stopPropagation();
  });
  $('#' + id_dropdownul + ' li').bind('mousedown', function(e) {
    e.preventDefault();
  });
  $('#' + id_dropdownul + ' li').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var temp_val = $('#' + id_searchbar).val();
    $('#' + id_searchbar).val(temp_val);
    $(this).find("input[type=checkbox]").attr("checked", !$(this).find("input[type=checkbox]").attr("checked"));
    if ($(this).find("input[type=checkbox]").attr("checked")) {
      $(this).addClass("selected");
    } else {
      $(this).removeClass("selected");
    }
    $('#' + id_dropdownul).find('li.active-li').removeClass("active-li");
    $(this).addClass("active-li");
    count_selected_items();
  });
  $('#' + id_dropdownul + ' li').hover(function() {
    $('#' + id_dropdownul).each(function() {
      $(this).find('li').each(function() {
        $(this).removeClass("active-li");
        $(this).css("background-color", "");
      });
    });
    $(this).focus().addClass("active-li");
  });

  function scrollTable() {
    var $container = $('.dropWithSearch-option-div');
    var $scrollTo = $('#' + id_dropdownul + ' li.active-li');
    $container.animate({
      scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - $container.height() / 2 + $('#' + id_dropdownul + ' li.active-li').height(),
      scrollLeft: 0
    }, 0);
  }

  function count_selected_items() {
    if ($('#' + id_dropdownul + ' li.selected').length > 0) {
      $("#" + id_button).html($('#' + id_dropdownul + ' li.selected').length + " Selected");
    } else {
      $("#" + id_button).html("Branches");
    }
  }
}

function get_selected_items_in_multi_select_dropdown(filter_branch_ul) {
  var items = [];
  $("ul#" + filter_branch_ul + " input[type=checkbox]").each(function() {
    if ($(this).is(":checked")) {
      items.push($(this).id);
    }
  });
  return items;
}

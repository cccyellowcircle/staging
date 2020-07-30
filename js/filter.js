// empty line

function updateFilter()
{
  // current we only have 3 filter input
  var name = $('#filter-name').val()
    , category = $("#filter-category :selected").val()
    , workshop = (0 < $('#filter-tick:checked').length)
      ? true
      : false
    ;

  console.log("filter name:"+name+", category:"+category+", workshop:"+workshop);

  cards = $('.cards-wrapper');
  show_count = 0;
  // for each card, we will check for the 3 inputs
  // cards info are store in data-*
  for (var i = 0; i < cards.length; i++)
  {
    card = cards[i];
    // debug
    // if(i == 5)
    // {
    //   console.log(card.dataset);
    // }

    is_show = true;

    if("" == name) {
      // pass
    } else if(-1 < card.dataset.name.toLowerCase().search(name.toLowerCase())) {
      is_show &= true;
    } else {
      is_show &= false;
    }

    if("" == category) {
      // pass
    } else if(-1 < card.dataset.category.search(category)) {
      is_show &= true;
    } else {
      is_show &= false;
    }

    // ignore o case
    // if(0 == tick)
    if(workshop) {
      if("" != card.dataset.workshop) {
        is_show &= true;
      } else {
        is_show &= false;
      }
    }

    // finally
    if(is_show) {
      $(card).show();
      show_count++;
    } else {
      $(card).hide();
    }
  }
  console.log("Final filter :"+show_count+"/"+cards.length);
}


jQuery(document).ready(function() {
  // all updateFilter trigger are here
  var timeout = null;

  // set timer to NOT run update instantly
  $('#filter-name').keyup(function() {
      clearTimeout(timeout);
      timeout = setTimeout(updateFilter, 500);
  });

  // $('#filter-name').on('change', updateFilter);
  $('#filter-category').on('change', updateFilter);
  $('#filter-tick').on('change', updateFilter);
});

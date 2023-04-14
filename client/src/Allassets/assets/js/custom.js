import $ from 'jquery';

function CustomJs() {
  $(document).on('click','.datatable-select-all-checkbox',function(){
    $('input[name="assign_to[]"]').not(this).prop('checked', this.checked);
  });
  $('.star').on('click', function () {
    $(this).toggleClass('star-checked');
  });

  $('.ckbox label').on('click', function () {
    $(this).parents('tr').toggleClass('selected');
  });

  $('.btn-filter').on('click', function () {
    var $target = $(this).data('target');
    if ($target != 'all') {
      $('.table tr').css('display', 'none');
      $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
    } else {
      $('.table tr').css('display', 'none').fadeIn('slow');
    }
  });
  $('#profile_pic').on("click", function() { 
    $('#member_profile').trigger('click'); 
  });

}
export default CustomJs;
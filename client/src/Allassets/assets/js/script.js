$(document).ready(function(){
    // Delete 
    $('.delete').click(function(){
        var el = this;
        // Delete id
        var id = $(this).data('id');
        var confirmalert = confirm("Are you sure?");
        if (confirmalert == true) {
            // AJAX Request
            $.ajax({
                url: 'remove.php',
                type: 'POST',
                data: { id:id },
                success: function(response){
                    if(response == 1){
                        // Remove row from HTML Table
                        $(el).closest('tr').css('background','tomato');
                        $(el).closest('tr').fadeOut(800,function(){
                            $(this).remove();
                        });
                    }else{
                        alert('Invalid ID.');
                    }
                }
            });
        }
    });
    // Delete 
    $('#modal-con-submit-form').submit(function(){
        // Get form
        var id = $('#modal_con_id').val(); debugger;
        var firstname = $('#modal_con_firstname').val();
        var lastname = $('#modal_con_lastname').val(); 
        var phone = $('#modal_con_phone').val();
        var address = $('#modal_con_address').val(); 
        // var profile_path = $('#modal_con_profile_path').val();
        fake_path=document.getElementById('modal_con_profile_path').value
        var profile_path=fake_path.split("\\").pop();
        alert(profile_path);
            // AJAX Request
            $.ajax({
                url: 'remove.php',
                enctype: 'multipart/form-data',
                type: 'POST',
                data: {
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    address: address,
                    profile_path: profile_path,
                    edit: "1" 
                },
                success: function(response){
                    if(response == 1){
                        location.reload();
                    }else{
                        alert(response);
                        console.log(response);
                        localStorage.setItem("query",response);
                    }
                }
            });
    });
});
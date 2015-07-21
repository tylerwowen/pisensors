/**
 * Created by tyler on 7/20/15.
 */
$(function(){
    $(".upd_btn").click(function(){

        var sensor = $(this).attr('id');
        $.getJSON('/update/' + sensor, function(data) {

            var valID = sensor + '_val';
            var updID = sensor + '_upd';
            $('#' + valID).text(data.value);
            $('#' + updID).text(data.updatedAt);
        })
            .fail(function() {
                console.log("error");
            })
            .always(function(){
                console.log('Requested ' + sensor + ' data');
            });

    });
});
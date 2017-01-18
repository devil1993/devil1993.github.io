var azone_up_times = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var azone_down_times = []
var ukhra_up_times = [6,7,9,10,13,14,16]
var ukhra_down_times = []

var selected_route = 'azone_up';

function setTimes() {
    alert('Route ' + $('#direction').val() + ' ' + $('#route').val() + ' is selected.');
    selected_route = $('#route').val() + '_' + $('#direction').val() 
    times = selected_route + '_times'
    available_times = eval(times);
    $('#time').html('');
    for (var i = 0; i < available_times.length; i++) {
        $('#time').append('<option value='+available_times[i]+'>'+available_times[i]+'</option>');
    }
    setTimeout('getRouteData()',1500);
}

function getRouteData(){
    $.ajax({
        url:'data/'+selected_route+'.json',
        //url:'data/'+'x'+'.json',
        cache:true,
        dataType: 'json',
        success:function(data){
            alert('ok');
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
    });
}

$(document).ready(function () {
    setTimes();
    $('#route').change(setTimes);
    $('#direction').change(setTimes);
    $('#getdata').click(function(){
        var time= ''
        if(!$('#time').val()){
            time = $('#timeofday').val();
        }
        else{
            time = $('#time').val();
        }
        fileName = $('#route').val()+'_'+$('#direction').val()+'_'+time;
        alert('Getting : '+fileName);
    });
});
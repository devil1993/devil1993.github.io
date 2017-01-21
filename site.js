var azone_up_times = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
var azone_down_times = []
var ukhra_up_times = [6,7,9,10,13,14,16]
var ukhra_down_times = []

var selected_route = 'azone_up';
var loaded=false;

var map;

function initMap() {
    var uluru = {lat: 22.546, lng: 88.354};
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
    });
    var marker = new google.maps.Marker({
    position: uluru,
    map: map
    });
}

function setTimes() {
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
        beforeSend: function () { 
            $('#overlay').css('display','block');
        },
        success:function(data){
            // three points through which the directions pass
            length = data.length;
            console.log(parseInt(length/2));
            var myOptions = {
                center: new google.maps.LatLng(data[parseInt(length/2)].lat,data[parseInt(length/2)].long),
                zoom: 13,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                };
            map = new google.maps.Map(document.getElementById("map"),
                myOptions);
            var last = 0;
            data.forEach(function(element) {
                if(last == 0){
                    last = new google.maps.LatLng(element.lat,element.long);
                }
                var point = new google.maps.LatLng(element.lat,element.long);
                //console.log(element);
                //points.push({location:point});\
                var clr = 'green';
                if(element.stop == -1){
                    clr = 'blue';
                }
                var lineSymbol = {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    scale: 4,
                    strokeColor: clr
                };
                var line = new google.maps.Polyline({
                    path: [last,point],
                    //path: [{lat: 22.291, lng: 153.027}, {lat: 18.291, lng: 153.027}],
                    strokeOpacity: 0,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '20px'
                    }],
                    map: map
                });
                last = point;
            }, this);
            //console.log(map);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            alert(errorThrown);
        },
        complete: function () { 
            $('#overlay').css('display','none');
        }
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
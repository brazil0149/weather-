
function getLocation() {
  $.ajax({
    url: 'http://ip-api.com/json',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function (data) {
      $location = data.city + ', ' + data.region;
      getWeather($location);

    },
    error: function (err) {
      console.log(err)
    }
  });
}

function getWeather(city) {  
  $.ajax({
  url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=metric&APPID=454adf4f596b6dd6536533c0692e0a66',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function (data) {     
      $tempC = data.main.temp;
      $temp = Math.round(data.main.temp);
      $tempF = Math.round((data.main.temp * 9) / 5 + 32);
      $("#wIcon").html('<img class="icon" src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png">') 
      $('#cWeather').append(data.weather[0].description);
      $('#location').append($location);
      var temp = Math.round(data.main.temp);
      $("#cTemp").html(temp + '&deg C');

      var showF = false;

      $("#cTemp").click(function(){
        showF = !showF;
        if (showF) {
          $("#cTemp").html(Math.round((data.main.temp * 9) / 5 + 32) + '&deg F');
        } else {
          $("#cTemp").html(temp + '&deg C');
        }
      }); 
    },
    error: function (err) {
      console.log(err)
    }
  });
}

getLocation();
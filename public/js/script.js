function getWeather() {

    var cityName = $('#city').val();
    if(cityName === '') {
        return alert('Please enter a city');
    }

    $.get(`/weather?city=${cityName}`,function(data){
        
        var obj = JSON.parse(data);

        console.log(obj);
        var temp = (obj.main.temp-273).toFixed(2);
        $("#weatherDesc").text("Description: "+obj.weather[0].description);
        $("#temp").text("Temperature in Celcius: " + temp);

    });

    //Attach Enter-key Handler
    const ENTER=13
    document.getElementById("city")
        .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === ENTER) {
            document.getElementById("submit").click();
        }
    });
}

 
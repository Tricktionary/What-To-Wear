function getWeather() {

    var cityName = $('#city').val();
    if(cityName === '') {
        return alert('Please enter a city');
    }

    $.get(`/weather?city=${cityName}`,function(data){
        
       var obj = JSON.parse(data);

       console.log(obj);
    
        $("#weatherDesc").text(obj.weather[0].description);

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

 
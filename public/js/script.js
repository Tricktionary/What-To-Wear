function getWeather() {

    var cityName = $('#city').val();
    if(cityName === '') {
        return alert('Please enter a city');
    }

    var cityDiv = $('#cityweather');
    cityDiv.innerHTML = ''

    $.get(`/weather?city=${cityName}`,function(data){
       console.log(data);

       //Build Front END logic to determine clothing
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

 
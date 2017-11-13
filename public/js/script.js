function getWeather() {

    var cityName = $('#city').val();
    if(cityName === '') {
        return alert('Please enter a city');
    }

    $.get(`/weather?city=${cityName}`,function(data){
        
        var obj = JSON.parse(data);
        console.log(obj);
        
        var temp = (obj.main.temp-273).toFixed(2);
        var mainCond = obj.weather[0].main;

        $("#weatherDesc").text("Description: "+obj.weather[0].description);
        $("#temp").text("Temperature in Celcius: " + temp);

        setClothing(temp,mainCond);
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

function setClothing(temp,condition){
    var head  = $("#head");
    var uBody = $("#uBody");
    var lBody = $("#lBody");
    var feet  = $("#feet");
}

 
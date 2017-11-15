//Weather Icon Json
var weatherIcons;

/*
    CLOTHING
*/
var headCloth = {};
var upperBodyCloths = {};
var lowerBodyCloths = {};
var footCloth       = {};

/*
    THEME
    1440 MINUTES IN A DAY
*/

$(document).ready(function(){

    //load in JSON object
    $.getJSON("weatherIcon.json", function(json) {
       weatherIcons = json;
    });
});


//Get the current weather conditions
function getWeather() {
    var cityName = $('#city').val();
    if(cityName === '') {
        return alert('Please enter a city');
    }

    $.get(`/weather?city=${cityName}`,function(data){
        
        var prefix = 'wi wi-';
        var obj = JSON.parse(data);
        console.log(obj);
        
        //Current Temperature
        var temp = Math.round(obj.main.temp-273);

        //Main Weather Condition
        var mainCond = obj.weather[0].main;

        //Weather Icon
        var code = obj.weather[0].id;
        var icon = weatherIcons[code].icon;

        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }
        icon = prefix + icon;
        //console.log(icon);

        $("#weatherDesc").text("Description: "+obj.weather[0].description);
        $("#currTemp").text("Current temperature: " + temp +"°C");
        $("#highTemp").text("High of: "+ Math.round(obj.main.temp_max - 273) +"°C");
        $("#lowTemp").text("Low of: "+ Math.round(obj.main.temp_min - 273) +"°C");
        $("#weatherIcon")[0].classList = "";
        $("#weatherIcon")[0].classList = icon;
        setTheme(obj.coord.lat,obj.coord.lon);
        setClothing(temp,mainCond);
    });
}

//Set the theme based on the day
function setTheme(lat,lon){
    $.get(`/time?lat=${lat}&lon=${lon}`,function(data){
        var obj = JSON.parse(data);
        var time = obj.time.substring(11);
        var timeInMin = getTime(time);
        var bg;
        //Start theming based of ranges decided 

        //Morning
        if(timeInMin > 420 && timeInMin < 660 ){
            bg = "BG_MORN.jpg";
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");
        }
        //Day
        if(timeInMin > 660 && timeInMin < 960){
            bg = "BG_SUN.jpg";
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");
        }
        //Sunset
        if(timeInMin > 960 && timeInMin < 1080){
            bg = "BG_SUNSET.jpg";
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");
        }
        //Night
        if(timeInMin <420 || timeInMin >1080){
            bg = "BG_NIGHT.png";
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");
        }
    
    });
}

//Set the clothing
function setClothing(temp,condition){
    var head  = $("#head");
    var uBody = $("#uBody");
    var lBody = $("#lBody");
    var feet  = $("#feet");

    /* List all possible weather condition and show accordingly */


}

//Get time in minute
function getTime(timeString){
    var hour = timeString.substring(0,2);
    var minute = timeString.substring(3,6);
    //console.log(hour);
    //console.log(minute);
    return(hour*60 + parseInt(minute));
}


 
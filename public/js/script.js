//Weather Icon Json
var weatherIcons;

var headCloth = {};
var upperBodyCloths = {};
var lowerBodyCloths = {};
var footCloth       = {};
var themeCycle = {
    morning : {
        bg : "BG_MORN"
    },
    day:{
        bg : "BG_SUN.jpg"
    },
    night:{
        bg : "BG_NIGHT.png"
    },
    sunset:{
        bg : "BG_SUNSET.jpg"
    }
};

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
        //console.log(time);
        var timeInMin = getTime(time);

        //Start theming based of ranges decided 

    });
}

//Get time in minute
function getTime(timeString){
    var hour = timeString.substring(0,2);
    var minute = timeString.substring(3,6);
    console.log(hour);
    console.log(minute);
    return(hour*60 + parseInt(minute));
}


//Set the clothing
function setClothing(temp,condition){
    var head  = $("#head");
    var uBody = $("#uBody");
    var lBody = $("#lBody");
    var feet  = $("#feet");

    /* List all possible weather condition and show accordingly

    Temperature Ranges :
    
    -30 to -25 = 2 socks, thermals,any pants,shirt,sweater, jacket,scarf ,glove ,hat, boots
    
    -25 to -20 = 1 sock, thermals, same, boots
    
    -20 to -10 = regular shit ,sweater, boots

    -10 to  0. = jacket, hat
    
    -0  to  10 = sweater or windbreaker

    -10 to  20 = t-shirt, pants

    -20 to. 25 = pants, tshirt, light outerwear

    30++       = Shorts, tshirt , tank, burks,

    
    Possible Conditions:

    Rain
        umbrella and boots
    Hail 
        Dont go outside

    ThunderStorm
        just wet or rain jacket and rainboots

    Blizzard
        same thing as 30

    Snow
        -Boots

    Mist
        extra layer cause your gonna get wet 

    Sunny
        Sunscreen, sunglasses, hat with a cap

    */
}

 
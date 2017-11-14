//Weather Icon Json
var weatherIcons;

var headCloth = {};
var upperBodyCloths = {};
var lowerBodyCloths = {};
var footCloth       = {};


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
        console.log(icon);

        $("#weatherDesc").text("Description: "+obj.weather[0].description);
        $("#currTemp").text("Current temperature: " + temp +"°C");
        $("#highTemp").text("High of: "+ Math.round(obj.main.temp_max - 273) +"°C");
        $("#lowTemp").text("Low of: "+ Math.round(obj.main.temp_min - 273) +"°C");
        $("#weatherIcon")[0].classList = "";
        $("#weatherIcon")[0].classList = icon;
        setClothing(temp,mainCond);
    });


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

 
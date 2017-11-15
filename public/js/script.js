//Weather Icon Json
var weatherIcons;
var currentTheme = "day";
/*
    CLOTHING
*/
var headCloth = {};
var upperBodyCloths = {};
var lowerBodyCloths = {};
var footCloth       = {};

//Pulling weather icons
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
        if(obj.cod === 200){
            
            
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
        }
        else{
            $("#error").val("error");
        }
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
        //$("#someId").animate({backgroundColor: "#ff0000" });
        //Morning
        if(timeInMin > 420 && timeInMin < 660 ){

            if(currentTheme === "morn"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#morn").fadeIn(2000);
            $("#submitCard").animate({backgroundColor: "#4db6ac" });
            $("#weatherCard").animate({backgroundColor: "#4db6ac" });;
            $("#headCard").animate({backgroundColor: "#4db6ac" });;
            $("#ubodyCard").animate({backgroundColor: "#4db6ac" });;
            $("#lbodyCard").animate({backgroundColor: "#4db6ac" });;
            $("#feetCard").animate({backgroundColor: "#4db6ac" });;
            currentTheme = "morn";
        }
        //Day
        if(timeInMin > 660 && timeInMin < 960){
            
            if(currentTheme === "day"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#day").fadeIn(2000);
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");

            currentTheme = "day";
        }
        //Sunset
        if(timeInMin > 960 && timeInMin < 1080){

            if(currentTheme === "sunset"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#sunset").fadeIn(2000);
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");

            currentTheme = "sunset";
        }
        //Night
        if(timeInMin <420 || timeInMin >1080){

            if(currentTheme === "night"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#night").fadeIn(2000);
            $("#submitCard");
            $("#weatherCard");
            $("#headCard");
            $("#ubodyCard");
            $("#lbodyCard");
            $("#feetCard");

            currentTheme = "night";
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
    return(hour*60 + parseInt(minute));
}


function changeColor()
{
    $("#myDiv").animate({backgroundColor: colors[i]},1000);
    setTimeout(changeColor,2500);
}
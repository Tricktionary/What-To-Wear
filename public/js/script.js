//Weather Icon Json
var weatherIcons;
var currentTheme;
var clothingOptions;

//Pulling weather icons
$(document).ready(function(){
    //load in JSON object for ICONS
    $.getJSON("weatherIcon.json", function(json) {
       weatherIcons = json;
    });
    //load JSON object for different weather patterns
    $.getJSON("weather.json",function(json){
        clothingOptions = json;
        //console.log(clothingOptions);
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
        //console.log(obj);
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

        //Morning
        if(timeInMin > 420 && timeInMin < 660 ){
            //console.log(1);
            if(currentTheme === "morn"){
                return;
            }
            $("#"+currentTheme).fadeOut(2000);
            $("#morn").fadeIn(2000);
            $("#submitCard").css('background-color', '#4db6ac');
            $("#weatherCard").css('background-color', "#4db6ac");
            $("#headCard").css('background-color', "#4db6ac");
            $("#ubodyCard").css('background-color', "#4db6ac");
            $("#lbodyCard").css('background-color', "#4db6ac");
            $("#feetCard").css('background-color', "#4db6ac");
            $("#submit").css('background-color','#00796b');
            currentTheme = "morn";
        }
        //Day
        if(timeInMin > 660 && timeInMin < 960){
            //console.log(2);
            if(currentTheme === "day"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#day").fadeIn(2000);
            $("#submitCard").css('background-color', '#e57373');
            $("#weatherCard").css('background-color', "#e57373");
            $("#headCard").css('background-color', "#e57373");
            $("#ubodyCard").css('background-color', "#e57373");
            $("#lbodyCard").css('background-color', "#e57373");
            $("#feetCard").css('background-color', "#e57373");
            $("#submit").css('background-color','#b71c1c');
            currentTheme = "day";
        }
        //Sunset
        if(timeInMin > 960 && timeInMin < 1080){
            //console.log(3);
            if(currentTheme === "sunset"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#sunset").fadeIn(2000);
            $("#submitCard").css('background-color', '#ff7043');
            $("#weatherCard").css('background-color', "#ff7043");
            $("#headCard").css('background-color', "#ff7043");
            $("#ubodyCard").css('background-color', "#ff7043");
            $("#lbodyCard").css('background-color', "#ff7043");
            $("#feetCard").css('background-color', "#ff7043");
            $("#submit").css('background-color','#7e57c2');

            currentTheme = "sunset";
        }
        //Night
        if(timeInMin <420 || timeInMin >1080){
            //console.log(4);
            if(currentTheme === "night"){
                return;
            }

            $("#"+currentTheme).fadeOut(2000);
            $("#night").fadeIn(2000);
            $("#submitCard").css('background-color', '#607d8b');
            $("#weatherCard").css('background-color', "#607d8b");
            $("#headCard").css('background-color', "#607d8b");
            $("#ubodyCard").css('background-color', "#607d8b");
            $("#lbodyCard").css('background-color', "#607d8b");
            $("#feetCard").css('background-color', "#607d8b");
            $("#submit").css('background-color','#263238');

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
    var clothing;

    //var test = clothingOptions[-30];
    //test = test["Snow"];
    //console.log(test);

    //Less Than 30
    if(temp < -30){
        clothing = clothingOptions[-30];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //-30 to -25
    if(-30 < temp < -25){
        clothing = clothingOptions[-25];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //-25 to -20
    if(-25 < temp < -20){
        clothing = clothingOptions[-20];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //-20 to -10
    if(-20 < temp < -10){
        clothing = clothingOptions[-10];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    // -10 to 0
    if(-10< temp <0){
        clothing = clothingOptions[0];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //0 to 10
    if(0 < temp < 10){
        clothing = clothingOptions[0];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //10 to 20
    if(10 < temp <20){
        clothing = clothingOptions[10];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //20 to 25
    if(20 < temp < 25){
        clothing = clothingOptions[20];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    //25 to 30
    if(25 < temp < 30){
        clothing = clothingOptions[30];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }
    // +30
    if(temp > 30){
        clothing = clothingOptions[30];
        if(condition === "Rain" || condition === "Drizzle"){
            clothing = clothing["Drizzle"];
        }
        if(condition === "Clouds" || condition === "Clear" || condition =="Atmosphere"){
            clothing = clothing["Clear"];
        }
        else{ //Conditions Are Terrible
            //Thunderstorm  Extreme
            console.log("Terrible Don't Go Outside");
        }
    }


    /* List all possible weather condition and show accordingly */
}

//Get time in minute
function getTime(timeString){
    var hour = timeString.substring(0,2);
    var minute = timeString.substring(3,6);
    return(hour*60 + parseInt(minute));
}


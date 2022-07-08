var searchStatesEl =  document.querySelector("#search-states");
var searchButtonEl = document.querySelector("#searchButton");
var tempEl = document.querySelector("#temp-id");
var windEl = document.querySelector("#wind-id");
var HumidityEl = document.querySelector("#humidity-id");
var uvIndexEl = document.querySelector("#UVIndex-id");
var watherCountryEL = document.querySelector("#wathercountry");
var historyEl = document.querySelector("#history-botton");
var historyButtonEl = document.querySelector("#history-value");
var fiveDayCastEl = document.querySelector("#rows");

// var time = moment.unix(1657242000);
// console.log(time)
// console.log(time.format("MM/DD/YYYY"));


searchButtonEl.addEventListener("click",function(){
    
    if(searchStatesEl.value === ""){
        alert("error");
    }
    else{
        console.log(searchStatesEl.value);
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("id","history-value");
        buttonEl.setAttribute("class","history-block");        
        buttonEl.setAttribute("value",searchStatesEl.value);
        buttonEl.innerHTML = searchStatesEl.value;
        historyEl.appendChild(buttonEl)
    
        fetch ("https://us1.locationiq.com/v1/search?key=pk.ae433c8853239ce92c2541b70655a352&q="+searchStatesEl.value+"&format=json")
        .then(function(r){
            r.json()
            .then(function(data){ 
                let lat = data[0].lat;
                let lon = data[0].lon;              
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=ef96933f0b3e6caee107572378646593")
                .then(function(r){
                    r.json()
                    .then(function(data){
                        console.log(data);
                        console.log(data.daily[0]);
                        for(let i = 0; i<= 4; i++){
                            let daysOfWeather = document.createElement("div");
                            daysOfWeather.setAttribute("class", "days");

                            let dayDate =  document.createElement("h3")
                            let dayTemp =  document.createElement("div");
                            let dayWind =  document.createElement("div");
                            let dayHumidity =  document.createElement("div");

                            let date = data.daily[i].dt
                            let time = moment.unix(date);
                           
                            console.log(data.daily[i].temp.day)
                            dayDate.innerText =  time.format("DD/MM/YYYY")
                            dayTemp.innerHTML = 'Temp: ' + data.daily[i].temp.day;
                            dayWind.innerHTML = 'Wind: '+ data.daily[i].wind_speed;
                            dayHumidity.innerHTML = 'Humidity: '+data.daily[i].humidity;

                            fiveDayCastEl.appendChild(daysOfWeather);
                            daysOfWeather.appendChild(dayDate);
                            daysOfWeather.appendChild(dayTemp);
                            daysOfWeather.appendChild(dayWind);
                            daysOfWeather.appendChild(dayHumidity);

                        }
                        
                        if(data.current.weather[0].id <= 232){ // Thuderstorm
                            watherCountryEL.innerHTML = data.timezone+" &#x263C;";
                        }else if(data.current.weather[0].id <= 321){ // Drizzle

                        }else if(data.current.weather[0].id <= 521){ // Rain
                            
                        }else if(data.current.weather[0].id <= 622){ // Snow
                            
                        }else if(data.current.weather[0].id <= 781){ // Atmohere
                            
                        }else if(data.current.weather[0].id === 800){ // clear
                            watherCountryEL.innerHTML = data.timezone+" &#x263C;";
                        }else if(data.current.weather[0].id <= 804){// Clouds
                            
                        }

                        tempEl.innerHTML = Math.floor(data.current.temp);
                        windEl.innerHTML = data.current.wind_speed;
                        HumidityEl.innerHTML = data.current.humidity;
                        uvIndexEl.innerHTML = data.current.uvi

                        
                    })
                })
            })
        })
    }
})
historyButtonEl.addEventListener("click",function(){
    console.log(historyButtonEl)
})
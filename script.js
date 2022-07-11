var searchStatesEl =  document.querySelector("#search-states");
var searchButtonEl = document.querySelector("#searchButton");
var tempEl = document.querySelector("#temp-id");
var windEl = document.querySelector("#wind-id");
var HumidityEl = document.querySelector("#humidity-id");
var uvIndexEl = document.querySelector("#UVIndex-id");
var watherCountryEL = document.querySelector("#wathercountry");
var historyEl = document.querySelector("#history-botton");
var fiveDayCastEl = document.querySelector("#rows");
var historyButtonList = JSON.parse(localStorage.getItem("historyList"));
addButton();

searchButtonEl.addEventListener("click",function(){

    if(searchStatesEl.value === ""){
        alert("error");
    }
    else{
        weatherAPI(searchStatesEl.value);
    }
})

$('#search-states').on("keypress",function(event){
    if(event.keyCode === 13){
        
    }
});


function weatherAPI(search){
    fetch ("https://us1.locationiq.com/v1/search?key=pk.ae433c8853239ce92c2541b70655a352&q="+search+"&format=json")
        .then(function(r){
            r.json()
            .then(function(data){              
                let lat = data[0].lat;
                let lon = data[0].lon;                           
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=ef96933f0b3e6caee107572378646593")
                .then(function(r){
                    r.json()
                    .then(function(data){
                        console.log(searchStatesEl.value);
                       
                        let found = false;
                        historyButtonList.forEach(function(element){
                           
                            if(element === searchStatesEl.value){
                                found = true
                            }
                           
                        })   
                        if(found === false){
                            if (!historyButtonList.includes(search)){
                                var buttonEl = document.createElement("button");
                                buttonEl.setAttribute("id",searchStatesEl.value);
                                buttonEl.setAttribute("class","history-button");        
                                buttonEl.innerHTML = searchStatesEl.value;
                                historyEl.appendChild(buttonEl)  
                            }
                            historyButtonList.push(searchStatesEl.value);
                            localStorage.setItem("historyList",JSON.stringify(historyButtonList));
                        }
                        fiveDayCastEl.innerHTML = "";
                        for(let i = 0; i<= 4; i++){

                            var daysOfWeather = document.createElement("div");
                            daysOfWeather.setAttribute("class", "days");

                            var dayDate =  document.createElement("h3")
                            var dayTemp =  document.createElement("div");
                            var dayWind =  document.createElement("div");
                            var dayHumidity =  document.createElement("div");

                            var date = data.daily[i].dt
                            var time = moment.unix(date);

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
                            watherCountryEL.innerHTML = data.timezone+"	&#x26C8;";
                        }else if(data.current.weather[0].id <= 521){ // Rain
                            watherCountryEL.innerHTML = data.timezone+"	&#x1F327;";
                        }else if(data.current.weather[0].id <= 622){ // Snow
                            watherCountryEL.innerHTML = data.timezone+"&#x2603;";
                        }else if(data.current.weather[0].id <= 781){ // Atmohere
                            watherCountryEL.innerHTML = data.timezone+"&#x1F32B;";
                        }else if(data.current.weather[0].id === 800){ // clear
                            watherCountryEL.innerHTML = data.timezone+" &#x263C;";
                        }else if(data.current.weather[0].id <= 804){// Clouds
                            watherCountryEL.innerHTML = data.timezone+" &#x2601;";
                        }

                        tempEl.innerHTML = Math.floor(data.current.temp);
                        windEl.innerHTML = data.current.wind_speed;
                        HumidityEl.innerHTML = data.current.humidity;
                        uvIndexEl.innerHTML = data.current.uvi;                    
                    })
                })
            })
        })
}

historyEl.addEventListener("click",function(event){
    historyB = event.target.id;  
    weatherAPI(historyB)
})

function addButton(){
    
    console.log(historyButtonList);
    if(historyButtonList === null){
        historyButtonList = [];
    }else{
        historyButtonList.filter((el)=>el != "");
        historyButtonList.forEach(function(element){
            console.log(element);
            if(element.length > 1){
                var buttonEl = document.createElement("button");
                buttonEl.setAttribute("id",element);
                buttonEl.setAttribute("class","history-button");        
                buttonEl.innerHTML = element;
                historyEl.appendChild(buttonEl)
            }
            
        })
        
    }
}
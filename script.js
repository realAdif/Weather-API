
var searchStatesEl =  document.querySelector("#search-states");
var searchButtonEl = document.querySelector("#searchButton");
var tempEl = document.querySelector("#temp-id");
var windEl = document.querySelector("#wind-id");
var HumidityEl = document.querySelector("#humidity-id");
var uvIndexEl = document.querySelector("#UVIndex-id");
var watherCountryEL = document.querySelector("#wathercountry");
var historyEl = document.querySelector("#history-botton");
var historyButtonEl = document.querySelector("#history-value");
console.log(historyButtonEl.value)

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
                console.log(lat,lon);
                
                fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=ef96933f0b3e6caee107572378646593")
                .then(function(r){
                    r.json()
                    .then(function(data){
                        console.log(data);
                        console.log(data.current.weather)
                        // console.log(data.current.weather[1].main)
                        
                        // if(data.current.weather[1].main === "Rain"){
                        //     watherCountryEL.innerHTML = data.timezone+" &#x1F327;";
                        // }

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
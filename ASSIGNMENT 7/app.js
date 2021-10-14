let city="kolkata";
const apiKey="5a7da9b161e0ea7dbc85fca47ca813f6";
let inputLocation=document.querySelector("#location");

let details=document.querySelector("#weatherDetails");
let tempEle=document.querySelector("#curTemp");
let visibilityEle=document.querySelector("#visibility");
let cityEle=document.querySelector("#area");
let feelsEle=document.querySelector("#feels");
let humidityEle=document.querySelector("#humidity");
let wIcon=document.querySelector("#weatherIcon img")


inputLocation.addEventListener('keypress',getWeather);

function getWeather(e) {
    if(e.key==="Enter"){
        showWeather(inputLocation.value);
    }
}

function showWeather(location){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    axios.get(url)
    .then((res) => {
        // console.log(res);

        details.style.display="block";

        inputLocation.value="";

        const temp=res.data.main.temp;
        const visibility=res.data.weather[0].description;
        const id=res.data.weather[0].id;
        const city=res.data.name;
        const country=res.data.sys.country;
        const feelsLike=res.data.main.feels_like;
        const humidity=res.data.main.humidity;

        // console.log("Tntry: ", country);

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        tempEle.innerHTML=Math.round(temp)+`&#xb0;C`;

        // console.log("Visibility: ",visibility);
        visibilityEle.innerText=visibility;

        // console.log("Loaction: ",city);
        cityEle.innerHTML=`<i class="fas fa-map-marker-alt"></i>${city},${country}`;

        // console.log("Feels: ",feelsLike);
        feelsEle.innerHTML=`<div id="row1"> <i class="fas fa-thermometer-half" style=" color:#43AFFC "></i> ${feelsLike}</div>`+`<p id="row2">Feels Like</p>`;

        // console.log("Humidity: ",humidity);
        humidityEle.innerHTML=`<div id="row1"> <i class="fas fa-tint" style=" color:#43AFFC "></i>${humidity} </div>`+`<p id="row2">Humidity</p>`;

    })
    .catch((err) => {
        // console.log(err);
        alert("Please enter a valid city!")
    })
}


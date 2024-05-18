const weatherform = document.querySelector(".wetherForm");
const city_input = document.querySelector("#etr-city");
const card = document.querySelector(".card");
const api ="7a08aa438d463319481747e9282c0feb";

weatherform.addEventListener("submit",async function(event){

    event.preventDefault();
    const city = city_input.value

    if(city){
        try{

            const watherdata = await getweatherData(city)

            displayWeather(watherdata);

        }
        catch(error){
            console.log(error)
            displayerror(error)
        }
    }
    else{
        displayerror("please enter a city")
    }
})
async function getweatherData(city){

    const apidata =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
    const response = await fetch(apidata)
    if (!response.ok){
        throw new Error("Could not fetch API")
    }
    return await response.json();


}
function displayWeather(data){
    const {name: city ,
         main:{temp,humidity},
         weather:[{description,id}]} = data;

    card.textContent = ""
    card.style.display = "flex"

    const citydisplay = document.createElement("h1")
    const tempdisplay = document.createElement("p")
    const humidisplay = document.createElement("p")
    const discription = document.createElement("p")
    const emojidisplay = document.createElement("p")

    citydisplay.textContent = city;
    card.appendChild(citydisplay)
    citydisplay.classList.add("city")

    tempdisplay.textContent = `${(temp - 273).toFixed(1)}°C`
    card.appendChild(tempdisplay)
    tempdisplay.classList.add("temp")

    humidisplay.textContent = `Humidity :${humidity}%`;
    card.appendChild(humidisplay)
    humidisplay.classList.add("humi")

    discription.textContent = description
    card.appendChild(discription)
    discription.classList.add("discription")

    emojidisplay.textContent = getweatheremoji(id)
    card.appendChild(emojidisplay)
    emojidisplay.classList.add("emoji")


}
function getweatheremoji(watherId){

    switch (true){
        case (watherId >= 200 && watherId < 300):
            return "⛈️";

        case (watherId >= 300 && watherId < 400):
            return "🌧️";
        case (watherId >= 500 && watherId < 600):
            return "🌧️";

        case (watherId >= 600 && watherId < 700):
            return "❄️";

        case (watherId >= 700 && watherId < 800):
            return "🌫️";
        case (watherId === 800 ):
            return "☀️";

        case (watherId >= 801 && watherId < 810):
            return "☁️";
        default:
            return"🤷"
    }

}

function displayerror(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("err");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
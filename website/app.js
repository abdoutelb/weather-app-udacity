/* Global Variables */
const api_key = "81cd09972d20ff83dbd8f177098b64b4";
const base_url = "http://api.openweathermap.org/data/2.5/weather";
const query_string = "?";
//example http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=81cd09972d20ff83dbd8f177098b64b4
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById("generate").addEventListener("click", generateData);

async function generateData() {
    let zip_code = document.getElementById("zip").value; //94040
    try {
        let res = await fetch(`${base_url}${query_string}zip=${zip_code}&appid=${api_key}`);
        let data = await res.json();

        let feelingToday = document.getElementById("feelings").value;
        let new_sent_object = { "feeling": feelingToday, "temp": data.main.temp, "zipcode": zip_code, "date": newDate, "city": data.name };
        post_data_to_server(new_sent_object);
    } catch (error) {
        console.log(error);
    }
}

async function post_data_to_server(data) {
    fetch(`http://localhost:3000/projectData`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(async function (from_server) {
        let server_data = await from_server.json();

        document.getElementById("temp").innerText = server_data.temp + " temprature at city " + server_data.city;
        document.getElementById("date").innerText = newDate;
        document.getElementById("content").innerText = server_data.feeling;
        document.getElementById("feelings").style.display = "none";

    });
};
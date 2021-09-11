import { config } from './config.js';

const adress = document.querySelector('#address');
const location = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
            'pk.eyJ1IjoiYWxvd242NjYiLCJhIjoiY2t0ZTZlZXhiMm1najJ2cGQ5czdzYzhxbCJ9.JJPNwAdjuCjF2J9WOaQOtQ',
    }
).addTo(mymap);

let url = config[1].url;

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    let { value } = e.target[0];
    fetchData({ ip: value });
});

function fetchData({ ip, domain }) {
    if (ip) url = `${config[1].url}${ip}`;
    else url = config[1].url;
    axios
        .get(url)
        .then((data) => fillData(data.data))
        .catch((e) => console.log(e));
}

function fillData(d) {
    console.log(d);
    adress.textContent = d?.ip;
    location.textContent = d?.city;
    timezone.textContent = d?.timezone;
    isp.textContent = d?.isp;
    mymap.panTo([d?.latitude, d?.longitude]);
    L.marker([d?.latitude, d?.longitude]).addTo(mymap);
}

window.onload = fetchData;

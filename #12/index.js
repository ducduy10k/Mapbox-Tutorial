mapboxgl.accessToken =
  "pk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNrY2ZuaWEwNjA2ZW0yeWw4bG9yNnUyYm0ifQ.bFCQ-5yq6cSsrhugfxO2_Q";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [102.9264032, 17.3245164], // starting position [lng, lat]
  zoom: 6.09, // starting zoom
  hash: "map",
  attributionControl: false,
});
//
data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [105.80336715338868, 21.02819510054003],
      },
      properties: {
        name: "Trường đại học Giao Thông Vận tải",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [105.80546038509472, 21.022666132425893],
      },
      properties: {
        name: "Trường đại học Ngoại Thương",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [105.80230118875055, 21.012846773018634],
      },
      properties: {
        name: "Trường đại học Lao động - Xã hội",
      },
    },
  ],
};
var marker;

function addDataUniversity() {
  map.addSource("university-src", {
    type: "geojson",
    data: data,
  });
  map.addLayer({
    id: "university-location",
    type: "circle",
    source: "university-src",
    paint: {
      "circle-radius": 10,
      "circle-color": "blue",
    },
  });
  map.addLayer({
    id: "university-name",
    type: "symbol",
    source: "university-src",
    layout: {
      "text-field": ["format", ["get", "name"], { "font-scale": 1 }],
      "text-size": 12,
      "text-offset": [0, 2],
    },
    paint: {
      "text-color": "#0000ff",
    },
  });
}

map.on("load", (e) => {
  addDataUniversity();
  var el = document.createElement("div");
  el.style.background = "url(/channels4_profile.jpg)";
  el.style.width = "60px";
  el.style.height = "60px";
  el.style.cursor = "pointer";
  marker = new mapboxgl.Marker({ draggable: true })
    .setLngLat([105.80336715338868, 21.02819510054003])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>")) // add popup
    .addTo(map);
  marker.on("dragend", () => {
    alert("Drag end");
  });
  console.log(map.getStyle());
});

listener = {};
listener["evtClickMap"] = evtClickMap.bind(this);

function evtClickMap(e) {
  // var features = map.queryRenderedFeatures(e.point, {
  //     layers: ['university-name'],
  //     filter: ["==", "name", "Trường đại học Lao động - Xã hội"]
  // });
  var features = map.querySourceFeatures("university-src");
}

map.on("click", listener["evtClickMap"]);
const navigationCtr = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true,
  visualizePitch: false,
});
map.addControl(navigationCtr, "bottom-right");

const fullCtr = new mapboxgl.FullscreenControl({
  container: document.querySelector("body"),
});
map.addControl(fullCtr, "bottom-right");

const scaleCtr = new mapboxgl.ScaleControl({
  maxWidth: 200,
});
map.addControl(scaleCtr, "bottom-right");

const geoCtr = new mapboxgl.GeolocateControl({
  fitBoundsOptions: {
    maxZoom: 15,
  },
  showAccuracyCircle: false,
  trackUserLocation: true,
  showUserHeading: true,
  showUserLocation: true,
});
map.addControl(geoCtr, "bottom-right");

function hello() {
  alert("Hello");
}

const helloControl = new CustomControl({
  className: "fa-solid fa-hand-peace",
  title: "Hello",
  eventHandler: hello,
});
map.addControl(helloControl, "bottom-right");

function offEvent() {
  map.off("click", listener["evtClickMap"]);
}

function getDataToHtml(data, elmParentId, fieldVisible) {
  var content = "";
  var elm = document.getElementById(elmParentId);
  if (elm) {
    for (const feature of data.features) {
      content +=
        '<li class="list-group-item">' +
        feature.properties[fieldVisible] +
        "</li>";
    }
    elm.innerHTML = content;
  }
}

getDataToHtml(data, "lstUnv", "name");

function closeLeftPanel() {
  var elm = document.querySelector(".wrapper .left-panel");
  if (elm) {
    elm.style.left = "-100%";
  }
  document.querySelector(".wrapper .btn-open-leftpanel").style.display = "flex";
}

function openLeftPanel() {
  var elm = document.querySelector(".wrapper .left-panel");
  if (elm) {
    elm.style.left = "1rem";
  }
  document.querySelector(".wrapper .btn-open-leftpanel").style.display = "none";
}

function closeRightPanel() {
  var elm = document.querySelector(".wrapper .right-panel");
  if (elm) {
    elm.style.display = "none";
  }
}

function openRightPanel() {
  var elm = document.querySelector(".wrapper .right-panel");
  if (elm) {
    elm.style.display = "block";
  }
}

listStyle = [
  {
    name: "Mặc định",
    styleUrl: "mapbox://styles/mapbox/streets-v11",
    url: "./public/img/ve tinh.png",
  },
  {
    name: "Vệ tinh",
    styleUrl: "mapbox://styles/mapbox/satellite-streets-v11",
    url: "./public/img/mac dinh.png",
  },
];
isStyleMacDinh = true;
document.getElementById(
  "style-map"
).style.background = `url('${listStyle[0].url}')`;
function changeStyle() {
  isStyleMacDinh = !isStyleMacDinh;
  const styleActive = isStyleMacDinh ? listStyle[0] : listStyle[1];
  document.getElementById(
    "style-map"
  ).style.background = `url('${styleActive.url}')`;
  map.setStyle(styleActive.styleUrl);
  map.once("idle", () => {
    console.log(map.getStyle());
    addDataUniversity();
  });
}

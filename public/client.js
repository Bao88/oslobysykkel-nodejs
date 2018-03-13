window.onload = function(){
  let xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
//   Process the response when ready
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let jsonData = JSON.parse(this.responseText); 
      
      if(toggle) showList(jsonData);
      else draw(jsonData);
      // initMap();
      // document.getElementById("content").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("GET", "/api/oslobysykkel", true);
  xmlhttp.send();
}


let toggle = true;

function buttonPressed(event){
  if(event.innerHTML === "List/Map"){
    toggle = toggle ? false:true;
    return;
  }
  
}


function addIcon(what){
  let icon =  document.createElement("img");
  icon.setAttribute("src", what ? "https://cdn.glitch.com/9a3ab23f-c34f-4bde-b0cc-6d1372c6aa26%2Fbike.png?1520965299244" : 
                                  "https://cdn.glitch.com/9a3ab23f-c34f-4bde-b0cc-6d1372c6aa26%2Flock.png?1520965502882");
  
  return icon;
}


function createStationInfo(object){
  let stationInfo, stationName, stationAvailability, text, bike, lock;
  
  stationInfo = document.createElement("div");
  stationInfo.setAttribute("class", "stationInfo");
  stationInfo.setAttribute("id", "s"+object.id);
  
  stationName = document.createElement("h2");
  text = document.createTextNode(object.title);
  stationName.appendChild(text);
  
  stationAvailability = document.createElement("p");
  text = document.createTextNode(object.subtitle);
  stationAvailability.appendChild(text);  
  
  stationInfo.appendChild(stationName);
  stationInfo.appendChild(addIcon(true));
  stationInfo.appendChild(stationAvailability);
  stationInfo.appendChild(addIcon(false));
  
  return stationInfo;
}

// Availability of bikes and locks can be changed in a small timeframe, thus we have to update it frequently
function updateAvailability(dataArray){
  dataArray.forEach( item => document.getElementById("s"+item.id));
}

function mergeJSON(json1, json2){
  let mergedContainer = [];
  
}

// Show data as lists
function showList(data){
  let stations = JSON.parse(data.stations).stations, availability = JSON.parse(data.availability).stations;
  let stationInfo, stationName, stationAvailability, text;
  let container = document.getElementById('content');
  // let mergedContainer;
  // availability = availability.sort( (obj1, obj2) => obj1.id === obj2.id ? 0 : obj1.id < obj2.id ? -1 : 1);
  console.log(stations);
  console.log(availability);
  
  stations.forEach( item => container.appendChild(createStationInfo(item)));  
}

// Plot data into google map
function draw(data){
    google.charts.load('current', { 'packages': ['map'], mapsApiKey: "AIzaSyCP2hcw8w_nRLF6kHXNEQhMnKtunvwZ_cA"});
    google.charts.setOnLoadCallback(drawMap);
    
    function drawMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Population'],
        ['China', 'China: 1,363,800,000'],
        ['India', 'India: 1,242,620,000'],
        ['US', 'US: 317,842,000'],
        ['Indonesia', 'Indonesia: 247,424,598'],
        ['Brazil', 'Brazil: 201,032,714'],
        ['Pakistan', 'Pakistan: 186,134,000'],
        ['Nigeria', 'Nigeria: 173,615,000'],
        ['Bangladesh', 'Bangladesh: 152,518,015'],
        ['Russia', 'Russia: 146,019,512'],
        ['Japan', 'Japan: 127,120,000']
      ]);

    var options = {
      showTooltip: true,
      showInfoWindow: true
    };

      var map = new google.visualization.Map(document.getElementById('content'));
    map.draw(data, options);
  };
}


window.onload = function(){
  let xmlhttp, position;
  let isMobile = window.matchMedia("only screen and (max-width: 760px)");

  if (isMobile.matches) {
    document.getElementById("subtitle").innerHTML = "Mobil";
    // getGeolocation(function (data){ position = data;});
    // console.log(position);
  }
  
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
//   Process the response when ready
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if(this.status == 200){
        let jsonData = JSON.parse(this.responseText); 

        // if(toggle) showList(jsonData, position);
        if(toggle) showList(jsonData);
        else draw(jsonData);
      } else alert("Remember to set the process.env.CLIENT in server.js to your key");
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
  let figure =  document.createElement("figure"),
      img = document.createElement("img"),
      figcaption = document.createElement("figcaption"),
      text = document.createTextNode("0");
  
  img.setAttribute("src", what ? "https://cdn.glitch.com/9a3ab23f-c34f-4bde-b0cc-6d1372c6aa26%2Fbike.png?1520965299244" : 
                                  "https://cdn.glitch.com/9a3ab23f-c34f-4bde-b0cc-6d1372c6aa26%2Flock.png?1520970201844");
  figcaption.appendChild(text);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

function getGeolocation(callback) {
  if( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition( function getPosition(position){
      console.log(position);
      callback(position);                                     
    });
  } else {
    alert("Geolocation is not available"); 
  }
}


function createStationInfo(object){
  let stationInfo, stationName, stationAvailability, text, bike, lock, linkGMap;
  // console.log(position);
  
  stationInfo = document.createElement("div");
  stationInfo.setAttribute("class", "stationInfo");
  stationInfo.setAttribute("id", "s"+object.id);
  // https://maps.google.com/?q=38.6531004,-90.243462&ll=38.6531004,-90.243462&z=3
  linkGMap = "https://maps.google.com/?q=" + object.center.latitude + "," + object.center.longitude + "&ll=" + object.center.latitude + "&z=15";
  console.log(linkGMap);
  stationInfo.setAttribute("onclick", "window.open('"+linkGMap+"', 'mywindow')");
  // <div onclick="window.open('newurl.html','mywindow');" style="cursor: pointer;">&nbsp;</div>
  
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
  dataArray.forEach( function(item){
    let elementExist = document.getElementById("s"+item.id);
    if( elementExist != null){
      let bikesAvailable = elementExist.children[1].children[1],
          locksAvailable = elementExist.children[3].children[1];
      
          bikesAvailable.innerHTML = item.availability.bikes;
          locksAvailable.innerHTML = item.availability.locks;
    } 
  });
}

// Show data as lists
function showList(data){
  let stations = JSON.parse(data.stations).stations, availability = JSON.parse(data.availability).stations;
  let stationInfo, stationName, stationAvailability, text;
  let container = document.getElementById('content');
  container.innerHTML = "";

  console.log(stations);
  console.log(availability);
  
  stations.forEach( ( item, index, array ) => {
    container.appendChild(createStationInfo(item));  
    if( index === array.length - 1 ) updateAvailability(availability);
  });
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


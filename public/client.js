window.onload = function(){
  let xmlhttp;
  let isMobile = window.matchMedia("only screen and (max-width: 760px)");

  if (isMobile.matches) {
    document.getElementById("subtitle").innerHTML = "Mobil";
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
        showList(jsonData);
        
      } else alert("Remember to set the process.env.CLIENT in server.js to your key");
    }
  };
  xmlhttp.open("GET", "/api/oslobysykkel", true);
  xmlhttp.send();
}

// future feature
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
      callback(position);                                     
    });
  } else {
    alert("Geolocation is not available"); 
  }
}

function createStationInfo(object){
  let stationInfo, stationName, stationAvailability, text, bike, lock, linkGMap;
  
  stationInfo = document.createElement("div");
  stationInfo.setAttribute("class", "stationInfo");
  stationInfo.setAttribute("id", "s"+object.id);
  linkGMap = "https://maps.google.com/?q=" + object.center.latitude + "," + object.center.longitude + "&ll=" + object.center.latitude + "&z=15";
  stationInfo.setAttribute("onclick", "window.open('"+linkGMap+"', 'mywindow')");
  
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
  let array = dataArray.stations;
  array.forEach( function(item){
    let elementExist = document.getElementById("s"+item.id);
    if( elementExist != null){
      let bikesAvailable = elementExist.children[1].children[1],
          locksAvailable = elementExist.children[3].children[1];
      
          bikesAvailable.innerHTML = item.availability.bikes;
          locksAvailable.innerHTML = item.availability.locks;
    } 
  });
  // console.log(dataArray.refresh_rate);
  setTimeout(refreshAvailability, dataArray.refresh_rate*1000);
}

function refreshAvailability(){
  let xmlhttp;
 
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
        updateAvailability(jsonData);
      } else alert("Remember to set the process.env.CLIENT in server.js to your key");
    }
  };
  xmlhttp.open("GET", "/api/update", true);
  xmlhttp.send();
}

// Show data as lists
function showList(data){
  let stations = JSON.parse(data.stations).stations, availability = JSON.parse(data.availability);
  let stationInfo, stationName, stationAvailability, text;
  let container = document.getElementById('content');
  container.innerHTML = "";
  
  stations.forEach( ( item, index, array ) => {
    container.appendChild(createStationInfo(item));  
    if( index === array.length - 1 ) updateAvailability(availability);
  });
}
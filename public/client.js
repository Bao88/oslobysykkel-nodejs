function getStations(){
  fetch('/')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
  });
  
}

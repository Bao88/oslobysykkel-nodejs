// window.onload = function(){
//     fetch('http://example.com/movies.json')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });

// }

function buttonPressed(event){
  alert("https://oslobysykkel.no/api/v1/"+event.classList[0]);
  // let xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //        console.log(this.responseText);
  //     }
  // };
  // xhttp.open("GET", "https://oslobysykkel.no/api/v1/stations", true);
  // xhttp.setRequestHeader("Client-Identifier", "aa57ec526474715c30fdc77f2a7da0c0");
  // xhttp.send();

    
  fetch('https://oslobysykkel.no/api/v1/' + event.classList[0], {
      method: "GET",
      credentials: "same-origin",
      headers: {
          "Client-Identifier": "aa57ec526474715c30fdc77f2a7da0c0",
      }
      
  }).then(function(response){
      if(response.ok) return response.json();
      throw new Error("Couldn't fetch data from API!");
  }).then(function(myJson) {
      console.log(myJson);
  }).catch(function(error){
      console.log('There has been a problem with your fetch operation: ', error.message);
  });
}
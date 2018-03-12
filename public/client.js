function buttonPressed(event){
  alert("https://oslobysykkel.no/api/v1/"+event.innerHTML.toLowerCase());
  let xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML =
      this.responseText;
    }
  };
  xmlhttp.open("GET", "https://oslobysykkel.no/api/v1/"+event.innerHTML.toLowerCase(), true);
  xmlhttp.send();
}


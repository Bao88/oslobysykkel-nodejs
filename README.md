How to use:

- Need to have NodeJs installed
  - npm install
  - in server.js, change process.env.CLIENT to your own key
  - run using "npm start"
  - "Your app is listening on port (port-number)" will be shown in terminal
  - open the app in browser with "localhost:(port-number)"

Or if you want to skip these steps you can visit this page to see how it works:
<a href="https://oslobysykkel-nodejs.glitch.me/" target="_blank">https://oslobysykkel-nodejs.glitch.me/</a>
Features: 
 - An overview of the stations and the availability of bikes and locks on each of them.
 - Clickable stations which forwards the user to Google Map where they can find the address of it.
 
Problems found during development:
 - Don't send a request with custom headers through the browser(Chrome) and we will be able to access the resources(but we have to, thus we need to find another solution).
 - The server doesn't handle OPTIONS requests(which is our preflights triggered by custom headers).
 
TODO
- [x] Add a timer to refresh the availabilty of bikes and locks
- [ ] play around with Google Map API
  - [ ] find out how to forward request through nodeJS to hide the API key
- [ ] add a feature to show only available bikes
- [ ] add a feature to show only available locks
- [ ] add a feature to show station service status

Other tested ways which could solve this problem and reasons for errors.
- [x] Windows Powershell / Linux Terminal, use CURL to fetch the data and pipe the results in a program which in turn shows a list
- [x] Configure a Chrome browser to disable the security measures it has which stopped us from sending request to the API
- [x] Find out the reason why a normal browser couldn't request resourses from server.
  - Reasons a normal browser didn't work: Same-origin-policy, CORS, No 'Access-Control-Allow-Origin' thus client stopped sending the main request. Preflight was the main enemy, it was always triggered because we had to add a custom header to our request, and the server didn't seem to handle request with Options as a method thus giving us "500 Internal Server Error". 

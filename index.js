let Adapter = require('./adapters');
let App = require('./models/App.js');

function initialize() {
  let app = new App()
  Adapter.drones().then(drones => {
    app.drones = drones;
  });
  Adapter.packages().then(packages => {
    app.packages = packages;
  });
  Adapter.geocode().then(coords => {
    let lat = coords.results[0].geometry.location.lat;
    let lng = coords.results[0].geometry.location.lng;
    app.location = {
      latitude: lat,
      longitude: lng
    }
  })
  return app;
}

app = initialize();

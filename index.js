let Adapter = require('./adapters');
let App = require('./models/App.js');

let initialize = () => {
  let app = new App();

  let p1 = Adapter.drones().then(drones => {
    app.drones = drones;
  });
  let p2 = Adapter.packages().then(packages => {
    app.packages = packages;
  });
  let p3 = Adapter.geocode().then(coords => {
    let lat = coords.results[0].geometry.location.lat;
    let lng = coords.results[0].geometry.location.lng;
    app.location = {
      latitude: lat,
      longitude: lng
    }
  })

  Promise.all([p1, p2, p3]).then(() => {
    app.sortItems();
    return app.assign();
  }).catch(() => new Error('App could not be inititalized.'))

}

app = initialize();

let Adapter = require('./adapters');
let App = require('./models/App.js');

let run = () => {

  let drones = Adapter.drones().then(d => {
    drones = d
  }),
  packages = Adapter.packages().then(p => {
    packages = p
  }),
  location = Adapter.geocode().then(coords => {
    location = {
      latitude: coords.results[0].geometry.location.lat,
      longitude: coords.results[0].geometry.location.lng
    };
  });

  Promise.all([location, drones, packages]).then(() => {
    start = new Date;

    app = new App(location, drones, packages)
    app.sortItems();
    app.assign();

    end = new Date - start;
    console.log(`Assignments made in ${end / 1000} seconds`);
  })
  .catch(() => new Error('App could not be inititalized.'));
}

run();

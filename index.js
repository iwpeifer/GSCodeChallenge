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
  return app;
}

app = initialize();

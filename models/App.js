class App {
  constructor() {
    this.timeStamp = Math.round( Date.now() / 1000 );
    this.getDistance = require('../utilities/getDistance.js');
  }

  sortDronesByDistance() { //sort drones by distance needed to travel to depot in ascending order
    this.drones.sort((a, b) => {
      a.distance = this.getDistance(this.location, a);
      b.distance = this.getDistance(this.location, b);
      if (a.distance < b.distance) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }
      return 0;
    })
    return this.drones;
  }

  sortPackagesByDeadline() { //sort packages by deadline in ascending order, also assigns each package a distance in km
    this.packages.sort((a, b) => {
      a.distance = this.getDistance(this.location, a);
      b.distance = this.getDistance(this.location, b);
      if (a.deadline < b.deadline) {
        return -1;
      }
      if (a.deadline > b.deadline) {
        return 1;
      }
      return 0;
    })
    return this.packages;
  }

  //TODO: Assign packages to drones
  //        => add drone.distance to package.distance and calculate time (50kmph)
  //          => if package deadline cannot be made, put it in unassignedPackages array and discard drone(?)
  //          => if package can be assigned to drone, put it in assignments array

}

module.exports = App;

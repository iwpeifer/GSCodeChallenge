let getDistance = require('../utilities/getDistance.js');

class App {
  constructor(location, drones, packages) {
    this.location = location;
    this.drones = drones;
    this.packages = packages;
    this.timestamp = Math.round( Date.now() / 1000 );
  }

  sortDronesByDistance() { //sort drones by distance needed to travel to depot in ascending order
    this.drones.sort((a, b) => {
      a.distance = getDistance(this.location, a);
      b.distance = getDistance(this.location, b);
      return a.distance - b.distance;
    })
  }

  sortPackagesByDeadline() { //sort packages by deadline in ascending order, also assigns each package a distance in km
    this.packages.sort((a, b) => {
      a.distance = getDistance(this.location, a);
      b.distance = getDistance(this.location, b);
      return a.deadline - b.deadline;
    })
  }

  sortItems() {
    this.sortDronesByDistance();
    this.sortPackagesByDeadline();
  }

  assign() {
    let result = {assignments: [], unassignedPackageIds: []},
        packages = this.packages.map(pack => pack),
        drones = this.drones.map(drone => drone);

    let timeToDeliver = (a, b) => {
      return (((a.distance + b.distance) / 50) * 60) * 60; //returns time in seconds to make a delivery
    }

    let deadlineInSeconds = (pack) => { //converts package.deadline into seconds
      return pack.deadline - this.timestamp
    }
    packages.forEach(pack => {
      if (drones.length > 0) { //check to see if there are any more drones in list
        if (timeToDeliver(drones[0], pack) < deadlineInSeconds(pack)) { //if drone can deliver package, it is assigned
          let assignedDrone = drones.shift();
          result.assignments.push({droneId: assignedDrone.droneId, packageId: pack.packageId});
          return;
        }
        else { //if nearest drone cannot deliver package in time, no other drone will be able to and package is left unassigned
          result.unassignedPackageIds.push(pack.packageId);
          return;
        }
      }
      else { //if there are no more drones to make deliveries, all remaining packages are unassigned
        result.unassignedPackageIds.push(pack.packageId);
        return;
      }
    });
    console.log(`Total drones: ${this.drones.length}`);
    console.log(`Total packages: ${this.packages.length}`);
    console.log(`Total packages that can be delivered before deadline: ${result.assignments.length}`);
    console.log(result);
    return result;
  }

}

module.exports = App;

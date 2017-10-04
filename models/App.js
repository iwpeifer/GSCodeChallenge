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
  }

  sortItems() {
    this.sortDronesByDistance();
    this.sortPackagesByDeadline();
  }

  assign(packages, drones) {

    let result = {assignments: [], unassignedPackageIds: []};

    let timeToDeliver = (a, b) => {
      return (((a.distance + b.distance) / 50) * 60) * 60; //returns time in seconds to make a delivery
    }

    let deadlineInSeconds = (pack) => { //converts package.deadline into seconds
      return pack.deadline - this.timeStamp
    }

    this.sortItems();
    packages.forEach(pack => {
        if (drones.length > 0) { //check to see if there are any more drones in list
          if (timeToDeliver(drones[0], pack) < deadlineInSeconds(pack)) { //if drone can deliver package, it is assigned
            let assignedDrone = drones.shift();
            result.assignments.push({droneId: assignedDrone.droneId, packageId: pack.packageId});
            return;
          }
          else { //if drone cannot deliver package, it cannot deliver any other package and is then removed
            drones.shift();
            result.unassignedPackageIds.push(pack.packageId);
            return;
          }
        }
        else { //if there are no more drones to make deliveries, all remaining packages are unassigned
          result.unassignedPackageIds.push(pack.packageId);
          return;
        }
      })
    console.log(`Total drones: ${this.drones.length}`);
    console.log(`Total packages: ${this.packages.length}`);
    console.log(`Total packages that can be delivered before deadline: ${result.assignments.length}`);
    console.log(result);
    return result;
  }

}

module.exports = App;

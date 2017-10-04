class App {
  constructor() {
    this.timeStamp = Math.round( Date.now() / 1000 );
    this.convertToKm = require('../utilities/Haversine.js');
  }

  sortDronesByDistance() {
    
    let depotLat = this.location.latitude,
        depotLong = this.location.longitude;

      let getDistance = drone => {
        let droneLat = drone.location.latitude,
            droneLong = drone.location.longitude;

        //if drone already has package, it must first drop off at destination
        if (drone.packages > 0) {
            let destinationLat = drone.packages[0].destination.latitude,
                destinationLong = drone.packages[0].destination.longitude,
                distanceToDestination = this.convertToKm(droneLat, droneLong, destinationLat, destinationLong),
                distanceFromDestinationToDepot = this.convertToKm(destinationLat, destinationLong, depotLat, depoLong);
            return distanceToDestination + distanceFromDestinationToDepot;
          }

        //otherwise, drone only has to travel back to depot
        let distanceToDepot = this.convertToKm(droneLat, droneLong, depotLat, depotLong);
        return distanceToDepot;
      }

    //sort drones by distance needed to travel to depot in ascending order
    this.drones.sort((a, b) => {
      a.distance = getDistance(a);
      b.distance = getDistance(b);
      if (a.distance < b.distance) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }
      return 0;
    })
  }

  //TODO: sortPackagesByDeadline()
  //        => add .distance to each package
  //TODO: Assign packages to drones
  //        => add drone.distance to package.distance and calculate time (50kmph)
  //          => if package deadline cannot be made, put it in unassignedPackages array and discard drone(?)
  //          => if package can be assigned to drone, put it in assignments array

}

module.exports = App;

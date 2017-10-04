class App {
  constructor() {
    this.timeStamp = Math.round( Date.now() / 1000 );
  }

  sortDronesByDistance() {

    function convertToKm(lat1, lon1, lat2, lon2) {
      //Haversine Formula

      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }

    let depotLat = this.location.latitude,
        depotLong = this.location.longitude;

    function getDistance(drone) {

      let droneLat = drone.location.latitude,
          droneLong = drone.location.longitude;

      if (drone.packages > 0) {
            let destinationLat = drone.packages[0].destination.latitude,
                destinationLong = drone.packages[0].destination.longitude,
                distanceToDestination = convertToKm(droneLat, droneLong, destinationLat, destinationLong),
                distanceFromDestinationToDepot = convertToKm(destinationLat, destinationLong, depotLat, depoLong);

            return distanceToDestination + distanceFromDestinationToDepot;
        }
      let distanceToDepot = convertToKm(droneLat, droneLong, depotLat, depotLong);
      return distanceToDepot;
    }

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

}

module.exports = App;

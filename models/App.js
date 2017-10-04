class App {
  constructor() {
    this.timeStamp = Math.round( Date.now() / 1000 );

    // this.getDistanceKm = this.getDistanceKm.bind(this);
  }

  getDistanceKm(lat1, lon1, lat2, lon2) {
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
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  sortDronesByDistance() {

    function startPosition(drone) {
      if (drone.packages > 0) {
        return drone.packages[0].destination;
      }
      return drone.location;
    }

    let latitude = this.location.latitude;
    let longitude = this.location.longitude;

    this.drones.sort((a, b) => {
      let distanceA = this.getDistanceKm(startPosition(a).latitude, startPosition(a).longitude, latitude, longitude);
      a.distance = distanceA;
      let distanceB = this.getDistanceKm(startPosition(b).latitude, startPosition(b).longitude, latitude, longitude);
      b.distance = distanceB;
      if (distanceA < distanceB) {
        return -1;
      }
      if (distanceA > distanceB) {
        return 1;
      }
      return 0;
    })
  }

}

module.exports = App;

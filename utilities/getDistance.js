let getDistance = (home, object) => {

  //check to see if distance to be calculated belongs to a drone
  if (object.droneId) {
    let drone = object,
        droneLat = drone.location.latitude,
        droneLong = drone.location.longitude;

    //if drone already has package, it must first drop off at destination
    if (drone.packages.length > 0) {
        let destinationLat = drone.packages[0].destination.latitude,
            destinationLong = drone.packages[0].destination.longitude,
            distanceToDestination = convertToKm(droneLat, droneLong, destinationLat, destinationLong),
            distanceFromDestinationToDepot = convertToKm(destinationLat, destinationLong, home.latitude, home.longitude);
        return distanceToDestination + distanceFromDestinationToDepot;
      }

    //otherwise, drone only has to travel back to depot
    let distanceToDepot = convertToKm(droneLat, droneLong, home.latitude, home.longitude);
    return distanceToDepot;
  }
  //check to see if distance to be calculated belongs to a package
  else if (object.packageId) {
    let destinationLat = object.destination.latitude,
        destinationLong = object.destination.longitude,
        distanceToDestination = convertToKm(destinationLat, destinationLong, home.latitude, home.longitude);
    return distanceToDestination;
  }
  else {
    return new Error('Object must be either drone or package');
  }
}

//Haversine Formula
let convertToKm = (lat1, lon1, lat2, lon2) => {

  let deg2rad = deg => {
    return deg * (Math.PI/180);
  }

  let R = 6371, // Radius of the earth in km
      dLat = deg2rad(lat2-lat1),
      dLon = deg2rad(lon2-lon1),
      a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
      d = R * c; // Distance in km
  return d;
}

module.exports = getDistance;

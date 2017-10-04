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

module.exports = convertToKm;

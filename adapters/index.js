const fetch = require("node-fetch");
const baseUrl = 'https://codetest.kube.getswift.co';
const address = '303+Collins+Street,+Melbourne,+VIC+3000';

class Adapter {

  static drones() {
    return fetch(`${baseUrl}/drones`)
      .then(response => response.json());
    }

  static packages() {
    return fetch(`${baseUrl}/packages`)
      .then(response => response.json());
  }

  static geocode(address) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB80MQ7VcG-FH3q_VIjvG-6SZG52lqKNok`)
      .then(response => response.json());
    }

}

module.exports = Adapter;

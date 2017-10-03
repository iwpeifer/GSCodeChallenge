const fetch = require("node-fetch");
const baseUrl = 'https://codetest.kube.getswift.co';

class Adapter {

  static drones() {
    return fetch(`${baseUrl}/drones`)
      .then(response => response.json())
    }

  static packages() {
    return fetch(`${baseUrl}/packages`)
      .then(response => response.json())
  }

}

module.exports = Adapter;

# GSCodeChallenge

# To use:

$ npm install

$ node index.js

# Analysis:

In implementing my solution, I decided to take an object-oriented approach, given the relational way the data is structured. I've created an App class that has its own instances of drones and packages (which would also have their own models were I to elaborate on this project and scale it up; this would make it easier to expand on each type of object). An App is constructed with its own Unix timestamp which, during the assigning process, is subtracted from each package deadline with the difference tested against the minimum amount of time the nearest drone can make a delivery.

The algorithm I put into place works as follows:

  1. Drones are sorted in ascending order by current distance away from depot (where they are to pick up packages).

    if a drone is already in the process of delivering a package, the distance from its current location to its destination is added to its distance to the depot.

  2. Packages are sorted in ascending order by deadline. During the sorting process for both packages and drones, the getDistance method (located in the *utilities* folder) uses the Haversine formula to give each object a total distance from the depot (drones) or distance to destination (packages) depending on their latitude and longitudes.

  3. Given the speed of a drone (50km/h), it can be determined whether or not the drone nearest to the depot can retrieve a package and deliver it to its destination by the deadline.

  3. If a package cannot be delivered in time by the drone nearest to the depot, it cannot be delivered by any other drone and is thus left unassigned.

  4. If a package can be delivered in time by the drone nearest to the depot, the assignment is made and the next package is checked against the next drone.

  In this way, packages that cannot be delivered are knocked out of the running first, then all packages that can be delivered are assigned one after the other, and all packages left over (if there are more deliverable packages than drones) are left unassigned.

  ---------

  While my solution could still handle much larger samples within a reasonable amount of time, it currently cannot do anything other than assign pairings to random samples produced in bulk. That is to say, it has no mechanism for updating the list of packages, making drones available again for new packages after deliveries, etc. That infrastructure would need to be implemented, and I imagine it would involve an event loop that is constantly checking for new packages which are then put in a queue to be assigned an available drone that can make the deadline.

  As far as performance goes, in the handling of thousands of assignments, improvements could be made to speed up the process. For one, because the algorithm already works to knock undeliverable packages out of the running first before making pairings, once the first pairing is made, all additional packages can be immediately assigned en masse, and all leftover packages can be immediately left unassigned en masse. When talking about large quantities of packages/drones, this might speed things up a bit.

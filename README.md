# GSCodeChallenge

# To use:

$ npm install

$ node index.js

# Analysis:

In implementing my solution, I decided to take a rather object-oriented approach, given the relational way the data is structured.
The algorithm I put into place works as follows:
  *Drones are sorted in ascending order by current distance away from depot (where they are to pick up packages)
    => if a drone is already in the process of delivering a package, the distance from its current location to its destination is added to its distance to the depot
  *Packages are sorted in ascending order by deadline.
  *If a package cannot be delivered in time by the drone nearest to the depot, it cannot be delivered by any drone and is thus left unassigned
  *If a package can be delivered in time by the drone nearest to the depot, the assignment is made and the next package is checked against the next drone.
  *This process repeats until all possible assignments are made

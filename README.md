In order to use this API, follow these steps:
1) create a mongodb/ directory to hold the database.  The directory name does not matter, but I am using mongodb/.  I have a rescue_force/ directory that contains RescueForce and RescueForceAPI subdirectories, and I created the mongodb/ directory as an additional subdirectory to rescue_force/.
2) from the directory containing the mongodb/ directory, enter the following into bash: ‘mongod --dbpath mongodb’
3) from bash: ‘npm start’ for nodemon, or ‘npm run start-server’ for node
In order to connect a local deployment of this API to the remote database add some environmental variables.  Add these variables to the terminal that is running the API.
1) type 'export DBUSER=****' into your terminal (replace *'s with user name)
2) type 'export DBPASSWORD=***' into your terminal (replace *'s with password)


In order to use this API with your own local database, follow these steps:
1) create a mongodb/ directory to hold the database.  The directory name does not matter, but I am using mongodb/.  I have a rescue_force/ directory that contains RescueForce and RescueForceAPI subdirectories, and I created the mongodb/ directory as an additional subdirectory to rescue_force/.
2) from the directory containing the mongodb/ directory, enter the following into bash: ‘mongod --dbpath mongodb’
3) from bash: ‘npm start’ for nodemon, or ‘npm run start-server’ for node
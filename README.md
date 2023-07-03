# MEAN Stack Docker Sandbox

Sandbox environment to stand up a MEAN app with Docker.

## Components

* API: business logic layer
* DB: persistence layer
* Web: public website
* Admin: administration website

## Installation

    cd app-api
    npm install
    docker build --no-cache -t meanapp-api:latest .
    docker run -d --rm -p 3000:3000 meanapp-api:latest
    cd ..


    cd app-web
    npm install
    docker build --no-cache -t meanapp-web:latest .
    docker run -d --rm -p 3100:3100 meanapp-web:latest
    cd ..

Connect to the REST API: [http://127.0.0.1:3000](http://127.0.0.1:3000)  
Connect to the public website: [http://127.0.0.1:3100](http://127.0.0.1:3100)

## Testing

### Rest API

* [GET /](http://127.0.0.1:3000/) - Gets the hello world message.
* [GET /continents](http://127.0.0.1:3000/continents) - Gets a list of continents.
* [GET /continents?sort=alpha](http://127.0.0.1:3000/continents?sort=alpha) - Gets a list of all continents sorted alphabetically.
* [GET /continents?sort=pop](http://127.0.0.1:3000/continents?sort=pop) - Gets a list of all continents sorted by largest population.
* [GET /continents/:continentName](http://127.0.0.1:3000/continents/Asia) - Gets the specified content by name.

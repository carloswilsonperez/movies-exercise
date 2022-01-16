## UI Take Home Exercise
App to showcase my abilities for the Netskope position.
![alt Screenshot1](/screenshots/screenshot1.png?raw=true)


## Set up
Make sure you have docker and Docker Desktop and git installed.

### Clone the repo
```bash
$ git clone https://github.com/carloswilsonperez/movies-exercise
```
 ### Run docker
 ```bash
 $ docker-compose up
 ```

 App should be running in `localhost:4200`

 ### Notes on Architecture
 Here I implemented the persistence layer with MongoDB, the service layer with NodeJS with the ExpressJS Framework and the UI layer with the Angular Framework. I am using the latest versions of
 these technologies.
 ![alt Screenshot2](/screenshots/mean.jpg?raw=true)



 ### Important
 The first time you run the above commands, it is going to take a while, depending on the speed of your Internet connection. Succesive builds will be much faster.

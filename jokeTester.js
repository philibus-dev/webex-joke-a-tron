const {JokeService} = require('./services/JokeService');

JokeService.getRandomJoke().then(joke => {
    console.log(joke);
});
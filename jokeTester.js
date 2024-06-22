const {JokeService} = require('./services/dist/JokeService');

JokeService.getRandomJoke().then(joke => {
    console.log(joke);
});
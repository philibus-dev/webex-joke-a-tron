const greetingService = require('./services/dist/GreetingService').GreetingService,
    jokeService = require('./services/dist/JokeService').JokeService,
    roomService = require('./services/dist/RoomService').RoomService,
    webexService = require('./services/dist/WebexService').WebexService;

const doPostRequest = async () => {
    const greeting = greetingService.getRandomGreeting();
    const rooms = roomService.getAllRooms();

    let joke;

    return new Promise(async (resolve, reject) => {

        try {
            joke = await jokeService.getRandomJoke();
            const webexResponses = [];

            for (let i = 0; i < rooms.length; i++) {
                const markDown = `## **${greeting}**\n\n### ${joke}`;
                const room = rooms[i];

                const response = await webexService.sendMessage(room.id, markDown)

                webexResponses.push(response);
            }

            resolve(webexResponses);
        } catch(e) {
            reject(e.message);
        }

    });
}

exports.handler = async (event) => {
    await doPostRequest()
        .then(result => console.log(`Status code: ${result}`))
        .catch(err => console.error(`Error doing the request for the event: ${JSON.stringify(event)} => ${err}`));
};

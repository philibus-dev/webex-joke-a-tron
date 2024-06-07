const https = require('https')

require('dotenv').config()

const jokeServices = [
    {
        options: {
            host: 'api.api-ninjas.com',
            path: '/v1/jokes',
            method: 'GET',
            headers: {
                'Accept': 'Accept: application/json',
                'User-Agent': 'FunWebexBot',
                'X-Api-Key': process.env.JOKE_API_SECRET
            }
        },
        process: (body) => {
            return body[0].joke;
        }
    }
];

exports.JokeService = {

    async getRandomJoke() {
        const jokeServiceIndex = 0;

        return new Promise((resolve, reject) => {
            const req = https.request(jokeServices[jokeServiceIndex].options, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    const bodyJSON = JSON.parse(body);
                    const joke = jokeServices[jokeServiceIndex].process(bodyJSON);

                    resolve(joke);
                });

            });

            req.on('error', (e) => {
                reject(e);
            });

            req.end();
        });

    }

} 

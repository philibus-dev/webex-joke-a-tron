import * as https from 'https'
import {JokeService} from "./models/Joke";

require('dotenv').config()

const jokeServices: JokeService[] = [
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
        process: (body: any) => {
            return body[0].joke;
        }
    }
];

exports.JokeService = {

    async getRandomJoke(): Promise<string> {
        const jokeServiceIndex: number = 0;

        return new Promise((resolve, reject) => {
            const req = https.request(jokeServices[jokeServiceIndex].options, (res) => {
                let body: string = '';

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

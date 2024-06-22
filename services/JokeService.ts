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
    },
    {
        options: {
            host: 'v2.jokeapi.dev',
            path: '/joke/Programming?type=single',
            method: 'GET',
            headers: {
                'Accept': 'Accept: application/json',
                'User-Agent': 'FunWebexBot'
            }
        },
        process: (body: any) => {
            return body.joke;
        }
    }
];

function isBadJoke(joke: string): boolean {
    const badWords: string[] = ['midget', 'chinese', 'alzheimer'];
    const hasBadWord: boolean = badWords.some(badWord => joke.toLowerCase().includes(badWord));

    console.log('hasBadWord: ', hasBadWord);

    return hasBadWord;
}

async function requestJoke(serviceIndex: number): Promise<string | Error> {
    return new Promise((resolve, reject) => {
        const req = https.request(jokeServices[serviceIndex].options, (res) => {
            let body: string = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                const bodyJSON = JSON.parse(body);
                const joke = jokeServices[serviceIndex].process(bodyJSON);

                resolve(joke);
            });

        });

        req.on('error', (e: Error) => {
            reject(e);
        });

        req.end();
    });
}

exports.JokeService = {

    async getRandomJoke() {
        const jokeServiceIndex: number = Math.floor(Math.random() * jokeServices.length);
        const maxTries = 3;

        console.log('jokeServiceIndex: ', jokeServiceIndex);

        let currTry = 0;
        let success = false;
        let joke: string | Error = '';

        while(!success && currTry < maxTries) {
            joke = await requestJoke(jokeServiceIndex);

            if (joke instanceof Error) {
                currTry++;
                continue;
            }

            if (isBadJoke(joke)) {
                joke = 'Sorry, this joke was not appropriate.';
                currTry++;
                continue;
            }

            success = true;
        }

        return joke;
    }

} 

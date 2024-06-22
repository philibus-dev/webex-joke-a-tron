"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
require('dotenv').config();
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
        process: (body) => {
            return body.joke;
        }
    }
];
function isBadJoke(joke) {
    const badWords = ['midget', 'chinese', 'alzheimer'];
    const hasBadWord = badWords.some(badWord => joke.toLowerCase().includes(badWord));
    console.log('hasBadWord: ', hasBadWord);
    return hasBadWord;
}
function requestJoke(serviceIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const req = https.request(jokeServices[serviceIndex].options, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    const bodyJSON = JSON.parse(body);
                    const joke = jokeServices[serviceIndex].process(bodyJSON);
                    resolve(joke);
                });
            });
            req.on('error', (e) => {
                reject(e);
            });
            req.end();
        });
    });
}
exports.JokeService = {
    getRandomJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const jokeServiceIndex = Math.floor(Math.random() * jokeServices.length);
            const maxTries = 3;
            console.log('jokeServiceIndex: ', jokeServiceIndex);
            let currTry = 0;
            let success = false;
            let joke = '';
            while (!success && currTry < maxTries) {
                joke = yield requestJoke(jokeServiceIndex);
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
        });
    }
};

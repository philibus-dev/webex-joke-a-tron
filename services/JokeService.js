const https = require('https');

const options = {
    host: 'backend-omega-seven.vercel.app',
    path: '/api/getjoke',
    method: 'GET',
    headers: {
        'Accept': 'Accept: text/plain',
        'User-Agent': 'FunWebexBot'
    }
};

exports.JokeService = {

    async getRandomJoke() {

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    const bodyJSON = JSON.parse(body)[0];

                    resolve(bodyJSON.question + '\n' + bodyJSON.punchline);
                });

            });

            req.on('error', (e) => {
                reject(e);
            });

            req.end();
        });

    }

} 

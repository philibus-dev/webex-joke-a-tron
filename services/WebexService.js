const https = require('https');

exports.WebexService = {

    sendMessage(roomId, markdown) {
        const postData = JSON.stringify({markdown, roomId});

        const postOptions = {
            host: 'webexapis.com',
            method: 'POST',
            port: 443,
            path: '/v1/messages',
            headers: {
                Authorization: ` Bearer ${process.env.BEARER_TOKEN}`,
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        }

        return new Promise((resolve, reject) => {

            const reqPost = https.request(postOptions, (res) => {
                let postBody;

                res.on('data', (data) => {
                    postBody += data;
                });

                res.on('end', () => {
                    resolve(postBody);
                });

                res.on('error', (err) => {
                    reject(err);
                });
            });

            reqPost.write(postData);

            reqPost.end();
        });

    }

}

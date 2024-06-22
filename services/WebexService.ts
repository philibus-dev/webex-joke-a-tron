import * as https from 'https'

interface WebExPostOptions {
    host: string;
    method: string;
    port: number;
    path: string;
    headers: {
        Authorization: string;
        'Content-Type': string;
        'Content-Length': number;
    }
}

exports.WebexService = {

    sendMessage(roomId: number, markdown: string): Promise<String | Error> {
        const postData = JSON.stringify({markdown, roomId});

        const postOptions: WebExPostOptions = {
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
                let postBody: string = '';

                res.on('data', (data: string) => {
                    postBody += data;
                });

                res.on('end', () => {
                    resolve(postBody);
                });

                res.on('error', (err: Error) => {
                    reject(err);
                });
            });

            reqPost.write(postData);

            reqPost.end();
        });

    }

}

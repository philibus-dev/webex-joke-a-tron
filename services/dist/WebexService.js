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
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
exports.WebexService = {
    sendMessage(roomId, markdown) {
        const postData = JSON.stringify({ markdown, roomId });
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
        };
        return new Promise((resolve, reject) => {
            const reqPost = https.request(postOptions, (res) => {
                let postBody = '';
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
};

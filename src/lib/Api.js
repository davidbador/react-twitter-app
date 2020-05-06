import axios from 'axios';

const baseURL = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com/';

export function getTweets() {
    return axios.get(`${baseURL}/tweet`);
};

export function sendTweet(msg) {
    return axios.post(`${baseURL}/tweet`, msg);
};

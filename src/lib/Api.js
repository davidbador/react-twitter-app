import axios from 'axios';

const baseURL = 'https://itc-bootcamp-19-dot-charcha-dev.appspot.com/';

export function getTweets() {
    return axios.get(`${baseURL}/tweet`);
};

export async function sendTweet(msg, cbTurnOffSpinner, cbDisplayError) {
    let response = await axios.post(`${baseURL}/tweet`, msg);
    try {
        cbTurnOffSpinner()
        return response
    } catch(error) {
        return cbDisplayError(error)
    }
};

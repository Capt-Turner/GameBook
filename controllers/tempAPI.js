import { response } from "express";
import fetch from "node-fetch";

// function getAPI(){
//     fetch(`https://api.igdb.com/v4`)
// }
 const clientID = "zdya2d3e1t6iad3gj9jkwjjg5fckfq";
 const clientSecret = "gwi6r93fp8oeals6n6f55khs6rxa8a";

function getToken(clientID, clientSecret){
    fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
}
getToken(clientID, clientSecret);

module.exports = getToken;

console.log("hello");

// async function pullToken (url = '') {
//     const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`)
//     .then((data) => {
//         console.log(data)
//         });
//     return response.json();
// }

// pullToken(`https://api.igdb.com/v4/`)
// .then((data) => {
// console.log(data)
// });
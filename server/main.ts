


const dotenv = require("dotenv");

const result = dotenv.config();

if(result.error) {
    throw result.error;
}

console.log("logged env" , result.parsed);


import {initServer} from './server';
initServer();
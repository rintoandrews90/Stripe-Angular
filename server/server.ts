
import * as express from 'express';
import { Application } from 'express';

import {createCheckoutSession} from './checkout.route'

export function initServer() {

    const app: Application = express();
    const bodyParser = require('body-parser');

    app.route("/").get((req, res) => {
        res.status(200).send("<h1> api running</h1>");
    });

    app.route("/api/checkout").post(bodyParser.json(), createCheckoutSession);

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
        console.log("server is up and running");
    });
}
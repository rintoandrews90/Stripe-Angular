

import { Request, Response } from "express";
import { Session } from "inspector";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface RequestInfo {
    courseId: string;
    callBackUrl: string
}

export async function createCheckoutSession(req: Request, res: Response) {


    try {
        const info : RequestInfo  = {
            courseId: req.body.courseId,
            callBackUrl:  req.body.callbackUrl
        }

        let sessionConfig;
        if(info.courseId) {
            sessionConfig = setupPurchaseCourseSession(info);
        }

        console.log(sessionConfig);
        const session =  await stripe.checkout.sessions.create(sessionConfig);

        console.log(Session);

        // const session = await stripe.checkout.sessions.create({
        //     success_url: 'https://example.com/success',
        //     cancel_url: 'https://example.com/cancel',
        //     payment_method_types: ['card'],
        //     line_items: [
        //         { quantity: 123, amount: 400, name: "rinto", currency: 'inr'},
        //     ],
        //     mode: 'payment',
        //   });

          console.log(session);
          console.log(sessionConfig);

        res.status(200).send({
            stripeCheckoutSessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY
        });
        
    } catch(error) {
        res.status(500).json({error:"eror"});
    }

    function setupPurchaseCourseSession(info: RequestInfo) {

        const config =  setupBaseSessionConfig(info);

        config.line_items = [
            { quantity: 123, 
                amount: 400, 
                name: "rinto", 
                currency: 'inr'},
        ]


        return config;
    }

    function setupBaseSessionConfig(info: RequestInfo) {

        const config: any = {
            payment_method_types: ['card'],
            success_url:`${info.callBackUrl}/?purchaseResult=success`,
            cancel_url: `${info.callBackUrl}/?purchaseResult=failed`,
            
        }
        return config;

    }
}
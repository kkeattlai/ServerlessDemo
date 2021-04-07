import express, { Request, Response, Next } from "express";

import { Authentication } from "model";

const sanitize = (key: String) => {
    return key?.split(" ")[1];
};

export const authentication = async (request: Request, response: Response, next: Next) => {
    if (!await Authentication.findOne({ api_token: sanitize(request.headers.authorization) }).exec()) {
        response.status(401).send({
            type: `${request.method} ${request.path}`,
            error: "User is not authorized to access the contents."
        }); 
    } else {
        next();
    }
};
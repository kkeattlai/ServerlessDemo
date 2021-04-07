import express, { Request, Response } from "express";

import _ from "lodash";
import uuid4 from "uuid4";

import { Authentication, parseAuthentication } from "model";

const router = express.Router();

router.post("/create", async (request: Request, response: Response) => {
    try {
        const result = await new Authentication({ ...request.body, api_token: uuid4() }).save();

        response.status(201).send({
            type: `${request.method} ${request.path}`,
            data: parseAuthentication(result)
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.delete("/remove", async (request: Request, response: Response) => {
    try {
        const result = await Authentication.findByIdAndDelete(request.body._id);

        response.status(204).send({
            type: `${request.method} ${request.path}`,
            message: `Successfully delete document ${result._id}.`
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.delete("/remove-all", async (request: Request, response: Response) => {
    try {
        const result = await Authentication.deleteMany({});

        response.status(204).send({
            type: `${request.method} ${request.path}`,
            message: `Successfully bulk delete all document.`
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

export default router;
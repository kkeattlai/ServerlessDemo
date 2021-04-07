import express, { Request, Response } from "express";

import _ from "lodash";

import { Movies, parseMovie, parseMovies } from "model";
import mongoose from "mongoose";

const router = express.Router();

const movies = [
    {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 1",
        price: 1900,
        episode: 22,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 2",
        price: 2000,
        episode: 23,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 3",
        price: 2400,
        episode: 23,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 4",
        price: 2700,
        episode: 22,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 5",
        price: 2900,
        episode: 22,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 6",
        price: 2700,
        episode: 18,
        length: 1380
    }, {
        _id: mongoose.Types.ObjectId(),
        name: "Brooklyn 99 - Season 7",
        price: 3900,
        episode: 13,
        length: 1380
    }
];

router.get("/movies", async (request: Request, response: Response) => {
    try {
        if (_.isEmpty(request.query)) {
            response.status(200).send({
                type: `${request.method} ${request.path}`,
                data: parseMovies(await Movies.find().exec())
            });
        } else {
            response.status(200).send({
                type: `${request.method} ${request.path}`,
                data: parseMovies(await Movies.find().sort({ [ request.query.sort_by ]: parseInt(request.query.order) }).exec())
            });
        }
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.get("/movie/:id", async (request: Request, response: Response) => {
    try {
        response.status(200).send({
            type: `${request.method} ${request.path}`,
            data: parseMovie(await Movies.findById(request.params.id).exec())
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.post("/movie", async (request: Request, response: Response) => {
    try {
        const result = await new Movies(request.body).save();

        response.status(201).send({
            type: `${request.method} ${request.path}`,
            data: parseMovie(result)
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.delete("/movie", async (request: Request, response: Response) => {
    try {
        const result = await Movies.findByIdAndDelete(request.body._id);

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

router.post("/movies/bulk", async (request: Request, response: Response) => {
    try {
        const bulkmovies = await Promise.all(movies.map(async movie => {
            const result = await new Movies(movie).save();

            if (result) {
                return { _id: movie._id, name: movie.name, uploaded: true };
            } else {
                return false;
            }
        }));
        
        response.status(200).send({
            type: `${request.method} ${request.path}`,
            bulkmovies
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

router.delete("/movies/bulk", async (request: Request, response: Response) => {
    try {
        await Movies.deleteMany({});
        
        response.status(200).send({
            type: `${request.method} ${request.path}`,
            message: "Successfully bulk delete collection Movies."
        });
    } catch (error) {
        response.status(500).send({
            type: `${request.method} ${request.path}`,
            error: error.message
        });
    }
});

export default router;
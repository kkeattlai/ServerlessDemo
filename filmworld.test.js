// import axios from "axios";
const axios = require("axios");
const dotenv = require("dotenv");
const ObjectID = require("mongoose").Types.ObjectId;

dotenv.config();

const api = axios.create({
    baseURL: "http://localhost:3000/dev/v1/api/filmworld",
    headers: {
        "Authorization": `Bearer ${process.env.API}`
    }
});

describe("Get all movies", () => {
    test("Testing endpoint 'GET /filmworld/movies'", async () => {
        await api.get("/movies").then(({ status }) => {
            expect(status).toBe(200);
        }).catch(error => {
            fail(error.message);
        });
    });
});

const _id = ObjectID();

describe("Create a new movie", () => {
    test("Testing endpoint 'POST /filmworld/movie'", async () => {
        await api.post("/movie", {
            _id,
            name: "Brooklyn 99 - Season 7",
            price: 3900,
            episode: 13,
            length: 1380
        }).then(({ status }) => {
            expect(status).toBe(201);
        }).catch(error => {
            fail(error.message);
        });
    });
});

describe("Get a new movie by id", () => {
    test(`Testing endpoint 'GET /filmworld/movie/${_id}'`, async () => {
        await api.get(`/movie/${_id}`).then(({ status }) => {
            expect(status).toBe(200);
        }).catch(error => {
            fail(error.message);
        });
    });
});

describe("Delete a movie", () => {
    test("Testing endpoint 'DELETE /filmworld/movie'", async () => {
        await api.delete("/movie", {
            data: { _id }
        }).then(({ status }) => {
            expect(status).toBe(204);
        }).catch(error => {
            fail(error.message);
        });
    });
});
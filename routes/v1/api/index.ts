import express, { Request, Response, Next } from "express";

import admin from "./admin/index";
import filmworld from "./filmworld/index";
import cinemaworld from "./cinemaworld/index";

const router = express.Router();

router.use("/admin", admin);
router.use("/filmworld", filmworld);
router.use("/cinemaworld", cinemaworld);

router.get("/", (request, response) => {
    response.status(200).send({ message: "Successful." });
});

export default router;
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

// Importing routes.
import v1 from "./routes/v1";

const app = express();
const json = express.json();

app.use(json);
app.use(cors());
app.use("/v1", v1);

export const handler = serverless(app);
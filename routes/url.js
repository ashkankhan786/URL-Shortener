import express from "express";
const router = express.Router();
import { handleGetUrlShortId, handleRedirectToUrl } from "../controller/url.js";

router.post("/", handleGetUrlShortId).get("/:id", handleRedirectToUrl);

export { router };

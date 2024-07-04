import express from "express";
import { Url } from "../model/url.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await Url.find({});
  res.render("home", {
    Url: urls,
  });
});

export { router };

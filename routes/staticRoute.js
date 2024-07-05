import express from "express";
import { Url } from "../model/url.js";
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const urls = await Url.find({ createdBy: req.user._id });
  res.render("home", {
    Url: urls,
  });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

export { router };

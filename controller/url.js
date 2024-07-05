import { Url } from "../model/url.js";
import { nanoid } from "nanoid";

async function handleGetUrlShortId(req, res) {
  const body = req.body;
  if (!body.Url) res.status(400).send("Url required");
  const shortID = nanoid(10);
  const result = await Url.create({
    shortID: shortID,
    redirectUrl: body.Url,
    visits: [],
    createdBy: req.user._id,
  });
  const urls = await Url.find({ createdBy: req.user._id });
  res.render("home", {
    Url: urls,
  });
}

async function handleRedirectToUrl(req, res) {
  const id = req.params.id;
  const url = await Url.findOneAndUpdate(
    { shortID: id },
    {
      $push: {
        visits: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(url.redirectUrl);
}

export { handleGetUrlShortId, handleRedirectToUrl };

import express from "express";
import { connectDB } from "./connect.js";
import { router as Urlrouter } from "./routes/url.js";
import { router as UserRouter } from "./routes/user.js";
import { router as StaticRouter } from "./routes/staticRoute.js";
import { restricToLoggedInUserOnly, checkAuth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB(process.env.DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, StaticRouter);

app.use("/Url", restricToLoggedInUserOnly, Urlrouter);

app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});

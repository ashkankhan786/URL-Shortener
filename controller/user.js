import User from "../model/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  const result = await User.create({
    name: name,
    email: email,
    password: password,
  });
  if (result) {
    res.redirect("/login");
  }
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const result = await User.findOne({ email, password });
  if (!result) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, result);
  res.cookie("uid", sessionId);
  res.redirect("/");
}
export { handleUserSignUp, handleUserLogIn };

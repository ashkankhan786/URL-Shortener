import User from "../model/user.js";
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

  const token = setUser(result);
  res.cookie("uid", token);
  res.redirect("/");
}
export { handleUserSignUp, handleUserLogIn };

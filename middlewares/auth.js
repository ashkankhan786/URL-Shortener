import { getUser } from "../service/auth.js";

async function restricToLoggedInUserOnly(req, res, next) {
  const uid = req.cookies.uid;
  if (!uid) return res.redirect("/login");
  const user = getUser(uid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const uid = req.cookies.uid;
  if (!uid) {
    req.user = null;
  }
  try {
    const user = getUser(uid);
    req.user = user;
  } catch (error) {
    console.log("Error at CheckAuth" + error);
  }

  next();
}
export { restricToLoggedInUserOnly, checkAuth };

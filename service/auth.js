import jwt from "jsonwebtoken";
const secret = "Ashkan@123$";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Error at Service/Auth " + error);
  }
}

export { setUser, getUser };

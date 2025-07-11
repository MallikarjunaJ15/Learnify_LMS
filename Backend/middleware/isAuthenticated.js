import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unathorized user", sucess: false });
    }
    const decode = await jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token", sucess: false });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default isAuthenticated;

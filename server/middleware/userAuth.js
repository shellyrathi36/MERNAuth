import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      if (!req.body) req.body = {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized, Login again",
      });
    }
    next(); //excueting the conrtoller function verifyotp walaa kyuki usi mai hme userid chahiye tha na
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;

const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // console.log(req.headers)
    const token = req.cookies.token || req.header("authorization")?.replace("Bearer ","");

    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "Please login .....",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("error auth", err.message);
        return res.status(401).json({
          message: "Invalid or expired token.",
          error: true,
          success: false,
        });
      }

      console.log("decoded", decoded);
      req.userId = decoded?._id;

      if (!req.userId) {
        return res.status(400).json({
          message: "Invalid token data.",
          error: true,
          success: false,
        });
      }

      next();
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;

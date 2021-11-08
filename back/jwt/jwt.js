const jwt = require("jsonwebtoken");
require("dotenv").config();

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }
  const matches = authorization.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const TokenMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);
  console.log("HEADERS", req.headers);
  console.log("TOKEN:", token);
  if (!token) {
    return res.status(401).json({ message: "ho le petit malin" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    console.log("ERR TOKEN", err);
    console.log("DECODE TOKEN", decodedToken);
    if (err) {
      return res.status(401).json({ message: "Bad token" });
    }
    next();
  });
};

module.exports = TokenMiddleware;

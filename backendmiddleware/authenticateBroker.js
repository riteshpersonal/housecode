const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log(req)
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
    if (!req.headers.authorization) {
      console.log("Authorization header missing");
      return res.status(401).send(`Unauthorized`);
    }
   
    const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Broker authenticated:", { _id});

    req.userId = _id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).send(`Unauthorized LOGIN OR SIGNUP`);
  }
};

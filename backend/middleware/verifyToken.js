import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.auth_token;
  // console.log("cookies: ", token);
  try {
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });

    const decoded= jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

    // console.log("decoded.userId: ", decoded.userId);
    
    req.userId= decoded.userId
    next()
  } catch (error) {
    console.log("error in verifyToken controller", error);
    res.status(500).json({ error: "internal server error" });
  }
};
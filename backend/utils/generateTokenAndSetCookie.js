
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
  
  try {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})
    res.cookie("auth_token", token,{
      httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    // return token
    
  } catch (error) {
    console.log("error in generateTokenAndSetCookie controller", error);
    res.status(500).json({ error: "internal server error" });
  }
};
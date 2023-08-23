import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModels.js";

// @desc Authenticated user & get token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn: "360d"
  },  
//   function(err, token) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(token);
//     }
// }
);
};

// protection middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists in headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from Bearer token in header
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("receivetoken", token)
      // verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
      // get user id from decoded token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      // console.error("JWT Verification Error:",error);
      console.error(error)
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  // if token doesn't exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { generateToken, protect, admin };


// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/UserModels.js";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "360d",
//   });
// };

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       // Verify token using the correct algorithm and JWT secret
//       const decoded = jwt.verify(token, process.env.JWT_SECRET, {
//         algorithms: ["HS256"], // Use the appropriate algorithm
//       });
      
//       // Get user id from decoded token
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.error("JWT Verification Error:", error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }
  
//   // If token doesn't exist in headers, send an error
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not authorized as an admin");
//   }
// };

// export { generateToken, protect, admin };

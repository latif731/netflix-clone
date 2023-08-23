import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import "dotenv/config.js";
import mongoose from "mongoose";
import http from "http";
import userRouter from "./routes/UserRouter.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import movieRouter from './routes/MoviesRouter.js';
import categoryRouter from "./routes/CategoriesRouter.js"
import Uploadrouter from "./controllers/UploadFile.js";

const app = express();
app.use(cors());
app.use(express.json());
// connect DB

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust the domain accordingly
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

connectDB();

// *************** MAIN ROUTE ***************
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Server running  in http://localhost:${PORT}`);
});

// ***************** ERROR HANDLING MIDDLEWARE ***********
app.use(errorHandler);

//*************** OTHER ROUTES ************
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/upload", Uploadrouter);


// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Mongodb connected");
//     server.listen(port, () => {
//       console.log(`Server is listenig on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log({ err });
//     process.exit(1);
//   });

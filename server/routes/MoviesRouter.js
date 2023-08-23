import express from "express";
import {
  addLikedMovie,
  changeUserPassword,
  deleteLikedMovies,
  deleteUser,
  deleteUserProfile,
  getLikedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/UserController.js";
import { protect, admin } from "../middlewares/auth.js";
import { createMovie, createMovieReview, deleteAllMovies, deleteMovie, getMovieById, getRandomMovies, getTopRatedMovies, importMovies, updateMovie } from "../controllers/MoviesController.js";
import {getMovies} from "../controllers/MoviesController.js"

const router = express.Router();

// ******************* PUBLIC ROUTES *******************
router.post("/import", importMovies);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);

// ***************** PRIVATE ROUTES *******************
router.post("/:id/reviews",protect, createMovieReview)

// ************** ADMIN ROUTES *********************
router.put("/:id", protect, admin, updateMovie) 
router.delete("/:id", protect, admin, deleteMovie) 
router.delete("/", protect, admin, deleteAllMovies) 
router.post("/", protect, admin, createMovie) 
 
export default router;

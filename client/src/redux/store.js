import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit"
import { adminDeleteUserReducer, adminGetAllUsersReducer, userChangePasswordReducer, userDeleteFavoriteMoviesReducer, userDeleteProfileReducer, userGetFavoriteMoviesReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userLikeMovieReducer } from "./reducer/userReducer";
import { createCategoryReducer, deleteCategoryReducer, getAllCategoriesReducer, updateCategoryReducer } from "./reducer/categoriesReducer";
import { getAllMovies, getAllMoviesReducer, getMoviesByIdReducer, getMoviesRandomReducer, getTopRatedReducer, createReviewReducer, deleteMovieReducer, deleteAllMoviesReducer, createMoviesReducer, CastReducer, updateMovieReducer } from "./reducer/movieReducer";


const rootReducer = combineReducers({
    // user Reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDeleteProfile: userDeleteProfileReducer,
    userChangePassword: userChangePasswordReducer,
    userGetFavoriteMovies: userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies: userDeleteFavoriteMoviesReducer,
    userGetAllUsers: adminGetAllUsersReducer,
    userDeleteUsers:adminDeleteUserReducer,
    userLikeMovie: userLikeMovieReducer,

    // Category reducers
    categoryGetAll: getAllCategoriesReducer,
    categoryCreate: createCategoryReducer,
    categoryUpdate: updateCategoryReducer,
    categoryDelete: deleteCategoryReducer,


    // movie reducers  
    getAllMovies: getAllMoviesReducer,
    getRandomMovies: getMoviesRandomReducer,
    getMovieById: getMoviesByIdReducer, 
    getTopRatedMovie: getTopRatedReducer,
    createReview: createReviewReducer,
    deleteMovie: deleteMovieReducer,
    deleteAllMovies: deleteAllMoviesReducer,
    createMovie: createMoviesReducer,
    casts: CastReducer,
    updateMovie: updateMovieReducer
})

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// initialState
const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
})
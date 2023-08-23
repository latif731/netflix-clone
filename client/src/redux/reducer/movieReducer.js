import { propTypesDefaultValue } from "@material-tailwind/react/types/components/slider"
import * as moviesConstant from "../constans/movieConstant"

// GET ALL MOVIES
// export const getAllMoviesReducer = (state = {movies: []}, action) => {
//     switch(action.type){
//         case moviesConstant.MOVIES_LIST_REQUEST:
//             return { isLoading: true, movies:[] }
//         case moviesConstant.MOVIES_LIST_SUCCESS:
//             return { isLoading: false, 
//                      movies: action.payload.movies, 
//                      pages: action.payload.pages,
//                       page: action.payload.page,
//                      totalMovies:action.payload.totalMovies,
//                    }
//         case moviesConstant.MOVIES_LIST_FAIL:
//             return { isLoading:false, error: action.payload }
//         default:
//             return state;
//     }
// }
// movieReducer.js
const initialState = {
    isLoading: false,
    movies: [],
    pages: 0,
    page: 0,
    totalMovies: 0,
    category: "", // Set a default value for category
    error: null,
  };
  
  export const getAllMoviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case moviesConstant.MOVIES_LIST_REQUEST:
        return { ...state, isLoading: true };
      case moviesConstant.MOVIES_LIST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          movies: action.payload.movies,
          pages: action.payload.pages,
          page: action.payload.page,
          totalMovies: action.payload.totalMovies,
        };
      case moviesConstant.MOVIES_LIST_FAIL:
        return { ...state, isLoading: false, error: false };
      default:
        return state;
    }
  };
  


// get random movie
export const getMoviesRandomReducer = (state = {movies: []}, action) => {
    switch(action.type){
        case moviesConstant.MOVIES_RANDOM_REQUEST:
            return { isLoading: true }
        case moviesConstant.MOVIES_RANDOM_SUCCESS:
            return { isLoading: false, movies: action.payload }
        case moviesConstant.MOVIES_RANDOM_FAIL:
            return { isLoading:false, isError: action.payload }
        default:
            return state;
    }
}

// get movie by id
export const getMoviesByIdReducer = (state = { movie: {} }, action) => {
    switch(action.type){
        case moviesConstant.MOVIES_DETAILS_REQUEST:
            return { isLoading: true }
        case moviesConstant.MOVIES_DETAILS_SUCCESS:
            return { isLoading: false, movie: action.payload }
        case moviesConstant.MOVIES_DETAILS_FAIL:
            return { isLoading:false, isError: action.payload }
        case moviesConstant.MOVIES_DETAILS_RESET:
            return { movie:{} };
        default:
            return state;
    }
}

// get top rated movie
export const getTopRatedReducer = (state= { movies:[] }, action) => {
    switch(action.type){
        case moviesConstant.MOVIES_TOP_RATED_REQUEST:
            return { isLoading: true };
        case moviesConstant.MOVIES_TOP_RATED_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case moviesConstant.MOVIES_TOP_RATED_FAIL:
            return { isLoading:false, isError: action.payload };
        default:
        return state
    }
}

// CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
    switch(action.type){
        case moviesConstant.CREATE_REVIEW_REQUEST:
            return { isLoading: true }
        case moviesConstant.CREATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case moviesConstant.CREATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload}
        case moviesConstant.CREATE_REVIEW_RESET:
            return {};
            default:
                return state
    }
}

// DELETE MOVIE
export const deleteMovieReducer =  ( state={}, action)=>{
    switch(action.type){
        case moviesConstant.DELETE_MOVIES_REQUEST:
            return{isLoading :true};
        case moviesConstant.DELETE_MOVIES_SUCCESS:
            return{ isLoading: false, isSuccess: action.payload};
        case moviesConstant.DELETE_MOVIES_FAIL:
            return {isLoading: false, isError: false }
        default:
            return state
    }
}

// DELETE ALL MOVIE
export const deleteAllMoviesReducer =(state={}, action)=> {
    switch(action.type ){
        case moviesConstant.DELETE_ALL_MOVIES_REQUEST:
            return { isLoading: true };
        case moviesConstant.DELETE_ALL_MOVIES_SUCCESS:
            return { isLoading: false ,isSuccess: action.payload};
        case moviesConstant.DELETE_ALL_MOVIES_FAIL:
            return { isLoading: false,isError: false};
        default:
            return state;
    }
}

// CREATE MOVIE
export const createMoviesReducer =(state={}, action)=> {
    switch(action.type ){
        case moviesConstant.CREATE_MOVIE_REQUEST:
            return { isLoading: true };
        case moviesConstant.CREATE_MOVIE_SUCCESS:
            return { isLoading: false ,isSuccess: true};
        case moviesConstant.CREATE_MOVIE_FAIL:
            return { isLoading: false,isError: action.payload};
        case moviesConstant.CREATE_MOVIE_RESET:
            return {};
        default:    
            return state;
    }
}

// CAST
export const CastReducer =(state = { casts: [] }, action)=> {
    switch(action.type ){
        case moviesConstant.ADD_CAST:
            return { casts: [...state.casts, action.payload] };
        case moviesConstant.EDIT_CAST:
            const updatedCast = state.casts.map((cast) => cast.id === action.payload.id ? action.payload : cast)
            return {
                updatedCast,
            }
        case moviesConstant.DELETE_CAST:
            return { ...state, casts: state.casts.filter((cast) => cast.id !== action.payload)};
        case moviesConstant.RESET_CAST:
            return { casts:[] };
        default:
            return state;
    }
}

// UPDATE MOVIE
export const updateMovieReducer = (state = {}, action) => {
    switch(action.type){
        case moviesConstant.UPDATE_MOVIE_REQUEST:
            return { isLoading :true  }
        case moviesConstant.UPDATE_MOVIE_SUCCESS:
            return { isLoading:false, isSuccess: true };
        case moviesConstant.UPDATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload }
        case moviesConstant.UPDATE_MOVIE_RESET:
            return {};
            default:
                return state
    }
}




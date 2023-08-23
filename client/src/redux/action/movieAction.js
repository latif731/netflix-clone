import * as movieConstant from "../constans/movieConstant"
import * as moviesApi from "../Apis/moviesServices"
import toast from "react-hot-toast"
import { ErrorsAction, tokenProtection } from "../protections"
import { number } from "yup"


// get all movies action
export const getAllMoviesAction = ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
})  => async(dispatch) => {
    try{
        dispatch({type: movieConstant.MOVIES_LIST_REQUEST})
        const response = await moviesApi.getAllMoviesService(
            category,
            time,
            language,
            rate,
            year,
            search,
            pageNumber,
        )
        console.log("movieAction",response)
        dispatch({ type: movieConstant.MOVIES_LIST_SUCCESS, payload: response })
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.MOVIES_LIST_FAIL)
    }
} 

// get random movies action
export const getRandomMoviesAction = () =>  async (dispatch) => {
    try{
        dispatch({ type: movieConstant.MOVIES_RANDOM_REQUEST });
        const response = await moviesApi.getRandomMoviesService();
        dispatch({
            type: movieConstant.MOVIES_RANDOM_SUCCESS,
            payload: response,
        })
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.MOVIES_RANDOM_FAIL);
    }
}

// get movie by id action 
export const getMovieByIdAction = (id) => async (dispatch) => {
    try{
        dispatch({ type:movieConstant.MOVIES_DETAILS_REQUEST });
        const response = await moviesApi.getMovieByIdService(id);
        dispatch({
            type: movieConstant.MOVIES_DETAILS_SUCCESS,
            payload: response,
        })
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.MOVIES_DETAILS_FAIL);
    }
}

//  get top rated movie action 
export const getMovieTopRatedAction = () => async (dispatch) => {
    try{
        dispatch({ type:movieConstant.MOVIES_TOP_RATED_REQUEST });
        const response = await moviesApi.getTopRatedMovieService();
        dispatch({
            type: movieConstant.MOVIES_TOP_RATED_SUCCESS,
            payload: response,
        })
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.MOVIES_TOP_RATED_FAIL);
    }
}

// review movie action 
export const reviewMovieAction = ({id, review}) => async (dispatch, getState) => {
    try{
        dispatch({ type: movieConstant.CREATE_REVIEW_REQUEST });
        const response = await moviesApi.reviewMovieService(
            tokenProtection(getState),
            id,
            review
        )
        dispatch({
            type: movieConstant.CREATE_REVIEW_SUCCESS,
            payload: response
        })
        toast.success("Review added successfully")  
        dispatch({ type: movieConstant.CREATE_REVIEW_RESET })
        dispatch(getMovieByIdAction(id))
    } catch (error){
        ErrorsAction(error, dispatch, movieConstant.CREATE_REVIEW_FAIL)
    }
}

// delete movie action
export const deleteMovieAction= (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: movieConstant.DELETE_MOVIES_REQUEST });
        const response = await moviesApi.deleteMovieService(
            tokenProtection(getState),
            id
        )
        dispatch({
            type : movieConstant.DELETE_MOVIES_SUCCESS ,
            payload:response,
        })
        toast.success('Movie deleted successfully')
        dispatch(getAllMoviesAction())
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.DELETE_MOVIES_FAIL );
    }
}

// delete all movies action
export const deleteAllMoviesAction = () => async(dispatch, getState) => {
    try{
        dispatch({type: movieConstant.DELETE_ALL_MOVIES_REQUEST})
        const response = await moviesApi.deleteAllMovieService(
            tokenProtection(getState)
        )
        dispatch({
            type:movieConstant.DELETE_ALL_MOVIES_SUCCESS,
            payload:response
        })
        toast.success("All movies deleted successfully")
        dispatch(getAllMoviesAction({}))
    }catch(error){
        ErrorsAction(error, dispatch,movieConstant.DELETE_ALL_MOVIES_FAIL);
    }
}

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) =>  {
    try{
        dispatch({ type: movieConstant.CREATE_MOVIE_REQUEST })
        const response = await moviesApi.createMovieService(
            tokenProtection(getState), 
            movie
        )
        dispatch({
            type: movieConstant.CREATE_MOVIE_SUCCESS,
            payload:response
        })
        toast.success("Movie created successfully");
        // dispatch(getAllMoviesAction({}))
    }catch(error){
        ErrorsAction( error, dispatch, movieConstant.CREATE_MOVIE_FAIL )
    }
}

// update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
    try{
        dispatch({ type: movieConstant.UPDATE_MOVIE_REQUEST });
        const response = await moviesApi.updateMovieService(
            tokenProtection(getState),
            id,
            movie
        )
        dispatch({
            type : movieConstant.UPDATE_MOVIE_SUCCESS ,
            payload: response
        })
        toast.success("Movie update successfully");
        dispatch(getMovieByIdAction(id))
        dispatch(deleteAllCastAction())
    }catch(error){
        ErrorsAction(error, dispatch, movieConstant.UPDATE_MOVIE_FAIL );
    }
}




// ============== CAST ================

// add cast
export const addCastsAction = (cast) => async (dispatch, getState)=>{
    dispatch({ type: movieConstant.ADD_CAST, payload: cast});
    localStorage.setItem("cast", JSON.stringify(getState().casts.cast)); 
}

// remove cast
export const removeCastAction = (id) => async (dispatch, getState) =>  {
    dispatch({ type: movieConstant.DELETE_CAST, payload: id });
    localStorage.setItem("casts", JSON.stringify(getState().casts.casts))
}

// update cast
export const updateCastAction = (cast) => async(dispatch,getState) => {
    dispatch({ type: movieConstant.EDIT_CAST, payload: cast });
    localStorage.setItem('cast',JSON.stringify(...getState().casts));
}

// delete cast
export const deleteAllCastAction = () =>  async (dispatch) => {
    dispatch({ type: movieConstant.RESET_CAST })
    localStorage.removeItem("casts")
}
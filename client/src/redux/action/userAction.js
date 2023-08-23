import * as userConstant from "../constans/userConstant"
import * as userApi from "../Apis/userService"
import toast from "react-hot-toast"
import { ErrorsAction } from "../protections";
import { tokenProtection } from "../protections";

// login action
const loginAction = (data) =>  async (dispatch) => {
    try{
        dispatch({ type: userConstant.USER_LOGIN_REQUEST });
        // Simulate an API call delay of 1 second
        setTimeout(async() => {
            try{
                const response = await userApi.loginService(data);
                dispatch({ type: userConstant.USER_LOGIN_SUCCESS, payload: response });
                // toast.success("Login Successful")
            }catch(error){
                // dispatch({ type: userConstant.USER_LOGIN_FAIL, payload: error})
                // toast.error(error)
                ErrorsAction(error, dispatch, userConstant.USER_LOGIN_FAIL);
            }
        },2000) // Delay for 2 second
    }catch(error){
        // dispatch({ type: userConstant.USER_LOGIN_FAIL, payload: error })
        // toast.error(error)
        console.error("Error in LoginActions", error)
    }
}

// register action
const registerAction = (data) =>  async (dispatch) => {
    try{
        dispatch({ type: userConstant.USER_REGISTER_REQUEST });
        const response = await userApi.registerService(data);
        dispatch({ type: userConstant.USER_REGISTER_SUCCESS, payload: response }) ;
        dispatch({ type: userConstant.USER_LOGIN_SUCCESS, payload: response }) ;
        // toast.success("Login Successfull")
     }catch(error){
        // dispatch({ type: userConstant.USER_LOGIN_FAIL, payload: error })
        // toast.error(error)
        ErrorsAction(error, dispatch, userConstant.USER_REGISTER_FAIL)
    }
}

// logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstant.USER_LOGOUT }) 
    dispatch({ type: userConstant.USER_LOGIN_RESET }) 
    dispatch({ type: userConstant.USER_REGISTER_RESET }) 
}

// Update profile action
const updateProfileAction = (user) => async (dispatch, getState) =>  {
    try{
        dispatch({ type: userConstant.USER_UPDATE_PROFILE_REQUEST});
        const response = await userApi.updateProfileService(user, tokenProtection(getState));
        dispatch({
            type: userConstant.USER_UPDATE_PROFILE_SUCCESS,
            payload: response
        }) 
        toast.success("Profile Updated")
        dispatch({
            type: userConstant.USER_LOGIN_SUCCESS,
            payload: response
        })
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.USER_UPDATE_PROFILE_FAIL)
    }
}

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) =>  {
    try{
        dispatch({ type: userConstant.USER_DELETE_PROFILE_REQUEST});
        await userApi.deleteProfileService(tokenProtection(getState));
        dispatch({type: userConstant.USER_DELETE_PROFILE_SUCCESS}) 
        toast.success("Profile Deleted")
        dispatch(logoutAction())
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.USER_DELETE_PROFILE_FAIL)
        dispatch({ type: userConstant.USER_DELETE_PROFILE_RESET})
    }
}

//change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try{
        dispatch({ type: userConstant.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(
            passwords,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstant.USER_CHANGE_PASSWORD_SUCCESS,
            payload: response,
        })
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.USER_CHANGE_PASSWORD_FAIL)
    }
}

// get all favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try{
        dispatch({ type: userConstant.GET_FAVORITE_MOVIES_REQUEST});
        const response = await userApi.getFavoriteMoviesService(
            tokenProtection(getState),
        );
        dispatch({
            type :userConstant.GET_FAVORITE_MOVIES_SUCCESS,
            payload:response,
        })
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.DELETE_FAVORITE_MOVIES_FAIL)
    }
}

// delete all favorite movies
const deleteAllFavoriteMovieAction = ()  => async (dispatch, getState ) => {
    try{
        dispatch({ type: userConstant.DELETE_FAVORITE_MOVIES_REQUEST})
        await userApi.deleteFavoriteMoviesService(tokenProtection(getState))
        dispatch({
            type: userConstant.DELETE_FAVORITE_MOVIES_SUCCESS,
        })
        toast.success("Favorite Movies Deleted")
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.DELETE_FAVORITE_MOVIES_FAIL)
    }
}

// admin get all users action
const getAllUsersAction = () => async(dispatch, getState) => {
    try{
        dispatch({ type: userConstant.GET_ALL_USERS_REQUEST });
        const response = await userApi.getAllUsersService(tokenProtection(getState));
        dispatch({
            type: userConstant.GET_ALL_USERS_SUCCESS,
            payload: response,
        });
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.GET_ALL_USERS_FAIL);
    }
}

// admin delete user action
const deleteUserAction = (id) => async(dispatch, getState) => {
    try{
        dispatch({ type: userConstant.DELETE_USERS_REQUEST })
        await userApi.deleteUserService(id, tokenProtection(getState));
        dispatch ({
            type :userConstant.DELETE_USERS_SUCCESS
        })
        toast.success("User Deleted")
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.DELETE_USERS_FAIL);
    }
}

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try{
        dispatch({ type: userConstant.USER_LIKE_MOVIE_REQUEST });
        const response = await userApi.likeMovieService(
            movieId,
            tokenProtection(getState)
        )
        dispatch({
            type  : userConstant.USER_LIKE_MOVIE_SUCCESS ,
            payload   : response
        })
        toast.success("added to your favorites")
        dispatch(getFavoriteMoviesAction())
    }catch(error){
        ErrorsAction(error, dispatch, userConstant.USER_LIKE_MOVIE_FAIL)
    }
} 

export { 
    loginAction, 
    registerAction, 
    logoutAction, 
    updateProfileAction, 
    deleteProfileAction, 
    changePasswordAction, 
    getFavoriteMoviesAction, 
    deleteAllFavoriteMovieAction,
    getAllUsersAction,
    deleteUserAction,
    likeMovieAction
}
import * as UserConstant from "../constans/userConstant"

//LOGIN 

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case UserConstant.USER_LOGIN_REQUEST:
            return { isLoading : true};
        case UserConstant.USER_LOGIN_SUCCESS:
            return {isLoading: false, userInfo: action.payload, isSuccess: true};
        case UserConstant.USER_LOGIN_FAIL:
            return { isLoading: false, isError: action.payload};
        case UserConstant.USER_LOGIN_RESET:
            return {};
        case UserConstant.USER_LOGOUT:
            return {};
        default: 
        return state;
    }
}

// REGISTER

export const userRegisterReducer = (state= {}, action) => {
    switch(action.type){
        case UserConstant.USER_REGISTER_REQUEST:
            return { isLoading: true, }
        case UserConstant.USER_LOGIN_SUCCESS:
            return {isLoading: false, userInfo: action.payload, isSuccess: true};
        case UserConstant.USER_REGISTER_FAIL:
            return { isLoading: false, iseError: action.payload};
        case UserConstant.USER_REGISTER_RESET:
            return {};
        default:
            return state
    }
}

// UPDATE PROFILE

export const userUpdateProfileReducer = (state= {}, action) => {
    switch(action.type){
        case UserConstant.USER_UPDATE_PROFILE_REQUEST:
            return { isLoading: true, }
        case UserConstant.USER_UPDATE_PROFILE_SUCCESS:
            return {isLoading: false, userInfo: action.payload, isSuccess: true};
        case UserConstant.USER_UPDATE_PROFILE_FAIL:
            return { isLoading: false, iseError: action.payload};
        case UserConstant.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state
    }
}


// DELETE PROFILE
export const userDeleteProfileReducer = (state= {}, action) => {
    switch(action.type){
        case UserConstant.USER_DELETE_PROFILE_REQUEST:
            return { isLoading: true, }
        case UserConstant.USER_DELETE_PROFILE_SUCCESS:
            return {isLoading: false, isSuccess: true};
        case UserConstant.USER_DELETE_PROFILE_FAIL:
            return { isLoading: false, iseError: action.payload};
        case UserConstant.USER_DELETE_PROFILE_RESET:
            return {};
        default:
            return state
    }
}


// CHANGE PASSWORD
export const userChangePasswordReducer = (state= {}, action) => {
    switch(action.type){
        case UserConstant.USER_CHANGE_PASSWORD_REQUEST:
            return { isLoading: true, }
        case UserConstant.USER_CHANGE_PASSWORD_SUCCESS:
            return {isLoading: false, isSuccess: true, message: action.payload.message};
        case UserConstant.USER_CHANGE_PASSWORD_FAIL:
            return { isLoading: false, iseError: action.payload};
        case UserConstant.USER_CHANGE_PASSWORD_RESET:
            return {}; 
        default:
            return state
    }
}

// GET FAVORITE MOVIES
export const userGetFavoriteMoviesReducer = (
    state = {
    likedMovies:[],
}, action ) => {
    switch(action.type ){
        case UserConstant.GET_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case UserConstant.GET_FAVORITE_MOVIES_SUCCESS:
            return {
                isLoading :false,
                likedMovies: action.payload, 
            }
        case UserConstant.GET_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstant.GET_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state; 
    }
}

// DELETE FAVORITES MOVIES
export const userDeleteFavoriteMoviesReducer = (state = {}, action ) => {
    switch(action.type ){
        case UserConstant.DELETE_FAVORITE_MOVIES_REQUEST:
            return { isLoading: true };
        case UserConstant.DELETE_FAVORITE_MOVIES_SUCCESS:
            return {
                isLoading :false,
                isSuccess: true 
            }
        case UserConstant.DELETE_FAVORITE_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstant.DELETE_FAVORITE_MOVIES_RESET:
            return {};
        default:
            return state; 
    }
}

// ADMIN GET ALL USERS
export const adminGetAllUsersReducer =(state = {users:[] }, action) =>{
    switch(action.type ){
        case UserConstant.GET_ALL_USERS_REQUEST:
            return { isLoading: true };
        case UserConstant.GET_ALL_USERS_SUCCESS:
            return {
                isLoading :false,
                users: action.payload, 
            }
        case UserConstant.GET_ALL_USERS_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstant.GET_ALL_USERS_RESET :
            return {
                users: []
            };
        default:
            return state; 
    } 
}

// ADMIN DELETE USERS
export const adminDeleteUserReducer=(state={},action)=>{ 
    switch(action.type ){
        case UserConstant.DELETE_USERS_REQUEST:
            return { isLoading: true };
        case UserConstant.DELETE_USERS_SUCCESS:
            return {
                isLoading :false,
                isSuccess: true, 
            }
        case UserConstant.DELETE_USERS_FAIL:
            return { isLoading: false, isError: action.payload };
        case UserConstant.DELETE_USERS_RESET:
            return {};
        default:
            return state; 
    }
}

// USER LIKE MOVIE
export const userLikeMovieReducer = (state = {}, action) => {
    switch (action.type){
        case UserConstant.USER_LIKE_MOVIE_REQUEST:
            return { isLoading: true };
        case UserConstant.USER_LIKE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case UserConstant.USER_LIKE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload }
        case UserConstant.USER_LIKE_MOVIE_RESET:
            return {}
        default:
            return state
    }
}
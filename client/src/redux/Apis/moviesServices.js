import Axios from "./Axios"

// ************ PUBLIC APIs **************

// get all movies function
export const getAllMoviesService = async (
    category, 
    time, 
    language, 
    rate,    
    year, 
    search, 
    pageNumber
) => {
    const { data } = await Axios.get(
        `/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    )
    return data;
}

// get random movies function
export const getRandomMoviesService = async () => {
    const {data} = await Axios.get('/movies/random/all');
    return data;
}

// get movie by id function
export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data
}

// get top rated movie function
export const getTopRatedMovieService = async () => {
    const {data} = await Axios.get(`/movies/rated/top`);
    return data;
}

// review movie function 
export const reviewMovieService = async(token, id, review) => {
    const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return data 
}


// delete movie service
export const deleteMovieService = async(token, id) =>{
    const {data} = await Axios.delete(`/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return data
}

// delete all movies function
export const deleteAllMovieService = async(token) =>{
    const {data} = await Axios.delete(`/movies`, {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    })
    return data
}

// create movie function
export const createMovieService = async (token, movie) => {
    const { data } = await Axios.post(`/movies`, movie, {
        headers :{
            Authorization: `Bearer ${token}`,
        }
    })
    return data
}

// updateMovie
export const updateMovieService = async (token, id, movie) => {
    const { data } = await Axios.put(`/movies/${id}`, movie,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}
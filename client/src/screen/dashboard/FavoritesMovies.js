import React, { useEffect } from 'react'
import {Movies} from "../../data/MovieData"
import Table from '../../components/Table'
import Sidebar from './Sidebar'
// import { Movies } from '../../data/MovieData'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFavoriteMovieAction, getFavoriteMoviesAction } from '../../redux/action/userAction'
import { toast } from 'react-hot-toast'
import Loader from '../../components/notification/Loader'
import { Empty } from '../../components/notification/Empty'

const FavoritesMovies = () => {
  const dispatch = useDispatch()

  const {
    isLoading,
    isError,
    likedMovies
  } = useSelector((state) => state.userGetFavoriteMovies)

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess
  } = useSelector((state) => state.userDeleteFavoriteMovies)
  // console.log("likedmovie", likedMovies)
  // useEffect


  // delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies ?") &&
    dispatch(deleteAllFavoriteMovieAction())    
  }


  useEffect(() => {
    dispatch(getFavoriteMoviesAction())
    if(isError || deleteError){
      toast.error(isError || deleteError)
      dispatch({ type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_FAVORITE_MOVIES_RESET"})
    }
  },[dispatch, isError, deleteError, isSuccess])


  return (
    <Sidebar>
    <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
            <h2 className='text-xl font-bold'>Favorite Movies</h2>
            {
            likedMovies?.length > 0 && 
            <button
            disabled={deleteLoading}
            onClick={deleteMoviesHandler}
            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                {
                  deleteLoading ? "Deleteing..." : "Delete All"
                } 
            </button>
            }
        </div>
        {
          isLoading ? ( 
            <Loader/>
          ) : 
          likedMovies.length > 0 ? (<Table data={likedMovies} admin={false}/>)
           : (
            <Empty message="No movies found"/>
           )
         }
    </div>
    </Sidebar>
  )
}

export default FavoritesMovies
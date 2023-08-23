import React, { useEffect } from 'react'
// import { Movies } from '../../../data/MovieData'
import Table from '../../../components/Table'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction } from '../../../redux/action/movieAction'
import toast from "react-hot-toast"
import Loader from '../../../components/notification/Loader'
import {TbPlayerTrackPrev,TbPlayerTrackNext} from "react-icons/tb"
import { Empty } from '../../../components/notification/Empty'
// import { Movies } from '../../data/MovieData'
import { deleteMovieAction, deleteAllMoviesAction } from '../../../redux/action/movieAction'

const MovieList = () => {
  const dispatch = useDispatch()
  // Get All movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    state => state.getAllMovies
  )

  // delete 
  const { isLoading:deleteLoading, isError:deleteError } = useSelector(
    state => state.deleteMovie 
  )

  // delete all movies
  const { isLoading:allLoading, isError:allError } = useSelector(
    state => state.deleteAllMovies  
  )

  // delete movie handler
  const handleDeleteMovie = (id) => {
    window.confirm("Are you sure you want do delete this movie") &&
    dispatch(deleteMovieAction(id))
  }

  // delete all movies handler 
  const handleDeleteAllMoviesHandler=()=>{
    window.confirm('are u sure to delete all the movies') && 
    dispatch(deleteAllMoviesAction())
  }

  const sameClass = "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"; 
  const sameClass2 = "w-full gap-6 flex-colo min-h-screen"
  // useEffect
  useEffect(() => {
    // errors
    if(isError || deleteError || allError){
      toast.error(isError || deleteError || allError)
    }
    dispatch(getAllMoviesAction({}))
  },[dispatch, isError, deleteError, allError])

  // useEffect(() => {
  //   // errors
  //   if (isError || deleteError || allError) {
  //     toast.error(isError || deleteError || allError);
  //   } else {
  //     dispatch(getAllMoviesAction({}));
  //   }
  // }, [dispatch, isError, deleteError, allError]);

  // pagination next and prev page
  const nextPage = () => {
    dispatch(getAllMoviesAction({
      // ...queries,
      pageNumber: page + 1
    }))
  }

  const prevPage = () => {
    dispatch(getAllMoviesAction({
      // ...queries,
      pageNumber: page -1
    }))
  }
 
  return (
    <Sidebar>
    <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
            <h2 className='text-xl font-bold'>Movie List</h2>
            {
              movies?.length > 0 &&  
              <button
              disabled={allLoading} 
              onClick={()=>handleDeleteAllMoviesHandler()}
              className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
              {
                allLoading ? "Deleting..." : "Delete All"
              }
              </button>
            }
           
    </div>
    {
          isLoading || deleteLoading ? ( 
            <Loader/>
          ) : 
          movies.length > 0 ? 
          (
          <>
          <Table data={movies} admin={true} onDeletehandler={handleDeleteMovie}/>
          <div className="w-full flex-rows gap-6 md:my-1 my-5">
          <button
            onClick={prevPage}
            // onClick={HandleLoadingMore}
            disabled={page === 1}
            // className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover: bg-subMain"
            className={sameClass}
          >
            {/* Loading More <CgSpinner className="animate-spin" /> */}
            <TbPlayerTrackPrev className="text-xl"/>
          </button>
          <button
            onClick={nextPage}
            // onClick={HandleLoadingMore}
            disabled={page === pages}
            className={sameClass}
            // className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover: bg-subMain"
          >
            {/* Loading More <CgSpinner className="animate-spin" /> */}
            <TbPlayerTrackNext className="text-xl"/>
          </button>
        </div>
          </>
          ) : (
            <Empty message="No movies found"/>
          )
         }
    </div>
    </Sidebar>
  )
}

export default MovieList
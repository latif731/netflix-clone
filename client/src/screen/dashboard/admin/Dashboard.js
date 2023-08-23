import React,{useEffect} from 'react'
import Sidebar from '../Sidebar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGrid, HiViewGridAdd } from 'react-icons/hi'
import Table from '../../../components/Table'
import { Movies } from '../../../data/MovieData'
import { useDispatch, useSelector } from 'react-redux'
import toast from "react-hot-toast"
import { getAllMoviesAction } from '../../../redux/action/movieAction'
import { getAllUsersAction } from '../../../redux/action/userAction'
import { getAllCategoriesAction } from '../../../redux/action/categoryAction'
import { Empty } from '../../../components/notification/Empty'
import Loader from '../../../components/notification/Loader'
import { deleteMovieAction } from '../../../redux/action/movieAction'

const Dashboard = () => {
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    const { isLoading: catLoading, isError: catError, categories } = useSelector((state) => state.categoryGetAll)
    const { isLoading: userLoading, isError: userError, users } = useSelector((state) => state.userGetAllUsers)
    // console.log("toprated", topMovies)
    const { isLoading, isError, movies, totalMovies } = useSelector((state) => state.getAllMovies)
    // console.log("dashboard", movies)
    // delete 
    const { isLoading:deleteLoading, isError:deleteError } = useSelector(
        state => state.deleteMovie 
      )
    const handleDeleteMovie = (id) => {
        window.confirm("Are you sure you want do delete this movie") &&
        dispatch(deleteMovieAction(id))
      }
    // useEffect
    useEffect(()=> {
      // get all users
      dispatch(getAllUsersAction())
      // errors
      dispatch(getAllMoviesAction({}))
      if( userError || catError || deleteError){
        toast.error(  deleteError || userError || catError)
      }
    },[
        dispatch, 
        // isError, 
        userError, 
        catError, 
        deleteError
    ])
    const DashboardData = [
        {
            bg:"bg-orange-600",
            icon:FaRegListAlt, 
            title: "Total Movies",
            total: isLoading ? "Loading..." : totalMovies
        },
        {
            bg:"bg-blue-700",
            icon:HiViewGridAdd,
            title: "Total Categories",
            total: catLoading ? "Loading..." : categories?.length || 0,
        },
        {
            bg:"bg-green-600",
            icon:FaUser,
            title: "Total Users",
            total: userLoading ? "Loading..." : users?.length || 0
        },
    ]


  return (
    <Sidebar>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {
                DashboardData.map((data, index)  => (
                    <div key={index} className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                            <data.icon/>
                        </div>
                        <div className='col-span-3'>
                            <h2>{data.total}</h2>
                            <p className='mt-2 font-bold'>{data.title}</p>
                        </div>  
                    </div>
                ))
            }
        </div>
        <h3 className='text-md font-medium mt-6 mb-6 text-border italic'>Recent Movie</h3>
        {
            isLoading || deleteLoading ? (<Loader/>) : movies.length > 0 ?  <Table data={movies} admin={true} onDeletehandler={handleDeleteMovie}/> : (<Empty message="Empty"/>)
         }
    </Sidebar>
  )
}

export default Dashboard
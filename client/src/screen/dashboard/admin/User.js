import React,{ useEffect } from 'react'
import Sidebar from '../Sidebar'
import Table2 from '../../../components/Table2'
import { UserData } from '../../../data/MovieData'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllUsersAction } from '../../../redux/action/userAction'
import toast from 'react-hot-toast'
import Loader from '../../../components/notification/Loader'
import { Empty } from '../../../components/notification/Empty'

    const User = () => {
      const dispatch = useDispatch()

      const {
        isLoading,
        isError,
        users
      } = useSelector((state) => state.userGetAllUsers)
      console.log("users",users)
    
      const {
        isLoading: deleteLoading,
        isError: deleteError,
        isSuccess
      } = useSelector((state) => state.userDeleteUsers)
      // console.log("likedmovie", likedMovies)
      // useEffect
    
    
      // delete movies handler
      const deleteUsersHandler = (id) => {
        window.confirm("Are you sure you want to delete this users ?") &&
        dispatch(deleteUserAction(id))    
      }
    
    
      useEffect(() => {
        dispatch(getAllUsersAction())
        if(isError || deleteError){
          toast.error(isError || deleteError)
          dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USERS_RESET"})
        }
      },[dispatch, isError, deleteError, isSuccess])
    
    
      return (
        <Sidebar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Users</h2>
                {
                  isLoading ? (
                    <Loader/>
                  ) :users?.length > 0 ? 
                  (
                    <Table2 data={users} users={true} onDeleteFunction={deleteUsersHandler}/>
                  ) 
                  : 
                  (
                    <Empty message="You dont have any user"/>
                  )
                }
            </div>
        </Sidebar>
      )
    }
    
    export default User
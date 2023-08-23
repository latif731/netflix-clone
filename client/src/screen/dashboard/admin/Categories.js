import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { HiPlusCircle, HiPlusSm } from 'react-icons/hi'
// import { Movies } from '../../../data/MovieData'
import { CategoriesData } from '../../../data/CategorisData'
// import Table from '../../../components/Table'
import Table2 from '../../../components/Table2'
import CategoryModal from '../../../components/modals/CategoryModal'
import { useDispatch, useSelector } from 'react-redux'
// import { useSelect } from '@material-tailwind/react'
import { Empty } from '../../../components/notification/Empty'
import Loader from '../../../components/notification/Loader'
import { getAllCategoriesAction } from '../../../redux/action/categoryAction'
import { CgNotes } from 'react-icons/cg'
import toast from "react-hot-toast"
import { deleteCategoriesAction } from '../../../redux/action/categoryAction'

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [sumCategory, sumSetCategory] = useState({});
  // console.log("categories", category) 
  const dispatch = useDispatch()

  // all categories 
  const { categories, isLoading} = useSelector((state) => state.categoryGetAll)
  // console.log("categories", categories)


  const OnEditFunction = (id) => {
    sumSetCategory(id)
    setModalOpen(!modalOpen)
  }

  // delete category
  const { isSuccess, isError} = useSelector((state) => state.categoryDelete)

  const adminDeletecategory = (id) => {
     if(window.confirm("Are you sure you want to delete this category")){
      dispatch(deleteCategoriesAction(id))
    } 
  }


  // console.log("categories", categories)

  useEffect(() => {
    // get all categories
    // dispatch(getAllCategoriesAction())

    if(isError){
      toast.error(isError)
      dispatch({
        type: "DELETE_CATEGORY_RESET"
      })
    }

    if(isSuccess) {
      dispatch({ 
        type: "DELETE_CATEGORY_RESET"
      })
    }

    if(modalOpen === false){
        sumSetCategory()
    }
  }, [modalOpen, dispatch, isError, isSuccess])
  
  return (
    <Sidebar>
      <CategoryModal 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen}  
      category={sumCategory}
      />
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'>Category</h2>
                <button
                onClick={() => setModalOpen(true)} 
                 className='bg-subMain flex-rows font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded gap-2'>
                 <HiPlusCircle/> Create
                </button>
            </div>
            {
              isLoading ? (
                <Loader/>
              ) : categories?.length > 0 ? (
                <Table2 data={categories} users={false}  OnEditFunction={OnEditFunction} onDeleteFunction={adminDeletecategory}/> 
              ) : (<Empty message="You have no categories"/>)
            }
        </div>
    </Sidebar>
  )
}

export default Categories
import React, { useState, useEffect } from 'react'
import MainModal from './MainModal'
import { Input } from '../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
// import { useSelect } from '@material-tailwind/react'
import { createCategoriesAction, updateCategoriesAction } from '../../redux/action/categoryAction'
import { toast } from 'react-hot-toast'

const CategoryModal = ({modalOpen, setModalOpen, category}) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  // const [isSubmiting, setSubmiting] = useState(false)

  const {isLoading, isError, isSuccess} = useSelector(state => state.categoryCreate)
  const {isLoading: upLoading, isError: upError, isSuccess: upSuccess} = useSelector(state => state.categoryUpdate)

  // create category handler 
  const submitHandler = (e) => {
    e.preventDefault()
    if(title){
      // if category is no empty then update category else create category 
      if(category){
        dispatch(updateCategoriesAction(category?._id, { title: title }))
        setModalOpen(!modalOpen )
      }
      else {
        dispatch(createCategoriesAction({title: title}))
        setTitle("")
      }
    }else{
      toast.error("Please write a category name")
    }
    // console.log("title", title)

  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //      if(title){
  //     // if category is no empty then update category else create category 
  //     if(category){
  //       dispatch(updateCategoriesAction(category?._id, { title: title }))
  //       setModalOpen(!modalOpen )
  //     }
  //     else {
  //       dispatch(createCategoriesAction({title: title}))
  //       setTitle("")
  //     }
  //   }else{
  //     toast.error("Please write a category name")
  //   }
  //   // setTimeout(() => {
  //   //   isLoading = false
  //   // })
  //   console.log('Form submitted', title);  
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(title && !isSubmiting) { // check isSubmiting
  //       setSubmiting(true);
  //     try{
  //       if(category){
  //         await dispatch(updateCategoriesAction(category?._id, { title: title }))
  //         setModalOpen(!modalOpen)
  //         toast.success("Category created successfully")
  //       } else {
  //         await dispatch(createCategoriesAction({ title: title }))
  //         setTitle("")
  //         toast.success("Category created successfully")
  //       }
  //     } catch (error) {
  //       toast.error("Error submiting form")
  //     } finally {
  //       setTimeout(() => {
  //         setSubmiting(false);
  //       }, 3000); // Reset submiting state
  //     }
  //   }else {
  //     toast.error("Please write a category name")
  //   }

  // } 

  // const onChange = (event) => {
  //   console.log("modalcategory",event)
  //   setTitle(event.target.value)
  // }

  // console.log("category",category)

  useEffect(() => {
    if(upError || isError){
      toast.error(upError || isError)
        dispatch({
          type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"
        })
    }

    // success
    if(isSuccess || upSuccess){
      dispatch({
        type:  isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET"
      })
    }

    // if ((isLoading || upLoading) && (isSuccess || upSuccess)) {
    //   dispatch({
    //     type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET",
    //   });
    // }

    // if category is not null then set title to category title
    // if ((isLoading || upLoading) && (isSuccess || upSuccess)) {
    //   dispatch({
    //     type: isError ? "CREATE_CATEGORIES_RESET" : "UPDATE_CATEGORIES_RESET",
    //   });
    // }
    if(category) {
      setTitle(category?.title);
    }
    // if modal is closed then set title to empty
    if(modalOpen === false) { 
      setTitle("")
    }


  }, [dispatch, isError, isSuccess, upSuccess, upError, category, modalOpen])

  

  // console.log(category)

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
            <h2 className='text-3xl font-bold'>{category ? "Update" : "Create"}</h2>
            <form 
             onSubmit={submitHandler}
             className='flex flex-col gap-6 text-left mt-6'>
                <Input
                label="Category Name"
                placeholder={"Actions"}
                type="text"
                bg={false}
                name="title"
                value={title}
                // onChange={onChange}
                onChange={(e) =>  setTitle(e.target.value)}
                />
                <button 
                type = 'submit'
                // disabled={isLoading || upLoading}
                // onClick={() => setModalOpen(false)}
                // onClick={() => console.log(title)}
                className='w-full flex flex-rows gap-4 py-3 transitions font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain  text-white'>
                    {isLoading || upLoading ? "Loading..." : category ? "Update" : "Create"}
                    {/* {isSubmiting ? "Submitting..." : category ? "Update" : "Create"} */}
                </button>
                {/* {isLoading || upLoading ? <p>Loading...</p> : null} */}
            </form>
        </div>
    </MainModal>
  )
}

export default CategoryModal
import React, { useEffect, useState } from 'react'
// import Sidebar from './Sidebar'
import Sidebar from '../Sidebar'
import { Input, Message, Select }  from '../../../components/UserInput'
import Uploader from '../../../components/Uploader'
import page from "../../../images/pirates.jpg"
import { CategoriesData } from '../../../data/CategorisData'
import { UserData } from '../../../data/MovieData'
import pg from "../../../images/pirates.jpg"
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import {ImUpload} from "react-icons/im"
import CastModal from '../../../components/modals/CastModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieValidation } from '../../../components/validation/MovieValidation'
import { createMovieAction, removeCastAction } from '../../../redux/action/movieAction'
import { toast } from 'react-hot-toast'
import {useForm} from "react-hook-form"
import { InlineError } from '../../../components/notification/Error'
import { ImagePreview } from '../../../components/ImagePreview'

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [cast, setCast] = useState(null)
  const [imageTitle, setImageTitle] = useState("")
  const [imageWithoutTitle, setImageWithoutTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // getAllCategory
const { categories } = useSelector(state => state.categoryGetAll)
const { isLoading, isError, isSuccess } = useSelector(state => state.createMovie)
const { casts } = useSelector(state =>  state.casts);
 
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(movieValidation)
})

// on submit
const onSubmit = (data) => {
    dispatch(createMovieAction({
      ...data,
      image: imageWithoutTitle,
      titleImage: imageTitle, 
      video: videoUrl,
      casts
    }))
    // console.log({
    //   ...data,
    //   image: imageWithoutTitle,
    //   titleImage: imageTitle,
    //   videoUrl: videoUrl,
    //   casts
    // })
}

const deleteCastHandler = (id) => {
  dispatch(removeCastAction(id))
  toast.success("Cast deleted successfully")
}

// useEffect(() => {
//   if(userInfo?.isAdmin){
//      navigate("/dashboard")
//    }
//    else if(userInfo) {
//     navigate("/profile")
//    }

//   if(isSuccess){
//     toast.success(`Welcome back ${userInfo?.fullName}`)
//   }
//   if(isError) {
//     toast.error(isError);
//     dispatch({ type: "USER_LOGIN_RESET" })
//    }
// }, [userInfo, isSuccess, isError, navigate, dispatch])


  useEffect(() => {
    // if modal is false then reset cast
    if(modalOpen === false){
      setCast()
    }
    // if its success then reset form and navigate to addMovie
    if(isSuccess){
      reset({
        name:"",
        time:0,
        language:"", 
        year:0,
        category:"",
        desc:""
      })
      setImageTitle("");
      setImageWithoutTitle("")
      setVideoUrl("")
      dispatch({ type: "CREATE_MOVIE_RESET"});
      navigate("/addmovie")
    }

    if(isError){
      toast.error("Something went wrong")
      dispatch({ type: "CREATE_MOVIE_RESET"})
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate])
  
  return ( 
    <Sidebar>
      <CastModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast}/>
      <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold'>Create Movie</h2>
        <div className='w-full grid md:grid-cols-2 gap-6'>
            <div className="w-full">
            <Input
            label="Movie Title"
            placeholder="Game Of Thrones"
            type="text"
            bg={true}
            name="name"
            register={register("name")}
            />  
            {
              errors.name && 
              // <p className="text-red-500 text-sm">{errors.email.message}</p>
              <InlineError text={errors.name.message}/>
            }
            </div>
            <div className="w-full">
            <Input
            label="Hours"
            placeholder="2hr"
            type="text"
            bg={true}
            name="time"
            register={register("time")}
            />  
            {
              errors.time && 
              // <p className="text-red-500 text-sm">{errors.email.message}</p>
              <InlineError text={errors.time.message}/>
            }
            </div>
        </div>
            <div className='w-full grid md:grid-cols-2 gap-6'>
              <div className='w-full'>
            <Input
            label="Language Used"
            placeholder="English"
            type="text"
            name="language"
            bg={true}
            register={register("language")}
            />
            {
              errors.language && 
              // <p className="text-red-500 text-sm">{errors.email.message}</p>
              <InlineError text={errors.language.message}/>
            }
              </div>
              <div className='w-full'>
            <Input 
            label="Year of Release"
            placeholder="2022"
            type="number"
            bg={true}
            name="year"
            register={register("year")}
            />
            {
               errors.year && 
               // <p className="text-red-500 text-sm">{errors.email.message}</p>
               <InlineError text={errors.year.message}/>
            }
              </div>
            </div>
            {/* images */}
            <div className='w-full grid md:grid-cols-2 gap-6'>
              {/* img without title */}
              <div className='flex flex-col gap-2'>
                <p className='text-border font-semibold text-sm'>
                  Image without Title
                </p>
                <Uploader setImageUrl={setImageWithoutTitle}/>
                <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle"/>
                {/* <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                  <img src={page} alt="" className='w-full h-full object-cover rounded '/>
                </div> */}
              </div>
              {/* img with title */}
              <div className='flex flex-col gap-2'>
                <p className='text-border font-semibold text-sm'>
                  Image with title
                </p>
                <Uploader setImageUrl={setImageTitle}/>
                <ImagePreview image={imageTitle} name="imageTitle"/>
                {/* <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                  <img src={page} alt="" className='w-full h-full object-cover rounded '/>
                </div> */}
              </div>
            </div>
            {/* DESCRIPTION */}
            <div className='w-full'>
            <Message 
            label="Movie Description" 
            placeholder="Make it short and sweet" 
            name="desc"
            register={{...register("desc")}}
            />
            {
                errors.desc && 
                // <p className="text-red-500 text-sm">{errors.email.message}</p>
                <InlineError text={errors.desc. message}/>
            }
            </div>
            {/* CATEGORY */}
            <div className='text-sm w-full'>
              <Select 
              label="Movie Category" 
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={{...register("category")}}
              />
              {
                errors.category && <InlineError text={errors.category.message}/>
              }
            </div>
            {/* MOVIE VIDEO */}
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-border font-semibold text-sm'>
                Movie Video
              </label>
              <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
                {
                  videoUrl && (
                    <div className='w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo'>
                      Video Uploaded!
                    </div>
                  )
                }
                <Uploader setImageUrl={setVideoUrl}/>
              </div>
            </div>
            {/* CAST */}
            <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
              <button onClick={() => setModalOpen(true)} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
                Add cast
              </button>
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols2 gap-4">
                {
                   casts?.length > 0 && casts?.map((user) => (
                    <div key={user.id} className='p-2 italic text-xs text-text rounded flex-colo bg-main border border-border'>
                      <img src={user.image ? user.image : {pg}} className='w-full h-24 object-cover rounded mb-4' alt={user.name}/>
                      <p>{user.name}</p>
                      <div className='flex-rows mt-2 w-full gap-2'>
                      <button
                      onClick={() => deleteCastHandler(user?.id)} 
                      className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                        <MdDelete/>
                      </button>
                      <button
                      onClick={() => {
                        setCast(user); 
                        setModalOpen(true);
                      }}
                      className='w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded'>
                        <FaEdit/>
                      </button>
                      </div>
                    </div> 
                   ))
                }
              </div>
            </div>
            {/* SUBMIT */}
              <button
              // disabled={isLoading || !imageWithoutTitle || imageTitle || !videoUrl}
              onClick={handleSubmit(onSubmit)} 
              className='flex-rows gap-5  text-white bg-subMain font-medium py-4 rounded w-full'>
                {
                  isLoading ? "Please wait..." : 
                  <>
                <ImUpload/> Publish Movie
                  </>
                }
              </button>
        </div>
    </Sidebar>
  )
}

export default AddMovie
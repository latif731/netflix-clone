import React, { useEffect, useState } from 'react'
import Sidebar from "./Sidebar"
import Uploader from '../../components/Uploader'
import { Input } from '../../components/UserInput'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast" 
import { deleteProfileAction, updateProfileAction } from '../../redux/action/userAction'
import { InlineError } from '../../components/notification/Error'
import { ProfileValidation } from '../../components/validation/UserValidation'
import { ImagePreview } from '../../components/ImagePreview'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.userLogin)
  console.log(userInfo)
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "")
  const {isLoading, isError, isSuccess} = useSelector((state) =>  state.userUpdateProfile)
const {isLoading: deleteLoading , isError: deleteError} = useSelector((state) =>  state.userDeleteProfile)
  // const [isLoading, setIsLoading] = useState(false) 

  


  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation)
  })

  // update Profile
  const onSubmit = (data) => {
      dispatch(updateProfileAction({...data, image: imageUrl }))
      // console.log({...data, image: imageUrl})
  }

  // delete Profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile") && 
    dispatch(deleteProfileAction())
  }



  useEffect(() => {
    if(userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email)
     }
     if(isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
    }
    if(isError || deleteError){
      toast.error(isError || deleteError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
      dispatch({ type: "USER_DELETE_PROFILE_RESET" })
     }
  }, [userInfo,setValue, isSuccess, isError ,setValue, deleteError])
  return (
    <Sidebar>   
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold'>Profile</h2>
            <div className='w-full grid lg:grid-cols-12 gap-20'>
              <div className='col-span-8'>
            <Uploader setImageUrl={setImageUrl}/>
              </div>
              {/* imgage preview */}
              <div className='col-span-4'>
              <ImagePreview 
              image={imageUrl} 
              name={userInfo ? userInfo.fullName : "react netflix tailwind"}
              />
              </div>
              {/* image preview */}
          </div>
            <div className="w-full">
      <Input
      label="Full name"
      placeholder="netflix react tailwind"
      type="text"
      name="fullName"
      register={register("fullName")}
      bg={true}
      />  
      {
        errors.fullName && 
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.fullName.message}/>
      }
      </div>
      <div className="w-full">
      <Input
      label="Email"
      placeholder="netflix@gmail.com"
      type="email"
      name="email"
      register={register("email")}
      bg={true}
      />  
      {
        errors.email && 
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.email.message}/>
      }
      </div> 
            <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
              <button
               onClick={deleteProfile}
               disabled={deleteLoading || isLoading}
               className='bg-subMain transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'
               >
                {isLoading ? "Deleting..." : "Delete Account"}
              </button>
              <button 
              disabled={deleteLoading || isLoading}
              className='bg-main transitions hover:bg-subMain  border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'
              >
                {
                  isLoading ? "Updating..." : "Update Profile"
                } 
              </button>
            </div>
        </form>
    </Sidebar>
  )
}

export default Profile
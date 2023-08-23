import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../UserInput'
import { HiPlusCircle } from 'react-icons/hi'
import p from "../../images/5.jpg"
import Uploader from '../Uploader'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-hot-toast'
import { ImagePreview } from '../ImagePreview'
import pp from "../../images/pp.jpg"
import {useForm} from "react-hook-form"
import { updateCastAction, addCastsAction } from '../../redux/action/movieAction'
import { InlineError } from '../notification/Error'

const CastModal = ({modalOpen, setModalOpen, cast}) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("")
  const generateId = Math.floor(Math.random() * 100000000)
  const image = castImage ? castImage : cast?.image 

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast Name is required")
      })
    )
  })
  
  // on submit
  const onSubmit = (data) => {
    if(cast){
      // if cast is not null then update cast
      dispatch(
        updateCastAction({
          ...data , 
          image: image,
          id: cast.id
        }
          )
      )
      toast.success("Cast updated successfully")
    }else {
      // else create cast
      dispatch(
        addCastsAction({
          ...data,
          image,
          id:generateId
        })
      )
      toast.success("Cast created successfully")
    }
    reset()
    setCastImage("")
    setModalOpen(false)
  }

  useEffect(() => {
    if(cast) {
      setValue("name", cast?.name)
    }
  }, [cast, setValue] )


  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
            <h2 className='text-3xl font-bold'>{cast ? "Update Cast" : "Create Cast"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} 
            className='flex flex-col gap-6 text-left mt-6'>
            <div className="w-full">
                <Input
                label="Cast name"
                placeholder="John Doe"
                type="text"
                name="name"
                register={register("name")}
                bg={true}
                />  
                {
                  errors.name && 
                  // <p className="text-red-500 text-sm">{errors.email.message}</p>
                  <InlineError text={errors.name.message}/>
                }
            </div>
                <div className='flex flex-col gap-2'>
                <p className='text-border font-semibold text-sm'>
                  Cast Image
                </p>
                <Uploader setImageUrl={setCastImage}/>
                <ImagePreview
                image={ image ?  image : `${pp}`} 
                /> 
                {/* <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                  <img src={cast ? cast?.image : {p}} alt={cast?.name} className='w-full h-full object-cover rounded '/>
                </div> */}
              </div>
                <button 
                type='submit'
                onClick={() => setModalOpen(false)}
                className='w-full flex flex-rows gap-4 py-3 transitions font-bold hover:bg-dry border-2 border-subMain rounded bg-subMain  text-white'>
                {
                  cast ? 
                  (
                    "Update"
                  ) 
                  :
                  (
                     "Add"
                  ) 
                }
                </button>
            </form>
        </div>
    </MainModal>
  )
}

export default CastModal
import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import { Input } from '../../components/UserInput'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordValidation } from '../../components/validation/UserValidation'
import { InlineError } from '../../components/notification/Error'
import { changePasswordAction } from '../../redux/action/userAction'
import { toast } from 'react-hot-toast'

const Password = () => {
  const dispatch = useDispatch()
  const {isLoading, isError,  message, isSuccess} = useSelector((state) => state.userChangePassword)


  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver : yupResolver(PasswordValidation)
  })

  // on submit
  const onSubmit = (data) => {
    dispatch(changePasswordAction(data))
    // console.log(data)
  } 

    useEffect(() => {
     if(isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" })
    }
    if(isError) {
      toast.error(isError);
      dispatch({type:"USER_CHANGE_PASSWORD_RESET"})
    }
    if(message){
      toast.success(message);
      reset()
    }
  }, [isSuccess, isError, message, reset, dispatch])

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <h2 className='text-xl font-bold'>Change Password</h2>
     <div className="w-full">
      <Input
      label="Previous Password"
      placeholder="********"
      type="password"
      name="oldPassword"
      register={register("oldPassword")}
      bg={true}
      />  
      {
        errors.oldPassword &&  
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.oldPassword.message}/>
      }
      </div>
     <div className="w-full">
      <Input
      label="New Password"
      placeholder="********"
      type="password"
      name="newPassword"
      register={register("newPassword")}
      bg={true}
      />  
      {
        errors.newPassword &&  
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.newPassword.message}/>
      }
      </div>
     <div className="w-full">
      <Input
      label="Confirm Password"
      placeholder="********"
      type="password"
      name="confirmPassword"
      register={register("confirmPassword")}
      bg={true}
      />  
      {
        errors.confirmPassword &&  
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.confirmPassword.message}/>
      }
      </div>
            <div className='flex justify-end items-center my-4'>
              <button
              disabled={isLoading}
              type='submit'
               className='bg-main transitions hover:bg-subMain  border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'
               >
                {
                  isLoading ? "Updating..." : "Update Password"
                }
              </button>
            </div>
        </form>
    </Sidebar>
  )
}

export default Password
import React, { useEffect, useState } from "react";
import logo3 from "../images/logo3.png"
import Layout from "../layout/Layout";
import { Input } from "../components/UserInput";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { loginAction } from "../redux/action/userAction";
import { LoginValidation } from "../components/validation/UserValidation";
import {yupResolver} from "@hookform/resolvers/yup"
import { InlineError } from "../components/notification/Error";
import  toast  from "react-hot-toast"


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [isLoading, setIsLoading] = useState(false) 

  const {isLoading, isError, userInfo, isSuccess} = useSelector((state) => state.userLogin)


  
  

  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation)
  })

  // on submit
  const onSubmit = (data) => {
      dispatch(loginAction(data))
  }

  useEffect(() => {
    if(userInfo?.isAdmin){
       navigate("/dashboard")
     }
     else if(userInfo) {
      navigate("/profile")
     }

    if(isSuccess){
      toast.success(`Welcome back ${userInfo?.fullName}`)
    }
    if(isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" })
     }
  }, [userInfo, isSuccess, isError, navigate, dispatch])
  
  // useEffect(() => {
  //   let timer1 = setTimeout(() => {
  //     setIsLoading(true)
  //   })
  //   return () => {
  //     clearTimeout(timer1)
  //   }
  // }, [])
  

  return(
    <Layout>
  <div className="container mx-auto px-2 my-24 flex-colo">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-14 md:w-3/5 flex-colo bg-dry rounded-lg border-border">
      <img src={logo3} alt="logo" className="" style={{ width:"50%", objectFit:"contain", marginBottom:"8px"}}/>
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
      <div className="w-full">
      <Input
      label="Password"
      placeholder="**********"
      type="password"
      bg={true}
      name="password"
      register={register("password")}
      />
      {
        errors.password && 
        // <p className="text-red-500 text-sm">{errors.email.message}</p>
        <InlineError text={errors.password.message}/>
      }
      </div>
      <button 
      type="submit" 
      disabled={isLoading}
      className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white w-full rounded-lg h-11">
         {
          // if loading show loading
        isLoading ? (
          "Loading..."
          ) : ( 
            <>
              <FiLogIn/> Sign In    
            </>
          )}
      </button>
      <p className="text-center text-border">
        Don't have an account? {" "}
        <Link to="/register" className="text-dryGray font-semiBold ml-2">Sign Up</Link>
      </p>
    </form>
  </div>
  </Layout> 
    )
};

export default Login;

import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt, FaUser, FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import {RiMovie2Fill, RiLockPasswordLine, RiLogoutBoxLine, RiLogoutCircleLine} from "react-icons/ri"
import {HiViewGridAdd} from "react-icons/hi"
import { NavLink, useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../redux/action/userAction'
import { toast } from 'react-hot-toast'


const Sidebar = ({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //logout function
    const { userInfo } = useSelector((state) => state.userLogin)    
    const logoutHandler = () => {
        dispatch(logoutAction())
        toast.success("Logged out successfully")
        navigate("/login")
    }
    const SideLinks = 
    userInfo?.isAdmin?
    [
        {
            name: "Dashboard",
            link: "/dashboard",
            icon: BsFillGridFill
        },
        {
            name: "Movie List",
            link: "/movielist",
            icon: FaListAlt
        },
        {
            name: "Add Movie",
            link: "/addmovie",
            icon: RiMovie2Fill,
        },
        {
            name: "Categories",
            link: "/categories",
            icon: HiViewGridAdd,
        },
        {
            name: "Users",
            link: "/users",
            icon: FaUsers,
        },
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings,
        },
        {
            name: "Favorites Movies",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Change Passwod",
            link: "/password",
            icon: RiLockPasswordLine,
        },
    ] : userInfo ? [
        {
            name: "Update Profile",
            link: "/profile",
            icon: FiSettings,
        },
        {
            name: "Favorites Movies",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Change Passwod",
            link: "/password",
            icon: RiLockPasswordLine,
        },
    ] : []

    const active = "bg-dryGray text-subMain"
    const hover = "hover:text-white hover:bg-subMain"
    const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4" 
    const Hover = ({isActive}) => {
       return isActive ? `${active} ${inActive}` : `${inActive} ${hover}`
    }
    

  return (
    <Layout>
        <div className='min-h-screen container mx-auto px-2'>
            <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5'>
                    {
                        SideLinks.map((links, index) => (
                            <NavLink to={links.link} key={index} className={Hover}>
                                <links.icon/> <p>{links.name}</p>
                            </NavLink>
                        ))
                    }
                    <button onClick={logoutHandler} className={`${inActive} ${hover} w-full`}>
                        <RiLogoutCircleLine/> <p>Log Out</p>
                    </button>
                </div>
                <div 
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay = "10"
                data-aos-offset = "200" 
                className='col-span-6 rounded-md bg-dry border border-gray-800 p-6'>{children}</div>
            </div>
        </div>
 </Layout>
  )
}

export default Sidebar;
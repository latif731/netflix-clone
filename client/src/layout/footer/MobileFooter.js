import React, { useContext, useState } from 'react'
import { BsCollection, BsCollectionPlay } from 'react-icons/bs'
import { CgMenuBoxed } from 'react-icons/cg'
import { FaHeart } from 'react-icons/fa'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import MenuDrawer from '../../components/Drawer/MenuDrawer'
import { SidebarContext } from '../../context/DrawerContext'
import TailwindDrawer from '../../components/Drawer/TailwindDrawer'


const MobileFooter = () => {
  const { mobileDrawer, toggleDrawer } = useContext(SidebarContext)
  const [open, setOpen] = useState(false)
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)
    const active = "bg-white text-main transitions text-2xl flex-colo rounded-md  px-4 py-3"
    const inActive = "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3"
    const Hover = ({isActive}) => isActive ? active : inActive
  return (
    <>
    <div className='flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full'>
        {/* <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer}/> */}
        <TailwindDrawer open={open} closeDrawer={closeDrawer}/>
    </div>
    <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-dry rounded-md md:gap-16 flex-rows gap-5 w-full p-1'>
            <NavLink to="/" className={Hover}>
                <BiHome/> 
            </NavLink>
            <NavLink to="/movies" className={Hover}>
                <BsCollectionPlay/>
            </NavLink>
            <NavLink to="/favorites" className={Hover}>
            <FiHeart/>
            <div className='relative'>
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-8 -right-4">
                3
              </div>
            </div>
            </NavLink>
            <NavLink to="/login" className={Hover}>
                <FiUserCheck/>
            </NavLink>
            <button onClick={openDrawer} className={inActive}>
                <CgMenuBoxed/>
            </button>
        </div>
    </footer>
    </>
  )
}

export default MobileFooter
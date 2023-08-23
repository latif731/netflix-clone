import React, {useEffect, useState} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import { GoSearch } from "react-icons/go";
import { CgUser } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import {useDispatch, useSelector } from "react-redux"
import pp from "../../images/pp.jpg"
import { getFavoriteMoviesAction } from "../../redux/action/userAction";

const NavBar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) =>  state.userLogin);
  const dispatch = useDispatch()
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies)
  // console.log("navbar", likedMovies)

  const hover = "hover:text-subMain transition text-white pointer";
  const Hover = ({ isActive }) => (isActive ? "text-subMain pointer" : hover);

  useEffect(() => {
    dispatch(getFavoriteMoviesAction())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim()){
      navigate(`/movies/${search}`)
      setSearch(search)
    }
    else{
      navigate(`/movies`)
    }
  }
  

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container  mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src={Logo}
                className="w-full h-12 object-contain"
                alt="logo"
              />
            </Link>
          </div>
          {/* search form */}
          <div className="col-span-3">
            <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded  text-white"
              >
                <GoSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Movie Name from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Movie
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"} className={Hover}>
              {
                userInfo ? 
                (
                <img src={userInfo?.image ? userInfo?.image : `${pp}`  } alt={userInfo?.fullName} className="w-8 h-8 rounded-full cursor-pointer border object-cover border-subMain"/>
                ) 
                : 
                (
                <CgUser className="w-8 h-8"/>
                )
              }
            </NavLink>
            <NavLink to="/favorites" className={`${Hover} relative`}>
              <FaHeart className="w-6 h-6" />
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-2 -right-1">
                {
                 likedMovies?.length || 0
                }
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

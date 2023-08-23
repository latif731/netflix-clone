import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import AboutUs from "./screen/AboutUs";
import NotFound from "./screen/NotFound";
import ContactUs from "./screen/ContactUs";
import MoviesPage from "./screen/Movies";
import SingleMovie from "./screen/SingleMovie";
import WatchPage from "./screen/WatchPage";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Profile from "./screen/dashboard/Profile";
import Aos from "aos"
import Password from "./screen/dashboard/Password";
import FavoritesMovies from "./screen/dashboard/FavoritesMovies";
import MovieList from "./screen/dashboard/admin/MovieList";
import Dashboard from "./screen/dashboard/admin/Dashboard";
import Categories from "./screen/dashboard/admin/Categories";
import User from "./screen/dashboard/admin/User";
import AddMovie from "./screen/dashboard/admin/AddMovie";
import ScrollOnTop from "./ScrollOnTop";
import { SidebarContext } from "./context/DrawerContext";
import DrawerContext from "./context/DrawerContext";
import ToastContainer from "./components/notification/ToastContainer";
import { AdminProtectedRouter } from "./ProtectRoute";
import { ProtectRouter } from "./ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./redux/action/categoryAction";
import { getAllMoviesAction } from "./redux/action/movieAction";
import { getFavoriteMoviesAction } from "./redux/action/userAction";
import toast from "react-hot-toast"
import EditMovie from "./screen/dashboard/admin/EditMovie";

function App() {
  console.log("asdawefwd");
  Aos.init();  
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) =>  state.userLogin)
  const { isError, isSuccess } = useSelector((state) =>  state.userLikeMovie)
  const { isError: catError } = useSelector((state) =>  state.categoryGetAll)
  useEffect(() => { 
    dispatch(getAllCategoriesAction())
    dispatch(getAllMoviesAction({}))
    if(userInfo){
      dispatch(getFavoriteMoviesAction())
  }
  if(isError || catError) {
    toast.error(isError || catError)
    // toast.error("Something went wrong, please try again later")
    dispatch({ type: "USER_LIKE_MOVIE_RESET"})
  }
  if(isSuccess){
      dispatch({type: "USER_LIKE_MOVIE_RESET"})
  }
  },[dispatch, userInfo, isError, catError, isSuccess])
  return (
    <>
    <ToastContainer/>
    <DrawerContext>
    <ScrollOnTop>
    <Routes>
      {/* *************** PUBLIC ROUTES *************** */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:search" element={<MoviesPage />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      {/* *************** PRIVATE PUBLIC ROUTE-- *************** */} 
      <Route element={<ProtectRouter />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/password" element={<Password />} />
      <Route path="/favorites" element={<FavoritesMovies />} />
      {/* *************** ADMIN ROUTE  *************** */}
      <Route element={<AdminProtectedRouter />}>
      <Route path="/movielist" element={<MovieList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/users" element={<User />} />
      <Route path="/addmovie" element={<AddMovie />} />
      <Route path="/edit/:id" element={<EditMovie/>}/>
      </Route>   
      </Route>   

    </Routes>
    </ScrollOnTop>
    </DrawerContext>
    </>
  );
}

export default App;

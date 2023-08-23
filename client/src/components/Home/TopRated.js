import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill, BsCaretLeft, BsCaretRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Movies } from "../../data/MovieData";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import Loader from "../notification/Loader";
import { Empty } from "../notification/Empty";
import { useSelector,useDispatch } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../context/Functionality";








const SwiperTop = ({ prevEl, nextEl, movies }) => {
const { isLoading } = useSelector((state) => state.userLikeMovie)
const dispatch = useDispatch()
const { userInfo } = useSelector((state) =>  state.userLogin)

// if liked function
// const isLiked = (movie) => {
  //   return IfMovieLiked(movie)
  // }
  const isLiked = (movie) => {
    return IfMovieLiked(movie)
  }
  console.log("SwiperTop",movies)
  return (
    <Swiper
    navigation={{ nextEl, prevEl }}
          autoplay={true}
          speed={500}
          loop={true}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            0:{
              slidesPerView:1,
              spaceBetween:10
            },
            768:{
              slidesPerView:2,
              spaceBetween:20
            },
            1024:{
               slidesPerView: 3,
               spaceBetween:30
            },
            1280:{
              slidesPerView: 4,
              spaceBetween: 40,
            }
          }}
        >
          {movies?.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden sm:w-full">
                <img
                  src={movie?.titleImage}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                <button
                  onClick={() =>  LikeMovie(movie, dispatch, userInfo)}
                  disabled={isLiked(movie) || isLoading} 
                  className={`w-11 h-11 flex-colo transitions hover:bg-subMain rounded-full
                    ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"}
              text-white`}>
                    <FaHeart />
                  </button>
                  <Link
                    className="font-semibold text-xl trancuted line-clamp-2"
                    to={`/movie/${movie?._id}`}
                  >
                    {movie?.name}
                  </Link>
                  <div className="flex gap-2 text-star">
                    <Rating value={movie?.rate} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
  </Swiper>
)
}



const TopRated = ({movies, isLoading}) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);

  console.log("TopRatedComponent",movies)

  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";

  return (
    <div className="my-16"> 
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {
          isLoading ? <Loader/> : movies?.length > 0 ? 
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies}/> : <Empty message="it seem's like we dont have any movie"/>
        }
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeft />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;

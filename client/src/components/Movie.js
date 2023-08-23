import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../context/Functionality";

const Movie = ({ movie }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie)
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) =>  state.userLogin)

  // if liked function
  // const isLiked = (movie) => {
  //   return IfMovieLiked(movie)
  // }
  const isLiked = IfMovieLiked(movie)


  return (
    <div className="border border-border hover:scale-95 transitions relative rounded overflow-hidden">
      <Link to={`/movie/${movie?._id}`} className="w-full">
        <img
          src={movie?.titleImage}
          alt={movie?.name}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-black bg-opacity-60 text-white px-4 py-3">
        <h3 className="font-semibold truncate">{movie?.name}</h3>
        <button
        onClick={() => LikeMovie(movie, dispatch, userInfo)}
        disabled={isLiked || isLoading} 
        className={`h-9 w-9 text-sm flex-colo transitions
        ${isLiked ? "bg-transparent" : "bg-subMain"}
        hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white`}>
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default Movie;

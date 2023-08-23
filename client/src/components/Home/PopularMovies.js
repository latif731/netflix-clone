import React,{useEffect} from "react";
import Titles from "../Titles";
import { FaFilm } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";
import { Movies } from "../../data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../redux/action/movieAction";
import Movie from "../Movie";
import Loader from "../notification/Loader";
import { Empty } from "../notification/Empty";

const PopularMovies = ({ isLoading, movies }) => {
  // const { isLoading, isError, movies, pages, page } = useSelector(
  //   state => state.getAllMovies
  // )
  // console.log("popular",movies)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getAllMoviesAction())
  // }, [])
  
  return (
    <div className="my-16">
      <Titles title="Popular Movie" Icon={BsCollectionFill} />
      {
        isLoading ? <Loader/> : movies?.length > 0 ? (
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
       {movies.slice(0, 8).map((movie, index) => (
          <Movie key={index} movie={movie} /> 
        ))}
        <Movie/>
      </div>  
        ):(
          <div className="mt-6">
            <Empty message="it seeem's like we dont have any movie"/>
          </div>
        )
      }
    </div>
  );
};

export default PopularMovies;

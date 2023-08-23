import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/TopRated";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction, getMovieTopRatedAction, getRandomMoviesAction } from "../redux/action/movieAction";
import { toast } from "react-hot-toast";

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector((state) => state.getRandomMovies)
  const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector((state) => state.getTopRatedMovie)
  // console.log("toprated", topMovies)
  const { isLoading, isError, movies } = useSelector((state) => state.getAllMovies)

  // useEffect
  useEffect(()=> {
    // get random movies
    dispatch(getRandomMoviesAction())
    // get all movies
    dispatch(getAllMoviesAction({}))
    // get top rated movies
    dispatch(getMovieTopRatedAction())
    // errors
    if( isError || randomError || topError){
      toast.error("Something went wrong!")
    }
  },[dispatch, isError, randomError, topError])


  return (
    <>
      <Layout>
        <div className="container mx-auto min-h-screen px-2 mb-6">
          <Banner movies={movies} isLoading={isLoading}/>
          <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
          <Promos />
          <TopRated movies={topMovies} isLoading={topLoading}/>
        </div>
      </Layout>
    </>
  );
};

export default HomeScreen;

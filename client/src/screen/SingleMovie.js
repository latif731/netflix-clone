import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../components/single/MovieInfo";
import MovieCasts from "../components/single/MovieCasts"
import MovieRates from "../components/single/MovieRates"
import { Movies } from "../data/MovieData";
import Titles from "../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/modals/ShareModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMovieByIdAction } from "../redux/action/movieAction";
import Loader from "../components/notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { DownloadVideo } from "../context/Functionality";
// import  { FileSaver }  from "file-server"
import { FileSaver } from "file-saver"

const SingleMovie = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const sameClass = "w-full gap-6 flex-colo min-h-screen"
  // console.log("id", id);
  // const [data, setData] = useState(Movies);
  // console.log("data", data);

  // useSelector
  // hook to get the movie details by its ID and store it in a variable called selectedMovieDetails
  const {isLoading, isError, movie } = useSelector((state) => state.getMovieById)
  console.log("movieId", movie)
  const { movies } = useSelector((state) =>  state.getAllMovies)
  console.log("detail", movies)


  // download movie video
  const DownloadMovieVideo = async (videoUrl, name)=> {
   await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data,name)
    })
  } 
  // let total = 0;
  // let count = 1;
  // while (count <= 10) {
  //   total += count;
  //   count += 1;
  // }
  // // const hasil = (total += count);
  // console.log("tes", count);

  // console.log(sum(range(1, 10)));

  // const movie = Movies.find((movie) => movie.name === id);
  const RelatedMovie = movies.filter((m) => m.category === movie?.category)
  console.log("relatedmovie", RelatedMovie)
  // console.log("singlemovie", movie);

  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id))
  },[dispatch, id])
  console.log("id",id)


  return (
    <Layout>
      {
        isLoading ? 
        <div className={sameClass}>
          <Loader/>
        </div> : 
        isError ? 
        <div className={sameClass}>
        <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
              <RiMovie2Line/>              
            </div>
            <p className="text-border text-sm">
              it seem's like we dont have any movie 
            </p>
        </div> 
        : 
        (
          <>
      <ShareMovieModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      movie={movie}
      />
      <MovieInfo movie={movie} setModalOpen={setModalOpen} DownloadVideo={DownloadMovieVideo} progress={progress}/>
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts movie={movie}/>
        <MovieRates movie={movie}/>
      {/* related */}
        {RelatedMovie.length > 0 && (      
      <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill}/> 
      <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6 mb-10">
          {RelatedMovie?.map((movie, index) => (
            <Movie movie={movie} key={index} />
            ))}
      </div>
        </div>
        )}
      </div>
          </>
        )
      }
    </Layout>
  );
};

export default SingleMovie;

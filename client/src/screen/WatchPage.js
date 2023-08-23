import React, { useState, useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import { Movies } from "../data/MovieData";
import Layout from "../layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/action/movieAction";
import Loader from "../components/notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { IfMovieLiked, LikeMovie } from "../context/Functionality";


const WatchPage = () => {
  let { id } = useParams()
  // console.log("watchPage",id)
  const dispatch = useDispatch()
  const [play, setPlay] = useState(false)
  const sameClass = "w-full gap-6 flex-colo min-h-screen"
  const {isLoading, isError, movie } = useSelector((state) => state.getMovieById)
  // console.log("watchpage", movie)
  const { isLoading:likeLoading } = useSelector((state) => state.userLikeMovie)
  // // const dispatch = useDispatch()
  const { userInfo } = useSelector((state) =>  state.userLogin)

  // const isLiked = (movie) =>  return 
  const isLiked = (movie) =>  IfMovieLiked(movie)
  

  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id))
  },[dispatch, id])
  // const movie = Movies.find((movie) => movie.title === id)
  return <Layout>
    <div className="container mx-auto bg-dry p-6 mb-12">
        {
          !isError && (
      <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
        <Link to={`/movie/${movie?._id}`} className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray">
          <BiArrowBack/>{movie?.name}
        </Link>
        <div className="flex-btn sm:w-auto w-full gap-5">
          <button 
           onClick={() => LikeMovie(movie, dispatch, userInfo)}
           disabled={isLiked(movie) || likeLoading} 
          className={`bg-white hover:text-subMain 
          ${isLiked(movie) ? "text-subMain":"text-white"}
          transitions bg-opacity-30  rounded px-4 py-3`}>
            <FaHeart/>
          </button>
          <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
            <FaCloudDownloadAlt/> Download
          </button>
        </div>
      </div>
          )
        }
      {/* watch video */}
      {
        play ? 
        (
          <video controls className="w-full h-screen rounded">
            <source
            src={movie?.video ? movie?.video :""}
            type="video/mp4"
            title={movie?.name}
            ></source>
          </video>
          //  <iframe width="560" height="315" src="https://www.youtube.com/embed/7Lz9mvnK-x8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
           ) 
           : 
           (
           <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {
              isLoading ? (<div className={sameClass}>
                <Loader/>
              </div>) :
              isError ? (
                <div className={sameClass}>
                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                  <RiMovie2Line/>              
                </div>
                <p className="text-border text-sm">
                  it seem's like we dont have any movie 
                </p>
              </div>
              ) : (
                <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo flex-colo">
                  <button onClick={() => setPlay(true)} className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20  font-medium text-xl">
                    <FaPlay/>
                  </button>
                </div>
                <img src={movie?.titleImage} alt={movie?.name} className="w-full"/>
                </>
              )
            }
        </div>
        )
      }
    </div>
  </Layout>;
};

export default WatchPage;

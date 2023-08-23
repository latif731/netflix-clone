import React, { useState, useEffect } from "react";
import Titles from "../Titles";
import { BiSolidBookmarkStar } from "react-icons/bi";
import { Select, Message } from "../UserInput";
import Rating from "../Stars";
import { UserData } from "../../data/MovieData";
import { Empty } from "../notification/Empty";
import pp from "../../images/pp.jpg"
import { useDispatch, useSelector } from "react-redux";
import { ReviewValidation } from "../validation/MovieValidation";
// import { useSelect } from "@material-tailwind/react";
import toast from "react-hot-toast"
import { InlineError } from "../notification/Error";
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { Link } from "react-router-dom";
import { reviewMovieAction } from "../../redux/action/movieAction";


const Ratings = [
  {
    title: "0 - Poor",
    value:0,
  },
  {
    title: "1 - Fair",
    value:1,
  },
  {
    title: "2 - Good",
    value:2,
  },
  {
    title: "3 - Very Good",
    value:3,
  },
  {
    title: "4 - Excellent",
    value:4,
  },
  {
    title: "5 - Masterpiece",
    value:5,
  },
]
const MovieRates = ({movie}) => {
// const [rating, setRating] = useState()
const dispatch = useDispatch();
// use Selector
const { isLoading, isError } = useSelector(
  (state) =>  state.createReview
)
const { userInfo } = useSelector((state) =>  state.userLogin)

  // validate user
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation)
  })

  // on submit
  const onSubmit = (data) => {
      // dispatch(loginAction(data))
      // console.log(movie._id)
      dispatch(reviewMovieAction({
        id: movie?._id,
        review: data 
      }))
      console.log(data)
  }

  useEffect(() => {   
    if(isError) {
      toast.error(isError)
      dispatch({ type: "MOVIES_REVIEW_RESET"})
    }
  }, [isError, dispatch])
  

  return <div className="my-12">
    <Titles title="Reviews" Icon={BiSolidBookmarkStar}/>
    <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
      {/* write review */} 
      <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-2 w-full flex flex-col gap-8">
        <h3 className="text-xl text-text font-semibold">Review "{movie?.title}"</h3>
        <p className="text-sm leading-7 font-medium text-border">
          Write your thoughts about this movie. Your opinion is valuable to other
        </p>
        <div className="text-sm w-full">
          <Select 
          label="Select Rating" 
          options={Ratings}
          name="rating"
          register={{...register("rating")}} 
          // onChange={(e) => setRating(e.target.value)}
          />
          <div className="flex mt-4 text-lg gap-2 text-star">
            <Rating value={watch("rating", false)}/>
          </div>
          {
            errors.rating && <InlineError text={errors.rating.message}/>
          }
        </div>
        {/* message */}
        <div className="w-full">
        <Message 
        name="comment" 
        register={{...register("comment")}} 
        label="Message" 
        placeholder="Make it short and sweet...."/>
        {
          errors.comment && <InlineError text={errors.comment.message}/>
        }
        </div>
        {/* submit */}
        {
          userInfo ? (
        <button 
        type="submit" 
        className="bg-subMain text-white py-3 w-full flex-colo rounded"
        disabled={isLoading}
        >
          {
            isLoading ? "Loading..." : "Submit"
          }
        </button>
          ) : (
        <Link to="/login">
        <div className="bg-main border border-dashed border-border text-subMain py-3 w-full flex-colo rounded">
            Login to review this movie
        </div>
        </Link>

          )
        }
      </form>
      {/* REVIEWS */}
      <div className="col-span-3 flex w-full flex-col gap-6">
        <h3 className="text-xl text-text font-semibold">Review {movie.numberOfReviews}</h3>
        <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">         
          {
            movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review, i) => (
                <div className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry border-gray p-4 border border-gray-800 rounded-lg">
                  <div className="col-span-2 bg-main hidden md:block">
                    <img src={review?.userImage ? review.userImage : `${pp}` } alt={review?.userName} className="w-full h-full rounded-lg object-cover"/>
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating}/>
                  </div>
                </div>
              ))
            ) : (<div><Empty message={`Be first to rate ${movie?.name}`}/></div>)
          }
        </div>
      </div>
    </div>
  </div>;
};

export default MovieRates;

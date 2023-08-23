import React, { useState, useEffect, useMemo } from "react";
import Layout from "../layout/Layout";
import Filters from "../components/Filters";
import Movie from "../components/Movie";
import { Movies } from "../data/MovieData";
import { CgSpinner } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllMoviesAction } from "../redux/action/movieAction";
import Loader from "../components/notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {TbPlayerTrackNext, TbPlayerTrackPrev} from "react-icons/tb"
import {
  LanguageData,
  YearData,
  TimesData,
  RatesData,
} from "../data/FilterData"
import { useParams } from "react-router-dom";
const MoviesPage = () => {
  // const maxPage = 10;
  const {search} = useParams()
  const dispatch = useDispatch()
  const [category, setCategory] = useState({ title: "All Categories" });
  // console.log("movies.js", category)
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0])


  // queries 
  const queries = useMemo(() => {
    const query  = {
      category: category?.title === "All Categories" ? "" : category?.title,
      language: language?.title === "Sort By Language" ? "" : language?.title,  
      year: year?.title.replace(/\D/g,""),
      times: times?.title.replace(/\D/g,""),
      rates: rates?.title.replace(/\D/g,""),
      search: search ? search : "",
    }
    return query
  },[category, times, language, rates, year, search])


  const sameClass = "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain"; 
  const sameClass2 = "w-full gap-6 flex-colo min-h-screen"
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    state => state.getAllMovies
  )
    // console.log("movie", movies)
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);
// console.log("categories", categories)
  // const [page, setPage] = useState(maxPage);

  // const HandleLoadingMore = () => {
  //   setPage(page + maxPage);
  // };

  useEffect(() => {
    if(isError){
      toast.error(isError)
    }
    dispatch(getAllMoviesAction(queries))
  }, [dispatch,isError, queries])
  

  // pagination next and prev page
  const nextPage = () => {
    dispatch(getAllMoviesAction({
      ...queries,
      pageNumber: page + 1
    }))
  }

  const prevPage = () => {
    dispatch(getAllMoviesAction({
      ...queries,
      pageNumber: page -1
    }))
  }

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
    language
  }

  // console.log("search",search)


  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        {/* {categories ? <Filters categories={categories}/> : null} */}
        <Filters 
        {...datas}
        />
        <p className="text-lg font-medium my-6">
          Total <span className="font-bold text-subMain">{movies ? movies?.length : 0}</span>
          {""} items found {
            search && `for "${search}"`
          }
        </p>
        {
          isLoading ? (
            <div className={sameClass}>
              <Loader/>
            </div>
          ):(
            movies?.length > 0 ? (
              <>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {movies.map((movie, index) => (
            <Movie movie={movie} key={index} />
          ))}
        </div> 
        <div className="w-full flex-rows gap-6 md:my-20 my-10">
          <button
            onClick={prevPage}
            // onClick={HandleLoadingMore}
            disabled={page === 1}
            // className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover: bg-subMain"
            className={sameClass}
          >
            {/* Loading More <CgSpinner className="animate-spin" /> */}
            <TbPlayerTrackPrev className="text-xl"/>
          </button>
          <button
            onClick={nextPage}
            // onClick={HandleLoadingMore}
            disabled={page === pages}
            className={sameClass}
            // className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover: bg-subMain"
          >
            {/* Loading More <CgSpinner className="animate-spin" /> */}
            <TbPlayerTrackNext className="text-xl"/>
          </button>
        </div>
              </>
            ) : ( 

              <div className={sameClass2}>
                <div className="w-24 h-24 p-5 rounded-full mb-4 ng-main text-subMain text-4xl flex-colo">
                  <RiMovie2Line/>
                </div>
                <p className="text-border text-sm">it seem's like we don't have any movie </p>
              </div>

            )
          )
        }
      </div>
    </Layout>
  );
};

export default MoviesPage;

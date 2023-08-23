import React, { Fragment, useEffect, useState, } from "react";
import { CategoriesData } from "../data/CategorisData";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { YearData } from "../data/FilterData";
import { TimesData } from "../data/FilterData";
import { RatesData } from "../data/FilterData";
import { LanguageData } from "../data/FilterData";
import { getAllMoviesAction } from "../redux/action/movieAction";
 
const Filters = ( 
  // { categories, category, setCategory, language, setLanguage, year, setYear, times, setTimes, rates, setRates } 
  props
  ) => {
  // const {
  //   categories,
  //   category,
  //   setCategory,
  //   language,
  //   year,
  //   setYear,
  //   times,
  //   setTimes,
  //   rates,
  //   setRates,
  //   setLanguage,

  // } = props?.data




  // const dispatch = useDispatch()
  // const [category, setCategory] = useState({ title: "All Categories" });
  // const [year, setYear] = useState(YearData[0]);
  // const [times, setTimes] = useState(TimesData[0]);
  // const [rates, setRates] = useState(RatesData[0]);
  // const [language, setLanguage] = useState(LanguageData[0])

  const Filter = [
    {
      value: props.category,
      onChange: props.setCategory,
      items: props.categories?.length > 0 ? [
        {title:"All Categories"},
        ...props.categories,
      ]: [
        {title: "No category found"}
      ]
    },
    {
      value: props.year,
      onChange: props.setYear,
      items: YearData,
    },
    {
      value: props.times,
      onChange: props.setTimes,
      items: TimesData,
    },
    {
      value: props.rates,
      onChange: props.setRates,
      items: RatesData, 
    },
    {
      value: props.language,
      onChange: props.setLanguage,
      items: LanguageData, 
    },
  ];

  // useEffect(() => {
  //   // console.log(category, language, year, times, rates)
  //   if(category?.title !== "No category found"){
  //     dispatch(getAllMoviesAction({
  //       category: category?.title === "All Categories" ? "" : category?.title,
  //       language: 
  //       language?.title === "Sort By Language" ? "" : language?.title,  
  //       year: year?.title.replace(/\D/g,""),
  //       times: times?.title.replace(/\D/g,""),
  //       rates: rates?.title.replace(/\D/g,""),
  //       search: "",
  //       // year:3000
  //     })) 
  //    }
  //   // console.log(category, language,year, times, rates);
  //  },[category, language, year, times, rates, dispatch])

  // useEffect(() => {
  //   if (category && category.title !== "No category found") {
  //     dispatch(getAllMoviesAction({
  //       category: category.value?.title === "All Categories" ? "" : category.title,
  //       language: language.value?.title === "Sort By Language" ? "" : language.title,
  //       year: year.value?.title.replace(/\D/g, ""),
  //       times: times.value?.title.replace(/\D/g, ""),
  //       rates: rates.value?.title.replace(/\D/g, ""),
  //       search: "",
  //     }));
  //   }
  // }, [category, language, year, times, rates, dispatch]);
  

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white  bg-main rounded-lg shadow-sm cursor-default py-4 pl-6 pr-10 text-left text-sm">
              <span className="block truncate">{item.value?.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items?.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                          <span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaCheck
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;

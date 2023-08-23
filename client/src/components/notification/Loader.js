import React from 'react'
import {PuffLoader} from "react-spinners"

const Loader = () => {
  return (
    <div className='flex justify-center items-center flex-colo'>
        <PuffLoader color='#f20000'/>
    </div>
  )
}

export default Loader
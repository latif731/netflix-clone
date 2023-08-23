import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom'

const Head = "text-xs text-left text-main font-semiBold px-6 py-2 uppercase"
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"
const Haction = "text-xs text-left text-main font-semiBold px-10 py-2 uppercase"
const Rows = (movie, i, admin, onDeletehandler ) => {
    // const Text ="text-sm text-left leading-6 whitespace-nowrap px-5 py-3"; 
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                <img src={movie?.titleImage} className='h-full w-full object-cover' alt={movie.name}/> 
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie?.name}</td>
            <td className={`${Text}`}>{movie?.category}</td>
            <td className={`${Text}`}>{movie?.language}</td>
            <td className={`${Text}`}>{movie?.year}</td>
            <td className={`${Text}`}>{movie?.time}hr</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
            {admin ? 
            (
            <> 
            <Link to={`/edit/${movie?._id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Edit <FaEdit className='text-green-500'/>
              </Link>
            <button 
            onClick={() => onDeletehandler(movie?._id)}
            className='bg-subMain text-white rounded flex-colo w-7 h-7'>
             <MdDelete/>
              </button>
            </>
            )
            :
            (
            <>
              <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Edit <FaCloudDownloadAlt className='text-green-500'/>
              </button>
            <Link to={`/movie/${movie?._id}`} className='bg-subMain text-white rounded flex-colo w-20 h-8 pt-1'>
                <GoEye/>
              </Link>
            </>
            )
            }
            </td>
        </tr>
    )
}



const Table = ({data, onDeletehandler, admin }) => {
  // console.log("tabel", data)
  return (
    <div className=' scroll-auto sc overflow-y-auto overflow-x-auto  overflow-hidden relative w-full h-96'>
        <table className='w-full table-auto border border-border divide-y divide-border'>
            <thead className='sticky top-0'>
                <tr className='bg-dryGray'>
                    <th scope="col" className={`${Head}`}>Image</th>
                    <th scope="col" className={`${Head}`}>Name</th>
                    <th scope="col" className={`${Head}`}>Category</th>
                    <th scope="col" className={`${Head}`}>Language</th>
                    <th scope="col" className={`${Head}`}>Year</th>
                    <th scope="col" className={`${Head}`}>Hours</th>
                    <th scope="col" className={`${Haction}`}>Actions</th>
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {
                    data.map((movie, i) => Rows(movie, i, admin, onDeletehandler))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table